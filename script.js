const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d");
const urlInput = document.getElementById("url");
const goBtn = document.getElementById("go");

const WS_URL = (location.protocol === "https:" ? "wss://" : "ws://") + location.hostname + ":8080";
const ws = new WebSocket(WS_URL);
ws.binaryType = "arraybuffer";

ws.onmessage = event => {
  const blob = new Blob([event.data], { type: "image/jpeg" });
  const img = new Image();
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
  };
  img.src = URL.createObjectURL(blob);
};

goBtn.onclick = () => {
  const url = urlInput.value.trim();
  if (!url) return;
  ws.send(JSON.stringify({ type: "navigate", url }));
};