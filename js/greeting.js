const loginForm = document.querySelector("#login-form"); // form 태그를 가져옴.
const loginId = document.querySelector("#id");  //id의 input태그를 가져옴.
const loginPw = document.querySelector("#pw");  //pw의 input태그를 가져옴.
const loginButton = document.querySelector("#login-form button"); //button태그 가져옴.
const greeting = document.querySelector("#greeting");
let userinfo = [];

function onLoginSubmit(event){  //submit이 발생했을때.
    event.preventDefault(); // 기본동작을 막는다.
    loginForm.classList.add("hidden"); // logintForm(form) 태그에 hidden 이라는 class를 추가해서 가린다.
   
    const userid = loginId.value; //id text칸에 적는 값을 userid에 넣는다.
    const userpw = loginPw.value; //pw text칸에 적는 값을 userpw에 넣는다.
    let useridpw = {            //useridpw라는 객체를 만들어서 id와 pw를 하나로 묶어 저장한다.
        id : userid,
        pw : userpw,
    };
    userinfo.push(useridpw);
    localStorage.setItem("userInfo",JSON.stringify(userinfo)); //localStorage에 userinfo 배열을 text로 바꿔서 저장함.
    // localStorage에 객체를 저장하게되면 object, object 이런식으로 뜨는데 JSON.stringify()를 사용하여 문자열로 저장되게 한다.
    
    paintGreetings();
}

function paintGreetings(){  //로그인 성공시 환영인사.
    const userid = localStorage.getItem("userInfo");  //localStorage에서 id값 꺼내옴.
    const ui = JSON.parse(userid);                    //localStorage에는 string값으로 저장되어있는데 이를 다시 배열로 바꿔줌. 
    greeting.innerText= `Welcome ${ui[0].id}`;        //**이부분의 index를 어떻게 표현해야할지 잘 모르겠다. 이렇게되면 한 사람만 사용할 수 있게됨.
}

const savedUserInfo = localStorage.getItem("userInfo"); //localStorage에서 저장된 값을 꺼내와 savedUserInfo에 저장.
if(savedUserInfo === null){   //꺼내온 값이 null이면 로그인창을 보여주고 submit이뤄지게 기다린다.
    loginForm.classList.remove("hidden");
    loginForm.addEventListener("submit",onLoginSubmit);
} else{  //꺼내온 값이 있으면 그 값으로 paintGreetinrgs를 실행한다.
    paintGreetings();
}