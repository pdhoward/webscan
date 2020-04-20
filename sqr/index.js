import Scanner from 'zbar.wasm';

const QRSCAN_WIDTH = 500;
const SCAN_PROID = 1200;

const etqLog = document.getElementById('taqLog');

const redrawCanvas = canvas => {
  const ctx = canvas.getContext('2d');
  const offsetX = (canvas.width - QRSCAN_WIDTH) / 2;
  const offsetY = (canvas.height - QRSCAN_WIDTH) / 2;
  ctx.strokeStyle = '#00FF00';
  ctx.lineWidth = 6;
  ctx.strokeRect(offsetX, offsetY, QRSCAN_WIDTH, QRSCAN_WIDTH);
}

const handleCanvasResize = () => {
  const canvas = document.getElementsByTagName('canvas')[0];
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;
  const origWidth = canvas.width;
  const origHeight = canvas.height;
  if (!origHeight || !origWidth || !newHeight || !newWidth) return;
  if (origWidth * (newHeight / origHeight) <= newWidth) {
    canvas.height = newHeight;
    canvas.width = origWidth * (newHeight / origHeight);
  } else {
    canvas.height = origHeight * (newWidth / origWidth);
    canvas.width = newWidth;
  }

  redrawCanvas(canvas);
  
  const video = document.getElementsByTagName('video')[0];
  video.height = canvas.height;
  video.width = canvas.width;
};

const initCanvas = () => {
  window.onresize = handleCanvasResize;
  const canvas = document.getElementsByTagName('canvas')[0];
  canvas.width = 600;
  canvas.height = 400;
  const ctx = canvas.getContext('2d');
  ctx.font = '48px serif';
  ctx.fillText('Loading...', 30, 300);
};

const main = async (param_1) => {
  initCanvas();
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: { facingMode: 'environment' }
    });
    const scanner = await Scanner({ locateFile: file => 'data/' + file });

    const video = document.getElementsByTagName('video')[0];
    video.srcObject = mediaStream;
    const canvas = document.getElementsByTagName('canvas')[0];
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      console.log('video init');
      handleCanvasResize();
    };
    video.play();

    const scan = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.width;
      canvas.height = video.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const offsetX = (canvas.width - QRSCAN_WIDTH) / 2;
      const offsetY = (canvas.height - QRSCAN_WIDTH) / 2;
      const scanImageData = ctx.getImageData(
        offsetX,
        offsetY,
        QRSCAN_WIDTH,
        QRSCAN_WIDTH
      );
      const scanRes = scanner.scanQrcode(
        scanImageData.data,
        QRSCAN_WIDTH,
        QRSCAN_WIDTH
      );

      if (scanRes.length) {
      location.href= scanRes;
      }
      setTimeout(scan, SCAN_PROID);
    };
    scan();
  } catch (err) {
    const h1 = document.createElement('h1');
    h1.style = 'position: absolute; top: 20px; left: 20px';
    h1.innerText = 'Cannot get cammera: ' + err;
    document.body.appendChild(h1);
    console.log(err);
  }
};
main();