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

// AVATAR 
if(userName){
    avatar.textContent = userName.charAt(0).toUpperCase()
}

const notificationsList = document.querySelector(".notifications-list")
const todayDate = today.toISOString().split("T")[0]
const overdueTasks = tasks.filter(task => {
    return task.date < todayDate && !task.completed;
})

function displayTasks(array) {
    notificationsList.innerHTML = ""

    array.forEach((task) => {
    notificationsList.innerHTML += `
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
        })
    })
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

  displayTasks(tasks);

// SEARCH
const search = document.getElementById("search");
search.addEventListener('input', function(){
    let value = this.value.toLowerCase()
    let searchTasks = tasks.filter(task=>{
        return task.title.toLowerCase().includes(value);
        
    })
     displayTasks(searchTasks)
})


