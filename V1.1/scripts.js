
let todoList = {
    // It should have a space to store todos
    todos: [],

    // It should have a way to add new todos
    addTodo: function(text) {
        todoList.todos.push({
            todoText: text,
            completed: false
        });
        this.displayTodos();
    },

    // It should have a way to display todos
    displayTodos: function() {
        let listLength = this.todos.length;
        if (listLength === 0) {
            console.log("Your todo list is empty!")
        } else {
            console.log("My todos: ")
            for (let i = 0; i < listLength; i++) {
                let completedDisplay;
                let todoText = this.todos[i].todoText;

                if (this.todos[i].completed === true) {
                     completedDisplay = "(x)";
                     console.log(completedDisplay + " " + todoText);
                 } else {
                     completedDisplay = "( )";
                     console.log(completedDisplay + " " + todoText);
                 }
            }
        }
    },

    // It should have a way to delete a todo
    deleteTodo: function(position) {
        this.todos.splice(position, 1);
        this.displayTodos();
    },

    // It should have a way to change a todo
    changeTodo: function(text, position) {
        let newTodo = text;
        let todoPosition = position;

        this.todos[todoPosition].todoText = newTodo;
        this.displayTodos();
    },

    // Switch a todo's completed property
    toggleCompleted: function(position) {
        this.todos[position].completed = !this.todos[position].completed;
        this.displayTodos();
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
        this.displayTodos();
    }

}

todoList.addTodo("new text");
todoList.addTodo("second todo");
todoList.addTodo("third todo");
