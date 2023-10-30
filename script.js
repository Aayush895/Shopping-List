const form = document.querySelector('.input-item')
const itemInput = document.querySelector('.itemInput')
const addItemBtn = document.querySelector('.addItem')
const itemList = document.querySelector('.item-list')
const deleteBtns = document.querySelectorAll('.delete-btn')
const clearAll = document.querySelector('.clear-all')
const filterInput = document.querySelector('.filterInput')

let itemCount = 0

function addItem() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (itemInput.value == localStorage.getItem(key)) {
      alert('The item already exists')
      itemInput.value = ''
      return
    }
  }

  if (itemInput.value === '') {
    alert('Input is empty! Please add a shopping task')
  } else {
    const listItem = document.createElement('li')
    const deleteBtn = document.createElement('button')
    const icon = document.createElement('i')

    localStorage.setItem(itemCount.toString(), itemInput.value)

    deleteBtn.className = 'delete-btn'
    icon.className = 'fa-solid fa-circle-xmark'

    listItem.innerText = localStorage.getItem(itemCount.toString())
    itemCount++

    listItem.appendChild(deleteBtn).appendChild(icon)
    itemList.appendChild(listItem)

    itemInput.value = ''
  }
}

function deleteItem(e) {
  const list = itemList.querySelectorAll('li')
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)

    if (e.composedPath()[2].innerText == localStorage.getItem(key)) {
      if (window.confirm('Are you sure you want to delete this item?')) {
        localStorage.removeItem(key)
        list[i].remove()
      }
    }
  }
}

function deleteAll() {
  const list = itemList.querySelectorAll('li')

  localStorage.clear()

  for (let i = 0; i < list.length; i++) {
    list[i].remove()
  }
}

function filterItem(e) {
  const items = itemList.querySelectorAll('li')

  const text = e.target.value.toLowerCase()

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase()
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

function populateListFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    const value = localStorage.getItem(key)

    const listItem = document.createElement('li')
    const deleteBtn = document.createElement('button')
    const icon = document.createElement('i')

    deleteBtn.className = 'delete-btn'
    icon.className = 'fa-solid fa-circle-xmark'

    listItem.innerText = value
    listItem.appendChild(deleteBtn).appendChild(icon)
    itemList.appendChild(listItem)
  }
}

window.addEventListener('load', populateListFromLocalStorage)
addItemBtn.addEventListener('click', addItem)
itemList.addEventListener('click', deleteItem)
clearAll.addEventListener('click', deleteAll)
filterInput.addEventListener('input', filterItem)
