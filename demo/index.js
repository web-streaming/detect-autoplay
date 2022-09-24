import detectAutoplay from '../src'

const video = document.createElement('video')
video.src = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4'
video.playsInline = true
video.load()
document.body.appendChild(video)

detectAutoplay().then((canAutoplay) => {
  if (canAutoplay) {
    video.play()
  } else {
    const btn = document.createElement('button')
    btn.textContent = 'unmute'
    btn.onclick = () => video.muted = false
    document.body.appendChild(btn)

    video.muted = true
    video.play()
  }
})
