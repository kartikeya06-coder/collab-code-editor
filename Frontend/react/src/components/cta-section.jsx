import { motion } from "framer-motion";
import { ArrowRight, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "30+", label: "Languages supported" },
  { value: "<40ms", label: "Sync latency" },
  { value: "99.9%", label: "Room uptime" },
  { value: "12k+", label: "Interviews run" },
];

export default function CtaSection() {
  return (
    <section id="pricing" className="relative px-4 py-24">
      {/* Stats */}
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className="text-center"
          >
            <div className="text-3xl font-semibold tracking-tight text-gradient sm:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs text-muted-foreground sm:text-sm">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA card */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="glass relative mx-auto mt-16 max-w-4xl overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <div className="absolute left-1/2 top-0 h-72 w-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.21_292_/_0.4),transparent_65%)] blur-3xl" />
        </div>

        <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
          Start your first interview in seconds
        </h2>

        <p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
          Create a room now and invite a candidate. No account, no credit card,
          no setup — just a shared editor that works.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="group w-full rounded-full bg-gradient-to-r from-[oklch(0.62_0.21_292)] to-[oklch(0.6_0.18_248)] px-6 text-white shadow-lg shadow-[oklch(0.62_0.21_292_/_0.35)] hover:opacity-90 sm:w-auto"
          >
            <Plus className="size-4" aria-hidden="true" />
            Create Room
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="w-full rounded-full border-border bg-white/[0.03] px-6 hover:bg-white/[0.07] sm:w-auto"
          >
            <Users className="size-4" aria-hidden="true" />
            Join Room
          </Button>
        </div>
      </motion.div>
    </section>
  );
}