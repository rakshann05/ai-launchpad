// Ambient animated background: gradient blobs + grid overlay.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div className="animate-float-slow absolute -left-32 -top-40 h-[42rem] w-[42rem] rounded-full bg-violet/25 blur-[140px]" />
      <div
        className="animate-float-slow absolute -right-40 top-1/3 h-[38rem] w-[38rem] rounded-full bg-cyan/20 blur-[150px]"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="animate-float-slow absolute bottom-0 left-1/3 h-[34rem] w-[34rem] rounded-full bg-lime/10 blur-[150px]"
        style={{ animationDelay: '-9s' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />
    </div>
  )
}
