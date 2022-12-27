//Author API for Weather Data Retrieval
var API = "7667cfca874b74000c9b36ceae722891";

var searchButtonEl = document.querySelector('.btn');
var searchInputEl = document.querySelector('#search-input');
var searchResultsEl = document.querySelector('#search-results');
var resultContentEl = document.querySelector('#result-content');
var currentContentEl = document.querySelector('#current-content');

var currentDay = dayjs().format('YYYY-MM-DD');
var secondDay = dayjs().add(1,'day').format('YYYY-MM-DD');
var thirdDay = dayjs().add(2,'day').format('YYYY-MM-DD');
var fourthDay = dayjs().add(3,'day').format('YYYY-MM-DD');
var fifthDay = dayjs().add(4,'day').format('YYYY-MM-DD');
var sixthDay = dayjs().add(5,'day').format('YYYY-MM-DD');

var city = searchInputEl.value;

//5-day Forecast API
//Requirements: Latitude, Longitude, API Key.
var forecastRequestURL = 'https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=7667cfca874b74000c9b36ceae722891&units=metric';

//---------------------City Search Input & Dynamic List-------------------------

var cityList = [];

function renderSearches(){
    resultContentEl.innerHTML = "";

    //Render new button for each city Search
    for(var i = 0; i < cityList.length; i++){
        var list = cityList[i];

        var cityButton = document.createElement("btn");
        cityButton.textContent = list;
        cityButton.setAttribute("type", "button");
        cityButton.setAttribute("class", "btn");
        cityButton.setAttribute("id", "listMember");

        searchResultsEl.appendChild(cityButton);

    }
}

function init() {
    var storedSearches = JSON.parse(localStorage.getItem("storedSearches"));

    if(storedSearches !== null){
        cityList = storedSearches;
    } 
    
    renderSearches();
}

function storeSearches(){
    localStorage.setItem("storedSearches", JSON.stringify(cityList));
}

searchButtonEl.addEventListener("click", function(event){
    event.preventDefault();

    var searchText = searchInputEl.value.trim();

    
    //Cull Array member variables if array length extends beyond 3.
    if(cityList.length == 3){
        cityList.splice(0,1);
    } else{}

    cityList.push(searchText);
    cityList.reverse();

    storeSearches();
    renderSearches();
})

init();

//---------------------Weather Card Generation------------------------------

function generateWeatherCard(resultObj){
    
    if(resultObj == null){
        return
    } else {}   

    // Create Cards and Card Body
    var resultCard = document.createElement('div');
    var resultBody = document.createElement('div');

    // Create Card Elements
    var cityEl = document.createElement('h2');
    var titleEl = document.createElement('h3');
    var bodyContentEl = document.createElement('p');
    var bodyImageEl = document.createElement('img');

    if(resultObj !== parseCurrent){

        //Style Card
        resultCard.classList.add('card', 'bg-grey', 'text-dark', 'mb-3', 'p-3', 'col', 'row', 'm-1');
        resultBody.classList.add('card-body', 'col');

        resultCard.append(resultBody);
        titleEl.textContent = resultObj.date;
        

    } else {

        //Style Hero (Current Day) Card
        resultCard.classList.add('card', 'bg-lighterblue', 'text-dark', 'mb-3', 'p-3', 'col', 'row','m-1');
        resultBody.classList.add('card-body');
        resultCard.append(resultBody);
        // titleEl.textContent = resultObj.date;
        cityEl.textContent = resultObj.city + " (" + resultObj.date + ")";

    }     
    
    // Populate card elements with API Object Data
    if (resultObj.date) {
        bodyContentEl.innerHTML +=
          '<strong>Date:</strong> ' + resultObj.date + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Date:</strong> No Date Available.';
      }

      if (resultObj.icon) {
        bodyImageEl.setAttribute("src", "https://openweathermap.org/img/wn/" + resultObj.icon + "@2x.png");
        bodyImageEl.setAttribute("alt", "Picture depicting weather conditions at chosen City");
      } else {
        bodyImageEl.innerHTML +=
          '<strong>Icon:</strong> No Icon Available.';
      }
    
      if (resultObj.temp) {
        bodyContentEl.innerHTML +=
          '<strong>Temperature:</strong> ' + resultObj.temp + "\u00B0 C" + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Temperature:</strong>  No Temperature Available.';
      }

      if (resultObj.wind) {
        bodyContentEl.innerHTML +=
          '<strong>Wind Speed:</strong> ' + resultObj.wind + " Kmph" + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Wind Speed:</strong>  No Wind Measure Available.';
      }

      if (resultObj.humidity) {
        bodyContentEl.innerHTML +=
          '<strong>Humidity:</strong> ' + resultObj.humidity + "%" + '<br/>';
      } else {
        bodyContentEl.innerHTML +=
          '<strong>Humidity:</strong>  No Humidity Available.';
      }

      resultBody.append(cityEl, titleEl,bodyImageEl, bodyContentEl);

      if(resultObj !== parseCurrent){
        resultContentEl.appendChild(resultCard);
      } else {
        currentContentEl.appendChild(resultCard);
      }

      
    
}


