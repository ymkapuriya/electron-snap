const ifconfig = require('wireless-tools/ifconfig');
const iw = require('wireless-tools/iw');
const wpa_supplicant = require('wireless-tools/wpa_supplicant');

class WirelessTools {

  /**
   * Get wireless iface if available
   * @returns Promise
   */
  static async getWirelessInterface() {
    return new Promise((resolve, reject) => {
      ifconfig.status(function (err, interfaces) {
        if (err) {
          return reject(err)
        }
        for (const iterator of interfaces) {
          if (iterator.interface.startsWith('wl')) {
            return resolve(iterator.interface)
          }
        }
        return reject("No wireless iface available")
      })
    })
  }

  /**
   * Get wireless networks available for specified iface
   * @param {string} iface 
   * @returns Promise
   */
  static async getWirelessNetworks(iface) {
    return new Promise((resolve, reject) => {
      iw.scan(iface, function (err, networks) {
        if (err) {
          return reject(err)
        }
        return resolve(networks)
      });
    })
  }

  /**
   * Join secure wireless network
   * @param {string} iface 
   * @param {string} ssid 
   * @param {string} password 
   * @returns Promise
   */
  static async joinSecureNetwork(iface, ssid, password) {
    return new Promise((resolve, reject) => {
      const options = {
        interface: iface,
        ssid: ssid,
        passphrase: password,
        driver: 'wext' //requires attention more details - https://linux.die.net/man/8/wpa_supplicant
      };
      console.log("Options", options);
      wpa_supplicant.enable(options, function (err) {
        if (err) {
          return reject(err)
        }
        return resolve("Connected")
      });
    })
  }

  static async main() {
    //find interfaces
    try {
      const iface = await this.getWirelessInterface()
      console.log("Interface ", iface);

      //search networks
      console.log("Searching for wireless networks...")
      try {
        const networks = await this.getWirelessNetworks(iface)
        console.log("Available Networks", networks)

        if (networks.length == 0) {
          console.log("No networks found")
          return;
        }

        //select best network
        const selected = networks[0]
        console.log("Selected", selected);

        //connect to secure network
        console.log(`Connecting to ${selected.ssid}...`)
        try {
          await this.joinSecureNetwork(iface, selected.ssid, "PASS1234")
          console.log(`Connected to ${selected.ssid}`)
        } catch (error) {
          console.error("Error in connection", error)
        }
      } catch (error) {
        console.error("Interface is down", error)
      }
    } catch (error) {
      console.error("Interface not available.", error)
    }
  }
}

module.exports = { WirelessTools }