
const input=document.querySelector('input');
const button= document.querySelector('button');
let div_carte=document.getElementsByClassName('carte')[0];
let div_button=document.getElementsByClassName("div_button")[0];

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

                //create a div for all of the cart
                let div_class=document.createElement('div');
                div_class.classList.add(
                    elem.dt_txt.split(" ")[0],
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
            
            let date= new Date();

            //create a button for the 1st day
            let button_day1=document.createElement("button");
            button_day1.classList.add(
                date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()),
                "button_1");
            button_day1.textContent="Today";
            div_button.appendChild(button_day1);
            button_day1.style.display="block"

            //create a event to display the right day
            button_day1.addEventListener("click",()=>{
                for(let elem of div_carte.children){
                    elem.style.display="none"
                    if(elem.classList.contains(date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()))){
                        elem.style.display="flex"
                    }
                }
            })

            //create a button for the 2nd day
            let button_day2=document.createElement("button");
            button_day2.classList.add(
                date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()+1),
                "button_2");
            button_day2.textContent="Tomorrow";
            div_button.appendChild(button_day2);
            button_day2.style.display="block"

            //create a event to display the right day
            button_day2.addEventListener("click",()=>{
                for(let elem of div_carte.children){
                    elem.style.display="none"
                    if(elem.classList.contains(date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()+1))){
                        elem.style.display="flex"
                    }
                }
            })

            //create a button for the 3rd day
            let button_day3=document.createElement("button");
            button_day3.classList.add(
                date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()+2),
                "button_3");
            button_day3.textContent=(date.getDate()+2)+"-0"+(date.getMonth()+1);
            div_button.appendChild(button_day3);
            button_day3.style.display="block"

            //create a event to display the right day
            button_day3.addEventListener("click",()=>{
                for(let elem of div_carte.children){
                    elem.style.display="none"
                    if(elem.classList.contains(date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()+2))){
                        elem.style.display="flex"
                    }
                }
            })

            //create a button for the 4th day
            let button_day4=document.createElement("button");
            button_day4.classList.add(
                date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()+3),
                "button_4");
            button_day4.textContent=(date.getDate()+3)+"-0"+(date.getMonth()+1);
            div_button.appendChild(button_day4);
            button_day4.style.display="block"

            //create a event to display the right day
            button_day4.addEventListener("click",()=>{
                for(let elem of div_carte.children){
                    elem.style.display="none"
                    if(elem.classList.contains(date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()+3))){
                        elem.style.display="flex"
                    }
                }
            })

            //create a button for the 5th day
            let button_day5=document.createElement("button");
            button_day5.classList.add(
                date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()+4),
                "button_5");
            button_day5.textContent=(date.getDate()+4)+"-0"+(date.getMonth()+1);
            div_button.appendChild(button_day5);
            button_day5.style.display="block"

            //create a event to display the right day
            button_day5.addEventListener("click",()=>{
                for(let elem of div_carte.children){
                    elem.style.display="none"
                    if(elem.classList.contains(date.getFullYear()+"-0"+(date.getMonth()+1)+"-0"+(date.getDate()+4))){
                        elem.style.display="flex"
                    }
                }
            })
        })
})