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
// Greeting
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
const avatar = document.getElementById('avatar')
let userName = localStorage.getItem("userName");
if(userName){
    welcome.textContent = `${greeting}, ${userName} 👋`;
}else{
    welcome.textContent = greeting;
}

const tasksList = document.querySelector(".tasks-list")
let tasks = [];
let savedTasks = localStorage.getItem("tasks")
if (savedTasks) {
    tasks = JSON.parse(savedTasks)
}

// // AVATAR 
// if(userName){
//     avatar.textContent = userName.charAt(0).toUpperCase()
// }



// ===================== FILTERS =====================

const allBtn = document.getElementById("allBtn")
const todayBtn = document.getElementById("todayBtn")
const completedBtn = document.getElementById("completedBtn")
const overdueBtn = document.getElementById("overdueBtn")

let todayDate = today.toISOString().split("T")[0];

let todayTasks = tasks.filter(task => {
    return task.date === todayDate
})
// Completed Tasks
let completedTasks = tasks.filter(task => {
    return task.completed
})
// Overdue Tasks
let overdueTasksList = tasks.filter(task => {
    return task.date < todayDate && !task.completed
})


function displayTasks(array) {
    tasksList.innerHTML = ""

    array.forEach((task) => {
    tasksList.innerHTML += `
    <div class="task-card" style="border-left:6px solid ${task.color};">
        <button
            class="complete-btn ${task.completed ? "done" : ""}"
            data-id="${task.id}">
            <i class="fa-solid fa-check"></i>
        </button>
        <button
            class="delete-btn"
            data-id="${task.id}">
            <i class="fa-solid fa-trash"></i>
        </button>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <div class="task-info">
            <span style="background:#cffaff;" class="date">
                <i class="fa-regular fa-calendar"></i>
                ${task.date} 
            </span>
            <span style="background:#cffaff" class="time">
                <i class="fa-regular fa-clock"></i>
                ${task.time}
            </span>
            <span
                class="priority ${task.priority}"
                style="background:${task.color}; color:white;">
                ${task.priority}
            </span>
            <span
                class="category"
                style="background:${task.color}; color:white;">
                ${task.category}
            </span>
        </div>
    </div>
    `;
});
// Complete 
    const doneBtns = document.querySelectorAll(".complete-btn")

    doneBtns.forEach(button => {
        button.addEventListener("click", function () {
            let id = Number(this.dataset.id)
            let task = tasks.find(task => task.id === id)
            task.completed = !task.completed
            localStorage.setItem("tasks", JSON.stringify(tasks))
            location.reload()
        });
              });
  //DELETE
    const deleteBtns = document.querySelectorAll(".delete-btn")

    deleteBtns.forEach(button => {
        button.addEventListener("click", function () {
           let id = Number(this.dataset.id)
          tasks = tasks.filter(task => task.id !== id)
            localStorage.setItem("tasks", JSON.stringify(tasks))
            location.reload()
        });
    });
}

// الكاردات

// CARD 1
const totalTasks = document.getElementById("totalTasks")
const fineshed = document.getElementById("finesh")
const todayRange = document.getElementById("todayRange")
totalTasks.textContent = todayTasks.length
let todayPercent = 0
if (tasks.length > 0) {
    todayPercent = (todayTasks.length / tasks.length) * 100
}
fineshed.textContent = todayPercent.toFixed(0) + "%"
todayRange.value = todayPercent

// CARD 2
const completedTasksElement = document.getElementById("completedTasks")
const comp = document.getElementById("comp")
const completedRange = document.getElementById("completedRange")
completedTasksElement.textContent = completedTasks.length
let completedPercent = 0
if (tasks.length > 0) {
    completedPercent = (completedTasks.length / tasks.length) * 100
}
comp.textContent = completedPercent.toFixed(0) + "%"
completedRange.value = completedPercent

// CARD 3
const allTasksElement = document.getElementById("allTasks")
const allTaskat = document.getElementById("all-taskat")
const allRange = document.getElementById("all")

allTasksElement.textContent = tasks.length

if (tasks.length > 0) {
    allTaskat.textContent = "100%"
    allRange.value = 100
} else {
    allTaskat.textContent = "0%"
    allRange.value = 0
}

// CARD 4 
const overdueTasks = document.getElementById("overdueTasks")
const overduePercent = document.getElementById("overduePercent")
const overdueRange = document.getElementById("overdueRange")

overdueTasks.textContent = overdueTasksList.length

let overdueValue = 0

if (tasks.length > 0) {
    overdueValue = (overdueTasksList.length / tasks.length) * 100
}
overduePercent.textContent = overdueValue.toFixed(0) + "%"
overdueRange.value = overdueValue

//FILTER EVENTS 
allBtn.addEventListener("click", function () {
    setActive(this);
    displayTasks(tasks);
});

todayBtn.addEventListener("click", function () {
    setActive(this);
    displayTasks(todayTasks);
});

completedBtn.addEventListener("click", function () {
    setActive(this);
    displayTasks(completedTasks);
});

overdueBtn.addEventListener("click", function () {
    setActive(this);
    displayTasks(overdueTasksList);
});
const notificationCount = document.getElementById("notificationCount")
const pendingTodayTasks = tasks.filter(task => {
    return task.date === todayDate && !task.completed
})
const notificationsNumber =
    overdueTasksList.length + pendingTodayTasks.length
    notificationCount.textContent = notificationsNumber
    notificationCount.textContent = notificationsNumber;
    if (notificationsNumber === 0) {
    notificationCount.style.display = "none"
   } else {
    notificationCount.style.display = "flex"
}

// BG-COLORS
const filterBtns = document.querySelectorAll(".filter-btn");
function setActive(button){
    filterBtns.forEach(btn=>{
        btn.classList.remove("active");
    });
    button.classList.add("active");
}
// SEARCH
const search = document.getElementById("search");
search.addEventListener('input', function(){
    let value = this.value.toLowerCase()
    let searchTasks = tasks.filter(task=>{
        return task.title.toLowerCase().includes(value);
        
    })
    displayTasks(searchTasks)
})
displayTasks(tasks)