const URL = "ws://" + location.host + "/browsermon";
const RETRY_TIMEOUT = 500;

let previouslyConnected = false;

window.addEventListener("load", () => {
  createWS();
});

function createWS() {
  const ws = new WebSocket(URL);
  ws.onopen = () => {
    if (previouslyConnected) {
      // reload the page if was previously connected
      window.location.reload();
    }
    // a successful connection was established
    previouslyConnected = true;
  };
  ws.onclose = () => {
    setTimeout(() => {
      // attempt reconnect after timeout
      createWS();
    }, RETRY_TIMEOUT);
  };

  ws.addEventListener("message", (event) => {
    if (event.data === "reload") window.location.reload();
  });
}
