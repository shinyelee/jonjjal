// index.html의 canvas
const canvas = document.querySelector("canvas");
// 캔버스에서 context는 브러쉬
const ctx = canvas.getContext("2d");
// index.html의 line-width(선 굵기)
const lineWidth = document.getElementById("line-width");
// index.html의 range-value(선 굵기를 숫자로 나타낸 값)
const rangeValue = document.getElementById("range-value");
// index.html의 setting-color(사용자 지정색)
const settingColor = document.getElementById("setting-color");
// index.html의 color-option(색 팔레트)들을 배열로 생성
const colorOptions = Array.from(
  document.getElementsByClassName("color-option")
);
// index.html의 mode-btn(모드 버튼)
const modeBtn = document.getElementById("mode-btn");
// index.html의 undo-btn(지우기 버튼)
const undoBtn = document.getElementById("undo-btn");
// index.html의 reset-btn(리셋 버튼)
const resetBtn = document.getElementById("reset-btn");
// index.html의 save-btn(저장 버튼)
const saveBtn = document.getElementById("save-btn");
// index.html의 file-input(파일 첨부)
const fileInput = document.getElementById("file-input");
// index.html의 font-size(폰트 사이즈)
const fontSize = document.getElementById("font-size");
// index.html의 font-style(폰트 유형)
const fontStyle = document.querySelector("#font-style");
// index.html의 text-input(텍스트 입력란)
const textInput = document.getElementById("text-input");

// 캔버스 크기를 상수로 설정 -> 나중에 캔버스 크기를 바꾸고 싶을 때 유지보수 용이
CANVAS_WIDTH = 800;
CANVAS_HEIGHT = 800;

// 캔버스 좌표 설정 -> 좌측 상단 기준으로 시작(0, 0)
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
// 선 굵기를 숫자로 나타낸 값
rangeValue.innerText = lineWidth.value;
// 선 굵기의 범위(값)
ctx.lineWidth = lineWidth.value;
// 선 끝 둥글게
ctx.lineCap = "round";

// isPainting이 true면 선 그리고 false면 안 그림
let isPainting = false;
// isFilling이 true면 캔버스 채우고 false면 안 채움
let isFilling = false;

// 캔버스에 그려진 선의 경로를 저장하는 배열
let restoreArray = [];
// 그려진 선이 하나도 없을 때 인덱스 기본값을 -1로 설정
let index = -1;

// 마우스 움직이는 중
function onMouseMove(event) {
  // 선 그림
  if (isPainting) {
    // 해당 좌표로 이동해 선 그리기를
    ctx.lineTo(event.offsetX, event.offsetY);
    // 수행
    ctx.stroke();
    // 종료
    return;
  }
  // 해당 좌표로 이동(선 안 그림)
  ctx.moveTo(event.offsetX, event.offsetY);
}

// 마우스 좌클릭 중
function startDrawing() {
  // 선 그림
  isPainting = true;
}

// 마우스 좌클릭 끝(버튼에서 손 뗌)
function stopDrawing() {
  // 안 그림
  isPainting = false;
  // 새 경로(path) 시작 -> 이미 그린 선의 굵기가 함께 바뀌는 것 방지
  ctx.beginPath();
  // mouseup 이벤트가 일어날 때만
  if (event.type == "mouseup") {
    // 그린 선을 배열에 저장하고
    restoreArray.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
    // 인덱스 값 +1
    index += 1;
    console.log(restoreArray);
  }
}

// 선 굵기 변경
function onLineWidthChange(event) {
  // line-width의 range를 받아와서 선 굵기로 설정
  ctx.lineWidth = event.target.value;
  // rangeValue.innerHTML = ctx.lineWidth;
}
// 선 굵기 변경을 위해
lineWidth.oninput = function () {
  // slider thumb을 움직일 때 바뀌는 값을 텍스트에 실시간으로 반영
  rangeValue.innerHTML = this.value;
};

// 사용자 지정색 설정하면
function onColorChange(event) {
  // 해당 색으로 선 색 변경
  ctx.strokeStyle = event.target.value;
  // 채우기 색도 변경
  ctx.fillStyle = event.target.value;
}

// 팔레트 클릭하면
function onColorClick(event) {
  // 선 색 변경
  ctx.strokeStyle = event.target.dataset.color;
  // 채우기 색 변경
  ctx.fillStyle = event.target.dataset.color;
  // 사용자 지정색 변경
  settingColor.value = event.target.dataset.color;
}

// 모드 버튼 클릭하면
function onModeClick() {
  // 채우기 모드일 때
  if (isFilling) {
    // 그리기 모드로 변경
    isFilling = false;
    // 버튼의 텍스트도 변경
    modeBtn.innerText = "그리기";
    // 그리기 모드일 때
  } else {
    // 채우기 모드로 변경
    isFilling = true;
    // 버튼의 텍스트도 변경
    modeBtn.innerText = "채우기";
  }
}

