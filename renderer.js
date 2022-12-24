/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

// function sayHi() {
//   window.API.toMain('Hi from the renderer process!')
// }
// const button = document.getElementById('send');
// button.addEventListener('click', sayHi);

/*
document.getElementById('scan-networks')
  .addEventListener('click', async () => {
    const iface = await window.API.scanNetworks()
    console.log("Renderer", iface)
    document.getElementById('interface').innerText = iface
  })

document.getElementById('list-networks')
  .addEventListener('click', async () => {
    const iface = document.getElementById('selected-interface').value
    console.log(iface);
    const networks = await window.API.listNetworks(iface)
    console.log("Renderer", networks)
    // document.getElementById('networks').innerText = iface
  })
  */

//run command
document.getElementById('run-command')
  .addEventListener('click', async function () {
    const command = document.getElementById('command').value
    console.log("Begin : ", command);
    await window.API.runCommand(command)
    console.log("Done : ############");
  })
