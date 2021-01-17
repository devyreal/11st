// 홈
// 1. 상단에 날짜와 시간이 표시되어야 합니다.(모든 화면에서 표시되어야함)
// 2. 아래 3개의 앱이 표시되어야 합니다.
// 3. 앱은 Drag & Drop 으로 서로 위치를 이동할 수 있어야 합니다.(핸드폰에서 앱 위치 바꾸는 동작과 같습니다.)
// 4. 위치는 Local Storage에 저장되어 브라우저 Reload 후에도 바뀐 위치로 나와야 합니다.
// 5. 각 앱 선택시 해당 앱 화면으로 바뀌어야합니다.

function init(){
    const appAlarmElement = document.getElementById('app-alarm');
    const appMemoElement = document.getElementById('app-memo');
    const appPhotoElement = document.getElementById('app-photo');

    // localStorage 좌표 불러오기
    const alarmOffset = JSON.parse(localStorage.getItem('app-alarm'));
    const memoOffset = JSON.parse(localStorage.getItem('app-memo'));
    const photoOffset = JSON.parse(localStorage.getItem('app-photo'));

    if(alarmOffset !== null){
        appAlarmElement.style.top = alarmOffset.top;
        appAlarmElement.style.left = alarmOffset.left;
    } 
    if(memoOffset !== null){
        appMemoElement.style.top = memoOffset.top;
        appMemoElement.style.left = memoOffset.left;
    } 
    if(photoOffset !== null){
        appPhotoElement.style.top = photoOffset.top;
        appPhotoElement.style.left = photoOffset.left;
    } 
}

function main(){
    // 상단 - 날짜와 시간표시
    const date = new Date();
    const dateElement = document.getElementById('date');
    dateElement.innerText = date.getFullYear() +'년 '+ date.getMonth() + 1 +'월 '
                            + date.getDate() +'일 '+ date.getHours() +'시 '
                            + date.getMinutes() +'분'+ date.getSeconds() +'초';

    init();

    // Drag & Drop 
    const container = document.querySelector('.apps');
    const appElement = document.querySelector('.app');
    let dragging = false;
    let offset = {x:0, y:0};
    let current = null;
    let left = container.offsetLeft;
    let top = container.offsetTop;

    container.onmousedown = function(e){
        if(e.target.classList.contains('app')){
            dragging = true;
            current = e.target;
            offset.x = e.offsetX;
            offset.y = e.offsetY;
        }
    };

    container.onmousemove = function(e){
        if(!dragging) return;
       
        let x = e.pageX-offset.x-left;
        let y = e.pageY-offset.y-top;

        current.style.left = e.pageX-offset.x+'px';
        current.style.top = e.pageY-offset.y+'px';
    }

    container.onmouseup = function(e){
        dragging = false;

        if(e.target.id !==''){
            const position = {
                'left': current.style.left,
                'top': current.style.top
            }
            localStorage.setItem(e.target.id, JSON.stringify(position));
        }
    };
}
document.addEventListener('DOMContentLoaded', main);