//Color for the app name:
function randomRGB(){
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r},${g},${b})`;
}

const letters = document.querySelectorAll(".name");
for (let letter of letters) {
    setInterval(() => {
        letter.style.color = randomRGB();
    }, 1000);
};

// Select form
const form = document.querySelector("#form");
// Select inout
const input = document.querySelector("#input");
// Select todoList
const todoList = document.querySelector("#toDoList");
// Declare toDos List as empty array
let todos = [];

// Reference code from friend
if (localStorage.getItem("todos")){
    todos = JSON.parse(localStorage.getItem("todos"));
    for ( todo of todos){
        createList(todo);
    };
};


todoList.addEventListener("click", function(e){
     
    if (e.target.tagName === "LI"){
        e.target.classList.toggle("complete");
        for (item of todos){
            if (event.target.innerText.slice(-event.target.innerText.length, -2) === item.todo){
                item.complete = !item.complete;
            }
        }
        localStorage.setItem("todos", JSON.stringify(todos));

    } else if (e.target.tagName === "BUTTON"){
        const todoParentText = e.target.parentElement.innerText;
        let removeTodoIndex = null;
        for ( const [index, item] of todos.entries()) {
            if ( todoParentText.slice(-todoParentText.length, -2) === item.todo) {
                removeTodoIndex = index;
            }
        }
        todos.splice(removeTodoIndex, 1);
        e.target.parentElement.remove();
        localStorage.setItem("todos", JSON.stringify(todos));
    }
});

form.addEventListener("submit", function(e){
    e.preventDefault();

    if (!input.value) return;
    const newTodo = {todo: input.value, complete: false};
    createList(newTodo);
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    input.value = "";     
});

// Create function createList
function createList (item){
    const todoItem = document.createElement("li");
    const btn = document.createElement("button");    

    todoItem.className = 'todo';
    if (item.complete) {
        todoItem.classList.add("complete");
    }
    todoItem.innerText = item.todo;
    btn.innerText = 'x';
    
    todoItem.appendChild(btn);
    todoList.appendChild(todoItem);
};
