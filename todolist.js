var btnElement = document.querySelector('button');
var inputElement = document.querySelector('.content');

    let tasks = getTasksFromLocalStorage();
    renderTasks(tasks);

btnElement.addEventListener('click', function() {
    if (inputElement.value === "") {
        return alert("Please input your task");
        
    }
    var taskId = this.getAttribute('id');
    let tasks = getTasksFromLocalStorage();
    let task = {name: inputElement.value}
    if (taskId == 0 || taskId) {
        tasks[taskId] = task;
        // this.removeAttribute('id')
    } else {
        tasks.push(task);
    }

    inputElement.value = "";
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks(tasks);

})

function EditTask(id) {
    let tasks = getTasksFromLocalStorage();
    if (tasks.length > 0) {
        inputElement.value = tasks[id].name;
        btnElement.setAttribute('id', id);
    }
}

function DeleteTask(id) {
    if(confirm("Are you sure to delete this task")) {
        let tasks = getTasksFromLocalStorage();
        tasks.splice(id, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks(getTasksFromLocalStorage());
    }
}
function renderTasks(tasks = []) {
    let content = '<ul>';

    tasks.map((value, index) => {
        content += `<li key=${index}>
            <div>${value.name}</div>
            <a href="#" onclick="EditTask(${index})">Edit</a>
            <a href="#" onclick="DeleteTask(${index})">Delete</a>
        </li>`
    })
    content +='</ul>';
    document.querySelector('.result').innerHTML = content;

}

function getTasksFromLocalStorage () {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
}