//---------------------Retrieve Weather Data and Generate Usable Objects------------------------------
function setWeatherData(cityParam){

    
    console.log(cityParam);
    
    if(cityParam == "" || cityParam == null){
        
        return;
        
    } else {
        
        city = cityParam;
        var geoRequestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityParam + '&limit=1&appid=' + API + "&units=metric";
    }
    

    console.log(geoRequestURL);

    fetch(geoRequestURL)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {

            console.log(data);

            var currentObj = {
                date: currentDay,
                icon: data.list[0].weather[0].icon,
                temp: data.list[0].main.temp,
                wind: data.list[0].wind.speed,
                humidity: data.list[0].main.humidity,
                city: data.city.name + ", " + data.city.country,
               }

               console.log(currentObj);
               localStorage.setItem("currentObj", JSON.stringify(currentObj));

            for(var i = 0; i < data.list.length; i++){

                if(data.list[i].dt_txt == secondDay + " 00:00:00"){
                    var secondObj = {
                        date: secondDay,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }
                       console.log(secondObj);
                       localStorage.setItem("secondObj", JSON.stringify(secondObj));

                } else if(data.list[i].dt_txt == thirdDay + " 00:00:00"){
                    var thirdObj = {
                        date: thirdDay,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }
                       
                       console.log(thirdObj);
                       localStorage.setItem("thirdObj", JSON.stringify(thirdObj));
                       
                } else if(data.list[i].dt_txt == fourthDay + " 00:00:00"){
                    var fourthObj = {
                        date: fourthDay,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }
                       console.log(fourthObj);
                       localStorage.setItem("fourthObj", JSON.stringify(fourthObj));

                } else if(data.list[i].dt_txt == fifthDay + " 00:00:00"){
                    var fifthObj = {
                        date: fifthDay,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }
                       console.log(fifthObj);
                       localStorage.setItem("fifthObj", JSON.stringify(fifthObj));
                } else if(data.list[i].dt_txt == sixthDay + " 00:00:00"){
                    console.log("Sixth Day Hit!");
                    var sixthObj = {
                        date: sixthDay,
                        icon: data.list[i].weather[0].icon,
                        temp: data.list[i].main.temp,
                        wind: data.list[i].wind.speed,
                        humidity: data.list[i].main.humidity,
                       }
                       console.log(sixthObj);
                       localStorage.setItem("sixthObj", JSON.stringify(sixthObj));
                    }
            }          
        
        });
    



    
}


//-----------------------------Parse Weather Data from Local Storage on App. Start--------------------------------
    var parseCurrent = JSON.parse(localStorage.getItem("currentObj"));
    var parseSecond = JSON.parse(localStorage.getItem("secondObj"));
    var parseThird = JSON.parse(localStorage.getItem("thirdObj"));
    var parseFourth = JSON.parse(localStorage.getItem("fourthObj"));
    var parseFifth = JSON.parse(localStorage.getItem("fifthObj"));
    var parseSixth = JSON.parse(localStorage.getItem("sixthObj"));

    //generate main card
    generateWeatherCard(parseCurrent);
    //generate secondary cards
    generateWeatherCard(parseSecond);
    generateWeatherCard(parseThird);
    generateWeatherCard(parseFourth);
    generateWeatherCard(parseFifth); 
    generateWeatherCard(parseSixth);       
    

function renderCards(){
  
    generateWeatherCard(parseCurrent);
    generateWeatherCard(parseSecond);
    generateWeatherCard(parseThird);
    generateWeatherCard(parseFourth);
    generateWeatherCard(parseFifth);
    generateWeatherCard(parseSixth);

}


//----------------------AddEventListeners-----------------------------

searchButtonEl.addEventListener('click', setWeatherData(city));
searchButtonEl.addEventListener('click', function(){
    renderCards;

    setTimeout(()=> {
        location.reload();
     }
     ,300);
    
});

//---------------------Set City Value----------------------------

document.addEventListener("click", function(event){
    event.preventDefault();


    if(event.target.id == "listMember"){
        city = event.target.textContent;
        console.log("Selected City: " + city);

    } else if (searchInputEl.value !== ""){
        city = searchInputEl.value;

    } else {
        return;
    }

    
    

    setWeatherData(city);
    renderCards;

    setTimeout(()=> {
        location.reload();
     }
     ,300);
    
})

























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
