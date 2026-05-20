const Docker = require('dockerode');
const docker = new Docker();

async function executeCode(code, language) {
  return new Promise(async (resolve, reject) => {
    try {
      const base64Code = Buffer.from(code).toString('base64');
      let image = '';
      let command = [];

      if (language === 'javascript') {
        image = 'node:alpine';
        command = ['sh', '-c', `echo "${base64Code}" | base64 -d | node`];
      } else if (language === 'cpp') {
        image = 'gcc:latest';
        command = ['sh', '-c', `echo "${base64Code}" | base64 -d > main.cpp && g++ main.cpp -o main && ./main`];
      } else {
        return resolve({ error: "Unsupported language." });
      }

      const outputStream = new require('stream').PassThrough();
      let output = '';
      outputStream.on('data', (chunk) => {
        output += chunk.toString('utf8');
      });

      let performanceData = [];
      let startTime = Date.now();
      let activeContainer = null;

      // 1. The Callback Mode Execution
      const runEmitter = docker.run(image, command, outputStream, {
        HostConfig: {
          Memory: 100 * 1024 * 1024,
          NetworkMode: 'none',
          AutoRemove: true,
        }
      }, (err, data, container) => {
        // THIS RUNS WHEN THE CONTAINER FINISHES EXECUTING
        clearTimeout(timeout);
        
        if (err) {
          console.error("Docker Run Error:", err);
          return resolve({ error: "Execution failed during runtime.", metrics: performanceData });
        }

        // Catch the OOM Killer (Exit Code 137)
        if (data && data.StatusCode === 137) {
          return resolve({ 
            error: "Memory Limit Exceeded. The container was killed for using too much RAM.", 
            metrics: performanceData 
          });
        }
        
        // Catch general crashes (Syntax errors, etc.)
        if (data && data.StatusCode !== 0) {
          return resolve({ 
            error: `Process crashed with Exit Code ${data.StatusCode}. \n\nOutput: ${output}`, 
            metrics: performanceData 
          });
        }
        
        // Success!
        resolve({ 
          output: output, 
          metrics: performanceData 
        });
      });

      // 2. The Telemetry Hook
      runEmitter.on('container', async (container) => {
        activeContainer = container; 
        
        try {
          const statsStream = await container.stats({ stream: true });
          
          statsStream.on('data', (chunk) => {
            try {
              const stat = JSON.parse(chunk.toString());
              
              if (stat.memory_stats && stat.memory_stats.usage) {
                const memoryMB = stat.memory_stats.usage / (1024 * 1024);
                
                performanceData.push({
                  time: Date.now() - startTime,
                  memory: parseFloat(memoryMB.toFixed(2))
                });
              }
            } catch (parseError) {
              // Ignore partial JSON chunks
            }
          });
        } catch (streamError) {
          console.error("Could not attach stats stream");
        }
      });

      // 3. The 10-Second Timeout Safety Net
      const timeout = setTimeout(async () => {
        if (activeContainer) {
            try {
                await activeContainer.kill(); 
            } catch(e) {}
        }
        resolve({ error: "Execution Timed Out (Possible Infinite Loop)", metrics: performanceData });
      }, 10000);

      // NOTICE: The rogue `resolve()` that was down here is now completely gone!

    } catch (err) {
      console.error("Docker Execution Error:", err);
      resolve({ error: "Failed to execute code securely." });
    }
  });
}

module.exports = { executeCode };