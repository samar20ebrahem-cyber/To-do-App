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
 

// 

const darkMode = document.getElementById("darkMode")
let savedTheme = localStorage.getItem('theme')
if(savedTheme === 'dark'){
    darkMode.checked = true
    document.body.classList.add('dark')
}

darkMode.addEventListener('change',() => {
    if (darkMode.checked) {
         document.body.classList.add('dark')
         localStorage.setItem("theme", 'dark')
     
      }else{
         document.body.classList.remove('dark')
         localStorage.setItem("theme", 'light')
         
      }
})
const themeOptions = document.querySelectorAll(".option");
const fontSize = document.getElementById("fontSize")
let savedFontSize = localStorage.getItem("fontSize")
if(savedFontSize){
    fontSize.value = savedFontSize;
    document.documentElement.style.fontSize = savedFontSize + "px";
}
fontSize.addEventListener("input", () => {
    document.documentElement.style.fontSize = fontSize.value + "px";
    localStorage.setItem("fontSize", fontSize.value);
});

const animationSpeed = document.getElementById("animationSpeed");

const languageCards = document.querySelectorAll(".card");

languageCards.forEach(card => {

    card.addEventListener("click", () => {

        languageCards.forEach(item => item.classList.remove("active"));

        card.classList.add("active");

        changeLanguage(card.dataset.lang);

    });

});