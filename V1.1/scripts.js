
let todoList = {
    // It should have a space to store todos
    todos: [],

    // Allows adding new todos
    addTodo: function(text) {
        if (text !== "") {
            todoList.todos.push({
                todoText: text,
                completed: false
            });
        }
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
    changeTodo: function(elementClicked) {
        let parent = elementClicked.parentNode;
        let position = parent.parentNode.id;
        let newText = $("#edit" + position).val();

        if (!newText) {
            view.displayTodos();
        }
        else {
            todoList.changeTodo(newText, position);
            view.displayTodos();
        }
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

// Handles display and events
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
                let itemDiv = document.createElement("div");
                // Add toggle button
                let toggleButton = view.createToggleButton();
                listItem.appendChild(toggleButton);
                // Define text
                let todoText = todo.todoText;

                // Puts the text into its own div element (for event listener)
                listItem.appendChild(itemDiv);
                itemDiv.className = "listText";

                // Indicates completed status
                if (todo.completed === true) {
                     itemDiv.innerHTML = "(x) " + todoText;
                 } else {
                     itemDiv.innerHTML = "( ) " + todoText;
                 }
                 // Creates list elements with an id and delete button, within the unordered list
                 listItem.id = position;
                 todosUl.appendChild(listItem);
            })
        }
    },

    // Creates a toggle button
    createToggleButton: function() {
        let toggleButton = document.createElement("button");
        toggleButton.className = "toggleButton";
        return toggleButton;
    },

    // Creates a new text input to edit text
    createInputBox: function() {
        let inputBox = document.createElement("input");
        inputBox.className = "todoTextEdit";
        inputBox.id = "edit";
        return inputBox;
    },

    createEditButton: function() {
        let editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "editButton";
        return editButton;
    },

    openEdit: function(elementClicked) {
        // Open new text box and edit button
        let editTodo = view.createInputBox();
        let editButton = view.createEditButton();

        let parent = elementClicked.parentNode;
        let position = parent.id;

        // Appends elements to div containing text and clears displayed text
        elementClicked.innerHTML = "";
        elementClicked.appendChild(editTodo);
        elementClicked.appendChild(editButton);
        editTodo.focus();   // Automatically focus on edit text box
        editTodo.id = editTodo.id + position; // id = edit + todoPosition (edit0)
    },

    setUpEventListeners: function () {
        // Delete event listener
        let todosUl = document.querySelector("ul");
        todosUl.addEventListener("click", function(event) {
            let elementClicked = event.target;
            if (elementClicked.className === "toggleButton") {
                handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
            }
            else if (elementClicked.className === "editButton") {
                handlers.changeTodo(elementClicked);
            }
            else if (elementClicked.className === "listText") {
                // Deselects open edit boxes if another one is opened
                let editBox = document.querySelector(".todoTextEdit");
                if (editBox) {
                    view.displayTodos();
                }
            }
        })
        // Allows user to edits todos if existing todo is doubleclicked
        todosUl.addEventListener("dblclick", function(event) {
            let elementClicked = event.target;
            if (elementClicked.className === "listText") {
                view.openEdit(elementClicked);
                let editBox = document.querySelector(".todoTextEdit");
                editBox.addEventListener("keyup", function(e) {
                    // Listens for escape key while editing todo items
                    if (e.key === "Escape") {
                        view.displayTodos();
                    } // Listens for enter key and updates todo if pressed
                    else if (e.key === "Enter") {
                        handlers.changeTodo(editBox);
                    }
                })
            }
        })

        // Listens for enter input to add new todos
        let addTodo = document.querySelector("#addTodoInput");
        addTodo.addEventListener("keyup", function(e) {
            if (e.key === "Enter") {
                handlers.addTodo();
            }
        })
    }
}

view.setUpEventListeners();
