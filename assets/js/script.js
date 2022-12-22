var resultContentEl = document.querySelector('#result-content');
var searchButtonEl = document.querySelector('.btn');
var searchInputEl = document.querySelector('#search-input');




var API = "7667cfca874b74000c9b36ceae722891";

var currentDay = dayjs().format('YYYY-MM-DD');
var secondDay = dayjs().add(1,'day').format('YYYY-MM-DD');
var thirdDay = dayjs().add(2,'day').format('YYYY-MM-DD');
var fourthDay = dayjs().add(3,'day').format('YYYY-MM-DD');
var fifthDay = dayjs().add(4,'day').format('YYYY-MM-DD');

//5-day Forecast API
//Requirements: Latitude, Longitude, API Key.
var forecastRequestURL = 'api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7667cfca874b74000c9b36ceae722891';
//--
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that
// city is added to the search history


//Geocode API
//Requirements: city name, API Key

// function makeGamePlayer(){
//     var myobj = {
//         name: "Harry",
//         score: 7,
//         gamesplayed: 3,
//     }

//     return myobj;
// }

// // var player = makeGamePlayer();

// // console.log(player);

// console.log(makeGamePlayer());




function generateWeatherCard(resultObj){
    
    if(resultObj == null){
        return
    } else {}   

    // console.log(resultObj);

    //set up <div> to hold result
    var resultCard = document.createElement('div');
    resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

    var resultBody = document.createElement('div');
    resultBody.classList.add('card-body');
    resultCard.append(resultBody);

    var titleEl = document.createElement('h3');
    titleEl.textContent = resultObj.date;

    var bodyContentEl = document.createElement('p');
    var bodyImageEl = document.createElement('img');
    

    if (resultObj.date) {
        bodyContentEl.innerHTML +=
          '<strong>Date:</strong> ' + resultObj.date + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Date:</strong> No Date Available.';
      }

      if (resultObj.icon) {
        bodyImageEl.setAttribute("src", "http://openweathermap.org/img/wn/" + resultObj.icon + "@2x.png");
        bodyImageEl.setAttribute("alt", "Picture depicting weather conditions at chosen City");
      } else {
        bodyImageEl.innerHTML +=
          '<strong>Icon:</strong> No Icon Available.';
      }
    
      if (resultObj.temp) {
        bodyContentEl.innerHTML +=
          '<strong>Temperature:</strong> ' + resultObj.temp + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Temperature:</strong>  No Temperature Available.';
      }

      if (resultObj.wind) {
        bodyContentEl.innerHTML +=
          '<strong>Wind Speed:</strong> ' + resultObj.wind + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Wind Speed:</strong>  No Wind Measure Available.';
      }

      if (resultObj.humidity) {
        bodyContentEl.innerHTML +=
          '<strong>Humidity:</strong> ' + resultObj.humidity + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Humidity:</strong>  No Humidity Available.';
      }

      resultBody.append(titleEl,bodyImageEl, bodyContentEl);

      resultContentEl.append(resultCard);
    
}



function setWeatherData(event){

    event.preventDefault();

    var city = searchInputEl.value;

    console.log("Retrieve/Set Data")
    console.log(city);

    var geoRequestURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&limit=1&appid=' + API;

    console.log(geoRequestURL);

    fetch(geoRequestURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {

            

            for(var i = 0; i < data.list.length; i++){

                if(data.list[i].dt_txt == currentDay + " 12:00:00"){
                    

                    var currentObj = {
                        date: data.list[i].dt_txt,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }

                       console.log(currentObj);
                       console.log(data.list[i].weather[0].icon);
                       localStorage.setItem("currentObj", JSON.stringify(currentObj));

                } else if(data.list[i].dt_txt == secondDay + " 12:00:00"){
                    var secondObj = {
                        date: data.list[i].dt_txt,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }
                       console.log(secondObj);
                       localStorage.setItem("secondObj", JSON.stringify(secondObj));

                } else if(data.list[i].dt_txt == thirdDay + " 12:00:00"){
                    var thirdObj = {
                        date: data.list[i].dt_txt,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }
                       
                       console.log(thirdObj);
                       localStorage.setItem("thirdObj", JSON.stringify(thirdObj));
                       
                } else if(data.list[i].dt_txt == fourthDay + " 12:00:00"){
                    var fourthObj = {
                        date: data.list[i].dt_txt,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }
                       console.log(fourthObj);
                       localStorage.setItem("fourthObj", JSON.stringify(fourthObj));

                } else if(data.list[i].dt_txt == fifthDay + " 12:00:00"){
                    var fifthObj = {
                        date: data.list[i].dt_txt,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }
                       console.log(fifthObj);
                       localStorage.setItem("fifthObj", JSON.stringify(fifthObj));
                } 

            }          

        });
    



    
}

    var parseCurrent = JSON.parse(localStorage.getItem("currentObj"));
    var parseSecond = JSON.parse(localStorage.getItem("secondObj"));
    var parseThird = JSON.parse(localStorage.getItem("thirdObj"));
    var parseFourth = JSON.parse(localStorage.getItem("fourthObj"));
    var parseFifth = JSON.parse(localStorage.getItem("fifthObj"));

    console.log(parseCurrent);
    console.log(parseSecond);
    console.log(parseThird);
    console.log(parseFourth);
    console.log(parseFifth);

    generateWeatherCard(parseCurrent);
    generateWeatherCard(parseSecond);
    generateWeatherCard(parseThird);
    generateWeatherCard(parseFourth);
    generateWeatherCard(parseFifth);    
    

function renderCards(){

    console.log("Render Data");
    
    generateWeatherCard(parseCurrent);
    generateWeatherCard(parseSecond);
    generateWeatherCard(parseThird);
    generateWeatherCard(parseFourth);
    generateWeatherCard(parseFifth);


}





searchButtonEl.addEventListener('click', setWeatherData);
searchButtonEl.addEventListener('click', function(){
    renderCards;

    // setTimeout(()=> {
    //     location.reload();
    //  }
    //  ,200);
    
});






















// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon
// representation of weather conditions, the temperature, the humidity, and the wind speed

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date,
// an icon representation of weather conditions, the temperature, the wind speed,
// and the humidity

// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city






//first for-loop attempt


            // console.log(data);

            // var currentDayObj = {
            //     currentDayEle: currentDay,
            // }
            
            // return currentDayObj;
