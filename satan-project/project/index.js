import { createP } from "./module/Paragraphe.mjs";
import { createImg } from "./module/Images.mjs";
import { createButton } from "./module/Button.mjs";

const input=document.querySelector('input');
const button= document.querySelector('button');
let div_carte=document.getElementsByClassName('carte')[0];
let div_button=document.getElementsByClassName("div_button")[0];

//date du jour
let date = new Date().toLocaleDateString('en-CA');

//date du lendemain
let tomorrowDate= new Date(Date.now() + 1000 * 3600 * 24).toLocaleDateString('en-CA');

//date 2jours après
let day_2= new Date(Date.now() + 1000 * 3600 * 48).toLocaleDateString('en-CA');

//date 3jours après
let day_3= new Date(Date.now() + 1000 * 3600 * 72).toLocaleDateString('en-CA');

//date 4jours après
let day_4= new Date(Date.now() + 1000 * 3600 * 96).toLocaleDateString('en-CA');


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
                let hourS=elem.dt_txt.split(" ")[1];
                createP("carte__head__hour",hourS.split(":")[0] + "h00",div_head);

                //create a p for the degrees
                createP("carte__head__deg",((elem.main.temp).toFixed(0) + "°"),div_head)


                //create a div for the CLOUD info
                let div_cloud=document.createElement('div');
                div_cloud.classList.add("carte__info__cloud");
                div_class.appendChild(div_cloud);
                
                //create a p for the cloud info
                createP("info__cloud",elem.weather[0].description,div_cloud)

                //create a img for the cloud image
                createImg("cloud","http://openweathermap.org/img/wn/"+elem.weather[0].icon+"@2x.png",div_cloud)


                //create a div for the wind and the pressure
                let div_wind_pressure=document.createElement('div');
                div_wind_pressure.classList.add("info__wind__pressure");
                div_class.appendChild(div_wind_pressure);

                //create a div for the PRESSURE info
                let div_pressure=document.createElement('div');
                div_pressure.classList.add("carte__info__pressure");
                div_wind_pressure.appendChild(div_pressure);

                //create a img for the pressure image
                createImg("pressure","./project/assets/pression.png",div_pressure);

                //create a p for the pressure
                createP("info__pressure",elem.main.pressure+"hPa",div_pressure);


                //create a div for the WIND info
                let div_wind=document.createElement('div');
                div_wind.classList.add("carte__info__wind");
                div_wind_pressure.appendChild(div_wind);

                //create a img for the wind image
                createImg("wind","./project/assets/wind.png",div_wind);

                //create a p for the wind
                createP("info__wind",(((elem.wind.speed)*3.6).toFixed(0)+" km/h"),div_wind)
            }
            
            console.log(list[0].dt_txt.split(" ")[0])
            createButton("today",date, div_button, div_carte);
            createButton("tomorrow",tomorrowDate, div_button, div_carte);
            createButton(day_2.substring(5),day_2, div_button, div_carte);
            createButton(day_3.substring(5),day_3, div_button, div_carte);
            createButton(day_4.substring(5),day_4, div_button, div_carte);

        })
})