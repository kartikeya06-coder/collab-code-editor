import { Code2 } from 'lucide-react'

const columns = [
  {
    heading: 'Product',
    links: ['Features', 'Pricing', 'Integrations', 'Changelog'],
  },
  {
    heading: 'Company',
    links: ['About', 'Blog', 'Careers', 'Contact'],
  },
  {
    heading: 'Resources',
    links: ['Docs', 'Guides', 'Security', 'Status'],
  },
]

export default function SiteFooter() {
  return (
    <footer className="border-t border-border px-4 py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-10 md:grid-cols-5">
        <div className="col-span-2">
          <a href="#" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-[oklch(0.62_0.21_292)] to-[oklch(0.62_0.18_248)]">
              <Code2 className="size-4.5 text-white" aria-hidden="true" />
            </span>
            <span className="text-base font-semibold tracking-tight">CollabCode</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            The real-time collaborative coding interview platform. Pair, evaluate, and hire
            better.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <h3 className="text-sm font-semibold">{col.heading}</h3>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-12 flex max-w-5xl flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CollabCode, Inc. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
            Privacy
          </a>
          <a href="#" className="text-xs text-muted-foreground hover:text-foreground">
            Terms
          </a>
        </div>
      </div>
    </footer>
  )
}
