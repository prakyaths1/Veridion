export function StoryTile({ title, body, tone }: { title: string; body: string; tone: string }) {
  return (
    <div className="rounded-[1.4rem] border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-500">{title}</p>
      <p className={`mt-2 text-sm leading-6 ${tone}`}>{body}</p>
    </div>
  )
}
