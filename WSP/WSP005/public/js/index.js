let wordSubmit = document.querySelector("#wordSubmitButton");
let deleteMemoButton = document.querySelectorAll(".bi-trash-fill");
let editMemoButton = document.querySelectorAll(".bi-pencil-square");
let wallContainer = document.getElementById("wallContainer");

wordSubmit.addEventListener("click", () => {
  addNewMemo();
});

// deleteMemoButton.addEventListener("click", () => {
//   deleteMemo();
// });
let i = 5;
function addNewMemo() {
  let textarea = document.getElementById("box1");
  let content = textarea.value;
  if (content == "") {
    alert("此處不能為空白");
  } else {
    let newBox = document.createElement("div");
    newBox.innerHTML = `<span>${content}</span><button class="bi bi-trash-fill position-absolute top-0 start-100 translate-middle"></button><button class="bi bi-pencil-square position-absolute top-100 start-100 translate-middle"></button>`;
    newBox.classList.add("box");
    newBox.setAttribute("id", `box${i}`);
    wallContainer.append(newBox);
    i++;
  }
}

// function deleteMemo() {
//   event.target.delete();
// }
