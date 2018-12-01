
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
    deleteTodo: function(todoPosition) {
        todoList.deleteTodo(todoPosition);
    },
    toggleCompleted: function() {
        let todoPosition = $("#toggleCompletedPosition").val();
        todoList.toggleCompleted(todoPosition);
        $("#toggleCompletedPosition").val("");
    }
}

let view = {

    // Displays todos as an html list
    displayTodos: function() {

        let listLength = todoList.todos.length;
        // Clears the todo list
        let todosUl = document.querySelector(".todo-list");
        todosUl.innerHTML = "";

        if (listLength === 0) {
            let noTodos = document.createElement("p");
            noTodos.innerHTML = "Your todo list is empty";
            todosUl.appendChild(noTodos);
        } else {
            for (let i = 0; i < listLength; i++) {
                let listItem = document.createElement("li");
                let todoText = todoList.todos[i].todoText;
                let deleteButton = this.createDeleteButton();

                if (todoList.todos[i].completed === true) {
                     listItem.innerHTML = "(x) " + todoText;
                     listItem.id = i;
                     listItem.appendChild(deleteButton);
                     todosUl.appendChild(listItem);
                 } else {
                     listItem.innerHTML = "( ) " + todoText;
                     listItem.id = i;
                     listItem.appendChild(deleteButton);
                     todosUl.appendChild(listItem);
                 }
            }
        }
    },
    // Creates a delete button
    createDeleteButton: function() {
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },

    setUpEventListeners: function () {
        // Delete event listener
        let todosUl = document.querySelector("ul");
        todosUl.addEventListener("click", function(event) {
            let elementClicked = event.target;
            if (elementClicked.className === "deleteButton") {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
        })
    }
}

view.setUpEventListeners();
