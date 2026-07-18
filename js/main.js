// Update Date
let today = new Date();
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
let day = today.getDay();     
let dateNumber = today.getDate(); 
let month = today.getMonth();  
let hour = today.getHours();   


const date = document.getElementById('today-date')
date.textContent =`${days[day]} ${dateNumber} ${months[month]} `
// 
let greeting = "";
if(hour>=5 && hour<12){
  greeting ='Good Morning';
}else if(hour>=12 && hour<17){
     greeting ='Good Afternoon';
}else if(hour>=17 && hour<20){
     greeting ='Good Evening';
}else{
    greeting ='Good Night';
}
const welcome = document.getElementById('welcome')
welcome.textContent = `${greeting}`

const tasksList = document.querySelector(".tasks-list");
let tasks = [];
let savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    tasks = JSON.parse(savedTasks);
}
tasks.forEach((task, index) => {
    tasksList.innerHTML += `
    <div class="task-card" style="border-left:6px solid ${task.color};">
     <button class="complete-btn ${task.completed ? "done" : ""}" data-index="${index}">
       <i class="fa-solid fa-check"></i>
      </button>
        <button class="delete-btn" data-index="${index}">
            <i class="fa-solid fa-trash"></i>
        </button>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <div class="task-footer">
            <span>${task.category}</span>
            <span class="priority ${task.priority}">
                ${task.priority}
            </span>
        </div>
       <div class="task-footer">
    <span>
        <i class="fa-regular fa-calendar"></i>
        ${task.date}
    </span>
    <span>
        <i class="fa-regular fa-clock"></i>
        ${task.time}
    </span>
</div>
<div class="task-tags">
    <span class="priority ${task.priority}">
        ${task.priority}
    </span>
    <span class="category">
        ${task.category}
    </span>
</div>
    </div>
    `;
})

// COMPLATE 
const doneBtns = document.querySelectorAll('.complete-btn')
doneBtns.forEach(button =>{
     button.addEventListener("click", function () {
       let index = this.dataset.index
       tasks[index].completed = !tasks[index].completed;
       localStorage.setItem('tasks',JSON.stringify(tasks))
       location.reload();
    });
})
// ===================== Delete Task =====================
const deleteBtns = document.querySelectorAll(".delete-btn");
deleteBtns.forEach(button => {
    button.addEventListener("click", function () {
        let index = this.dataset.index;
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        location.reload();
    });
});


// الكاردات
let todayDate = today.toISOString().split("T")[0];
let todayTasks = tasks.filter(task => {
    return task.date === todayDate
})
// CARD 1
let countTodayTasks = todayTasks.length;
const totalTasks = document.getElementById("totalTasks");
totalTasks.textContent = countTodayTasks
if(tasks.length > 0){
  let taskat = (todayTasks.length / tasks.length) * 100;
const fineshed = document.getElementById("finesh");
fineshed.textContent = taskat.toFixed(0) + "%";
const range = document.querySelector(".card-vs input");
range.value = taskat;

}else{
    console.log("No Tasks");
}
// CARD 2
let completedTasks = tasks.filter(task => task.completed);
let completedCount = completedTasks.length;
const completedTasksElement = document.getElementById("completedTasks");
completedTasksElement.textContent = completedCount;
let taskatak = (completedTasks.length / tasks.length) * 100;
const compFineshed = document.getElementById("comp");
compFineshed.textContent = taskatak.toFixed(0) + "%";
const rangeComp = document.getElementById("completedRange");
rangeComp.value = taskatak;

// CARD 3
const allTasksElement = document.getElementById("allTasks");
allTasksElement.textContent = tasks.length;

const allPercent = document.getElementById("all-taskat");
const allRange = document.getElementById("all");

if (tasks.length > 0) {
allPercent.textContent = "100%";
allRange.value = 100;
} else {
allPercent.textContent = "0%";
allRange.value = 0;
}
// CARD 4 
const overdueTasksList = tasks.filter(task => {
    return task.date < todayDate && !task.completed;
});
const overdueTasksCount = overdueTasksList.length;
const overdueTasksCountElement = document.getElementById("overdueTasks");
overdueTasksCountElement.textContent = overdueTasksCount;
const overduePercentElement = document.getElementById("overduePercent");
const overdueRange = document.getElementById("overdueRange");
let overdueTasksPercent = 0;
if (tasks.length > 0) {
    overdueTasksPercent = (overdueTasksCount / tasks.length) * 100;
}
overduePercentElement.textContent = overdueTasksPercent.toFixed(0) + "%";
overdueRange.value = overdueTasksPercent;