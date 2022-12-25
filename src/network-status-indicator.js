import GPIO from "rpi-gpio";
import { once } from "lodash-es";
const gpiop = GPIO.promise;

const PIN_RED = 36;
const PIN_ORANGE = 38;
const PIN_GREEN = 40;

//Holds pin number by color
const PINS = {
  red: PIN_RED,
  orange: PIN_ORANGE,
  green: PIN_GREEN,
};

const BLINK_INTERVAL = 200; //in ms

/**
 * Holds value (true or false) which was last applied during blink cycle.
 */
let curBlinkValue;

//Holds setInterval() handle, for the last flash.
let blinkHandle;

const setup = once(async () => {
  await gpiop.setup(PIN_RED, gpiop.DIR_LOW);
  await gpiop.setup(PIN_ORANGE, gpiop.DIR_LOW);
  await gpiop.setup(PIN_GREEN, gpiop.DIR_LOW);
  console.info("networkd-status-indicator: setup done");
});

/**
 * Set on the specific pin
 * @param {int} pin
 * @returns Promise
 */
const on = async (pin) => {
  await gpiop.write(pin, true);
};

const off = async (pin) => {
  await gpiop.write(pin, false);
};

const setLEDStatus = async (color, blink) => {
  await setup();
  const pin = PINS[color];
  if (!pin) {
    throw new Error("Invalid color. No pin defined for this color");
  }

  //cancel any existing flash interval
  blinkHandle && clearInterval(blinkHandle);
  blinkHandle = undefined;

  //turn off all leds
  for (const colorName in PINS) {
    off(PINS[colorName]);
  }

  if (!blink) {
    on(pin);
    return;
  }

  curBlinkValue = false;
  blinkHandle = setInterval(async () => {
    curBlinkValue = !curBlinkValue;
    await gpiop.write(pin, curBlinkValue);
  }, BLINK_INTERVAL);
};

export const NetworkStatus = {
  NO_CONNECTION: 'NO_CONNECTION',
  NO_INTERNET: 'NO_INTERNET',
  CONNECTED: 'CONNECTED',
};

const networkStatusWiseColors = {
  NO_CONNECTION: "red",
  NO_INTERNET: "orange",
  CONNECTED: "green",
};

export const setStatus = async (networkStatus, pendingVideos) => {
  console.info(`network-status-indicator: changing status=${networkStatus}, pendingVideos=${pendingVideos}`);
  await setLEDStatus(networkStatusWiseColors[networkStatus], pendingVideos);
};
