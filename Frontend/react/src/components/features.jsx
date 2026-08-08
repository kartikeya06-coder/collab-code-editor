

import { motion } from 'motion/react'
import {
  MousePointer2,
  TerminalSquare,
  Zap,
  Video,
  GitBranch,
  ShieldCheck,
} from 'lucide-react'

const features = [
  {
    icon: MousePointer2,
    title: 'Live multiplayer cursors',
    desc: 'See every keystroke, selection, and cursor in real time. Conflict-free editing keeps everyone in sync.',
  },
  {
    icon: TerminalSquare,
    title: 'Integrated terminal',
    desc: 'A shared terminal streams stdout, stderr, and test results to every participant instantly.',
  },
  {
    icon: Zap,
    title: 'Instant execution',
    desc: 'Run code in 30+ languages on secure sandboxes. No local setup, no waiting on installs.',
  },
  {
    icon: Video,
    title: 'Built-in audio & video',
    desc: 'Talk through solutions without leaving the room. Low-latency calls sit right beside the editor.',
  },
  {
    icon: GitBranch,
    title: 'Snapshots & playback',
    desc: 'Replay the whole session keystroke by keystroke to review a candidate’s thought process.',
  },
  {
    icon: ShieldCheck,
    title: 'Private & secure',
    desc: 'End-to-end encrypted rooms, isolated sandboxes, and per-room access controls by default.',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative px-4 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-[oklch(0.72_0.17_300)]"
        >
          Everything in one room
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          Purpose-built for real-time coding interviews
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-pretty text-muted-foreground"
        >
          No screen sharing, no juggling tools. Everything your team needs to evaluate
          candidates lives in a single collaborative room.
        </motion.p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-[oklch(0.62_0.21_292_/_0.4)]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-8 -top-8 size-24 rounded-full bg-[radial-gradient(circle,oklch(0.62_0.21_292_/_0.25),transparent_70%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-white/[0.03] text-[oklch(0.75_0.15_285)]">
              <feature.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-base font-semibold">{feature.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {feature.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
