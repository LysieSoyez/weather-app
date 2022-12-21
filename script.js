
const input=document.querySelector('input');
const button= document.querySelector('button');
let div_carte=document.getElementsByClassName('carte')[0];

button.addEventListener('click', () =>{
    div_carte.innerHTML=""
    let town= input.value
    let fetchApi= (town) => fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + town + "&cnt=8&units=metric&appid=359a6fa52c3e3c33862c31d9f9e5fc5f");
    
        fetchApi(town)
        .then((response)=>response.json())
        .then((json)=>{
            localStorage.setItem("data",JSON.stringify(json))
            console.log(json)
            let list= json.list
            for(let elem of list){

                //create a div for the head
                let div_head=document.createElement('div');
                div_head.classList.add("carte__head");
                div_carte.appendChild(div_head);


                
                //create a p for the degrees
                let head_deg=document.createElement('p');
                head_deg.classList.add("carte__head__deg");
                head_deg.textContent=((elem.main.temp).toFixed(0) + "°");
                div_head.appendChild(head_deg);

                //create a p for the hours
                let head_hour=document.createElement('p');
                head_hour.classList.add("carte__head__hour");
                head_hour.textContent=elem.dt_txt.split(" ")[1];
                div_head.appendChild(head_hour);
                


                //create a div for the infos
                let div_info=document.createElement('div');
                div_info.classList.add("carte__info__all");
                div_carte.appendChild(div_info);



                //create a div for the CLOUD info
                let div_cloud=document.createElement('div');
                div_cloud.classList.add("carte__info__cloud");
                div_info.appendChild(div_cloud);

                //create a p for the cloud
                let info_cloud=document.createElement('p');
                info_cloud.classList.add("info__cloud");
                info_cloud.textContent=elem.weather[0].description;
                div_cloud.appendChild(info_cloud);

                //create a p for the cloud image
                let cloud=document.createElement('img');
                cloud.classList.add("cloud");
                cloud.setAttribute("src","http://openweathermap.org/img/wn/"+elem.weather[0].icon+"@2x.png");
                div_cloud.appendChild(cloud);



                //create a div for the HUMIDITY info
                let div_humidity=document.createElement('div');
                div_humidity.classList.add("carte__info__humidity");
                div_info.appendChild(div_humidity);

                //create a p for the humidity
                let info_humidity=document.createElement('p');
                info_humidity.classList.add("info__humidity");
                info_humidity.textContent=elem.main.humidity;
                div_humidity.appendChild(info_humidity);

                //create a p for the humidity image
                let humidity=document.createElement('img');
                humidity.classList.add("humidity");
                humidity.setAttribute("src","")
                info_humidity.appendChild(humidity);



                //create a div for the PRESSURE info
                let div_pressure=document.createElement('div');
                div_pressure.classList.add("carte__info__pressure");
                div_info.appendChild(div_pressure);

                //create a p for the pressure
                let info_pressure=document.createElement('p');
                info_pressure.classList.add("info__pressure");
                info_pressure.textContent=elem.main.pressure;
                div_pressure.appendChild(info_pressure);

                //create a p for the pressure image
                let pressure=document.createElement('img');
                pressure.classList.add("pressure");
                pressure.setAttribute("src","")
                info_pressure.appendChild(pressure);



                //create a div for the WIND info
                let div_wind=document.createElement('div');
                div_wind.classList.add("carte__info__wind");
                div_info.appendChild(div_wind);

                //create a p for the wind
                let info_wind=document.createElement('p');
                info_wind.classList.add("info__wind");
                info_wind.textContent=(((elem.wind.speed)*3.6).toFixed(0) + " km/h");
                div_wind.appendChild(info_wind);

                //create a p for the wind image
                let wind=document.createElement('img');
                wind.classList.add("wind");
                wind.setAttribute("src","")
                info_wind.appendChild(wind);
            }
        })
})