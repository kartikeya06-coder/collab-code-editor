

import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Play, TerminalSquare, Circle } from 'lucide-react'

// type Collaborator = {
//   name: string
//   color: string
//   initials: string
// }

const collaborators = [
  { name: 'Ava Chen', color: 'oklch(0.62 0.21 292)', initials: 'AC' },
  { name: 'Ravi Patel', color: 'oklch(0.65 0.18 220)', initials: 'RP' },
  { name: 'Mia Lee', color: 'oklch(0.72 0.17 155)', initials: 'ML' },
]

// Tokenized lines so we can color-highlight without a real editor.
const codeLines = [
  { tokens: [{ text: 'function', cls: 'text-[oklch(0.72_0.17_300)]' }, { text: ' twoSum', cls: 'text-[oklch(0.8_0.13_220)]' }, { text: '(nums, target) {', cls: 'text-muted-foreground' }] },
  { tokens: [{ text: '  const', cls: 'text-[oklch(0.72_0.17_300)]' }, { text: ' seen = ', cls: 'text-foreground' }, { text: 'new Map', cls: 'text-[oklch(0.8_0.13_220)]' }, { text: '()', cls: 'text-muted-foreground' }] },
  { tokens: [{ text: '  for', cls: 'text-[oklch(0.72_0.17_300)]' }, { text: ' (let i = ', cls: 'text-foreground' }, { text: '0', cls: 'text-[oklch(0.78_0.15_60)]' }, { text: '; i < nums.length; i++) {', cls: 'text-muted-foreground' }] },
  { tokens: [{ text: '    const', cls: 'text-[oklch(0.72_0.17_300)]' }, { text: ' need = target - nums[i]', cls: 'text-foreground' }] },
  { tokens: [{ text: '    if', cls: 'text-[oklch(0.72_0.17_300)]' }, { text: ' (seen.has(need)) ', cls: 'text-foreground' }, { text: 'return', cls: 'text-[oklch(0.72_0.17_300)]' }, { text: ' [seen.get(need), i]', cls: 'text-foreground' }] },
  { tokens: [{ text: '    seen.set(nums[i], i)', cls: 'text-foreground' }] },
  { tokens: [{ text: '  }', cls: 'text-muted-foreground' }] },
  { tokens: [{ text: '}', cls: 'text-muted-foreground' }] },
]

const terminalLines = [
  { prompt: true, text: 'node twoSum.js' },
  { prompt: false, text: '> twoSum([2,7,11,15], 9)' },
  { prompt: false, text: '[0, 1]', ok: true },
  { prompt: false, text: '✓ 4 tests passed in 0.12s', ok: true },
]

function Cursor({
  collaborator,
  style,
  delay,
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className="pointer-events-none absolute z-20 flex items-start"
      style={style}
      initial={reduce ? false : { opacity: 0 }}
      animate={
        reduce
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: [0, -6, 2, 0],
              x: [0, 4, -2, 0],
            }
      }
      transition={{
        opacity: { delay, duration: 0.4 },
        y: { delay, duration: 6, repeat: Infinity, ease: 'easeInOut' },
        x: { delay, duration: 6, repeat: Infinity, ease: 'easeInOut' },
      }}
    >
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none" aria-hidden="true">
        <path
          d="M1 1L1 14L4.5 10.5L7 16L9 15L6.5 9.5L11 9.5L1 1Z"
          fill={collaborator.color}
          stroke="oklch(0.16 0.02 275)"
          strokeWidth="1"
        />
      </svg>
      <span
        className="ml-1 -mt-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm"
        style={{ backgroundColor: collaborator.color }}
      >
        {collaborator.name}
      </span>
    </motion.div>
  )
}

