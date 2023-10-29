const form = document.querySelector('.input-item')
const itemInput = document.querySelector('.itemInput')
const addItemBtn = document.querySelector('.addItem')
const itemList = document.querySelector('.item-list')
const deleteBtns = document.querySelectorAll('.delete-btn')
const clearAll = document.querySelector('.clear-all')

let listItemsArr = []

function addItem() {
  if (itemInput.value === '') {
    alert('Input is empty! Please add a shopping task')
  } else {
    const listItem = document.createElement('li')
    const deleteBtn = document.createElement('button')
    const icon = document.createElement('i')

    listItemsArr.push(listItem)

    deleteBtn.className = 'delete-btn'
    icon.className = 'fa-solid fa-circle-xmark'

    listItem.innerText = itemInput.value

    listItem.appendChild(deleteBtn).appendChild(icon)
    itemList.appendChild(listItem)

    itemInput.value = ''
  }
}

function deleteItem(e) {
  listItemsArr.forEach((item, index) => {
    if (e.composedPath()[2].innerText == item.innerText) {
      listItemsArr.splice(index, 1)
      item.remove()
    }
  })
}

function deleteAll() {
  listItemsArr.forEach((item) => {
    item.remove()
  })
  listItemsArr = []
}

addItemBtn.addEventListener('click', addItem)
itemList.addEventListener('click', deleteItem)
clearAll.addEventListener('click', deleteAll)
