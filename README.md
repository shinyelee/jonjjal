# 존짤 Jonjjal

> 그림판 기능의 웹 프로젝트

![jonjjal_cover](https://user-images.githubusercontent.com/68595933/192089225-b959cf45-1454-42bc-84e5-37e7018380c9.png)

## 시작

- 좋은 짤(meme)을 만들 수 있는 그림판 웹 프로젝트입니다.
- [데모 사이트 바로가기][데모]

---

## 개발

### 기간

- 22.09.16. ~ 22.09.24.

### 목표

- Canvas API로 주요 기능을 구현합니다.

### 사용

- HTML5/CSS3
- JavaScript ES6

---

## 기능

### 1. 색상 선택

![palette](https://user-images.githubusercontent.com/68595933/192098915-abab450f-6ed3-4ee0-ad6f-6b78f4d31dc0.png)

- 팔레트 위 색 또는 사용자 지정색(input type="color")을 이용해 색을 고릅니다.

```javascript
// app.js

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
```

### 2. 선 굵기 선택

![brush](https://user-images.githubusercontent.com/68595933/192099441-46055ca1-6b8c-41bb-9fdf-3fdbf8e93b7e.png)

- 슬라이더(input type="range")를 이용해 선 굵기를 조절합니다.
- 슬라이더 하단의 텍스트가 현재 브러시의 굵기를 알려줍니다(22.09.23. 업데이트).

```javascript
// app.js

// 선 굵기를 숫자로 나타낸 값
rangeValue.innerText = lineWidth.value;

// 선 굵기의 범위(값)
ctx.lineWidth = lineWidth.value;

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
```

### 3. 그리기/채우기 모드 변경

![mode](https://user-images.githubusercontent.com/68595933/192101108-3caad06b-4a8a-4466-9ae5-52785a908bd3.png)

- 모드 버튼을 클릭해 그리기 또는 채우기 모드로 전환합니다.
- 그리기 모드일 때는 채우기 모드로, 채우기 모드일 때는 그리기 모드로 바뀝니다.

```javascript
// app.js

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
    
    // console.log(restoreArray);
    
  }
  
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
```

### 4. 지우기와 리셋

![undo](https://user-images.githubusercontent.com/68595933/192101356-c625b290-51b1-40d7-ba0e-e1186c97f3c1.png)

- 4.1. 지우기 버튼을 클릭하면 맨 마지막에 그린 선부터 역순으로 한 획을 지웁니다(22.09.22. ).
- 4.2. 리셋 버튼을 클릭하면 캔버스가 초기화됩니다.

```javascript
// app.js

// 캔버스에 그려진 선의 경로를 저장하는 배열
let restoreArray = [];

// 그려진 선이 하나도 없을 때 인덱스 기본값을 -1로 설정
let index = -1;

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
```

### 5. 파일 첨부

![file](https://user-images.githubusercontent.com/68595933/192100981-e55ddd9c-2421-48fe-a3f7-44eade50c9f4.png)

- 파일 첨부 버튼을 클릭해 이미지를 캔버스에 불러옵니다.

```javascript
// app.js

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
```

### 6. 텍스트 삽입

![text](https://user-images.githubusercontent.com/68595933/192100915-f064828a-62d7-44ec-b1f1-05ac556f2426.png)

- 텍스트 입력란에 원하는 문구를 입력 후 캔버스 위에서 더블클릭을 하면 해당 위치에 텍스트가 삽입됩니다.
- 폰트 크기와 폰트 유형을 선택할 수 있습니다(22.09.23. 업데이트).

```html
<!-- index.html -->

    <div class="font-option">

      <!-- 폰트 크기 - 최솟값5, 최댓값100, 기본값20 -->
      <input
        id="font-size"
        type="number"
        placeholder="글자 크기"
        min="1"
        max="100"
        value="20"
      />
      
      <!-- 폰트 유형 - 기본값 serif -->
      <select id="font-style">
        <option selected>serif</option>
        <option>sans-serif</option>
        <option>monospace</option>
        <option>cursive</option>
        <option>fantasy</option>
        <option>system-ui</option>
      </select>
      
    </div>
```

```javascript
// app.js

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
```

### 7. 저장

![save](https://user-images.githubusercontent.com/68595933/192104478-dcd57e26-e98e-4e11-85e8-549427d4633f.png)

- 저장 버튼을 클릭해 현재 캔버스를 image.png로 저장합니다.

```javascript
// app.js

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
```

---

## 피드백

### 문제점

1. 브러시 굵기를 슬라이더로만 구현해 정확한 수치를 알기 어려움.
2. 캔버스 전체 리셋만 존재해 단순 클릭 실수로 이뤄진 작업을 되돌릴 수 없음.
3. 텍스트 관련 기능이 부족함.

### 개선점

1. 슬라이더와 연동돼 굵기 변화를 실시간으로 확인할 수 있는 텍스트 추가(22.09.23. 업데이트).
2. 클릭 이벤트 하나 단위로 작업 취소 가능하도록 지우기 기능 추가(22.09.22. 업데이트).
3. 폰트 크기 및 폰트 유형 변경 기능 추가(22.09.23. 업데이트).

---

## 저작권

이 프로젝트는 MIT 라이센스에 따라 라이센스가 부여됩니다. 자세한 내용은 [LICENSE.md](LICENSE.md) 파일을 참조하십시오.

---

## 레퍼런스

- [참고 유튜브 바로가기][참고]

<!-- 링크 -->

[데모]: https://shinyelee.github.io/jonjjal/
[참고]: https://www.youtube.com/watch?v=dtkf5xlQ4LE
