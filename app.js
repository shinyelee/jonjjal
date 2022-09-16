// index.html의 canvas 태그
const canvas = document.querySelector("canvas");
// 캔버스에서 context는 브러쉬
const ctx = canvas.getContext("2d");

// 캔버스 좌표 설정
// 좌측 상단 기준으로 시작 (0, 0)
canvas.width = 800;
canvas.height = 800;

// 브러쉬 시작점을 (50, 50)으로 이동
ctx.moveTo(50, 50);
// 선 그리기 위해 좌표 찍음
ctx.lineTo(150, 50);
ctx.lineTo(150, 150);
ctx.lineTo(50, 150);
ctx.lineTo(50, 50);
// 선으로 연결
ctx.stroke();
// 채우기
// ctx.fill();

// -> 사각형 완성