// 캔버스 클릭하면
function onCanvasClilck() {
  // 채우기 모드일 때
  if (isFilling) {
    // 캔버스를 선택한 색으로 채움
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
}

// 지우기 버튼 클릭하면
function onUndoClick() {
  // 인덱스 값이 0보다 작을 때(초기 상태)
  if (index <= 0) {
    // 캔버스 리셋
    onResetClick();
    // 선을 하나라도 그렸을 때
  } else {
    // 인덱스 값 -1하고
    index -= 1;
    // 배열에 마지막으로 저장된 선을 뺀
    restoreArray.pop();
    // 나머지 이미지 정보를 캔버스에 보여줌
    ctx.putImageData(restoreArray[index], 0, 0);
  }
}

// 리셋 버튼 클릭하면
function onResetClick() {
  // 색을 하얀색으로 변경
  ctx.fillStyle = "white";
  // 캔버스 채움 -> 캔버스 초기화
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // 선 경로 저장한 배열 비우고
  restoreArray = [];
  // 인덱스도 초기값으로 원복
  index = -1;
}

// 저장 버튼을 클릭하면
function onSaveClick() {
  // 현재 캔버스를 URL로 변환
  const url = canvas.toDataURL();
  // index.html에 a 태그(링크) 생성
  const a = document.createElement("a");
  // URL을 링크에 넣음
  a.href = url;
  // 링크에 download 속성 추가해 파일 이름 image.png로 설정
  a.download = "image.png";
  // 임의로 링크 클릭 -> 저장된 이미지(현재 캔버스) 다운로드
  a.click();
}

// 파일 첨부 클릭하면
function onFileChange(event) {
  // 자바스크립트를 이용해 (첫 번째)파일을 가져와
  const file = event.target.files[0];
  // 해당 파일의 브라우저(인터넷에 올라가지는 않음) 메모리 URL을 얻음
  const url = URL.createObjectURL(file);
  // document.createElement("img") 와 동일 <- index.html에 img 태그 생성
  const image = new Image();
  // 이미지의 소스 속성을 URL로 설정
  image.src = url;
  // 이미지 로드 끝나면 drawImage 호출
  image.onload = function () {
    // ctx.drawImage(첨부한 이미지, X좌표, Y좌표, 이미지 너비, 이미지 높이);
    ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // 기준점이 (0, 0) -> 이미지가 좌측 상단에 여백 없이 붙어서 출력
    // 이미지 너비 및 높이를 캔버스와 동일하게 설정 -> 이미지가 캔버스 전체를 채움
  };
}

// 텍스트 입력 후 캔버스 더블클릭하면
function onTextDoubleClick(event) {
  // 텍스트 입력란에 사용자가 입력한 텍스트 값 읽음
  const text = textInput.value;
  // 폰트 크기의 범위(값)
  const size = fontSize.value;
  // 폰트 목록에서 선택
  const style = fontStyle.value;
  // 텍스트 입력했을 때
  if (text !== null) {
    // 현재 브러쉬 상태 저장
    ctx.save();
    // 텍스트 크기 및 글꼴 설정
    ctx.font = `${size}px ${style}`;
    // ctx.fillText(입력한 텍스트, X좌표, Y좌표);
    ctx.fillText(text, event.offsetX, event.offsetY);
    // 브러쉬를 저장한 상태로 되돌림
    ctx.restore();
  }
}

// 폰트 크기 변경
function onFontSizeChange(event) {
  // font-size의 range를 받아와서 폰트 크기로 설정
  ctx.font = event.target.value;
}

// 캔버스 내 이벤트

// 커서 움직임 이벤트 리스너
canvas.addEventListener("mousemove", onMouseMove);
// 커서 좌클릭 및 드래그 이벤트 리스너
canvas.addEventListener("mousedown", startDrawing);
// 커서 좌클릭 및 드래그 종료 이벤트 리스너
canvas.addEventListener("mouseup", stopDrawing);
// 커서 화면 탈출 이벤트 리스너
canvas.addEventListener("mouseleave", stopDrawing);
// 커서 클릭(채움) 이벤트 리스너
canvas.addEventListener("click", onCanvasClilck);
// 더블클릭(텍스트 입력) 이벤트 리스너
canvas.addEventListener("dblclick", onTextDoubleClick);

// canvas.addEventListener("mousemove", onMouseMove); 는
// canvas.onmousemove = onMouseMove 와 거의 동일
// 다만, addEventListener 를 사용하는 게 유지보수 측면에서 더 용이
// (같은 이벤트 내에 많은 이벤트 리스너를 추가/삭제할 수 있기 때문)

// 도구모음 이벤트

// 모드 버튼 클릭(그리기/채우기 전환) 이벤트 리스너
modeBtn.addEventListener("click", onModeClick);
// 지우기 버튼 클릭(마지막 선 삭제) 이벤트 리스너
undoBtn.addEventListener("click", onUndoClick);
// 리셋 버튼 클릭(캔버스 초기화) 이벤트 리스너
resetBtn.addEventListener("click", onResetClick);
// 저장 버튼 클릭(현재 캔버스를 이미지 파일로 저장) 이벤트 리스너
saveBtn.addEventListener("click", onSaveClick);
// 팔레트 클릭(해당 색으로 변경) 이벤트 리스너
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

// 변경(사용자가 지정색) 이벤트 리스너
settingColor.addEventListener("change", onColorChange);
// 변경(선 굵기) 이벤트 리스너
lineWidth.addEventListener("change", onLineWidthChange);
// 변경(선 굵기) 이벤트 리스너
fontSize.addEventListener("change", onFontSizeChange);
// 변경(파일 첨부) 이벤트 리스너
fileInput.addEventListener("change", onFileChange);
