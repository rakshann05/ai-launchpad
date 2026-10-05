// Subtle paper grid — the Swiss substrate the whole page sits on.
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 paper-grid opacity-70 [mask-image:radial-gradient(ellipse_90%_70%_at_50%_30%,#000_55%,transparent_100%)]" />
    </div>
  )
}
