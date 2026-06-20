const subjectInput = document.querySelector(
'input[placeholder="Enter subject name"]'
);

const addSubjectBtn = document.querySelectorAll("button")[0];

const subjectList = document.querySelectorAll(".card")[0];

const taskSubject = document.querySelector("select");

const taskInput = document.querySelector(
'input[placeholder="Enter task"]'
);

const taskDate = document.querySelector(
'input[type="date"]'
);

const addTaskBtn = document.querySelectorAll("button")[1];

const taskContainer = document.querySelector(".task-card");

const totalTasks = document.querySelectorAll(".stat-box h3")[0];
const completedTasks = document.querySelectorAll(".stat-box h3")[1];
const remainingTasks = document.querySelectorAll(".stat-box h3")[2];
const progressPercent = document.querySelectorAll(".stat-box h3")[3];

const progressBar = document.querySelector(".progress");

let subjects =
JSON.parse(localStorage.getItem("subjects")) || [];

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

loadSubjects();
loadTasks();
updateStats();

/* ADD SUBJECT */

addSubjectBtn.addEventListener("click", () => {

let name = subjectInput.value.trim();

if(name === ""){
alert("Enter Subject Name");
return;
}

subjects.push(name);

localStorage.setItem(
"subjects",
JSON.stringify(subjects)
);

subjectInput.value = "";

loadSubjects();

});

/* LOAD SUBJECTS */

function loadSubjects(){

document
.querySelectorAll(".subject-item")
.forEach(item => item.remove());

taskSubject.innerHTML = "";

subjects.forEach(subject => {

let div = document.createElement("div");
div.className = "subject-item";
div.innerHTML = "📚 " + subject;

subjectList.appendChild(div);

let option = document.createElement("option");
option.textContent = subject;
option.value = subject;

taskSubject.appendChild(option);

});

}

/* ADD TASK */

addTaskBtn.addEventListener("click", () => {

let taskName = taskInput.value.trim();

if(taskName === ""){
alert("Enter Task");
return;
}

let task = {

subject: taskSubject.value,

name: taskName,

date: taskDate.value,

completed:false

};

tasks.push(task);

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

taskInput.value = "";
taskDate.value = "";

loadTasks();
updateStats();

});

/* LOAD TASKS */

function loadTasks(){

document
.querySelectorAll(".task-item")
.forEach(item => item.remove());

tasks.forEach((task,index)=>{

let div = document.createElement("div");

div.className = "task-item";

div.innerHTML = `

<input type="checkbox"
${task.completed ? "checked" : ""}>

<span style="
${task.completed ?
'text-decoration:line-through;color:gray'
: ''}">
${task.name}
</span>

<span class="tag">
${task.subject}
</span>

`;

let checkbox =
div.querySelector("input");

checkbox.addEventListener("change",()=>{

tasks[index].completed =
checkbox.checked;

localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);

loadTasks();
updateStats();

});

taskContainer.appendChild(div);

});

}

/* UPDATE STATS */

function updateStats(){

let total = tasks.length;

let completed =
tasks.filter(task =>
task.completed).length;

let remaining =
total - completed;

let percentage =
total === 0
? 0
: Math.round(
(completed/total)*100
);

totalTasks.textContent = total;
completedTasks.textContent = completed;
remainingTasks.textContent = remaining;
progressPercent.textContent =
percentage + "%";

progressBar.style.width =
percentage + "%";

}