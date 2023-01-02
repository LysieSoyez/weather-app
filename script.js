
const input=document.querySelector('input');
const button= document.querySelector('button');
let div_carte=document.getElementsByClassName('carte')[0];
let div_button=document.getElementsByClassName("div_button")[0];

//date du jour
let date = new Date().toLocaleDateString('en-CA');

//date du lendemain
let tomorrowDate= new Date(Date.now() + 1000 * 3600 * 24).toLocaleDateString('en-CA');
console.log(tomorrowDate);

//date 2jours après
let day_2= new Date(Date.now() + 1000 * 3600 * 48).toLocaleDateString('en-CA');
console.log(day_2);

//date 3jours après
let day_3= new Date(Date.now() + 1000 * 3600 * 72).toLocaleDateString('en-CA');
console.log(day_3);

//date 4jours après
let day_4= new Date(Date.now() + 1000 * 3600 * 96).toLocaleDateString('en-CA');
console.log(day_4);


button.addEventListener('click', () =>{
    div_carte.innerHTML=""
    div_button.innerHTML=""
    let town= input.value
    
    let fetchApi= (town) => fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + town + "&cnt=40&units=metric&appid=359a6fa52c3e3c33862c31d9f9e5fc5f");
    
        fetchApi(town)
        .then((response)=>response.json())
        .then((json)=>{
            localStorage.setItem("data",JSON.stringify(json))
            console.log(json)

            //display the town
            
            let ville=document.getElementsByClassName('ville')[0];
            ville.textContent= town;


            let list= json.list
            for(let elem of list){
                
                let splitDate=elem.dt_txt.split(" ")[0];

                //create a div for all of the cart
                let div_class=document.createElement('div');
                div_class.classList.add(
                    splitDate,
                    "class_all")
                div_carte.appendChild(div_class);

                //create a div for the head
                let div_head=document.createElement('div');
                div_head.classList.add("carte__head");
                div_class.appendChild(div_head);


                //create a p for the hours
                let head_hour=document.createElement('p');
                head_hour.classList.add("carte__head__hour");
                let hourS= elem.dt_txt.split(" ")[1];
                head_hour.textContent=hourS.split(":")[0] + "h00";
                div_head.appendChild(head_hour);


                //create a p for the degrees
                let head_deg=document.createElement('p');
                head_deg.classList.add("carte__head__deg");
                head_deg.textContent=((elem.main.temp).toFixed(0) + "°");
                div_head.appendChild(head_deg);



                //create a div for the CLOUD info
                let div_cloud=document.createElement('div');
                div_cloud.classList.add("carte__info__cloud");
                div_class.appendChild(div_cloud);

                //create a p for the cloud
                let info_cloud=document.createElement('p');
                info_cloud.classList.add("info__cloud");
                info_cloud.textContent=elem.weather[0].description;
                div_cloud.appendChild(info_cloud);


                //create a img for the cloud image
                let cloud=document.createElement('img');
                cloud.classList.add("cloud");
                cloud.setAttribute("src","http://openweathermap.org/img/wn/"+elem.weather[0].icon+"@2x.png");
                div_cloud.appendChild(cloud);


                //create a div for the wind and the pressure
                let div_wind_pressure=document.createElement('div');
                div_wind_pressure.classList.add("info__wind__pressure");
                div_class.appendChild(div_wind_pressure);

                //create a div for the PRESSURE info
                let div_pressure=document.createElement('div');
                div_pressure.classList.add("carte__info__pressure");
                div_wind_pressure.appendChild(div_pressure);

                //create a img for the pressure image
                let pressure=document.createElement('img');
                pressure.classList.add("pressure");
                pressure.setAttribute("src","./assets/pression.png")
                div_pressure.appendChild(pressure);

                //create a p for the pressure
                let info_pressure=document.createElement('p');
                info_pressure.classList.add("info__pressure");
                info_pressure.textContent=elem.main.pressure + "hPa";
                div_pressure.appendChild(info_pressure);




                //create a div for the WIND info
                let div_wind=document.createElement('div');
                div_wind.classList.add("carte__info__wind");
                div_wind_pressure.appendChild(div_wind);

                //create a img for the wind image
                let wind=document.createElement('img');
                wind.classList.add("wind");
                wind.setAttribute("src","./assets/wind.png");
                div_wind.appendChild(wind);

                //create a p for the wind
                let info_wind=document.createElement('p');
                info_wind.classList.add("info__wind");
                info_wind.textContent=(((elem.wind.speed)*3.6).toFixed(0) + " km/h");
                div_wind.appendChild(info_wind);

                
            }
            
            //create a button that will short every carte by date
            function createButton(bName, bDate) {

                //create a button for the 1st day
                let button_day = document.createElement("button");
                button_day.classList.add(
                    bDate,
                    "button_1");
                button_day.textContent = bName;
                div_button.appendChild(button_day);
                button_day.style.display = "block"

                //create a event to display the right day
                button_day.addEventListener("click", () => {
                    for (let elem of div_carte.children) {
                        elem.style.display = "none"
                        if (elem.classList.contains(bDate)) {
                            elem.style.display = "flex"
                        }
                    }
                })
            }

            console.log(list[0].dt_txt.split(" ")[0])
            createButton("today",date);
            createButton("tomorrow",tomorrowDate);
            createButton(day_2.substring(5),day_2);
            createButton(day_3.substring(5),day_3);
            createButton(day_4.substring(5),day_4);

        })
})