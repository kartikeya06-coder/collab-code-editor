import { motion } from "framer-motion";
import { ArrowRight, Plus, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeEditorMockup } from "@/components/code-editor-mockup";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.1,
      duration: 0.6,
      ease: [0.21, 0.47, 0.32, 0.98],
    },
  }),
};

export default function Hero() {

  const navigate = useNavigate();
  const handleCreateRoom = () => {
    const newRoomId = uuidv4(); // Generates something like '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    // Navigate to the editor route, passing the ID in the URL
    navigate(`/editor/${newRoomId}`);
  };

  const handleJoinRoom = () => {
    // For a quick implementation, you can use a prompt. 
    // Alternatively, tie this to a clean UI input field.
    const roomId = window.prompt("Paste the Room ID you were invited to:");
    
    if (roomId && roomId.trim().length > 0) {
      navigate(`/editor/${roomId.trim()}`);
    } else {
      alert("A valid Room ID is required to join.");
    }
  };

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-36 sm:pt-40">
      {/* Ambient gradient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
        <div className="absolute left-1/2 top-[-10%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.62_0.21_292_/_0.35),transparent_60%)] blur-3xl" />
        <div className="absolute left-[20%] top-[10%] h-[380px] w-[380px] rounded-full bg-[radial-gradient(ellipse_at_center,oklch(0.6_0.18_248_/_0.28),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.a
          href="#"
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground"
        >
          <Sparkles
            className="size-3.5 text-[oklch(0.72_0.17_300)]"
            aria-hidden="true"
          />
          Real-time collaboration, zero setup
          <ArrowRight className="size-3.5" aria-hidden="true" />
        </motion.a>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl"
        >
          The collaborative code editor for{" "}
          <span className="text-gradient">technical interviews</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Interview candidates in a shared editor with live cursors, an
          integrated terminal, and instant code execution. Create a room and
          start pairing in seconds.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
        >
          <Button
            size="lg"
            className="group w-full rounded-full bg-gradient-to-r from-[oklch(0.62_0.21_292)] to-[oklch(0.6_0.18_248)] px-6 text-white shadow-lg shadow-[oklch(0.62_0.21_292_/_0.35)] hover:opacity-90 sm:w-auto"
            onClick={handleCreateRoom}
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
            className="w-full rounded-full border-border bg-white/[0.03] px-6 backdrop-blur hover:bg-white/[0.07] sm:w-auto"
            onClick={handleJoinRoom}
          >
            <Users className="size-4" aria-hidden="true" />
            Join Room
          </Button>
        </motion.div>

        <motion.p
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-4 text-xs text-muted-foreground"
        >
          Free for 1-on-1 interviews · No credit card required
        </motion.p>
      </div>

      {/* Editor mockup */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="mx-auto mt-16 max-w-5xl"
      >
        <CodeEditorMockup />
      </motion.div>
    </section>
  );
}