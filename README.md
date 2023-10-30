# Introduction to the shopping list project

The project is a shopping list application. This is a very basic project that uses vanilla JavaScript, HTML, and CSS. Here the user is able to add, filter, and remove all the list items from the list. This project is based on the javascript course that I am learning from. The designs and feature ideas are taken from the course but the code implementation is done by me. The project is not entirely responsive so please forgive me if the layout doesn't look like as expected.

**Note: If you have any suggestions on how to improve the code quality or any better way to implement these features or how to write a better README file, then feel free to drop your suggestion. I will be extremely grateful**

### Important Learnings from this project

- Learned about `composedPath()` method available in the `event` object when trying to delete an item from the list.
- Implemented `event delegation` buttons for deleting the items from the list.
- Implemented `localStorage` to make the list items persist when the browser is reloaded.
- Implemented other basic features such as adding an item by clicking the `Add Item` button and removing all the items at once at the click of `Clear All` button.

### Articles on the topics learned from this project

- [localStorage](https://blog.logrocket.com/localstorage-javascript-complete-guide/)
- [Event-delgation1](https://www.freecodecamp.org/news/event-delegation-javascript/) and [Event-delgation2](https://javascript.info/event-delegation)
- [Composed-Path-method](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath)

### Issues faced and how it was resolved

- when implementing `localStorage` to the project: The data was being stored in the `localStorage` but it was not persisting when the browser was being reloaded. Why did that occur?

The issue was resolved with the help of chatGPT. The answer provided by chatGPT is given below.

The issue you're experiencing, where the data stored in `localStorage` doesn't persist when you reload the browser, is likely because you are not re-populating your list from `localStorage` when the page is loaded. `localStorage` is designed to store data in the browser, but you need to explicitly retrieve the data from it and update your page when it loads.

You can modify your code to retrieve the items from `localStorage` and populate your list when the page is loaded. Here's an example of how you can do this:

```javascript
// Function to populate the list from localStorage
function populateListFromLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    const listItem = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const icon = document.createElement('i');

    deleteBtn.className = 'delete-btn';
    icon.className = 'fa-solid fa-circle-xmark';

    listItem.innerText = value;
    listItem.appendChild(deleteBtn).appendChild(icon);
    itemList.appendChild(listItem);
  }
}

// Call the function to populate the list from localStorage when the page loads
window.addEventListener('load', populateListFromLocalStorage);

// Your existing addItem function (without the localStorage logic)
function addItem() {
  if (itemInput.value === '') {
    alert('Input is empty! Please add a shopping task');
  } else {
    const listItem = document.createElement('li');
    const deleteBtn = document.createElement('button');
    const icon = document.createElement('i');

    deleteBtn.className = 'delete-btn';
    icon.className = 'fa-solid fa-circle-xmark';

    listItem.innerText = itemInput.value;
    itemList.appendChild(listItem);

    // Save the item in localStorage
    localStorage.setItem(itemCount.toString(), itemInput.value);

    itemInput.value = '';
    itemCount++;
  }
}

addItemBtn.addEventListener('click', addItem);
```

In this updated code, the `populateListFromLocalStorage` function is called when the page loads. It retrieves the items from `localStorage` and populates the list with them. This ensures that the data persists and is displayed even after a page reload.


- Implementing the `delete item` functionality with the help of `event delegation` concept

The issue was resolved by referring to the article provided by [freecodecamp](https://www.freecodecamp.org/news/event-delegation-javascript/). Another thing that I learned while implementing this functionality was about the `composedPath()` method offered by the `event` object. You can refer to the below code and use the [mdn-docs](https://developer.mozilla.org/en-US/docs/Web/API/Event/composedPath) to learn more about `composedPath()` method. You can refer to the entire source code if you want more clarity on how this code works.

```javascript
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

  // clearUI()
}
itemList.addEventListener('click', deleteItem)
```
Here's a link to the deployed application: [Shopping-List](https://shopping-list-aayush.netlify.app)
