import * as GpioManager from "./src/gpio-manager.js";

const conditions = [
  {
    status: GpioManager.NetworkStatus.NO_CONNECTION,
    vidoesPending: true,
  },
  {
    status: GpioManager.NetworkStatus.NO_CONNECTION,
    vidoesPending: false,
  },
  {
    status: GpioManager.NetworkStatus.NO_INTERNET,
    vidoesPending: true,
  },
  {
    status: GpioManager.NetworkStatus.NO_INTERNET,
    vidoesPending: false,
  },
  {
    status: GpioManager.NetworkStatus.CONNECTED,
    vidoesPending: true,
  },
  {
    status: GpioManager.NetworkStatus.CONNECTED,
    vidoesPending: false,
  },
];

let nextCondition = 0;

async function main() {
  setInterval(async () => {
    const condition = conditions[nextCondition];
    await GpioManager.setStatus(condition.status, condition.vidoesPending);
    console.log('condition applied', condition);
    nextCondition += 1;
    if (nextCondition >= 6) {
      nextCondition = 0;
    }
  }, 5000);

  // try {
  //   await GpioManager.setStatus(GpioManager.NetworkStatus.NO_CONNECTION, true);
  //   console.log("red blinking....");
  //   setTimeout(async () => {
  //     await GpioManager.setStatus(
  //       GpioManager.NetworkStatus.NO_CONNECTION,
  //       true
  //     );
  //     console.log("orange blinking....");
  //     setTimeout(async () => {
  //       await GpioManager.setStatus("green", true);
  //       console.log("green blinking....");
  //     }, 5000);
  //   }, 5000);
  // } catch (error) {
  //   console.error("main failed", error);
  // }

}

main();
