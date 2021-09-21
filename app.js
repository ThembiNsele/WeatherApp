
const city = document.querySelector('.city');
const date = document.querySelector('.date');
const temp = document.querySelector('.temp');
const weatherDescription = document.querySelector('.weather');
const hilow = document.querySelector('.hi-low');
const theInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-btn');
const now = new Date();
const err_message = document.querySelector('.error-box');

const api = {
    key: "c22c116aa41645a1b7fe2bacfe4d1e5e",
    base: "https://api.openweathermap.org/data/2.5/"
   }

let long;
let lat;

//Search button
searchButton.addEventListener('click', function(e){
    e.preventDefault()
    getWeather()
    document.querySelector(".search-box").value =""
})
theInput.addEventListener('keyup', function(e) {
    if(e.code===`Enter`){
    
        e.preventDefault()
        getWeather() 
        document.querySelector(".search-box").value =""  
    }
    
})


//geolocation function
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    long = position.coords.longitude;
    lat = position.coords.latitude;
// console.log(long, lat);
fetch(`${api.base}weather?lat=${lat}&lon=${long}&units=metric&appid=${api.key}`) 
.then((response) =>{

if(!response.ok) {
    throw new Error(`City not found`);
}

    return response.json()
}).then((data) =>{

    displayWeather(data)
}).catch(error=>{
    errMessage (error)

})
  })
}else{
    getWeather()
}


//call getweather function
function getWeather(){
    const searchBox = document.querySelector(".search-box").value

    fetch(`${api.base}weather?q=${searchBox}&units=metric&appid=${api.key}`)
    .then((response) =>{
        if(!response.ok) {
            throw new Error(`City not found`);
        }
        return response.json()
    }).then((data) =>{
        // console.log(data)
        displayWeather(data)
    }).catch(error=>{
        errMessage (error)
    })
}

//set DOM Elements from the API

function displayWeather(data){
    city.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    date.innerHTML = dateBuilder(now);
    weatherDescription.textContent = `${data.weather[0].main}`;
    hilow.innerText = `${Math.round(data.main.temp_min)}°C/ ${Math.round(data.main.temp_max)}°C`;
}


//call current date function
function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day}, ${date} ${month} ${year}`;

     } 

//Error function 
function errMessage (error) {
if(error) {
    err_message.innerHTML = `
    ${error} <span class="closebtn" onclick="this.parentElement.style.display='none';"

    >&times;</span
  >
    `
    err_message.style.display = 'block'
  }
    
} 







