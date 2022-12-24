const wpa_cli = require('wireless-tools/wpa_cli');
const { promisify } = require('util')


const wpa_cli2 = {
  add_network: promisify(wpa_cli.add_network).bind(wpa_cli),
  set_network: promisify(wpa_cli.set_network).bind(wpa_cli),
  select_network: promisify(wpa_cli.select_network).bind(wpa_cli),
  enable_network: promisify(wpa_cli.enable_network).bind(wpa_cli),
  status: promisify(wpa_cli.status).bind(wpa_cli),
  save_config: promisify(wpa_cli.save_config).bind(wpa_cli),
  list_networks: promisify(wpa_cli.list_networks).bind(wpa_cli)
};

const Wifi = async (iface) => {
  console.log('list networks');
  const networks = await wpa_cli2.list_networks(iface);
  console.log('networks', networks);
  return;
  console.log('adding network...');
  const response = await wpa_cli2.add_network(iface);
  const networkId = response.result;
  console.log('networkId=', networkId);
  console.log('set ssid');
  await wpa_cli2.set_network(iface, networkId, 'ssid', `'"asvn"'`);
  console.log('set psk');
  await wpa_cli2.set_network(iface, networkId, 'psk', `'"asvn1910"'`);
  console.log('select network');
  await wpa_cli2.select_network(iface, networkId);
  const handle = setInterval(async () => {
    const response = await wpa_cli2.status(iface);
    if (response.wpa_state === 'COMPLETED') {
      console.log('connected succesfully.');
      clearInterval(handle);
      console.log('enable network all');
      await wpa_cli2.enable_network(iface, 'all');
      console.log('save config');
      await wpa_cli2.save_config(iface);
      return;
    }
    console.log('not yet connected.');
  }, 1000);
  // setTimeout(async () => {

  // }, 1000);
}

module.exports = { Wifi }