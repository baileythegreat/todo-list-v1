
let todoList = {
    // It should have a space to store todos
    todos: [],

    // It should have a way to add new todos
    addTodo: function(todo) {
        todoList.todos.push(todo);
    },

    // It should have a way to display todos
    displayTodos: function() {
        console.log("My todos: " + todoList.todos);
    },

    // It should have a way to delete a todo
    deleteTodo: function(i) {
        todoList.todos.splice(i, 1);
    },

    // It should have a way to change a todo
    changeTodo: function(text, position) {
        let newTodo = text;
        let oldPosition = position;

        todoList.todos[oldPosition] = newTodo;
    }
}

todoList.addTodo("new text");
todoList.addTodo("second todo");
todoList.displayTodos();
todoList.deleteTodo(1);
todoList.displayTodos();
todoList.changeTodo("changed todo", 0);
todoList.displayTodos();