export function CodeEditorMockup() {
  const reduce = useReducedMotion()
  const [visibleTerminal, setVisibleTerminal] = useState(0)

  useEffect(() => {
    if (reduce) {
      setVisibleTerminal(terminalLines.length)
      return
    }
    const id = setInterval(() => {
      setVisibleTerminal((n) => (n >= terminalLines.length ? 0 : n + 1))
    }, 1100)
    return () => clearInterval(id)
  }, [reduce])

  return (
    <div className="glass relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-[oklch(0.62_0.21_292_/_0.15)]">
      {/* Window title bar */}
      <div className="flex items-center justify-between border-b border-border/80 bg-[oklch(0.19_0.025_275)] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="size-3 rounded-full bg-[oklch(0.68_0.19_25)]" />
          <span className="size-3 rounded-full bg-[oklch(0.8_0.15_85)]" />
          <span className="size-3 rounded-full bg-[oklch(0.72_0.17_155)]" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">twoSum.js — CollabCode Room #A2F9</span>
        </div>
        {/* Presence avatars */}
        <div className="flex -space-x-2">
          {collaborators.map((c) => (
            <span
              key={c.name}
              className="flex size-6 items-center justify-center rounded-full border-2 border-[oklch(0.19_0.025_275)] text-[9px] font-semibold text-white"
              style={{ backgroundColor: c.color }}
              title={c.name}
            >
              {c.initials}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto]">
        {/* Editor */}
        <div className="relative min-h-[300px] px-2 py-4 font-mono text-[13px] leading-relaxed sm:px-4">
          <Cursor
            collaborator={collaborators[0]}
            delay={0.6}
            style={{ top: '86px', left: '38%' }}
          />
          <Cursor
            collaborator={collaborators[1]}
            delay={1.1}
            style={{ top: '150px', left: '20%' }}
          />

          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 rounded px-2 py-0.5 hover:bg-white/[0.03]"
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            >
              <span className="w-5 select-none text-right text-[11px] text-muted-foreground/50">
                {i + 1}
              </span>
              <span className="whitespace-pre">
                {line.tokens.map((t, j) => (
                  <span key={j} className={t.cls}>
                    {t.text}
                  </span>
                ))}
              </span>
            </motion.div>
          ))}

          {/* Blinking caret on active line */}
          {!reduce && (
            <motion.span
              className="ml-11 inline-block h-4 w-[2px] bg-[oklch(0.62_0.21_292)] align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </div>

        {/* Terminal */}
        <div className="border-t border-border/80 bg-[oklch(0.135_0.02_275)] lg:w-[300px] lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2.5">
            <TerminalSquare className="size-4 text-[oklch(0.72_0.17_155)]" aria-hidden="true" />
            <span className="font-mono text-xs text-muted-foreground">Terminal</span>
            <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[oklch(0.72_0.17_155_/_0.15)] px-2 py-0.5 text-[10px] font-medium text-[oklch(0.78_0.16_155)]">
              <Circle className="size-2 fill-current" aria-hidden="true" />
              live
            </span>
          </div>
          <div className="min-h-[240px] px-4 py-3 font-mono text-[12px] leading-relaxed">
            {terminalLines.slice(0, visibleTerminal).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={
                  line.ok
                    ? 'text-[oklch(0.78_0.16_155)]'
                    : line.prompt
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                }
              >
                {line.prompt && <span className="text-[oklch(0.62_0.21_292)]">$ </span>}
                {line.text}
              </motion.div>
            ))}
            {!reduce && (
              <motion.span
                className="inline-block h-3.5 w-[7px] bg-[oklch(0.72_0.17_155)]"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
              />
            )}
          </div>
        </div>
      </div>

      {/* Run bar */}
      <div className="flex items-center justify-between border-t border-border/80 bg-[oklch(0.19_0.025_275)] px-4 py-2.5">
        <span className="font-mono text-[11px] text-muted-foreground">JavaScript · Node 20</span>
        <span className="flex items-center gap-1.5 rounded-md bg-[oklch(0.62_0.21_292)] px-3 py-1.5 text-[11px] font-medium text-white">
          <Play className="size-3 fill-current" aria-hidden="true" />
          Run
        </span>
      </div>
    </div>
  )
}
