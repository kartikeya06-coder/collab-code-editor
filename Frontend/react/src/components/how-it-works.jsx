

import { motion } from 'motion/react'

const steps = [
  {
    step: '01',
    title: 'Create a room',
    desc: 'Spin up a private, sandboxed room in one click and pick your language. No installs, no config.',
  },
  {
    step: '02',
    title: 'Share the link',
    desc: 'Send the room link to your candidate. They join instantly in the browser — nothing to download.',
  },
  {
    step: '03',
    title: 'Code together live',
    desc: 'Pair in real time with shared cursors, run code in the terminal, and evaluate as you go.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="relative px-4 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium text-[oklch(0.72_0.17_300)]">How it works</p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          From invite to insight in three steps
        </h2>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="glass relative rounded-2xl p-7"
          >
            <span className="font-mono text-3xl font-semibold text-gradient">{s.step}</span>
            <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
