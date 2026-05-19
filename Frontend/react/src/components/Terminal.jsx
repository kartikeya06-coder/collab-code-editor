import { useEffect, useRef } from 'react';
import { Terminal as Xterm } from 'xterm';
import { FitAddon } from '@xterm/addon-fit';
import 'xterm/css/xterm.css'; // CRITICAL: This is the core terminal styling

export default function Terminal({ output }) {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);

  useEffect(() => {
    // 1. Initialize Xterm with a theme that matches your Monaco editor
    const term = new Xterm({
      theme: {
        background: '#1e1e1e', 
        foreground: '#cccccc',
        cursor: '#ffffff',
      },
      fontFamily: 'Menlo, Monaco, "Courier New", monospace',
      fontSize: 14,
      convertEol: true, // Fixes line breaks from Docker
      disableStdin: true, // Read-only for now
    });

    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);

    // 2. Mount it to the div
    term.open(terminalRef.current);
    fitAddon.fit();
    xtermRef.current = term;

    // Default startup message
    term.writeln('\x1b[32m[System]\x1b[0m Terminal initialized. Waiting for execution...');

    // Resize terminal automatically if the browser window resizes
    const resizeObserver = new ResizeObserver(() => fitAddon.fit());
    resizeObserver.observe(terminalRef.current);

    return () => {
      resizeObserver.disconnect();
      term.dispose();
    };
  }, []);

  // 3. Whenever the 'output' prop changes, write it to the terminal
  useEffect(() => {
    if (xtermRef.current && output) {
      xtermRef.current.clear();
      // Write the raw Docker output (complete with ANSI colors!)
      xtermRef.current.write(output); 
    }
  }, [output]);

  return (
    // This wrapper ensures Xterm perfectly fills the CSS Grid row
    <div className="w-full h-full p-2" ref={terminalRef} />
  );
}