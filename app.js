const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const trash = document.getElementById("jsTrash");

const FILL_ICON = `<i class="fas fa-fill-drip fa-2x"></i>`;
const PAINT_ICON = `<i class="fas fa-paint-brush fa-2x"></i>`;
const COLOR_BLACK = "#1c1c1c";

// 직접 값 설정 -> 캔버스 크기를 가져오기
// canvas.height = 700;
// canvas.width = 700;
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// 초기값
ctx.strokeStyle = COLOR_BLACK;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

// 그리기
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

// 색상 변경
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// 굵기 변경
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

// 그리기or채우기
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerHTML = FILL_ICON;
  } else {
    filling = true;
    mode.innerHTML = PAINT_ICON;
  }
}

// 리셋
function trashClick(event) {
  window.location.reload();
}

// 채우기
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

if (canvas) {
  // 캔버스 기준 마우스 위치가
  canvas.addEventListener("mousemove", onMouseMove); // 캔버스 안
  canvas.addEventListener("mousedown", startPainting); // 클릭 중
  canvas.addEventListener("mouseup", stopPainting); // 클릭 끝
  canvas.addEventListener("mouseleave", stopPainting); // 캔버스 밖
  canvas.addEventListener("click", handleCanvasClick);
}

// 조작
Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (trash) {
  trash.addEventListener("click", trashClick);
}
