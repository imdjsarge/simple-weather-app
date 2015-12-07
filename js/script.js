$(document).ready(function () {

    console.log("hello");



    weatherApp = {

            $targetArea: $("#weather"),

            weatherApiKey: "",

            localStorageKey: "openWeatherApi",

            getFormData: function () {
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.weatherApiKey = $("#apikey").val().trim();
                    weatherApp.saveApiKey();
                }

                var zip = $("#zip").val().trim();
                if (zip === null || zip.length < 5) {

                    weatherApp.$targetArea.html("Enter a zip code");
                } else {
                    weatherApp.getWeatherData(zip);
                }

            },

            getWeatherData: function (zipcode) {
                var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
                $.getJSON(url, function (data) {

                    if (data.cod === 200) {
                        weatherApp.$targetArea.html("Success!");

                        Desc = $("<p>").insertAfter("#weather");

                        weatherDesc = data.weather[0].description;
                        weatherApp.$targetArea.html(weatherDesc).insertAfter("p");
                        
                        console.log(weatherDesc);

                        weatherTemp = data.main[0].temp + "&units=imperial";



                        console.log(weatherTemp);

                    } else {
                        weatherApp.$targetArea.html("Sorry, no weather data is available.  Try again later.");
                    }

                }).fail(function () {
                    weatherApp.$targetArea.html("Sorry, no weather data is available.  Try again later.");
                });

            },


            loadApiKey: function () {
                if (typeof (localStorage) === 'undefined') {
                    weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
                } else {
                    // Get API Key

                    weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                    if (weatherApiKey === null || weatherApp.weatherApiKey === "") {
                        //weatherApp.$targetArea.html("Sorry, no api key was found.");
                        return false;
                    }
                    return true;
                }
            },


            saveApiKey: function () {
                if (typeof (localStorage) === 'undefined') {

                    weatherApp.$targetArea.html("Sorry, local storage is not supported for this browser.");
                } else {
                    if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                        //weatherApp.$targetArea.html("Sorry, you must have an API Key.");
                    } else {
                        localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                        $("#apiDiv").attr("class", "hide");
                    }
                }
            }
        },

        $("#submit").click(function () {
            weatherApp.getFormData();
            return false;
        });
    if (weatherApp.loadApiKey()) {
        $("#apiDiv").attr("class", "hide");
    };



});