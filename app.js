const canvas = document.getElementById("jsCanvas"); // 캔버스
const ctx = canvas.getContext("2d"); // 콘텍스트
const colors = document.getElementsByClassName("jsColor"); // 색상
const range = document.getElementById("jsRange"); // 굵기
const mode = document.getElementById("jsMode"); // 그리기or채우기
const trash = document.getElementById("jsTrash"); // 리셋
const saveBtn = document.getElementById("jsSave"); // 저장
const FILL_ICON = `<i class="fas fa-fill-drip fa-2x"></i>`;
const PAINT_ICON = `<i class="fas fa-paint-brush fa-2x"></i>`;
const DEFAULT_COLOR = "#1c1c1c";

// 캔버스 크기 가져오기
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

// 초기값
ctx.strokeStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  // 우클릭 그리기or채우기 차단
  if (event.which != 1) {
    return false;
  } else {
    // 좌클릭 그리기or채우기 가능
    painting = true;
  }
}

// 그리기
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x, y);
  }
}

// 채우기
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// 모드: 그리기or채우기
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerHTML = FILL_ICON;
  } else {
    filling = true;
    mode.innerHTML = PAINT_ICON;
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

// 리셋
function handleTrashClick(event) {
  window.location.reload();
}

// 우클릭 저장 차단
function handleCM(event) {
  event.preventDefault();
}

// 저장
function handleSaveClick(event) {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); // 기본 상태
  canvas.addEventListener("mousedown", startPainting); // 클릭 중
  canvas.addEventListener("mouseup", stopPainting); // 클릭 끝
  canvas.addEventListener("mouseleave", stopPainting); // 캔버스 밖
  canvas.addEventListener("mousedown", handleCanvasClick); // 채우기
  canvas.addEventListener("contextmenu", handleCM); // 우클릭 저장 차단
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
  trash.addEventListener("click", handleTrashClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
