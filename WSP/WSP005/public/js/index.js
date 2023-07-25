// let wordSubmit = document.querySelector("#wordSubmitButton");
// let deleteMemoButton = document.querySelectorAll(".bi-trash-fill");
// let editMemoButton = document.querySelectorAll(".bi-pencil-square");
// let wallContainer = document.getElementById("wallContainer");

// wordSubmit.addEventListener("click", () => {
//   addNewMemo();
// });
// deleteMemoButton.addEventListener("click", (event) => {
//   deleteMemo();
// });

// let i = 3;
// function addNewMemo() {
//   let textarea = document.getElementById("box2");
//   let content = textarea.value;
//   if (content == "") {
//     alert("此處不能為空白");
//   } else {
//     let newBox = document.createElement("div");
//     newBox.innerHTML = `<textarea class="memo" disabled="true">${content}</textarea><button class="bi bi-trash-fill position-absolute top-0 start-100 translate-middle"></button><button class="bi bi-pencil-square position-absolute top-100 start-100 translate-middle"></button>`;
//     newBox.classList.add("memo");
//     newBox.setAttribute("id", `memo${i}`);
//     wallContainer.append(newBox);
//     i++;
//   }
// }

// function deleteMemo() {
//   let parentElementDiv = event.target.parentElement;
//   if (parentElementDiv.matches(".box")) {
//     console.log(parentElementDiv);
//     parentElementDiv.remove();
//   }
// }

let id = 1;
let template = document.querySelector("template");
let memoContainer = document.querySelector(".wall-container");

for (let memo of memos) {
  let node = template.content.querySelector(".memo").cloneNode(true);
  node.querySelector(".content").textContent = memo.content;
  node.setAttribute("id", `memo${id}`);
  let img = node.querySelector(".content-image");
  let popupBox = node.querySelector(".modal");
  if (memo.filename) {
    let popupImg = popupBox.querySelector(".popup-image");
    let finalImg = popupImg.querySelector(".content-image");
    finalImg.src = "/uploads/" + memo.filename;
    img.src = "/uploads/" + memo.filename;
  } else {
    img.remove();
  }
  memoContainer.appendChild(node);
  id++;
}

if (login_id) {
  document.body.dataset.role = "admin";
  document.querySelector("form .login_id").textContent = login_id;
} else {
  document.body.dataset.role = "guest";
}
