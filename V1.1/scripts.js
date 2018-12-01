
let todoList = {
    // It should have a space to store todos
    todos: [],

    // It should have a way to add new todos
    addTodo: function(text) {
        todoList.todos.push({
            todoText: text,
            completed: false
        });
        view.displayTodos();
    },

    // It should have a way to delete a todo
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        view.displayTodos();
    },

    // It should have a way to change a todo
    changeTodo: function(text, position) {
        let newTodo = text;
        let todoPosition = position;

        this.todos[todoPosition].todoText = newTodo;
        view.displayTodos();
    },

    // Switch a todo's completed property
    toggleCompleted: function(position) {
        this.todos[position].completed = !this.todos[position].completed;
        view.displayTodos();
    },

    // Switch the completed property of all todos to true or false
    toggleAll: function() {
        let listLength = this.todos.length;
        let completedTodos = 0;
        for (let i = 0; i < listLength; i++) {
            if (this.todos[i].completed === true) {
                completedTodos++;
            }
        }
        if (completedTodos === listLength) {
            for (let i = 0; i < listLength; i++) {
                this.todos[i].completed = false;
            }
        } else {
            for (let i = 0; i < listLength; i++) {
                this.todos[i].completed = true;
            }
        }
        view.displayTodos();
    }
}

// Handles html interactions
let handlers = {

    displayTodos: function() {
        todoList.displayTodos();
    },
    toggleAll: function() {
        todoList.toggleAll();
    },
    addTodo: function() {
        let todoText = $("#addTodoInput").val();
        todoList.addTodo(todoText);
        $("#addTodoInput").val("");
    },
    changeTodo: function() {
        let text = $("#changeTodoText").val();
        let todoPosition = $("#changeTodoPosition").val();
        todoList.changeTodo(text, todoPosition);
        $("#changeTodoText").val("");
        $("#changeTodoPosition").val("");
    },
    deleteTodo: function() {
        let todoPosition = $("#deleteTodoPosition").val();
        todoList.deleteTodo(todoPosition);
        $("#deleteTodoPosition").val("");
    },
    toggleCompleted: function() {
        let todoPosition = $("#toggleCompletedPosition").val();
        todoList.toggleCompleted(todoPosition);
        $("#toggleCompletedPosition").val("");
    }
}

let view = {

    // It should have a way to display todos
    displayTodos: function() {
        let listLength = todoList.todos.length;

        // Clears the todo list
        let todosUl = document.querySelector(".todo-list");
        todosUl.innerHTML = "";

        if (listLength === 0) {
            document.write("<p>Your todo list is empty</p>")
        } else {
            for (let i = 0; i < listLength; i++) {
                let listItem = document.createElement("li");
                let todoText = todoList.todos[i].todoText;

                if (todoList.todos[i].completed === true) {
                     listItem.innerHTML = "(x) " + todoText;
                     todosUl.appendChild(listItem);
                 } else {
                     listItem.innerHTML = "( ) " + todoText;
                     todosUl.appendChild(listItem);
                 }
            }
        }
    }
}
