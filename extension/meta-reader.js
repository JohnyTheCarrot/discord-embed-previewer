(async () => {
  try {
    await chrome.runtime.sendMessage({ op: "HELLO" });
  } catch (e) {}
})();

function gimmeHead(sendResponse) {
  sendResponse(document.head.innerHTML);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { op } = message;

  switch (op) {
    case "GIMME_HEAD":
      gimmeHead(sendResponse);
      break;
  }
});
