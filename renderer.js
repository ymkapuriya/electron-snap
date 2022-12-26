/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

async function sayHi() {
  const response = await window.API.sayHi('Hi from the renderer process!')
  console.log(`Renderer : ${response} from the main process!`);
}
document.getElementById('say-hi')
  .addEventListener('click', sayHi);

//run command
document.getElementById('run-command')
  .addEventListener('click', async function () {
    const command = document.getElementById('command').value
    console.log("Begin : ", command);
    await window.API.runCommand(command)
    console.log("Done : ############");
  })
