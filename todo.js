// Taling an array to store all the inputs to store
let tasksArray = [];

const addTaskInput = document.getElementById("add");
const totalTask = document.getElementById("task-counter");
const tasksList = document.getElementById("list");


//this will create an Li tag and append it to the UI
function addtaskToDOM(task){
    const li = document.createElement('li');

    li.innerHTML = `
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : '' } class="custom-checkbox">
                <label for="${task.id}">${task.text}</label>
                <img src="delete.svg" class="delete" data-id="${task.id}">
            
    `;

    tasksList.append(li);
}


// to render the list of to-dos
function renderList(){
    //first make the list on UI empty
    tasksList.innerHTML = '';

    for(let i=0; i<tasksArray.length; i++){
        addtaskToDOM(tasksArray[i]);
    }

    totalTask.innerHTML = tasksArray.length;
    
}
// to mark the task if completed or not
function toggleCompletion(taskId){

    //loop over the array and find if tha taskId matches the id and toggle the completed field;
    const newTasksArray = tasksArray.filter(function(task){
        return task.id == taskId;
    })

    if(newTasksArray.length > 0){
        
        const currentTask = newTasksArray[0];

        currentTask.completed = !currentTask.completed;
        renderList();
        showNotification("task toggled successfully")
    }

    showNotification("could not toggle");
}
//If we want to deleet the task
function deleteTask(taskId){
    const newTasksArray = tasksArray.filter(function(task){
            return task.id !== taskId;
    })

    tasksArray = newTasksArray;
    renderList();
    showNotification("task has been deleted successfully");
    return;
}
// to add the task to the to do list
function addTask(task){
    // add the task to given tasks array and render the lists;

    if(task){
        tasksArray.push(task);
        renderList();
        showNotification("Task has been added successfully");
        return;
    }

    showNotification("Task can't be added");
}
//to show the notification what what has been done i.e added task, deleted task, toggled etc.



// functionality after user press the key
function handleInputKeypress(e){
    if(e.key == "Enter"){
        const text = e.target.value;
        console.log('text', text)
        if(!text){
            showNotification("Task text can not be empty");
            return;
        }
        const task = {
            text : text,
            id : Date.now().toString(),
            completed : false
        }
        //once the user press enter the input box should be empty
        e.target.value = '';
        addTask(task);
    }
    
}

function handleClickListener(e){
    const target = e.target;
    // console.log(target);

    //grab the di of the task
    if(target.className === 'delete'){
        const taskId = target.dataset.id;
        deleteTask(taskId);
    }else if(target.className ==='custom-checkbox'){
        const taskId = target.id; //'cause in input box we don't have data-id
        toggleTask(taskId);
        return;
    }
}


function initializeApp(){
addTaskInput.addEventListener("keyup", handleInputKeypress);

document.addEventListener('click', handleClickListener);
}

initializeApp();