// index.html의 canvas 태그
const canvas = document.querySelector("canvas");
// 캔버스에서 context는 브러쉬
const ctx = canvas.getContext("2d");

// 캔버스 좌표 설정
// 좌측 상단 기준으로 시작 (0, 0)
canvas.width = 800;
canvas.height = 800;

// arc -> 원 그릴 수 있음

// 머리
ctx.arc(400, 400, 100, Math.PI, 2 * Math.PI);
// 왼쪽 뿔
ctx.moveTo(320, 280);
ctx.lineTo(400, 390);
// 오른쪽 뿔
ctx.moveTo(480, 280);
ctx.lineTo(400, 390);
// 선 굵기 설정
ctx.lineWidth = 5;
// 선 및 채우기 색 설정
ctx.strokeStyle = "MediumSpringGreen";
ctx.fillStyle = "MediumSpringGreen";
// 머리 및 뿔 완성
ctx.stroke();
ctx.fill();

ctx.beginPath();

// 왼쪽 눈
ctx.arc(360, 350, 7.5, 0, 2 * Math.PI);
// 오른쪽 눈
ctx.arc(440, 350, 7.5, 0, 2 * Math.PI);
// 채우기 색 설정
ctx.fillStyle = "white";
// 눈 완성
ctx.fill();

// 안드로이드 로고 완성!
