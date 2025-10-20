import { ref } from 'vue'

// 简单的本地缓存图片到 localStorage 的 composable
// 注意：localStorage 有配额限制，适合小图（头像）缓存。
export function useImageCache(url: string) {
  const src = ref<string>(url)
  const loading = ref(false)
  const error = ref(false)

  if (!url) return { src, loading, error }

  const key = `imgcache:${encodeURIComponent(url)}`

  // 仅在浏览器环境执行 fetch/localStorage 操作
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(key)
      if (cached) {
        src.value = cached
        // already cached, no need to fetch
      } else if (/^https?:\/\//.test(url)) {
        // fetch remote image and store as data URL
        loading.value = true
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.onerror = reject
            reader.readAsDataURL(blob)
          }))
          .then((dataUrl) => {
            try {
              localStorage.setItem(key, dataUrl)
            } catch (e) {
              // ignore quota errors
              console.warn('store image failed', e)
            }
            src.value = dataUrl
          })
          .catch((e) => {
            console.warn('fetch image failed', e)
            error.value = true
            src.value = url // fallback to original
          })
          .finally(() => (loading.value = false))
      }
    } catch (e) {
      console.warn('image cache error', e)
    }
  }

  return { src, loading, error }
}
