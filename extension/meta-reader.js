browser.runtime.sendMessage({ op: "HELLO" }).catch(() => {
  /*
  The message wasn't received, but no problem.
  The extension popup was likely closed, which is the most common situation.
  This code serves one purpose, and that is to send the HELLO op when the
  extension asked to reload the page. This would then trigger a head fetch.
  TODO: tbh it might be better just to send the head immediately instead of doing HELLO ==>, <== GIMME_HEAD, resp: head ==>?
  */
});

browser.runtime.onMessage.addListener((message) => {
  const { op } = message;

  // TODO: we probably don't need any opcodes?
  switch (op) {
    case "GIMME_HEAD":
      return Promise.resolve(document.head.innerHTML);
  }
});
