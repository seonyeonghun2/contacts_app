// 검색어 없이, 조회 버튼 누를때,
const read_form = document.querySelector("#read_form");
const list_ul = document.querySelector("#contacts_list");
const search = document.querySelector("#keyword");
let items = "";
const server_url = "http://localhost:3000/contacts";
read_form.addEventListener("submit", function (e) {
  e.preventDefault();
  if(search.value !== "") {
    logJSONData(`${server_url}?name=${search.value}`);
  } else {
    logJSONData(server_url);
  }
});

async function logJSONData(url) {
  const response = await fetch(url);
  const jsonData = await response.json();  
  // console.log(jsonData);
  for (let data of jsonData) {
    items += `
        <li class="box d-flex align-center gap-1">
            <figure class="photo flex-1">
                <img src="images/${data.gender}.png" width="100" alt="${data.gender}">
                <figcaption>${data.name}</figcaption>
            </figure>
            <ul class="info flex-2">
                <li>${data.name}</li>
                <li>${data.mobile}</li>
                <li>${data.memo}</li>
                <li>${data.job}</li>
            </ul>
            <div class="btns flex-2 text-center">
                <button type="button" class="btn edit" onclick="edit_contact('${data.id}')")"><img src="images/edit.png" width="24" alt="수정"></button>
                <button type="button" class="btn remove" onclick="remove_contact('${data.id}')"><img src="images/remove.png" width="24" alt="삭제"></button>
                <button type="button" class="btn sms"><img src="images/sms.png" width="24" alt="문자전송"></button>
                <button type="button" class="btn call"><img src="images/call.png" width="24" alt="전화걸기"></button>
            </div>
        </li>
        `;
  }
  list_ul.innerHTML = items;
}
search.addEventListener("change", function(){
    items = "";
    list_ul.innerHTML = items;
})

async function remove_contact(id){
  const select = confirm("정말로 삭제 하시겠습니까?");  
  if (select) {
    const response = await fetch(`${server_url}/${id}`, {
      method: "DELETE"
    });
    console.log(response);
  }
  location.reload(); // 삭제되었거나 삭제하지 않아도~ 새로고침
}

async function edit_contact(id){
  // const editForm = document.querySelector("#edit_form");
  const response = await fetch(`${server_url}?id=${id}`);
  const res = await response.json();  
  const data = res[0];
  const modal = `
    <div id="edit_modal" class="container">
      <div class="body">
        <h2 class="text-center my-2">연락처 수정</h2>
        <form method="post" autocomplete="off" id="edit_form" data-id="${data.id}">
            <fieldset>
                <legend>create contact</legend>
                <div>
                    <label for="name">이름</label>
                    <input type="text" name="name" id="name" value="${data.name}">
                </div>
                <div>
                    <label for="mobile">전화번호</label>
                    <input type="tel" name="mobile" id="mobile" value="${data.mobile}">
                </div>
                <div>
                    <label for="memo">메모</label>
                    <input type="text" name="memo" id="memo" value="${data.memo}">
                </div>
                <div>
                    <label for="gender">성별</label>
                    <select id="gender" name="gender">
                        <option value="">선택</option>                                                
                        ${data.gender == "man" ? "<option selected value=\"man\">남성</option><option value=\"woman\">여성</option>":"<option value=\"man\">남성</option><option selected value=\"woman\">여성</option>"}
                    </select>
                </div>
                <div>
                    <label for="job">하는일</label>
                    <input type="text" name="job" id="job" value="${data.job}">
                </div>
                <input type="submit" value="수정">
                <input type="button" value="취소" onclick="alert('창을 닫습니다')">
            </fieldset>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modal);
  document.querySelector("#edit_form").addEventListener("submit", update_contact)
}

async function update_contact(e) {
  e.preventDefault();
  
  const editForm = e.target ; // 이벤트가 발생하면, 관련
  const id = editForm.dataset.id; // 수정할 연락처의 유니크한 id값
  
  const updateData = {
    name: editForm.querySelector("#name").value,
    mobile: editForm.querySelector("#mobile").value,
    memo: editForm.querySelector("#memo").value,
    gender: editForm.querySelector("#gender").value,
    job: editForm.querySelector("#job").value,
  }
  
  const response = await fetch(`${server_url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "mode": "no-cors",
      "credentials": "same-origin"      
    },
    body: JSON.stringify(updateData)
  });

  if(response.length == 0) {
    alert("응답이 없습니다");
  } else {
    location.reload()
  }
}


// 검색어 넣고, 조회버튼 누를때
