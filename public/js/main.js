const submitBtn = document.getElementById('submit-btn');
const cityname = document.getElementById('cityname');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');
const dataHide = document.querySelector('.middle_layer');
const day = document.getElementById('day');
const todayDate = document.getElementById('today_date');


const getInfo = async(event) =>{
    event.preventDefault(); //this metjod is used to prevent automatic reload of function
    let cityVal = cityname.value;
    if(cityVal === ""){
        city_name.innerText = "Please enter a name before you search";
        dataHide.classList.add('data_hide');
    }else{
        try{
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=0f39eb34c66f9cc9dcb0c3818d50c6da`;
            const response = await fetch(url);
            const data = await response.json(); //to convert json to js object
            const arrData = [data];

            temp_real_val.innerText = arrData[0].main.temp;
            temp_status.innerText = arrData[0].weather[0].main;
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            const tempMod = arrData[0].weather[0].main;

            if(tempMod == "Clear"){
                temp_status.innerHTML = '<i class="fas fa-sun" style="color: #FFC312;"></i>'
            }else if(tempMod == "Clouds"){
                temp_status.innerHTML = '<i class="fas fa-cloud" style="color: #f1f2f6;"></i>'
            }else if(tempMod == "Rain"){
                temp_status.innerHTML = '<i class="fas fa-cloud-rain" style="color: #a4b0be;"></i>'
            }else {
                temp_status.innerHTML = '<i class="fas fa-cloud" style="color: #44c3de;"></i>'
            }

            const getCurrentDay = () => {
                let weekday = new Array(7);
                weekday[0] = "Sun";
                weekday[1] = "Mon";
                weekday[2] = "Tue";
                weekday[3] = "Wed";
                weekday[4] = "Thur";
                weekday[5] = "Fri";
                weekday[6] = "Sat";
    
                let currentTime = new Date();
                let day = weekday[currentTime.getDay()];
                return day;
            };
    
            const getCurrentTime = () => {
    
                var months =[
                    "Jan","Feb","Mar","Apr","May","June","July","Aug","Sept",
                    "Oct", "Nov", "Dec",
                ];
                var now = new Date();
                var month = months[now.getMonth()];
                var date = now.getDate();
    
                return `${month} ${date}`;
            };
           
            day.innerHTML = getCurrentDay();
            todayDate.innerHTML = getCurrentTime();
    
            dataHide.classList.remove('data_hide');

        }catch{
            city_name.innerText = "Please enter the city name properly";
            dataHide.classList.add('data_hide');
        }

    }
}


submitBtn.addEventListener('click',getInfo);