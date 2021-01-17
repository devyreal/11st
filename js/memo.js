// 메모
// 1. 우측 상단에 “NEW” 버튼이 있어야 합니다.
// 2. “NEW” 버튼 클릭시 바로 아래 입력창이 나와야 합니다.
// 3. 메모는 input 태그를 사용하고 엔터키 입력시 저장되며 입력창은 사라져야합니다.
// 4. 메모 리스트에서는 2줄만 표시되어야 합니다.
// 5. 해당 메모 클릭시 모든 메모 내용이 나오도록 펼쳐져야 합니다.
// 6. 한번에 하나의 메모만 펼칠수 있도록 이전에 펼쳐진 메모는 다시 2줄만 표시되도록 합니다.
// 7. 모든 메모는 LocalStorage에 저장되며 브라우저 Reload 후에도 저장된 메모가 그대로 나와야합니다.

function addLocalStorage(newMemo)
{
  const listMemo = getMemosFromLocalStorage() || [];
  if(listMemo !== null){
    listMemo.push(newMemo);
  }
  localStorage.setItem('memos', JSON.stringify(listMemo));
}

function render(listMemo){
    const listElement = document.getElementById('listMemo');
    for (let i = 0; i < listMemo.length; i++) {
        const memo = listMemo[i];
        const memoElement = document.createElement('div');
        memoElement.innerHTML = `
        <p class="memo-text  data-memo-id="${i}">${memo}</p>
        `;
        listElement.append(memoElement);
    }

    document.querySelectorAll('.memo-text').forEach(element => {
        element.addEventListener('click', async event => {
          const memoId = event.target.dataset.memoId;
          try {
            await detailMemo(memoId);
          } catch (error) {
            console.log(error);
          }
        });
      });
}

function saveMemo(){
    const inputElement = document.getElementById('memo');
    const inputValue = inputElement.value;
    addLocalStorage(inputValue);

    const setMemoElement = document.getElementById('setMemo');
    setMemoElement.style.display='none';

    const updateListMemo = getMemosFromLocalStorage();
    render(updateListMemo);
}

function newMemo(){
    const setMemoElement = document.getElementById('setMemo');
    setMemoElement.style.display='block';

    if(document.getElementById('memo').value !== null) document.getElementById('memo').value = null;
}

function getMemosFromLocalStorage(){
    return  JSON.parse(localStorage.getItem('memos') || null);

}

// NEW 버튼 클릭시 설정 창 노출
const btnNew = document.getElementById('new');
btnNew.addEventListener('click', newMemo);

(function(){
  const listMemo = getMemosFromLocalStorage();

  render(listMemo);
})()