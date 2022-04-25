chrome.runtime.sendMessage({ op: "HELLO" });

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
