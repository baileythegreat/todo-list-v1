
let todoList = {
    // It should have a space to store todos
    todos: [],

    // Allows adding new todos
    addTodo: function(text) {
        todoList.todos.push({
            todoText: text,
            completed: false
        });
    },

    // Allows deleting a todo
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
    },

    // Allows editing the todo
    changeTodo: function(text, position) {
        let newTodo = text;
        let todoPosition = position;

        this.todos[todoPosition].todoText = newTodo;
    },

    // Switch a todo's completed property
    toggleCompleted: function(position) {
        this.todos[position].completed = !this.todos[position].completed;
    },

    // Switch the completed property of all todos to true or false
    toggleAll: function() {
        let listLength = this.todos.length;
        let completedTodos = 0;
        this.todos.forEach(function(todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        })
        if (completedTodos === listLength) {
            this.todos.forEach(function(todo) {
                todo.completed = false;
            })
        } else {
            this.todos.forEach(function(todo) {
                todo.completed = true;
            })
        }

    }
}

// Handles html interactions
let handlers = {

    toggleAll: function() {
        todoList.toggleAll();
        view.displayTodos();
    },
    addTodo: function() {
        let todoText = $("#addTodoInput").val();
        todoList.addTodo(todoText);
        $("#addTodoInput").val("");
        view.displayTodos();
    },
    changeTodo: function() {
        let text = $("#changeTodoText").val();
        let todoPosition = $("#changeTodoPosition").val();
        todoList.changeTodo(text, todoPosition);
        $("#changeTodoText").val("");
        $("#changeTodoPosition").val("");
        view.displayTodos();
    },
    deleteTodo: function(todoPosition) {
        todoList.deleteTodo(todoPosition);
        view.displayTodos();
    },
    toggleCompleted: function(todoPosition) {
        todoList.toggleCompleted(todoPosition);
        view.displayTodos();
    },
    // Deletes all completed todos
    deleteSelected: function() {
        for ( let i = todoList.todos.length - 1; i >= 0; i-- ) {
            if (todoList.todos[i].completed === true) {
                todoList.deleteTodo(i);
            }
        }
        view.displayTodos();
    }
}

let view = {

    // Displays todos as an html list
    displayTodos: function() {
        let listLength = todoList.todos.length;
        // Resets the todo list
        let todosUl = document.querySelector(".todo-list");
        todosUl.innerHTML = "";
        // Checks if the todos array is empty
        if (listLength === 0) {
            let noTodos = document.createElement("p");
            noTodos.innerHTML = "Your todo list is empty";
            todosUl.appendChild(noTodos);
        } else {
            todoList.todos.forEach(function(todo, position) {
                let listItem = document.createElement("li");
                let deleteButton = view.createDeleteButton();
                let toggleButton = view.createToggleButton();
                let todoText = todo.todoText;

                // Indicates completed status
                if (todo.completed === true) {
                     listItem.innerHTML = "(x) " + todoText;
                 } else {
                     listItem.innerHTML = "( ) " + todoText;
                 }
                 // Creates list elements with an id and delete button, within the unordered list
                 listItem.id = position;
                 listItem.appendChild(toggleButton);
                 listItem.appendChild(deleteButton);
                 todosUl.appendChild(listItem);
            })
        }
    },
    // Creates a delete button
    createDeleteButton: function() {
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return deleteButton;
    },

    createToggleButton: function() {
        let toggleButton = document.createElement("button");
        toggleButton.textContent = "Toggle";
        toggleButton.className = "toggleButton";
        return toggleButton;
    },

    setUpEventListeners: function () {
        // Delete event listener
        let todosUl = document.querySelector("ul");
        todosUl.addEventListener("click", function(event) {
            let elementClicked = event.target;
            if (elementClicked.className === "deleteButton") {
                handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
            }
            else if (elementClicked.className === "toggleButton") {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }

        })
    }
}

view.setUpEventListeners();
