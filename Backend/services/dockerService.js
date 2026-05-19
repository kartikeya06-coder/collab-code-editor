const Docker = require('dockerode');
const docker = new Docker();

async function executeCode(code, language) {
  return new Promise(async (resolve, reject) => {
    try {
      const base64Code = Buffer.from(code).toString('base64');
      
      let image = '';
      let command = [];

      // 1. The Language Router
      if (language === 'javascript') {
        image = 'node:alpine';
        command = ['sh', '-c', `echo "${base64Code}" | base64 -d | node`];
      } 
      else if (language === 'cpp') {
        image = 'gcc:latest';
        // For C++: Decode -> Save to main.cpp -> Compile to 'main' -> Execute './main'
        command = ['sh', '-c', `echo "${base64Code}" | base64 -d > main.cpp && g++ main.cpp -o main && ./main`];
      } 
      else {
        return resolve({ error: "Unsupported language." });
      }

      const outputStream = new require('stream').PassThrough();
      let output = '';
      outputStream.on('data', (chunk) => {
        output += chunk.toString('utf8');
      });

      // 2. Run the secure container with the dynamically selected image
      const runPromise = docker.run(image, command, outputStream, {
        HostConfig: {
          Memory: 100 * 1024 * 1024, // Bumped to 100MB (GCC compiler is heavier than Node)
          NetworkMode: 'none',
          AutoRemove: true,
        }
      });

      const timeout = setTimeout(() => {
        resolve({ error: "Execution Timed Out (Possible Infinite Loop or Slow Compilation)" });
      }, 10000); // Bumped to 10 seconds because compiling C++ takes a moment

      await runPromise;
      clearTimeout(timeout);
      
      // If compilation fails, g++ writes to stderr, which our stream naturally captures!
      resolve({ output: output });

    } catch (err) {
      console.error("Docker Execution Error:", err);
      resolve({ error: "Failed to execute code securely." });
    }
  });
}

module.exports = { executeCode };