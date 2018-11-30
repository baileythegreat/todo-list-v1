
// It should have a space to store todos
let todos = [];

// It should have a way to add new todos
function addTodo(todo) {
    todos.push(todo);
}

// It should have a way to display todos
function displayTodos() {
    console.log("My todos: " + todos);
}

// It should have a way to delete a todo
function deleteTodo(i) {
    todos.splice(i, 1);
}

// It should have a way to change a todo
function changeTodo(text, position) {
    let newTodo = text;
    let i = position;

    todos[i] = newTodo;
}
