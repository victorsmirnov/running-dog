export function loadImage (url) {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.addEventListener('load', () => resolve(img))
    img.addEventListener('error', () => reject(new Error(`Failed to load image at ${url}`)))
    img.src = url
  })
}
