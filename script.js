// IEFE
(() => {
  // state variables
  let toDoListArray = [];

  // ui variables
  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const prioritySelect = document.getElementById("priority-select");
  const dueDateInput = document.getElementById("due-date");
  const ul = document.querySelector(".toDoList");
  const themeToggle = document.getElementById("theme-toggle");

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
    let item = toDoListArray.find(item => item.itemId === id);
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
        toDoListArray = toDoListArray.filter(it => it.itemId !== id);
        renderList();
        return;
      }
      if (newValue !== item.toDoItem) {
        toDoListArray = toDoListArray.map(it => it.itemId === id ? { ...it, toDoItem: newValue } : it);
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
    // add item to array as an object with an ID, done property, priority, due date, and category
  toDoListArray.push({ itemId, toDoItem, done: false, priority, dueDate });
    console.log(toDoListArray);
  }


  function toggleItemDone(id) {
    toDoListArray = toDoListArray.map(item => {
      if (item.itemId === id) {
        return { ...item, done: !item.done };
      }
      return item;
    });
    renderList();
  }

  function renderList() {
    ul.innerHTML = '';
    toDoListArray.forEach(item => {
  addItemToDOM(item.itemId, item.toDoItem, item.done, item.priority, item.dueDate);
    });
  }

  // Initial load
  renderList();

})();