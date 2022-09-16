// index.html의 canvas 태그
const canvas = document.querySelector("canvas");
// 캔버스에서 context는 브러쉬
const ctx = canvas.getContext("2d");

// 캔버스 좌표 설정
// 좌측 상단 기준으로 시작 (0, 0)
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(200, 200, 50, 200);
ctx.fillRect(400, 200, 50, 200);

// 선 굵기 설정
ctx.lineWidth = 2;
// 비워진 사각형(stroke+rect)
ctx.strokeRect(300, 300, 50, 100);
// 채워진 사각형(fill+rect)
ctx.fillRect(200, 200, 200, 20);

// 시작점 이동
ctx.moveTo(200, 200);
// 선 긋기 위한 좌표 찍고
ctx.lineTo(325, 100);
ctx.lineTo(450, 200);
// 채우기
ctx.fill();

// -> 집 완성
