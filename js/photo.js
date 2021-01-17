// 사진
// 1. 사진은 로컬에 사진을 10개 정도 저장한 후 불러오도록 합니다.
// 2. 상단에 모든 사진 리스트가 나오며 가로 스크롤이 되어야 합니다.
// 3. 리스트에서 사진을 선택 하면 리스트에 Border등이 생겨 해당 사진이 선택되었다는 표시가 되어야합니다.
// 4. 선택된 사진은 아래에 표시되어야 하고, 가로 세로 중앙 정렬이며 화면에 딱 맞게 줄어들어야 합니다.

// localStorage 사진 불러오기
const listPhoto = getPhotosFromLocalStorage();

// 사진 그려주기
render(listPhoto);

function getPhotosFromLocalStorage(){
    const objArr = [{title:'red',content:'./img/red.jpg'}
    , {title:'orange',content:'./img/orange.jpg'}
    , {title:'yellow',content:'./img/yellow.jpg'}
    , {title:'lightgreen',content:'./img/lightgreen.jpg'}
    , {title:'green',content:'./img/green.jpg'}
    , {title:'lightblue',content:'./img/lightblue.jpg'}
    , {title:'blue',content:'./img/blue.jpg'}
    , {title:'deepblue',content:'./img/deepblue.jpg'}
    , {title:'deepred',content:'./img/deepred.jpg'}
    , {title:'purple',content:'./img/purple.jpg'}];

    localStorage.setItem('photos', JSON.stringify(objArr));

    return JSON.parse(localStorage.getItem('photos'));
}

function render(listPhoto){
    const listElement = document.querySelector('.swiper');
    for (let i = 0; i < listPhoto.length; i++) {
        const photo = listPhoto[i];
        const photoElement = document.createElement('li');
        photoElement.innerHTML = `<img src='${photo.content}' alt='${photo.title}' data-photo-id="${i}"/>`;
        listElement.append(photoElement);
    }

    document.querySelectorAll('img').forEach(element => {
        element.addEventListener('click', async event => {
            element.style.border='3px solid orange';
            try {
                const photoId = event.target.dataset.photoId;
                const photoData = JSON.parse(localStorage.getItem('photos'))[photoId];
                console.log(photoData);
                const selectedElement = document.getElementById('selectedPhoto');
                selectedElement.innerHTML = `<img src='${photoData.content}' alt='${photoData.title}' data-photo-id="${photoId}"/>`;
            } catch (error) {
                console.log(error);
            }
        });
      });
}