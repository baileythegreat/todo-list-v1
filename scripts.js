
let userTodo = [];
let userInput = $("#todo-input");

// Listens for user pressing enter key when adding a todo
userInput.keypress(function(e) {
    if (e.which === 13) {
        addTodo(userInput.val());
        updateTodo();
    }
});

// Add a todo
function addTodo(textStr) {
    userTodo.push("" + textStr);
}

// Update todo list on screen
function updateTodo() {
    // Clears input text field after enter is hit
    userInput.val("");
    let i = userTodo.length - 1;
    $(".todos").prepend("<li>" + userTodo[i] + "</li>");
}

    // Select a todo

    // Select all todos

    // Delete a single todo

    // Delete multiple todos

    // Edit a todo

    // Move a todo
