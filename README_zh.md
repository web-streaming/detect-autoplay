# DetectAutoplay

现代浏览器不允许带声音的自动播放音视频，除非用户允许或者当前网站被浏览器自动播放算法允许。详情请查看 https://developer.chrome.com/blog/autoplay/ 。

这个 npm 包将自动检测当前网站是否被允许带声音的自动播放音视频。

如果你觉的这个仓库不错，请点一个 star ⭐️。

[English](./README.md)

## 安装

```bash
npm i -S detect-autoplay
```

或者使用 CDN

```html
<script src="https://unpkg.com/detect-autoplay@latest/dist/index.min.js"></script>

<script>
  console.log(detectAutoplay)
</script>
```

## 使用

```js
import { detectAutoplay } from 'detect-autoplay'

const video = document.createElement('video')
video.src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4'
video.playsInline = true
video.load()
document.body.appendChild(video)

detectAutoplay().then((canAutoplay) => {
  if (canAutoplay) {
    // 当前网站被允许带声音的自动播放
    video.play()
  } else {
    // 当前网站被禁止带声音的自动播放

    // 视频只能够静音才能自动播放
    video.muted = true
    video.play()

    // 给用户展示一个取消静音的按钮
    const btn = document.createElement('button')
    btn.textContent = 'unmute'
    btn.onclick = () => video.muted = false
    document.body.appendChild(btn)
  }
})
```

## API

### detectAutoplay()

```ts
detectAutoplay(timeout?: number): Promise<boolean>
```

检测当前网站是否能够自动播放音视频。如果浏览器允许自动播放，则检测结果会被缓存，下次调用该方法将会直接返回 `true`。

参数 `timeout` 是检测超时时间，超时了将会直接返回 `false`，默认超时时间为 `300` 毫秒。

### forceDetectAutoplay()

```ts
forceDetectAutoplay(timeout?: number): Promise<boolean>
```

和 `detectAutoplay` 一样, 但是它不会缓存检测结果，每次都会重新检测。
