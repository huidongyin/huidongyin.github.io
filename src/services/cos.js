/**
 * 腾讯云 COS 服务封装
 *
 * 通过 COS REST API（List Objects V2）列出存储桶内的相册（文件夹）和照片。
 * 同时支持 demo 模式——使用本地 /demo/ 目录下的示例图片。
 */
import config from '../config.js'

const IMAGE_RE = /\.(jpe?g|png|gif|webp|bmp|avif|svg|heic|heif|tiff?)$/i

/* ============================================================
   Demo 模式（本地数据）
   ============================================================ */

const DEMO_ALBUMS = {
  '风景': ['sunset.svg', 'mountain.svg', 'ocean.svg', 'forest.svg'],
  '城市': ['skyline.svg', 'street.svg', 'bridge.svg'],
}

function demoListAlbums() {
  return Object.entries(DEMO_ALBUMS).map(([name, files]) => ({
    name,
    prefix: `demo/${name}/`,
    cover: `/demo/${name}/${files[0]}`,
    coverThumbnail: `/demo/${name}/${files[0]}`,
    count: files.length,
  }))
}

function demoListPhotos(albumName) {
  const files = DEMO_ALBUMS[albumName] || []
  return files.map((f) => ({
    key: `demo/${albumName}/${f}`,
    url: `/demo/${albumName}/${f}`,
    thumbnail: `/demo/${albumName}/${f}`,
    size: 0,
    lastModified: '',
  }))
}

/* ============================================================
   COS API 模式
   ============================================================ */

/** COS API 域名 */
function getApiBase() {
  if (config.customDomain) return `https://${config.customDomain}`
  return `https://${config.bucket}.cos.${config.region}.myqcloud.com`
}

function getFileBase() {
  return getApiBase()
}

/* ---------- XML 解析工具 ---------- */

function xmlText(parent, tag) {
  const el = parent.getElementsByTagName(tag)[0]
  return el ? el.textContent : ''
}

function xmlAll(doc, tag) {
  return Array.from(doc.getElementsByTagName(tag))
}

/* ---------- COS List Objects V2 ---------- */

async function listObjects(prefix = '', delimiter = '/') {
  const base = getApiBase()
  let continuationToken = ''
  let allPrefixes = []
  let allKeys = []

  while (true) {
    const params = new URLSearchParams({
      'list-type': '2',
      prefix,
      delimiter,
      'max-keys': '1000',
    })
    if (continuationToken) {
      params.set('continuation-token', continuationToken)
    }

    const res = await fetch(`${base}/?${params}`)
    if (!res.ok) {
      throw new Error(`COS 请求失败: ${res.status} ${res.statusText}`)
    }

    const text = await res.text()
    const doc = new DOMParser().parseFromString(text, 'application/xml')

    const cpNodes = xmlAll(doc, 'CommonPrefixes')
    for (const cp of cpNodes) {
      const p = xmlText(cp, 'Prefix')
      if (p) allPrefixes.push(p)
    }

    const contents = xmlAll(doc, 'Contents')
    for (const c of contents) {
      const key = xmlText(c, 'Key')
      const size = parseInt(xmlText(c, 'Size') || '0', 10)
      const lastModified = xmlText(c, 'LastModified')
      if (key && size > 0) {
        allKeys.push({ key, size, lastModified })
      }
    }

    const isTruncated = xmlText(doc, 'IsTruncated')
    if (isTruncated === 'true') {
      continuationToken = xmlText(doc, 'NextContinuationToken')
    } else {
      break
    }
  }

  return { prefixes: allPrefixes, keys: allKeys }
}

/* ============================================================
   公开 API（自动选择 demo / COS 模式）
   ============================================================ */

/**
 * 列出所有相册
 */
export async function listAlbums() {
  if (config.demo) {
    return demoListAlbums()
  }

  const prefix = config.photoPrefix || ''
  const { prefixes } = await listObjects(prefix, '/')

  const albums = await Promise.all(
    prefixes.map(async (p) => {
      const name = p.replace(prefix, '').replace(/\/$/, '')
      if (!name || name.startsWith('.')) return null

      const { keys } = await listObjects(p, '')
      const images = keys.filter((k) => IMAGE_RE.test(k.key))
      if (images.length === 0) return null

      return {
        name,
        prefix: p,
        cover: getFileUrl(images[0].key),
        coverThumbnail: getThumbnailUrl(images[0].key),
        count: images.length,
      }
    })
  )

  return albums.filter(Boolean)
}

/**
 * 列出指定相册内的所有照片
 */
export async function listPhotos(albumPrefix) {
  if (config.demo) {
    const albumName = albumPrefix.replace(/^demo\//, '').replace(/\/$/, '')
    return demoListPhotos(albumName)
  }

  const { keys } = await listObjects(albumPrefix, '')
  return keys
    .filter((k) => IMAGE_RE.test(k.key))
    .map((k) => ({
      key: k.key,
      url: getFileUrl(k.key),
      thumbnail: getThumbnailUrl(k.key),
      size: k.size,
      lastModified: k.lastModified,
    }))
}

/**
 * 获取文件完整 URL
 */
export function getFileUrl(key) {
  return `${getFileBase()}/${encodeURI(key)}`
}

/**
 * 获取缩略图 URL
 */
export function getThumbnailUrl(key) {
  const url = getFileUrl(key)
  if (config.enableCI) {
    const size = config.thumbnailSize || 400
    return `${url}?imageMogr2/thumbnail/${size}x${size}>`
  }
  return url
}

/**
 * 根据相册名获取 prefix
 */
export function getAlbumPrefix(albumName) {
  if (config.demo) {
    return `demo/${albumName}/`
  }
  const base = config.photoPrefix || ''
  return `${base}${albumName}/`
}
