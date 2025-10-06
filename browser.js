const { chromium } = require("playwright");

async function launchBrowser(ws) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://example.com");

  ws.on("message", async msg => {
    try {
      const data = JSON.parse(msg);
      if (data.type === "navigate" && data.url) {
        await page.goto(data.url);
      }
    } catch (e) {
      console.log("Invalid message", e.message);
    }
  });

  const sendFrame = async () => {
    if (ws.readyState !== ws.OPEN) return;
    const screenshot = await page.screenshot({ type: "jpeg", quality: 60 });
    ws.send(screenshot);
  };

  const interval = setInterval(sendFrame, 1000);

  ws.on("close", async () => {
    clearInterval(interval);
    await browser.close();
  });
}

module.exports = { launchBrowser };