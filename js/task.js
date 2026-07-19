const form = document.querySelector("form");
const title = document.getElementById("title");
const description = document.getElementById("desc");
const taskDate = document.getElementById("date");
const taskTime = document.getElementById("time");
const category = document.getElementById("category");
const priorityBtns = document.querySelectorAll(".priority-btn");
const colorOptions = document.querySelectorAll(".color-option");
let priority = "medium";
let color = "#c48b9f";
let tasks = [];
let savedTasks = localStorage.getItem("tasks");
if(savedTasks){
    tasks = JSON.parse(savedTasks);
}
priorityBtns.forEach(button=>{
    button.addEventListener("click",function(){
        priorityBtns.forEach(btn=>{
            btn.classList.remove("active");
        });
        this.classList.add("active");
        priority = this.dataset.priority;
    });
});
colorOptions.forEach(option=>{
    option.addEventListener("click",function(){
        colorOptions.forEach(item=>{
            item.classList.remove("active");
        });
        this.classList.add("active");
        color = this.dataset.color;
    });
});
form.addEventListener("submit",function(e){
    e.preventDefault();
    let task={
        id: Date.now(),
        title:title.value,
        description:description.value,
        date:taskDate.value,
        time:taskTime.value,
        category:category.value,
        priority:priority,
        color:color,
        completed: false,
    };
    tasks.push(task);
    localStorage.setItem("tasks",JSON.stringify(tasks));
    window.location.href="index.html";
});