const formInput = document.getElementById('form-input');
const formBtn = document.getElementById('form-btn');

const allBtn = document.getElementById('all-tasks-btn');
const completedBtn = document.getElementById('completed-tasks-btn');
const incompleteBtn = document.getElementById('incomplete-tasks-btn');

const incompleteContainer = document.getElementById('incomplete-task-container');
const completedContainer = document.getElementById('completed-task-container');

let tasks = [];

function render(filter = 'all') {
    incompleteContainer.innerHTML = '<h2>Невиконані завдання</h2>';
    completedContainer.innerHTML = '<h2>Виконані завдання</h2>';

    let filteredTask = tasks;

    if (filter === 'completed') {
        filteredTask = tasks.filter(task => task.completed)
    } else if (filter === 'incomplete') {
        filteredTask = tasks.filter(task => !task.completed)
    }

    filteredTask.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        const textTask = document.createElement('span');
        textTask.classList.add('task-text');
        textTask.textContent = task.text;

        const taskActions = document.createElement('div')
        taskActions.classList.add('task-actions')

        const taskCompletedBtn = document.createElement('button')
        taskCompletedBtn.classList.add('complete-btn');
        taskCompletedBtn.innerHTML = '&#10003;'
        taskCompletedBtn.addEventListener('click', () => {
            toggleTaskComplete(index)
        })

        const taskDeleteBtn = document.createElement('button')
        taskDeleteBtn.classList.add('delete-btn')
        taskDeleteBtn.innerHTML = '&#10006;'
        taskDeleteBtn.addEventListener('click', () => {
            deleteTask(index)
        })

        taskItem.appendChild(textTask)
        taskItem.appendChild(taskActions)
        taskActions.appendChild(taskCompletedBtn)
        taskActions.appendChild(taskDeleteBtn)

        if (task.completed) {
            completedContainer.appendChild(taskItem)
        } else {
            incompleteContainer.appendChild(taskItem)
        }
    })
}

function addTask() {
    const textTask = formInput.value.trim()
    if (textTask) {
        tasks.push({
            text: textTask,
            completed: false, 
        })
        formInput.value = ''
        render()
    }
}

function toggleTaskComplete(index) {
    tasks[index].completed = true;
    render()
}

function deleteTask(index) {
    tasks[index].completed = false; 
    render()
}

formBtn.addEventListener('click', addTask)
allBtn.addEventListener('click', () => render('all'))
completedBtn.addEventListener('click', () => render('completed'))
incompleteBtn.addEventListener('click', () => render('incomplete'))

render()