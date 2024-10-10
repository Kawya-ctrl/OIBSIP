document.getElementById('addTaskButton').addEventListener('click', addTask);
document.getElementById('taskDescription').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskTitle = document.getElementById('taskTitle').value.trim();
    const taskDescription = document.getElementById('taskDescription').value.trim();

    if (taskTitle === '' || taskDescription === '') {
        alert('Please enter both a title and a description for the task.');
        return;
    }

    const taskItem = createTaskItem(taskTitle, taskDescription);
    document.getElementById('pendingTaskList').appendChild(taskItem);
    clearInputs(); 
}

function createTaskItem(taskTitle, taskDescription) {
    const li = document.createElement('li');

    const title = document.createElement('span');
    title.textContent = `Title: ${taskTitle}`;
    
    const description = document.createElement('span');
    description.textContent = `Description: ${taskDescription}`;

    const timestamp = document.createElement('span');
    timestamp.textContent = ` (Added: ${new Date().toLocaleString()})`;

    
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const completeButton = document.createElement('button');
    completeButton.textContent = '✔️ Complete';
    completeButton.onclick = () => completeTask(li);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌ Delete';
    deleteButton.classList.add('delete');
    deleteButton.onclick = () => li.remove();

    const editButton = document.createElement('button');
    editButton.textContent = '✏️ Edit';
    editButton.onclick = () => editTask(li, title, description);

    buttonContainer.appendChild(completeButton);
    buttonContainer.appendChild(deleteButton);
    buttonContainer.appendChild(editButton); 

    li.appendChild(title);
    li.appendChild(description);
    li.appendChild(timestamp);
    li.appendChild(buttonContainer); 
    
    return li;
}

function editTask(taskItem, titleSpan, descriptionSpan) {
    const newTitle = prompt("Edit task title:", titleSpan.textContent.replace("Title: ", ""));
    const newDescription = prompt("Edit task description:", descriptionSpan.textContent.replace("Description: ", ""));

    if (newTitle !== null && newDescription !== null) {
        titleSpan.textContent = `Title: ${newTitle}`;
        descriptionSpan.textContent = `Description: ${newDescription}`;
    }
}

function completeTask(taskItem) {
    const completedTaskList = document.getElementById('completedTaskList');
    taskItem.querySelector('.button-container').remove(); 

    const completedTimestamp = document.createElement('span');
    completedTimestamp.textContent = ` (Completed: ${new Date().toLocaleString()})`;
    taskItem.appendChild(completedTimestamp);

    
    const deleteCompletedButton = document.createElement('button');
    deleteCompletedButton.textContent = '❌ Delete';
    deleteCompletedButton.classList.add('delete');
    deleteCompletedButton.onclick = () => taskItem.remove(); 

    
    const editCompletedButton = document.createElement('button');
    editCompletedButton.textContent = '✏️ Edit';
    editCompletedButton.onclick = () => editTask(taskItem, taskItem.children[0], taskItem.children[1]);  
   
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(editCompletedButton);
    buttonContainer.appendChild(deleteCompletedButton);

    
    taskItem.appendChild(buttonContainer);
    
    completedTaskList.appendChild(taskItem);
    taskItem.classList.add('completed');
}

function clearInputs() {
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
}
