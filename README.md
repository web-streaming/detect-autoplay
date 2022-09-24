# DetectAutoplay

Modern browsers do not support autoplay with sound unless the user or browser autoplay algorithm allows it. see https://developer.chrome.com/blog/autoplay/ .

This npm package will detect if the current website is allowed to autoplay audio and video.

If you like this repo, please give it a star ⭐️.

[中文文档](./README_zh.md)

## Install

```bash
npm i -S detect-autoplay
```

or via CDN

```html
<script src="https://unpkg.com/detect-autoplay@latest/dist/index.min.js"></script>

<script>
  console.log(detectAutoplay)
</script>
```

## Usage

```js
import { detectAutoplay } from 'detect-autoplay'

const video = document.createElement('video')
video.src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4'
video.playsInline = true
video.load()
document.body.appendChild(video)

detectAutoplay().then((canAutoplay) => {
  if (canAutoplay) {
    // current website allows autoplay with sound
    video.play()
  } else {
    // current website does not allow autoplay with sound

    // video can only be muted to autoplay
    video.muted = true
    video.play()

    // show a button to unmute
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

Detect if the current website is allowed to autoplay audio and video. If autoplay is allowed, the detection result will be cached, and the next time this function is called, will directly return true.

The parameter `timeout` is the detection timeout, will return `false` if it timeout. default is `300`ms

### forceDetectAutoplay()

```ts
forceDetectAutoplay(timeout?: number): Promise<boolean>
```

Same as `detectAutoplay`, but it doesn't cache the result, it re-detect every time.
