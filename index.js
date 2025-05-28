function insert() {
    if(localStorage.getItem("seq") === null) {
        localStorage.setItem("seq", "1");
    }

    let no = parseInt(localStorage.getItem("seq"));
    localStorage.setItem("seq", no + 1);

    const title = document.querySelector("input[name=title]").value;
    const content = document.querySelector("textarea[name=content]").value;
    const date = new Date().toLocaleString('ko-KR');

    let boardArr = JSON.parse(localStorage.getItem("board")) || [];

    const vo = {
        title,
        content,
        date,
        no
    };

    boardArr.push(vo);
    localStorage.setItem("board", JSON.stringify(boardArr));
}

function selectList() {
    const boardStr = localStorage.getItem("board");

    const boardArr = JSON.parse(boardStr);
    
    const divTag = document.querySelector("#board-list");

    // divTag.innerHTML = "";
    // for(let vo of boardArr) {
    //     const no = vo.no;
    //     const title = vo.title;
    //     const content = vo.content;
    //     const date = vo.date;
    //     divTag.innerHTML += `<h3>${no} | ${title} | ${content} | ${date}</h3>`;
    // }
    
    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    for(let vo of boardArr){
        const no = vo.no;
        const title = vo.title;
        const content = vo.content;
        const date = vo.date;
        tbody.innerHTML += `<tr onclick ="
        selectOne(this);">
        <td>${no}</td>
        <td>${title}</td>
        <td>${content}</td>
        <td>${date}</td>
        <td><button onclick="deleteBoard(${no});">delete</button></td>
        </tr>`;
    }
}

function selectOne(evt) {
    // 이벤트가 발생한 요소에 대해서 상세 조회 이벤트객체.target
    
    // 이벤트 발생한 요소 얻기

    // tr 태그 내 게시글 번호 얻기
    const no = evt.children[0].innerHTML;

    // 번호 이용해서 로컬스토리지에서 객체 꺼내기
    const boardStr = localStorage.getItem("board");
    const boardArr  = JSON.parse(boardStr);

    for(let vo of boardArr) {
        if(vo.no == no) {
            // 모달창에 데이터 넣기
            document.querySelector("#no").innerHTML = vo.no;
            document.querySelector("#title").innerHTML = vo.title;
            document.querySelector("#content").innerHTML = vo.content;
            document.querySelector("#date").innerHTML = vo.date;

            // 모달창 화면에 띄우기
            const modal = document.querySelector("#modal");
            modal.classList.add("active");
            const overlay = document.querySelector("#overlay");
            overlay.classList.add("active");
        }
    }
}

function deleteBoard( no ) {
    // button -> td -> tr -> tr.children -> children[0] -> no
    // const no = x.parentNode.parentNode.children[0].innerHTML;

    const boardStr = localStorage.getItem("board");
    const boardArr = JSON.parse(boardStr);

    for(let i = 0; i < boardArr.length; ++i){
        if(boardArr[i].no == no) {
            boardArr.splice(i , 1);
            break;
        }
    }
    // boardArr 하나 없어지니깐 다시 불러오기
    localStorage.setItem("board", JSON.stringify(boardArr));

    selectList();
}

function closeModal( x ) {
    x.classList.remove("active");
    const overlay = document.querySelector("#overlay");
    overlay.classList.remove("active");
}