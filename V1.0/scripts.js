
let userTodo = [];
let userInput = $("#todo-input");


// Listens for user pressing enter key when adding a todo
userInput.keypress(function(e) {
    if (e.which === 13) {
        addTodo(userInput.val());
        updateTodo();
    }
});

// Listens for user to select a checkbox
$("input[name=todo-checkbox]").change(function() {
    if ($(this).is(":checked")) {
        let checkedTodoVal = $(this["value"]);
        console.log(checkedTodoVal);
    }
})


// Add a todo
function addTodo(textStr) {
    userTodo.push("" + textStr);
}

// Update todo list on screen
function updateTodo() {
    // Clears input text field after enter is hit
    userInput.val("");
    // Adds most current todo to display
    let i = userTodo.length - 1;
    $(".todos").prepend("<div class='todo-item' id='todo-item'" +  i + "'><input type='checkbox' class='todo-checkbox' value= '" + i + "'><li>" + userTodo[i] +"</li></div>");
}

// Select a todo
// function selectedTodo(i) {
//
// }

    // Select all todos

// Delete a single todo
function deleteTodo(i) {
    userTodo.splice(i, 1);
}

    // Delete multiple todos

    // Edit a todo
