// First we access coordinates by City name entered
// Then we use that coordintaes(lat, lon) to access weather data 
// 2 Times Api called


const input = document.querySelector("#location-input");
const form = document.querySelector("#search-form");
const display = document.querySelector(".display")

let currentInput = "";  //To avoid Calling API for already present/Accessed data on screen for specific city


// Get Latitude/Longitude Location, coordinates of  city name entered in it
async function getGeoLocation(inputString){

    if(currentInput === inputString){
        // To avoid callling API for already present data on screen(stored earlier current input and compared)
        displayError("Data Already Accessed see");
        return null; //so (!coordinates) in eventListener
    }

    // 1. Get String and make it suitable to pass as parameter to URL--------------------
    // If Empty input Prompt User to enter and Stop
    if(inputString.length < 1){
        display.textContent = "Enter Valid Input";
        return null; //so (!coordinates) in eventListener
    }

    // Split it into array, clean leading spaces of each word, and filter out any empty words(elements)(as we split using "," so " ,   ," may give " " as elements)
    const cleanArrayLocation = inputString
        .split(",")                        
        .map(word => word.trim())
        .filter(word => word.length > 0);

    // Join it back with commas---
    // If input was "Nashik" -> becomes "Nashik"
    // If input was "Nashik, India" -> becomes "Nashik,India"
    const updatedLocationString = cleanArrayLocation.join(",");
  
    // 2. Final API URL for getting coordinates ---------------
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(updatedLocationString)}&limit=${5}&appid=${apiKey}`;

    try{
        
        // Call API and TRY ACCESS DATA
        const res = await fetch(url);

        // 1. CHECK FOR 401 UNAUTHORIZED ERRORS IMMEDIATELY
        if (res.status === 401) {
            displayError("Invalid or missing API key. Please check your apiKey variable.");
            return null;
        }

        // 2. CHECK FOR ANY OTHER HTTP ERRORS (404, 500, etc.) res.ok is always when 200
        if (!res.ok) {
            displayError(`Server Error: Received status code ${res.status}`);
            return null;
        }

        // 3. If the response is totally fine (200 OK), parse the JSON payload
        const locationData = await res.json();
        
        if(!locationData || locationData.length === 0){
            console.log("NO LOCATION FOUND YOUR SEARCH CRITERIA");
            // display Error
            displayError("NO LOCATION FOUND YOUR SEARCH CRITERIA");
            return null; //as no coordinates, so next function will check if(!foundcordinates) hhen only further
        }

        // CRUCIAL: we set this only when data is actually accessed.
        // Now if an error happened above, this line never runs, and the input isn't blocked.
        currentInput = inputString;

        
        // Return this CORDINATES as ARRAY
        const coordinates = [locationData[0].lat, locationData[0].lon];
        return coordinates; //EXACT [lat, lon] array

    }catch(err){
        // 4. If internet drops completely, display this on screen
        displayError(err.message); //check at very bottom what comes in when API exceeds limits
        return null; //as no coordinates, so next function will check if(!foundcordinates) hhen only further process
    }

    
}


// To get Weather at given coordinates
async function getWeatherForecast(coordinates) {
    
    try{
        
        // If no cordinates array(null, remember we return in case not found )
        if(!coordinates){
            return null; //we already printed in earlier getGeoLocation function, so need here
        }
    
        // if found
        const [lat, lon] = coordinates;
        
        //URL FOR  FINAL API CALL To GET WEATHER AT GIVEN CORDINATES
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        
    
        const response = await fetch(url);
        const foreCastData = await response.json();
        
        return foreCastData;

        
    }catch(err){
        // here also display
        displayError(err.message);
        return null;    
    }
    
}


// Initial Screen messages is already in HTML
function deleteInitialMessage(){
    
    const existingMessage = document.querySelector("#initialMessage");
    if(existingMessage){
        existingMessage.remove();
    }
}

// delete alreay existing message on display
function deleteErrorMessage(){
    const errorMessage = display.querySelector(".errorMessage");
    if(errorMessage){
        errorMessage.remove();
    }
}

// To display Error message in red
function displayError(errorString){
    
    // delete initial message
    deleteInitialMessage();
    // if already earlier one
    deleteErrorMessage();

    const error_p = document.createElement('p');
    error_p.classList.add("errorMessage");
    error_p.textContent = errorString;
    display.prepend(error_p);
}



// Main Display function to render weather data on screen-----------------------
function displayWeather(foreCastData) {
    // 1. Clear out layout banners and errors immediately
    deleteInitialMessage();
    deleteErrorMessage();

    // 2. Destructure data properties safely (Industry Standard)
    const { name, main: { temp, humidity }, weather } = foreCastData;
    const [weatherObject] = weather; // Grabs the first item from the array safely

    // 3. Locate explicit UI container points
    const displayMainContent = display.querySelector(".display-main-content");
    const displayDetails = display.querySelector(".display-details");

    // 4. Inject structural layouts directly via Template Literals
    displayMainContent.innerHTML = `
        <h2>${name}</h2>
        <img src="https://openweathermap.org/img/wn/${weatherObject.icon}@2x.png" alt="${weatherObject.main}">
        <p>${weatherObject.description}</p>
    `;

    displayDetails.innerHTML = `
        <p>Temperature : ${temp}\u00B0C</p>
        <p>Humidity : ${humidity}%</p>
        <p>Weather : ${weatherObject.main}</p>
    `;
    
    // 5. Clean, production-grade diagnostic printout
    console.log(`[UI Rendered] Weather loaded for ${name}: ${temp}°C, ${weatherObject.main}`);
}

// BELOW IS UNNECESSARY LOAD ON SCRIPT, SO ABOVE WORKS INDUSTRY STANDARD-------
// function displayWeather(foreCastData){
    
//     // Delete initial message
//     deleteInitialMessage();
//     // If screen has error message from failed attempt then remove it
//     deleteErrorMessage();


//     // Accessing major elements from DATA
//     const temp = foreCastData.main.temp;
//     const humidity = foreCastData.main.humidity;
//     const weatherObject = foreCastData.weather[0];
    
    
//     const displayMainContent = display.querySelector(".display-main-content");
//     const displayDetails = display.querySelector(".display-details");
//     // Reset First if already earliear data
//     displayMainContent.textContent = "";
//     displayDetails.textContent = "";
    
//     // Main Display Content
//     const h2 = document.createElement('h2');
//     const iconImg = document.createElement('img');
//     const description = document.createElement('p');

//     h2.textContent = foreCastData.name;
//     console.log(weatherObject.icon); //--------------------------
//     iconImg.src = `https://openweathermap.org/img/wn/${weatherObject.icon}@2x.png`;
//     description.textContent = weatherObject.description;

