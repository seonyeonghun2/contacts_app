const createForm = document.querySelector("#create_form");
const server_url = "http://localhost:3000/contacts";
createForm.addEventListener("submit", function(e){
    e.preventDefault();

    const name = createForm.querySelector("#name");
    const mobile = createForm.querySelector("#mobile");
    const memo = createForm.querySelector("#memo");
    const gender = createForm.querySelector("#gender");
    const job = createForm.querySelector("#job");

    if (name.value == "") {
        alert("이름을 입력하세요!");
        name.focus();
        return;
    } else if (mobile.value == "") {
        alert("전화번호를 입력하세요!");
        mobile.focus();
        return;
    } else if (memo.value == "") {
        alert("메모를 입력하세요!");
        memo.focus();
        return;
    } else if (gender.value == "") {
        alert("성별을 선택하세요!");
        gender.focus();
        return;
    } else if (job.value == "") {
        alert("직업을 입력하세요!");
        job.focus();
        return;
    }
    
    let inputData = {
        name: name.value,
        mobile: mobile.value,
        memo: memo.value,
        gender: gender.value,
        job: job.value
    }    

    //console.log(inputData);

    postData(server_url, inputData); // 등록 요청 함수를 호출 (데이터와 서버주소 전달)
})

async function postData(url="", data={}){
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    // JSON 응답을 네이티브 JavaScript 객체로 파싱
    return response.json(); 
}