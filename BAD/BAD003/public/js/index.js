let socket = io.connect()

socket.on('connect', () => {
  console.log('connected to server:', socket.id)
  socket.emit('ball', 'ping')
})
socket.on('ball', msg => {
  console.log(msg)
  socket.emit('ball', 'ping')
})
socket.on('new-memo', memo => {
  showMemo(memo)
})

let pageTitle = document.querySelector('.page-title')

let pageTitleStr = pageTitle.title

for (let char of pageTitleStr) {
  let div = document.createElement('div')
  div.setAttribute('aria-hidden', 'true')
  div.className = 'word'
  div.textContent = char
  pageTitle.appendChild(div)
}

let memoList = document.querySelector('.memo-list')
let memoTemplate = memoList.querySelector('.memo')
memoTemplate.remove()

function showMemo(memo) {
  let node = memoTemplate.cloneNode(true)
  memo.node = node
  node.querySelector('.memo-content').textContent = memo.content
  node
    .querySelector('.del-btn')
    .addEventListener('click', () => deleteMemo(memo))
  node
    .querySelector('.edit-btn')
    .addEventListener('click', () => editMemo(memo))

  let likeBtn = node.querySelector('.like-btn')
  let unlikeBtn = node.querySelector('.unlike-btn')

  if (memo.is_liked == 1) {
    likeBtn.hidden = true
    unlikeBtn.hidden = false
  } else {
    likeBtn.hidden = false
    unlikeBtn.hidden = true
  }

  likeBtn.addEventListener('click', async () => {
    let res = await fetch(`/memos/${memo.id}/likes`, {
      method: 'POST',
      headers: { Accept: 'application/json' },
    })
    let json = await res.json()
    if (json.error) {
      Swal.fire('Failed to like memo', json.error, 'error')
      return
    }
    likeBtn.hidden = true
    unlikeBtn.hidden = false
  })

  unlikeBtn.addEventListener('click', async () => {
    let res = await fetch(`/memos/${memo.id}/likes`, {
      method: 'DELETE',
      headers: { Accept: 'application/json' },
    })
    let json = await res.json()
    if (json.error) {
      Swal.fire('Failed to unlike memo', json.error, 'error')
      return
    }
    unlikeBtn.hidden = true
    likeBtn.hidden = false
  })

  let img = node.querySelector('.memo-image')
  if (memo.filename) {
    img.src = '/uploads/' + memo.filename
  } else {
    img.remove()
  }
  memoList.appendChild(node)
}

async function loadMemos() {
  let res = await fetch('/memos')
  let json = await res.json()
  if (json.error) {
    Swal.fire('Failed to load memos', json.error, 'error')
    return
  }
  memoList.textContent = ''
  for (let memo of json.memos) {
    showMemo(memo)
  }
}
loadMemos()

function updateRole(user) {
  document.body.dataset.role = user.role
  if (user.username) {
    document.querySelector('form .username').textContent = user.username
  }
}

async function loadRole() {
  let res = await fetch('/role')
  let json = await res.json()
  updateRole(json)
}
loadRole()

async function submitMemo(event) {
  event.preventDefault()
  let form = event.target
  let res = await fetch(form.action, {
    method: form.method,
    body: new FormData(form),
  })
  let json = await res.json()
  console.log('submit memo result:', json)
  if (json.error) {
    Swal.fire('Failed to post memo', json.error, 'error')
    return
  }
  // showMemo(json) // the new memo will be received from socket.io
}

let loginForm = document.querySelector('#loginForm')
loginForm.addEventListener('submit', async event => {
  let form = loginForm
  event.preventDefault()
  let res = await fetch(form.action, {
    method: form.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: form.username.value,
      password: form.password.value,
    }),
  })
  let json = await res.json()
  console.log('login result:', json)
  if (json.error) {
    Swal.fire('Failed to login', json.error, 'error')
    return
  }
  updateRole(json)
})

async function logout(event) {
  event.preventDefault()
  let form = event.target
  let res = await fetch(form.action, {
    method: form.method,
  })
  let json = await res.json()
  console.log('logout result:', json)
  if (json.error) {
    Swal.fire('Failed to logout', json.error, 'error')
    return
  }
  updateRole(json)
}

async function deleteMemo(memo) {
  let res = await fetch('/memos/' + memo.id, { method: 'DELETE' })
  let json = await res.json()
  if (json.error && res.status != 404) {
    Swal.fire('Failed to delete memo', json.error, 'error')
    return
  }
  memo.node.remove()
}
