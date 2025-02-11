const createForm = document.querySelector("#create_form");
const server_url = "http://localhost:3000/contacts";
createForm.addEventListener("submit", async function(e){
    e.preventDefault();

    const name = createForm.querySelector("#name");
    const mobile = createForm.querySelector("#mobile").value;
    const memo = createForm.querySelector("#memo").value;
    const gender = createForm.querySelector("#gender").value;
    const job = createForm.querySelector("#job").value;

    if (name.value == "") {
        alert("입력하세요!");
        name.focus();
    } else if (mobile.value == "") {
        mobile.focus();
    }
    
    let inputData = {
        name,
        mobile,
        memo,
        gender,
        job
    }    
    console.log(inputData);

    const result = await postData(server_url, inputData);
    console.log(result);

    // postData(server_url, inputData).then(data => {
    //     console.log(data);
    // })    
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