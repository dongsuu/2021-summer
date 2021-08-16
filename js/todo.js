const toDoForm = document.querySelector("#todo-form"); //form태그 가져오기
const toDoInput = document.querySelector("#todo-form input"); //input태그 가져오기
const toDoList = document.querySelector("#todo-list"); //ul태그 가져오기

let toDos = []; //저장하기 위해 todo-list들을 toDos배열에 저장할 것이다. 

function handleToDoSubmit(event){ //submit이 발생했을 때 입력한 값 저장하는 함수.
    event.preventDefault(); //submit의 기본동작을 막는다.
    const newTodo = toDoInput.value; //입력한 todo-list를 newTodo에 저장.
    toDoInput.value =""; //처음 값을 입력하고 다음 값을 입력할때 처음 입력한 값을 지움.
    const newTodoObj = {  //객체를 만들어 입력한 값들을 객체에 저장한다.
        text: newTodo,    //text는 입력한 문자열
        id: Date.now(),   //id는 현재 시간으로하여 list마다 다른 id값 가지게 함.
    };
    toDos.push(newTodoObj); //객체를 선언한 배열에 값을 넣는다. 
    paintToDo(newTodoObj);  //list를 보여주는 paintTodo함수 실행.
    saveToDos();            //localStorage에 저장하는 saveToDos함수 실행.
}
toDoForm.addEventListener("submit",handleToDoSubmit);

function paintToDo(newToDo){ //handleToDoSubmit에서 온 객체를 받아 list작성.
    const li = document.createElement("li");  //li태그를 만든다.
    const span = document.createElement("span"); //span태그를 만든다. 
    li.id = newToDo.id; //li태그의 id값을 받은 객체의 id값으로 한다.  
    span.innerText = newToDo.text; //span태그의 text값을 받은 객체의 text값으로 한다.
    const button = document.createElement("button"); //삭제할 버튼을 만든다.
    button.innerText="X";
    button.addEventListener("click",deleteToDo); //삭제 버튼이 클릭되는 event listener
    li.appendChild(span);  //span은 li의 자식이 된다. 
    li.appendChild(button); //button도 li의 자식이 된다. 
    toDoList.appendChild(li); //li는 ul의 자식이 된다.
}

function saveToDos(){
    localStorage.setItem("todos",JSON.stringify(toDos)); // 배열을 문자열로 바꿔 localStorage에 저장.
}

function deleteToDo(event){
    const li = event.target.parentElement; //li는 발생한 event의 html태그의 부모태그를 의미.
    console.log(li);
    toDos = toDos.filter((item) => item.id !== parseInt(li.id)); //클릭한 li의 id와 다른 id를 가진 것들은 남겨둔다.
    li.remove();
    saveToDos();  
}

//새로고침했을 때 값 유지.
const savedToDos = localStorage.getItem("todos"); // localStorage에 있는 값을 불러와 savedToDos에 저장
if(savedToDos !== null){ //값이 존재할 때
    const parsedToDos = JSON.parse(savedToDos);  //localStorage에 문자열로 저장되어있는 것을 배열로 바꿔 저장.
    toDos = parsedToDos; //toDos배열에 대입.
    toDos.forEach(paintToDo); //배열의 각각의 item에 paintToDo를 실행한다. 
}