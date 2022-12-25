import * as GpioManager from "./src/gpio-manager.js";

async function main() {
  try {
    await GpioManager.setup();
    // await GpioManager.on(GpioManager.PIN_RED);
    // await GpioManager.on(GpioManager.PIN_BLUE);
    // await GpioManager.on(GpioManager.PIN_GREEN);
    await GpioManager.setStatus('red', true);
    console.log('red blinking....');
    setTimeout(async ()=> {
      await GpioManager.setStatus('orange', true);
      console.log('orange blinking....');
      setTimeout(async () => {
        await GpioManager.setStatus('green', true);
        console.log('green blinking....');
      });
    });
  } catch (error) {
    console.error("main failed", error);
  }
  // try {
  //   const profiles = await NetworkManager.getConnectionProfiles();
  //   console.log(profiles);
  // } catch (error) {
  //   console.error(object);
  // }
}

main();
