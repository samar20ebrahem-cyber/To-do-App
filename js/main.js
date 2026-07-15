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
