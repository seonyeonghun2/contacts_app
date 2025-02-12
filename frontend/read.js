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
//   console.log(jsonData);
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
                <button type="button" class="btn edit" onclick="alert('정보수정화면으로 이동합니다');location.href='https://www.naver.com'"><img src="images/edit.png" width="24" alt="수정"></button>
                <button type="button" class="btn remove"><img src="images/remove.png" width="24" alt="삭제"></button>
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

// 검색어 넣고, 조회버튼 누를때
