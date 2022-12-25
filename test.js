import * as GpioManager from "./src/gpio-manager";

async function main() {
  try {
    await GpioManager.on(GpioManager.PIN_RED);
    await GpioManager.on(GpioManager.PIN_BLUE);
    await GpioManager.on(GpioManager.PIN_GREEN);
  } catch (error) {
    console.error("main falied", error);
  }
  // try {
  //   const profiles = await NetworkManager.getConnectionProfiles();
  //   console.log(profiles);
  // } catch (error) {
  //   console.error(object);
  // }
}

main();
