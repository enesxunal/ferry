export function HeroBanner() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover"
        onEnded={(event) => {
          event.currentTarget.currentTime = 0
          void event.currentTarget.play()
        }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
