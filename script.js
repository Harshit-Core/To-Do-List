// IEFE
(() => {
  // state variables
  let allLists = {
    'default': []
  };
  let currentListId = 'default';

  // ui variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const prioritySelect = document.getElementById("priority-select");
  const dueDateInput = document.getElementById("due-date");
  const ul = document.querySelector(".toDoList");
  const themeToggle = document.getElementById("theme-toggle");
  const listTabs = document.getElementById("list-tabs");
  const newListInput = document.getElementById("new-list-input");
  const addListBtn = document.getElementById("add-list-btn");

  // event listeners
  form.addEventListener('submit', e => {
    // prevent default behaviour - Page reload
    e.preventDefault();
    // give item a unique ID
    let itemId = String(Date.now());
    // get/assign input value
    let toDoItem = input.value;
    // get priority, due date, and category values
    let priority = prioritySelect.value;
    let dueDate = dueDateInput.value;
    
    // Add the item to both DOM and array
    addItemToDOM(itemId, toDoItem, false, priority, dueDate);
    addItemToArray(itemId, toDoItem, priority, dueDate);
    
    // clear the input box and reset form
    input.value = '';
    dueDateInput.value = '';
    prioritySelect.value = 'medium';
  });

  // List tab switching
  listTabs.addEventListener('click', e => {
    if (e.target.classList.contains('list-tab')) {
      const listId = e.target.getAttribute('data-list');
      if (listId) {
        switchToList(listId);
      }
    } else if (e.target.classList.contains('delete-list')) {
      const listId = e.target.closest('.list-tab').getAttribute('data-list');
      if (listId && listId !== 'default') {
        deleteList(listId);
      }
    }
  });

  // Add new list
  addListBtn.addEventListener('click', () => {
    const listName = newListInput.value.trim();
    if (listName) {
      createNewList(listName);
      newListInput.value = '';
    }
  });

  // Add list on Enter key
  newListInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const listName = newListInput.value.trim();
      if (listName) {
        createNewList(listName);
        newListInput.value = '';
      }
    }
  });

  ul.addEventListener('change', e => {
    if (e.target.classList.contains('toggle-done-checkbox')) {
      let id = e.target.closest('li').getAttribute('data-id');
      if (!id) return;
      toggleItemDone(id);
    }
  });

  // Edit on double-click
  ul.addEventListener('dblclick', e => {
    const li = e.target.closest('li');
    if (!li) return;
    let id = li.getAttribute('data-id');
    if (!id) return;
    let item = getCurrentList().find(item => item.itemId === id);
    if (!item || item.done) return; // Don't edit done tasks
    const inputEdit = document.createElement('input');
    inputEdit.type = 'text';
    inputEdit.value = item.toDoItem;
    inputEdit.className = 'edit-input';
    li.replaceWith(inputEdit);
    inputEdit.focus();

    function finishEdit() {
      const newValue = inputEdit.value;
      if (newValue === "") {
        // Remove the task if blank
        allLists[currentListId] = getCurrentList().filter(it => it.itemId !== id);
        renderList();
        return;
      }
      if (newValue !== item.toDoItem) {
        allLists[currentListId] = getCurrentList().map(it => it.itemId === id ? { ...it, toDoItem: newValue } : it);
      }
      renderList();
    }

    inputEdit.addEventListener('keydown', ev => {
      if (ev.key === 'Enter') {
        inputEdit.blur();
      }
    });
    inputEdit.addEventListener('blur', finishEdit);
  });

  // Theme toggle functionality
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    themeIcon.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
    
    // Save theme preference
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.querySelector('.theme-icon').textContent = '☀️';
  }

  // functions
  function getCurrentList() {
    return allLists[currentListId] || [];
  }

  function createNewList(name) {
    const listId = 'list_' + Date.now();
    allLists[listId] = [];
    
    // Add new tab
    const newTab = document.createElement('button');
    newTab.className = 'list-tab';
    newTab.setAttribute('data-list', listId);
    newTab.innerHTML = `📋 ${name} <span class="delete-list">×</span>`;
    listTabs.appendChild(newTab);
    
    // Switch to new list
    switchToList(listId);
  }

  function switchToList(listId) {
    currentListId = listId;
    
    // Update active tab
    document.querySelectorAll('.list-tab').forEach(tab => {
      tab.classList.remove('active');
      if (tab.getAttribute('data-list') === listId) {
        tab.classList.add('active');
      }
    });
    
    // Render the selected list
    renderList();
  }

  function deleteList(listId) {
    if (listId === 'default') return; // Can't delete default list
    
    delete allLists[listId];
    
    // Remove tab
    const tabToRemove = document.querySelector(`[data-list="${listId}"]`);
    if (tabToRemove) {
      tabToRemove.remove();
    }
    
    // Switch to default list if we deleted the current one
    if (currentListId === listId) {
      switchToList('default');
    }
  }
  function addItemToDOM(itemId, toDoItem, done = false, priority = "medium", dueDate = "", category = "") {
    // create an li
    const li = document.createElement('li');
    li.setAttribute("data-id", itemId);
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'toggle-done-checkbox';
    checkbox.checked = done;
    li.appendChild(checkbox);
    // Create text span
    const textSpan = document.createElement('span');
    textSpan.innerText = toDoItem;
    li.appendChild(textSpan);
    // Category badge
    // Priority badge
    const badge = document.createElement('span');
    badge.className = 'priority-badge ' + priority;
    badge.innerText = priority.charAt(0).toUpperCase() + priority.slice(1);
    li.appendChild(badge);
    // Due date
    if (dueDate) {
      const due = document.createElement('span');
      due.className = 'due-date-label';
      
      // Format date as DD / MONTH NAME
      const dateObj = new Date(dueDate);
      const day = dateObj.getDate();
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
      const monthName = monthNames[dateObj.getMonth()];
      due.innerText = `${day} / ${monthName}`;
      
      // Check if overdue
      const today = new Date();
      const dueD = new Date(dueDate);
      if (!done && dueD < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        due.classList.add('overdue');
      }
      li.appendChild(due);
    }
    if (done) {
      li.classList.add('done');
    }
    ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem, priority = "medium", dueDate = "", category = "") {
    // add item to current list as an object with an ID, done property, priority, due date
    allLists[currentListId].push({ itemId, toDoItem, done: false, priority, dueDate });
    console.log(allLists);
  }


  function toggleItemDone(id) {
    allLists[currentListId] = getCurrentList().map(item => {
      if (item.itemId === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    renderList();
  }

  function renderList() {
    ul.innerHTML = '';
    getCurrentList().forEach(item => {
      addItemToDOM(item.itemId, item.toDoItem, item.done, item.priority, item.dueDate);
    });
  }

  // Initial load
  renderList();

})();
