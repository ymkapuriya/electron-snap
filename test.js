import * as NetworkStatusIndicator from "./src/network-status-indicator.js";

const conditions = [
  {
    status: NetworkStatusIndicator.NetworkStatus.NO_CONNECTION,
    vidoesPending: true,
  },
  {
    status: NetworkStatusIndicator.NetworkStatus.NO_CONNECTION,
    vidoesPending: false,
  },
  {
    status: NetworkStatusIndicator.NetworkStatus.NO_INTERNET,
    vidoesPending: true,
  },
  {
    status: NetworkStatusIndicator.NetworkStatus.NO_INTERNET,
    vidoesPending: false,
  },
  {
    status: NetworkStatusIndicator.NetworkStatus.CONNECTED,
    vidoesPending: true,
  },
  {
    status: NetworkStatusIndicator.NetworkStatus.CONNECTED,
    vidoesPending: false,
  },
];

let nextCondition = 0;

async function main() {
  setInterval(async () => {
    const condition = conditions[nextCondition];
    await NetworkStatusIndicator.setStatus(condition.status, condition.vidoesPending);
    console.log('condition applied', condition);
    nextCondition += 1;
    if (nextCondition >= 6) {
      nextCondition = 0;
    }
  }, 5000);
}

main();
