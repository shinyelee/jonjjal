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

// 클릭으로 선 그리기
function onClick(event) {
  // 클릭 이벤트가 일어나는 좌표
  ctx.lineTo(event.offsetX, event.offsetY);
  // 로 선 그리기
  ctx.stroke();
}

// 클릭 이벤트 리스너
canvas.addEventListener("click", onClick);