//     displayMainContent.append(h2);
//     displayMainContent.append(iconImg);
//     displayMainContent.append(description);
    
//     // Details(p means p tag)
//     const temp_p = document.createElement('p');
//     const humidity_p = document.createElement('p');
//     const weather_p = document.createElement('p');

//     temp_p.textContent = `Temperature : ${temp}\u00B0C`;
//     humidity_p.textContent = `Humidity : ${humidity}%`;
//     weather_p.textContent = `Weather : ${weatherObject.main}`;
    
//     displayDetails.append(temp_p);
//     displayDetails.append(humidity_p);
//     displayDetails.append(weather_p);    

// }



// WHEN FORM SUBMITS
form.addEventListener("submit", async (e)=>{

    e.preventDefault();

    
    // Get raw input convert to string
    const rawInputString = input.value.toString();
    const length = rawInputString.length;


    // Avoid empty or less than 4 letters city name
    if(length === 0){
        // display error
        displayError("Please Enter City Name First");
        return;
    }
    
    if(length < 4){
        // display error
        displayError("To be precise try to enter city names having letters not less than 4");
        return;

    }

    // Get Cordinates of input city name
    const coordinates = await getGeoLocation(rawInputString);
    // If coordinates does not exists means stop here
    if(!coordinates) return;

    // Get forecast data using coordinates, We get DATA OBJECT JSON
    const foreCastData = await getWeatherForecast(coordinates);

    // If does not exists then
    if(!foreCastData){
        //display error
        displayError("Currently Data Not Available for your search.");
        return;
    }


    // finally DISPLAY the retrived DATA
    displayWeather(foreCastData);

})


/*
if limit exceeds  response from API

{ "cod": 429,
"message": "Your account is temporary blocked due to exceeding of requests limitation of your subscription type. 
Please choose the proper subscription http://openweathermap.org/price"
} 


image: weather
https://openweathermap.org/payload/api/media/file/10d@2x.png
*/
