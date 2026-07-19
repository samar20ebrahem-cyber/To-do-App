const form = document.querySelector("form")
const userName = document.getElementById("name")
let savedName = localStorage.getItem("userName")
if(savedName){
    userName.value = savedName
}
form.addEventListener("submit",function(e){
    e.preventDefault()
    localStorage.setItem("userName", userName.value);
    window.location.href="/index.html"
    window.location.reload()
})
 