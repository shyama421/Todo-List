const localStorageData = JSON.parse(localStorage.getItem("task")) || [];
let editTask = null;
let isEditOpen = false;

function setLocalStorage() {
    localStorage.setItem("task", JSON.stringify(localStorageData));
}

function focusInpt() {
    const task = document.getElementById('task');
    task.focus();
}

function taskRender() {
    const tasksHtml = localStorageData.map((obj, index) => {
        return `
            <div class="task-box ${obj.completed ? "completed" : ""}">
                <div class="task-design">
                    <div class="task-box-design">${obj.name}</div>
                    <div class="btns">
                        <button class="dlt-img change-btn" onclick="donetask(${index})">
                            <img src="/done.png" height="40px">
                        </button>
                        <button class="dlt-img" onclick="edittask(${index})">
                            <img src="/edit.png" height="40px">
                        </button>
                        <button class="dlt-img" onclick="deletetask(${index})">
                            <img src="/delete.png" height="40px">
                        </button>
                    </div>
                </div>
            </div>`;
    });

    const pendingTaskCount = document.getElementById('pendingTaskCount');
    pendingTaskCount.innerHTML = localStorageData.filter(task => !task.completed).length;

    const completeTaskCount = document.getElementById('completeTaskCount');
    completeTaskCount.innerHTML = localStorageData.filter(task => task.completed).length;

    const taskContainer = document.getElementById('taskContainer');
    taskContainer.innerHTML = tasksHtml.join('');
    focusInpt();
}

function taskStorageRender() {
    setLocalStorage();
    taskRender();
}

function taskAdd() {
    focusInpt();
    if (task.value.trim() === "") {
        return alert("Please add a Task");
    }
    if (editTask !== null) {
        localStorageData[editTask].name = task.value.trim();
        editTask = null;
    } else {
        localStorageData.push({ id: Date.now(), name: task.value.trim(), completed: false });
    }

    task.value = "";
    taskStorageRender(localStorageData);
}

function deletetask(index) {
    if (isEditOpen) {
        return
    }
    else {
        localStorageData.splice(index, 1);
    }

    taskStorageRender(localStorageData);
}

function edittask(index) {
    focusInpt();
    isEditOpen = true
    const taskObj = localStorageData[index];
    if (taskObj.completed) {
        return alert("This task is Done, You Can't Edit")
    }

    task.value = localStorageData[index].name;
    edit = index;
    taskStorageRender();
}

function donetask(index) {
    localStorageData[index].completed = !localStorageData[index].completed;
    taskStorageRender(localStorageData);
}

function clearall() {
    localStorageData.length = 0;
    taskStorageRender(localStorageData);
}
taskStorageRender();

