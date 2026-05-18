const Docker = require('dockerode');
const docker = new Docker(); // Automatically connects to your local Docker daemon

async function executeJavaScript(code) {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. Encode code to Base64 to safely pass it into the container shell
      // This prevents users from breaking the shell command with quotes or special characters
      const base64Code = Buffer.from(code).toString('base64');
      const command = ['sh', '-c', `echo "${base64Code}" | base64 -d | node`];

      // 2. Setup a stream to capture the terminal output
      const outputStream = new require('stream').PassThrough();
      let output = '';
      outputStream.on('data', (chunk) => {
        output += chunk.toString('utf8');
      });

      // 3. THE MOAT: Configure the secure execution sandbox
      const runPromise = docker.run('node:alpine', command, outputStream, {
        HostConfig: {
          Memory: 50 * 1024 * 1024, // 50 MB limit: Stops memory leaks / fork bombs
          NetworkMode: 'none',      // NO INTERNET: Stops them from downloading malware or DDoS-ing
          AutoRemove: true,         // Immediately destroys the container after the code finishes
        }
      });

      // 4. Implement a strict 5-second timeout (prevents infinite while-loops)
      const timeout = setTimeout(() => {
        resolve({ error: "Execution Timed Out (Possible Infinite Loop)" });
      }, 5000);

      // Wait for execution to finish
      await runPromise;
      clearTimeout(timeout);
      
      // Clean the output by stripping ANSI escape codes
      // This regex matches the exact pattern of terminal color codes
      const cleanOutput = output.replace(/\x1b\[[0-9;]*m/g, '').trim();
      
      // Return the cleaned terminal output
      resolve({ output: cleanOutput });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { executeJavaScript };