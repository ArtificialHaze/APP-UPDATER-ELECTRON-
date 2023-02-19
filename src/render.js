document.addEventListener("DOMContentLoaded", () => {
  window.bridge.updateMessage(updateMessage);
});

function updateMessage(event, message) {
  let element = document.getElementById("message");
  element.innerHTML = message;
}
