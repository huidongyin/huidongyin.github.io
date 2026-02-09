/**
 * COS 配置文件
 *
 * ⚡ demo 模式：设为 true 可使用本地示例图片预览效果，无需配置 COS。
 *    正式使用时改为 false 并填写下面的 COS 信息。
 */
export default {
  // ========== Demo 模式 ==========
  demo: false,  // ← 正式使用时改为 false

  // ========== COS 必填（demo=false 时生效） ==========
  bucket: 'your-bucket-1250000000',
  region: 'ap-guangzhou',

  // ========== 可选 ==========
  photoPrefix: '',
  enableCI: false,
  thumbnailSize: 400,
  customDomain: '',

  // 站点标题
  title: '我的相册',
}
