const todoInput = document.getElementById('todoText');
const alertMessage = document.getElementById('alertMessage');
const todoList = document.getElementById('todo-list');
const addButton = document.getElementById('add-btn');

let todos = JSON.parse(localStorage.getItem('todo-list')) || [];

addButton.addEventListener('click', createTodo);
todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        createTodo();
    }
});

function createTodo() {
    const todoText = todoInput.value.trim();

    if (!todoText) {
        setAlertMessage('Please enter a task!');
        return;
    }

    const todoExists = todos.some(todo => todo.text === todoText);
    if (todoExists) {
        setAlertMessage('This task is already in the list!');
        return;
    }

    const todo = { text: todoText, completed: false };
    todos.push(todo);
    setLocalStorage();
    renderTodos();
    todoInput.value = '';
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach((todo, index) => {
        const todoItem = document.createElement('li');
        todoItem.classList.toggle('completed', todo.completed);
        todoItem.innerHTML = `
            <span onclick="toggleCompleted(${index})">${todo.text}</span>
            <button class="delete" onclick="deleteTodo(${index})">x</button>
        `;
        todoList.appendChild(todoItem);
    });
}

function toggleCompleted(index) {
    todos[index].completed = !todos[index].completed;
    setLocalStorage();
    renderTodos();
}

function deleteTodo(index) {
    if (confirm('Are you sure you want to delete this task?')) {
        todos.splice(index, 1);
        setLocalStorage();
        renderTodos();
    }
}

function setLocalStorage() {
    localStorage.setItem('todo-list', JSON.stringify(todos));
}

function setAlertMessage(message) {
    alertMessage.textContent = message;
    setTimeout(() => alertMessage.textContent = '', 2000);
}

renderTodos();
