const { NetworkManager } = require("./src/NetworkManager")
const { GpioManager } = require("./src/GpioManager")

const PIN_RED = 36
const PIN_GREEN = 38
const PIN_BLUE = 40

async function main() {
  console.log(GpioManager);
  try {
    await GpioManager.on(12)
  } catch (error) {
    console.error(error)
  }
  // try {
  //   const profiles = await NetworkManager.getConnectionProfiles();
  //   console.log(profiles);
  // } catch (error) {
  //   console.error(object);
  // }
}

main();
