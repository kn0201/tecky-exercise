let id = 1;
let template = document.querySelector("template");
let memoWall = document.querySelector(".wall-container");

// function addNewMemo(memos) {
for (let memo of memos) {
  let node = template.content.querySelector(".memo").cloneNode(true);
  node.querySelector(".content").textContent = memo.content;
  node.setAttribute("id", `memo${id}`);

  let img = node.querySelector(".content-image");
  if (memo.filename) {
    img.src = "/uploads/" + memo.filename;
  } else {
    img.remove();
  }
  memoWall.appendChild(node);
  id++;
}
// }
