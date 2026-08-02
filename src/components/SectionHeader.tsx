export function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.34em] text-emerald-700">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm text-slate-700 sm:text-base">{description}</p>
    </div>
  )
}
