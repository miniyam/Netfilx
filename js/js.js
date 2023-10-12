
// 문제점 : 삭제 추가 등으로 id 값이 꼬임 - 
// 해결방안 : id를 고유한 값으로 바꿈

const items = document.querySelector('.items')
const input = document.querySelector('.footer_input')
const addBtn = document.querySelector('.footer_addBtn')
// let id = 0;      id가 겹치게 만들어 버림
let shoppingLists = []; // 입력할 내용을 넣을 배열 선언


const save = () => { 
  localStorage.setItem('shopList', JSON.stringify(shoppingLists))
}

const init = () => { 
    const userList = JSON.parse(localStorage.getItem('shopList'));

    if(userList) {
      userList.forEach(obj => {
        createItem(obj);
        shoppingLists = userList;
      });
     
    }
  }
    init();


  const onAdd = () => {
    const list = {     // id,text를 포함하는 오브젝트를 생성
      id:Date.now(),   // UTC(컴퓨터상의 기준시간) 시간부터 현재까지 몇 초 지났는지 알아오는 메소드 -id이용
      text:input.value
    }
    
    if(list.text == ''){    
        input.focus();
        return; 
      }

    shoppingLists.push(list); // 인자에 오브젝트를 넣어 줌
    save()  //배열  shoppingLists 저장하는 함수 실행

    createItem(list);
    input.value ='';
    input.focus();

    console.log('shoppingLists-',shoppingLists);
    }



  function createItem(list){
      const itemRow = document.createElement('li')
      itemRow.className = 'item_row';
      itemRow.setAttribute('data-id',list.id)


      itemRow.innerHTML = `
        <div class="item">
        <span class="item_name">${list.text}</span>
      
          <button class="item_delBtn">
          <data-id=$ class="fa-solid fa-circle-minus"data-id=${list.id} ></i>
          </button>
        </div>
        <div class="item_div"></div>
      `  // id로 설정한 것이므로 data-id로 기입하게 됨
      
      items.append(itemRow); // onadd 함수에 있던 것을 옮김
      itemRow.scrollIntoView();
      return itemRow
    }

  addBtn.addEventListener('click', onAdd)

  //엔터를 쳤을 때도 입력이 되게 
  input.addEventListener('keypress', event => {
    event.key === 'Enter'&& onAdd();
    })


items.addEventListener('click', e =>{
  const clickId = e.target.dataset.id;
  console.log('클릭한 쓰레기통의 ID는?',clickId);
  if(clickId) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${clickId}"]`);
    toBeDeleted.remove(); // 지우는 명령 

    //localStorage 삭제 - fillter이용
    shoppingLists = shoppingLists.filter( aa => aa.id != clickId)
    save() // 남아 있는 것을 다시 배열
  }
})