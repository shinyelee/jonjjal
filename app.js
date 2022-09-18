// index.html의 canvas
const canvas = document.querySelector("canvas");
// 캔버스에서 context는 브러쉬
const ctx = canvas.getContext("2d");
// index.html의 line-width
const lineWidth = document.getElementById("line-width");
// index.html의 color
const color = document.getElementById("color");
// index.html의 color-options를 배열로 생성
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);

// 캔버스 좌표 설정
// 좌측 상단 기준으로 시작 (0, 0)
canvas.width = 800;
canvas.height = 800;
// line-width의 range 값
ctx.lineWidth = lineWidth.value;
// true -> 선 그리기
// false -> 안 그리기
let isPainting = false;

// 마우스 움직이는 중
function onMouseMove(event) {
  // 선 그리기 가능한 상태
  if (isPainting) {
    // 해당 좌표로 선 그리기
    ctx.lineTo(event.offsetX, event.offsetY);
    // 실행
    ctx.stroke();
    // 종료
    return;
  }
  // 선 긋기 끝나면 새 경로(path) 시작함
  // -> 이미 그려놓은 선까지 굵기가 함께 변경되는 것을 방지함
  ctx.beginPath();
  // 해당 좌표로 이동하기
  ctx.moveTo(event.offsetX, event.offsetY);
}

// 마우스 좌클릭 중에는
function startDrawing() {
  // 선 그릴 수 있음
  isPainting = true;
}

// 마우스 좌클릭에서 손 떼면
function stopDrawing() {
  // 안 그림
  isPainting = false;
}

// 선 굵기 변경
function onLineWidthChange(event) {
  // 사용자가 조정한 line-width의 range 값을 받아와서 선 굵기로 설정
  ctx.lineWidth = event.target.value;
}

// 사용자가 지정한 색으로
function onColorChange(event) {
  // 선 색 변경
  ctx.strokeStyle = event.target.value;
}

// 팔레트 색으로
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  // 선 색 변경
  ctx.strokeStyle = colorValue;
  // 사용자 지정색 변경
  color.value = colorValue;
}

// 커서 움직임 이벤트 리스너
canvas.addEventListener("mousemove", onMouseMove);
// 커서 드래그 이벤트 리스너
canvas.addEventListener("mousedown", startDrawing);
// 커서 드래그 종료 이벤트 리스너
canvas.addEventListener("mouseup", stopDrawing);
// 커서 화면 탈출 이벤트 리스너
canvas.addEventListener("mouseleave", stopDrawing);

// range(선 굵기) 변경 이벤트 리스너
lineWidth.addEventListener("change", onLineWidthChange);
// color(사용자가 지정한 색) 변경 이벤트 리스너
color.addEventListener("change", onColorChange);
// color-option(팔레트 색) 변경 이벤트 리스너
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
