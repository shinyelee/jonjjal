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
// index.html의 mode-btn
const modeBtn = document.getElementById("mode-btn");
// index.html의 reset-btn
const resetBtn = document.getElementById("reset-btn");
// index.html의 file-btn
const fileBtn = document.getElementById("file-btn");

// 캔버스 크기를 상수로 설정하면 나중에 캔버스 크기를 바꾸고 싶을 때 유지보수 용이함
CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 800;

// 캔버스 좌표 설정
// 좌측 상단 기준으로 시작 (0, 0)
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
// line-width의 range 값
ctx.lineWidth = lineWidth.value;

// true -> 선 그리기
// false -> 안 그리기
let isPainting = false;
// true -> 채우기
// false -> 안 채우기
let isFilling = false;

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
  // 선 긋기 끝나면 새 경로(path) 시작함
  // -> 이미 그려놓은 선까지 굵기가 함께 변경되는 것을 방지함
  ctx.beginPath();
}

// 선 굵기 변경
function onLineWidthChange(event) {
  // 사용자가 조정한 line-width의 range 값을 받아와서 선 굵기로 설정
  ctx.lineWidth = event.target.value;
}

// color를 클릭하면 사용자가 지정한 색으로
function onColorChange(event) {
  // 선 색 변경
  ctx.strokeStyle = event.target.value;
  // 채우기 색 변경
  ctx.fillStyle = colorValue;
}

// 팔레트를 클릭하면
function onColorClick(event) {
  const colorValue = event.target.dataset.color;
  // 선 색 변경
  ctx.strokeStyle = colorValue;
  // 채우기 색 변경
  ctx.fillStyle = colorValue;
  // color의 색도 변경
  color.value = colorValue;
}

// 모드 버튼을 클릭하면
function onModeClick() {
  // 이미 채우기 모드일 때
  if (isFilling) {
    // 그리기 모드로 바꿔줌
    isFilling = false;
    // 버튼의 텍스트는 반대로 "채우기"로 바꿔줌
    modeBtn.innerText = "채우기";
    // 그리기 모드일 때
  } else {
    // 채우기 모드로 바꿔줌
    isFilling = true;
    // 버튼의 텍스트는 반대로 "그리기"로 바꿔줌
    modeBtn.innerText = "그리기";
  }
}

// 캔버스를 클릭하면
function onCanvasClilck() {
  // 이미 채우기 모드일 때만
  if (isFilling) {
    // 캔버스를 선택한 색으로 채워줌
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

// 리셋 버튼을 클릭하면
function onResetClick() {
  // 색을 하얀색으로 바꾼 후
  ctx.fillStyle = "white";
  // 캔버스를 채워줌
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

// 이미지 파일 첨부 버튼을 클릭하면
function onFileChange(event) {
  // 자바스크립트를 이용해서 파일을 가져오고
  const file = event.target.files[0];
  // 해당 파일의 URL을 얻어옴
  const url = URL.createObjectURL(file);
  // 이미지 생성
  const image = new Image();
  // 이미지 소스
  image.src = url;
  // 불러옴
  image.onload = function () {
    // ctx.drawImage(이미지, X축 좌표, Y축 좌표, 이미지 너비, 이미지 높이);
    // 기준점이 (0, 0) -> 이미지가 좌측 상단에 여백 없이 붙어서 출력됨
    // 이미지 너비 및 높이를 캔버스와 동일하게 설정 -> 이미지가 캔버스 전체를 채움
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // file input을 비워줌
    fileBtn.value = null;
  };
}

// canvas.addEventListener("mousemove", onMouseMove); 는
// canvas.onmousemove = onMove 와 거의 같음
// 다만, addEventListener를 사용하는 게 유지보수 측면에서 더 용이함
// (같은 이벤트 내에 많은 이벤트 리스너를 추가/삭제할 수 있기 때문)

// 커서 움직임 이벤트 리스너
canvas.addEventListener("mousemove", onMouseMove);
// 커서 드래그 이벤트 리스너
canvas.addEventListener("mousedown", startDrawing);
// 커서 드래그 종료 이벤트 리스너
canvas.addEventListener("mouseup", stopDrawing);
// 커서 화면 탈출 이벤트 리스너
canvas.addEventListener("mouseleave", stopDrawing);

// 커서 클릭(채우기) 이벤트 리스너
canvas.addEventListener("click", onCanvasClilck);
// range(선 굵기) 변경 이벤트 리스너
lineWidth.addEventListener("change", onLineWidthChange);
// color(사용자가 지정한 색) 변경 이벤트 리스너
color.addEventListener("change", onColorChange);
// color-option(팔레트 색) 변경 이벤트 리스너
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
// mode-btn(모드 버튼)
modeBtn.addEventListener("click", onModeClick);
// reset-btn(리셋 버튼)
resetBtn.addEventListener("click", onResetClick);
// file-btn(이미지 파일 첨부 버튼)
fileBtn.addEventListener("change", onFileChange);
