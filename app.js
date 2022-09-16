// index.html의 canvas 태그
const canvas = document.querySelector("canvas");
// 캔버스에서 context는 브러쉬
const ctx = canvas.getContext("2d");

// 캔버스 좌표 설정
// 좌측 상단 기준으로 시작 (0, 0)
canvas.width = 800;
canvas.height = 800;

// 사각형의
ctx.rect(100, 100, 100, 100);
// 테두리를 그리고
ctx.stroke();
// 채우기(기본 검정)
ctx.fill();

// 새 경로 시작
// -> 이미 그린 사각형과 그릴 사각형을 분리
// -> 스타일을 따로 지정할 수 있음
ctx.beginPath();
// 다시 사각형을 만들고
ctx.rect(200, 200, 100, 100);
// 채울 색 지정(빨강) 후
ctx.fillStyle = "red";
// 채워주면 됨
ctx.fill();

// -> 검정 사각형과 빨강 사각형이 그려짐
