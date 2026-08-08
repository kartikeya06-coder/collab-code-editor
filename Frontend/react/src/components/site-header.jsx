

import { motion } from 'motion/react'
import { Code2, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navItems = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
]

export default function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav className="glass flex w-full max-w-5xl items-center justify-between rounded-full py-2 pl-4 pr-2">
        <a href="#" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.62_0.21_292)] to-[oklch(0.62_0.18_248)]">
            <Code2 className="size-4.5 text-white" aria-hidden="true" />
          </span>
          <span className="text-base font-semibold tracking-tight">CollabCode</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden rounded-full text-sm sm:inline-flex">
            Sign in
          </Button>
          <Button className="rounded-full bg-gradient-to-r from-[oklch(0.62_0.21_292)] to-[oklch(0.6_0.18_248)] text-sm text-white shadow-lg shadow-[oklch(0.62_0.21_292_/_0.3)] hover:opacity-90">
            Get started
          </Button>
          <button
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground md:hidden"
            aria-label="Open menu"
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
