import GPIO from "rpi-gpio";
const gpiop = GPIO.promise;

export const PIN_RED = 36;
export const PIN_GREEN = 38;
export const PIN_BLUE = 40;

// blinkFlag: true;
// blinkInterval: null;

setup = async () => {
  await gpiop.setup(PIN_RED, gpiop.DIR_LOW);
  await gpiop.setup(PIN_GREEN, gpiop.DIR_LOW);
  await gpiop.setup(PIN_BLUE, gpiop.DIR_LOW);
  console.log("setup: done");
};

/**
 * Set on the specific pin
 * @param {int} pin
 * @returns Promise
 */
export const on = async (pin) => {
  await gpiop.write(pin, true);
  console.log(`on: done. pin=${pin}`);
};

export const off = async (pin) => {
  await gpiop.write(pin, false);
  console.log(`off: done. pin=${pin}`);
};

// /**
// * Toggle on/off status on specific pin
// * @param {int} pin
// * @param {boolean} flag
// * @returns Promise
// */
// onOff(pin, flag) {
//   return new Promise(async function (resolve, reject) {
//     try {
//       //setup
//       await gpiop.setup(pin, gpiop.DIR_HIGH)
//       try {
//         //write
//         await gpiop.write(pin, flag)
//         resolve(true)
//       } catch (error) {
//         console.error("GpioManager : ", error)
//         reject("Write failed.")
//       }
//     } catch (error) {
//       console.error("GpioManager : ", error)
//       reject("Setup failed.")
//     }
//   })
// },

// /**
//  * Flash LED for specified color and behaviour
//  *
//  * @param {string} color
//  * @param {boolean} isBlink
//  * @returns
//  */
// flash(color, isBlink) {
//   return new Promise(async function (resolve, reject) {
//     let pinOn;
//     let pinsOff;
//     switch (color) {
//       case "RED":
//         pinOn = this.PIN_RED
//         pinsOff = [this.PIN_GREEN, this.PIN_BLUE]
//         break;
//       case 'GREEN':
//         pinOn = this.PIN_GREEN
//         pinsOff = [this.PIN_RED, this.PIN_BLUE]
//         break;
//       case "BLUE":
//         pinOn = this.PIN_BLUE
//         pinsOff = [this.PIN_RED, this.PIN_GREEN]
//         break;
//     }
//     console.log("On : ", pinOn);
//     console.log("Off : ", pinsOff);

//     //off pins
//     try {
//       for (const pin of pinsOff) {
//         await this.off(pin)
//       }
//     } catch (error) {
//       console.error("GpioManager : ", error)
//       reject("Error in Pin operation.")
//     }

//     try {
//       if (isBlink) {
//         //on and off with delay
//         this.blinkFlag = false;
//         this.blinkInterval = setInterval(() => {
//           console.log("Blinking", this.blinkFlag);
//           this.blink(pinOn, this.blinkFlag)
//           this.blinkFlag = !this.blinkFlag
//         }, 1000);
//       } else {
//         //steady on
//         this.on(pinOn)
//       }
//     } catch (error) {
//       console.error("GpioManager : ", error)
//       reject("Error in Pin operation.")
//     }
//   })
// }

setup();
