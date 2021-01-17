// 알람
// 1. 우측 상단에 “NEW” 버튼이 있어야 합니다.
// 2. “NEW” 버튼 클릭시 바로 아래 입력창이 나와야 합니다.
// 3. 분은 10분 단위로 입력 받습니다.
// 4. 저장을 클릭하면 아래 리스트에 추가되고 입력창은 사라져야 합니다.
// 5. 알람 리스트에 “삭제” 클릭시 지워져야 합니다.
// 6. 알람 시간이 되면 alert 창으로 알람시간을 띄어주고 확인 클릭시 해당 알람은 삭제되어야 합니다.
// 7. 알람 리스트는 LocalStorage에 저장되며 브라우저 Reload 후에도 모두 그대로 나와야합니다.

// reload 시 마지막 설정 그대로 : 나의 알람리스트를 localStorage에서 가져오기
const listAlarm = getAlramsFromLocalStorage();
if(listAlarm !== null)
{
    render(listAlarm);
}

// NEW 버튼 클릭시 설정 창 노출
const btnNew = document.getElementById('new');
btnNew.addEventListener('click', newAlarm);

// 알람 시간일 때
function alarm(){
    alert('알람시간');
}

async function deleteBook(alarmId){
    let listAlarm = JSON.parse(localStorage.getItem('alarms'));
    listAlarm.splice(parseInt(alarmId)+1,1);
    localStorage.setItem('alarms', JSON.stringify(listAlarm));
}

function addLocalStorage(newAlarm)
{
    const listAlarm = getAlramsFromLocalStorage() || [];
    if(listAlarm !== null){
        listAlarm.push(newAlarm);
    }
    localStorage.setItem('alarms', JSON.stringify(listAlarm));
}

function render(listAlarm){
    const listElement = document.getElementById('listAlarm');
    for (let i = 0; i < listAlarm.length; i++) {
        const alarm = listAlarm[i];
        const alarmElement = document.createElement('div');
        alarmElement.innerHTML = `
        <p class="alarm-text">${alarm.mn} ${alarm.hour}시 ${alarm.minute}분</p>
        <button type="button" class="btn btn-delete" data-alarm-id="${i}">삭제</button>
        `;
        listElement.append(alarmElement);
    }

    document.querySelectorAll('.btn-delete').forEach(element => {
        element.addEventListener('click', async event => {
          const alarmId = event.target.dataset.alarmId;
          try {
            await deleteBook(alarmId);
            location.reload();
          } catch (error) {
            console.log(error);
          }
        });
      });
}

function saveAlarm(){
    const morningnightSelect = document.getElementById("morningnight");
    const hourSelect = document.getElementById("hour");
    const minuteSelect = document.getElementById("minute");

    const morningnightValue = morningnightSelect.options[morningnightSelect.selectedIndex].value;
    const hourValue = hourSelect.options[hourSelect.selectedIndex].value;
    const minuteValue = minuteSelect.options[minuteSelect.selectedIndex].value;

    const newAlarm = {
        'mn': morningnightValue,
        'hour' : hourValue,
        'minute' : minuteValue
    };

    // localStorage에 저장
    addLocalStorage(newAlarm);

    const updateListAlarm = getAlramsFromLocalStorage();
    render(updateListAlarm);

    const setAlarmElement = document.getElementById('setAlarm');
    setAlarmElement.style.display='none';

}

function newAlarm(){
    const setAlarmElement = document.getElementById('setAlarm');
    setAlarmElement.style.display='block';

    const btnSave = document.getElementById('btn-save');
    btnSave.addEventListener('click', saveAlarm);
}

function getAlramsFromLocalStorage(){
    return  JSON.parse(localStorage.getItem('alarms') || null);
}