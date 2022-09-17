// index.html의 canvas 태그
const canvas = document.querySelector("canvas");
// 캔버스에서 context는 브러쉬
const ctx = canvas.getContext("2d");

// 캔버스 좌표 설정
// 좌측 상단 기준으로 시작 (0, 0)
canvas.width = 800;
canvas.height = 800;
// 선 굵기
ctx.lineWidth = 2;
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

// 커서 움직임 이벤트 리스너
canvas.addEventListener("mousemove", onMouseMove);
// 커서 드래그 이벤트 리스너
canvas.addEventListener("mousedown", startDrawing);
// 커서 드래그 종료 이벤트 리스너
canvas.addEventListener("mouseup", stopDrawing);
// 커서 화면 탈출 이벤트 리스너
canvas.addEventListener("mouseleave", stopDrawing);
