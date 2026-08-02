import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import type { ComponentType } from 'react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
  icon: ComponentType<{ className?: string }>
}

export function GlassNav({ items }: { items: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-4 z-30 mb-6">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between rounded-full border border-slate-200 bg-white/85 px-4 py-3 shadow-[0_16px_48px_rgba(15,23,42,0.08)] backdrop-blur-2xl">
        <Link
          to="/"
          className="flex items-center gap-3 px-1 text-sm font-bold uppercase tracking-[0.22em] text-slate-900 focus-visible:rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-sky-500 text-white shadow-xs font-black">
            V
          </span>
          Veridion
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `relative rounded-full px-3.5 py-2 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="relative z-10 flex items-center gap-2" aria-current={isActive ? 'page' : undefined}>
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                )}
              </NavLink>
            )
          })}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
          className="rounded-full border border-slate-200 bg-slate-50 p-2 text-slate-700 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-3 flex max-w-6xl flex-col gap-2 rounded-3xl border border-slate-200 bg-white/95 p-3 text-sm text-slate-700 shadow-[0_16px_50px_rgba(15,23,42,0.10)] md:hidden"
          >
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1.5">
              {items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        isActive ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-50 text-slate-700'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <span className="flex items-center gap-2.5" aria-current={isActive ? 'page' : undefined}>
                        <Icon className="h-4 w-4" />
                        {item.label}
                      </span>
                    )}
                  </NavLink>
                )
              })}
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
