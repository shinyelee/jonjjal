const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");

// 직접 값 설정 -> 캔버스 크기를 가져오기
// canvas.height = 700;
// canvas.width = 700;
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.strokeStyle = "#1c1c1c";
ctx.lineWidth = 2.5;

let painting = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    // 클릭X -> 대기
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    // 클릭O -> 실제 선 그림
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
}

if (canvas) {
  // 캔버스 기준 마우스 위치가
  canvas.addEventListener("mousemove", onMouseMove); // 캔버스 안
  canvas.addEventListener("mousedown", startPainting); // 클릭 중
  canvas.addEventListener("mouseup", stopPainting); // 클릭 끝
  canvas.addEventListener("mouseleave", stopPainting); // 캔버스 밖
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
