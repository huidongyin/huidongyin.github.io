# 照片展示站

基于 **Vue 3 + Vite** 的静态照片展示站，直接对接**腾讯云 COS** 存储桶，自动读取存储桶中不同文件夹的照片，按文件夹分类浏览，支持缩略图和大图查看。

## 功能

- 自动扫描 COS 存储桶中的文件夹，每个文件夹为一个相册
- 相册封面自动取文件夹内第一张图片
- 照片网格浏览，懒加载
- 灯箱大图查看，键盘左右切换
- 支持腾讯云数据万象 (CI) 自动生成缩略图
- 自动适配暗黑模式
- 响应式布局，移动端友好

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置 COS

编辑 `src/config.js`，填写你的 COS 信息：

```js
export default {
  bucket: 'your-bucket-1250000000',  // 存储桶名称（含 APPID）
  region: 'ap-guangzhou',             // 地域
  photoPrefix: '',                    // 照片前缀，留空表示根目录
  enableCI: false,                    // 是否启用数据万象生成缩略图
  thumbnailSize: 400,                 // 缩略图尺寸
  customDomain: '',                   // 自定义域名（可选）
  title: '我的相册',                   // 站点标题
}
```

### 3. 本地开发

```bash
npm run dev
```

### 4. 构建

```bash
npm run build
```

产物在 `dist/` 目录。

---

## 腾讯云 COS 配置指南

### 第一步：创建存储桶

1. 登录 [COS 控制台](https://console.cloud.tencent.com/cos)
2. 创建存储桶，**访问权限选「公有读私有写」**
3. 记下存储桶名称（如 `my-photos-1250000000`）和地域（如 `ap-guangzhou`）

### 第二步：上传照片

在存储桶中创建文件夹，每个文件夹代表一个相册：

```
存储桶根目录/
├── 旅行/
│   ├── 海边.jpg
│   ├── 日落.png
│   └── ...
├── 美食/
│   ├── 蛋糕.jpg
│   └── ...
├── 日常/
│   └── ...
```

> 如果你在 `config.js` 中设置了 `photoPrefix: 'photos/'`，
> 则所有相册文件夹应放在 `photos/` 前缀下。

### 第三步：配置 CORS

在存储桶的 **安全管理 → 跨域访问 CORS 设置** 中添加规则：

| 配置项 | 值 |
|---|---|
| 来源 Origin | `*` |
| 操作 Methods | `GET` |
| Allow-Headers | `*` |
| Max-Age | `86400` |

> 如果你使用自定义域名，可以将 Origin 改为你的域名以增强安全性。

### 第四步：开启静态网站（部署站点本身）

1. 在存储桶的 **基础配置 → 静态网站** 中开启
2. 索引文档设为 `index.html`
3. 错误文档也设为 `index.html`（支持前端路由）

### 第五步：上传站点文件

将 `dist/` 目录下所有文件上传到存储桶根目录：

**方法一：控制台上传**

在 COS 控制台中直接上传 `dist/` 内的所有文件和文件夹。

**方法二：使用 COSCMD**

```bash
pip install coscmd
coscmd config -a <SecretId> -s <SecretKey> -b <bucket> -r <region>
coscmd upload -r dist/ /
```

上传后即可通过存储桶的静态网站域名访问：
```
https://<bucket>.cos-website.<region>.myqcloud.com
```

---

## 缩略图配置（可选）

开启腾讯云 **数据万象 (CI)** 后，可自动为照片生成缩略图，大幅减少流量和加载时间：

1. 在 COS 控制台找到存储桶，进入 **数据处理 → 图片处理**，开启
2. 在 `src/config.js` 中设置：
   ```js
   enableCI: true,
   thumbnailSize: 400,  // 缩略图短边像素
   ```
3. 重新构建并上传

开启后，相册网格中的图片会自动请求缩略图，点击大图查看时加载原图。

---

## 自定义域名（可选）

1. 在 COS 控制台的 **域名与传输管理 → 自定义源站域名** 中绑定
2. 配置域名 DNS CNAME 指向 COS 提供的域名
3. 在 `src/config.js` 中设置：
   ```js
   customDomain: 'photos.yourdomain.com'
   ```
4. 重新构建并上传

---

## 技术栈

- Vue 3 (Composition API)
- Vue Router 4 (Hash 模式，适配静态托管)
- Vite 5
- 腾讯云 COS REST API（无需 SDK）
