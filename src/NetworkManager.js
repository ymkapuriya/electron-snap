
const network = require("node-network-manager")

const NetworkManager = {

  /**
   * List in-memory and on-disk connection profiles 
   * @param {boolean} active Flag to get only active profiles 
   * @returns Promise
   */
  async getConnectionProfiles(active) {
    return new Promise((resolve, reject) => {
      network
        .getConnectionProfilesList(active)
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    })
  }
}

module.exports = { NetworkManager }