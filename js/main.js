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
            <span>${task.date}</span>
            <span>${task.time}</span>
        </div>
    </div>
    `;
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