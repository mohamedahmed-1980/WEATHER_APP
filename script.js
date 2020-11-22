
  // the current time
    var time = moment().format('MMMM Do YYYY')

    $(document).ready(function(){

        loadDataFromLocalStorage();

        if(searchList != null)
        {
            drawSearchListInPage();
        }

        // geting countryName,teperature , teperature, wind speed,Humidity and UV index from the local storage

        $("#para1").text("teperature: "+localStorage.getItem('temperature'));
        $("#countryName").text(localStorage.getItem('pageHeader') );
        $("#para1").text("teperature: "+localStorage.getItem('temperature'));
        $("#para2").text("wind speed: " +localStorage.getItem('windSpeed'));
        $("#para3").text("Humidity: " + localStorage.getItem('Humidity'));
        $("#para4").text("UV index" + localStorage.getItem("UV"))

        $("#button").on("click", function(){
            var city =   $("#userInput").val() ;
            localStorage.setItem('city', city);
            getHeaderData(city);
            getForcast(city);
            addToSearchList(city);
    })

    })
// creating dainamic  search list 
var searchList = [];

function drawSearchListInPage() {
    for(var i=0;i<searchList.length;i++)
    {
        $('#searchList').append(`<li>${searchList[i]}</li>`);
    }
    
}
// drow the search list
function drawCityInSearchList(city) {
 $('#searchList').append(`<li>${city}</li>`);
}

function addToSearchList(city){
    if (searchList == null)
        searchList = [];
    searchList.push(city);
    localStorage.setItem('searchList1', JSON.stringify(searchList));
    drawCityInSearchList(city);
}
// loading the the page to the loacal storage 
    function loadDataFromLocalStorage()
    {
        var city = localStorage.getItem("city");
        searchList = JSON.parse(localStorage.getItem('searchList1'));
        getHeaderData(city);
        getForcast(city);
    }
 // get the image for five days from api
    function getForcast(city) {
        var forcast= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=be79920f2c3dc12adff782fff66412e3`
        $.ajax({
            url:forcast,
            method:'GET'

        }).then(function(forecast){
            console.log(forecast)

        var imageIcon1 = forecast.list[0].weather[0].icon;
        var imageIcon2 = forecast.list[6].weather[0].icon;
        var imageIcon3 = forecast.list[17].weather[0].icon;
        var imageIcon4 = forecast.list[25].weather[0].icon;
        var imageIcon5 = forecast.list[33].weather[0].icon;
        
        
          // adding the image to the page 
        $("#first")
        .html(`<p>${moment(forecast.list[6].dt_txt)
            .format('MMMM Do YYYY')}</p> <img src =" http://openweathermap.org/img/wn/${imageIcon1}@2x.png"> <p><p>
             Humidity: ${forecast.list[6].main.humidity}</p> 
             tempreture ${Math.round((forecast.list[6].main.temp *1.8)-459)}</p>`)

        $("#second")
        .html(`<p>${moment(forecast.list[17].dt_txt)
            .format('MMMM Do YYYY')}</p> <img src =" http://openweathermap.org/img/wn/${imageIcon2}@2x.png"> <p><p>
             Humidity: ${forecast.list[17].main.humidity}</p> 
             tempreture ${Math.round((forecast.list[17].main.temp *1.8)-459)}</p>`)

        $("#third")
        .html(`<p>${moment(forecast.list[25].dt_txt)
            .format('MMMM Do YYYY')}</p> <img src =" http://openweathermap.org/img/wn/${imageIcon3}@2x.png"> <p><p>
             Humidity: ${forecast.list[25].main.humidity}</p> 
             tempreture ${Math.round((forecast.list[25].main.temp *1.8)-459)}</p>`);

        $("#fourth")
        .html(`<p>${moment(forecast.list[33].dt_txt).
            format('MMMM Do YYYY')}</p> <img src =" http://openweathermap.org/img/wn/${imageIcon4}@2x.png"> <p><p> 
            Humidity: ${forecast.list[33].main.humidity}</p>
             tempreture ${Math.round((forecast.list[33].main.temp *1.8)-459)}</p>`);
             
        $("#fifth")
        .html(`<p>${moment(forecast.list[39].dt_txt)
            .format('MMMM Do YYYY')}</p> <img src =" http://openweathermap.org/img/wn/${imageIcon5}@2x.png"> <p><p>
             Humidity: ${forecast.list[39].main.humidity}</p> 
             tempreture ${Math.round((forecast.list[39].main.temp *1.8)-459)}</p>`)

        
        })
    }
        // get the data from apis for the head of the page 
        function getHeaderData(city){
            var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be79920f2c3dc12adff782fff66412e3`
            $.ajax({
                url : queryUrl ,
                method : 'GET'
            }).then(function(reponse){
               
                var lon= reponse.coord.lon
                var lat= reponse.coord.lat
                var temperature = parseInt((reponse.main.temp * 1.8)-459 )+ " F ";
                var windSpeed = parseInt(reponse.wind.speed) + " MPH";
                var Humidity = parseInt(reponse.main.humidity) + " %";
                var pageHeader = reponse.name + " " + time;
                $("#countryName").text(pageHeader );
                $("#para1").text("Temperature: "+temperature);
                $("#para2").text("Wind Speed: " +windSpeed);
                $("#para3").text("Humidity: " + Humidity);

                getUV(lat,lon);
        })
    }

        function getUV(lat, lon)
        {
            var UvUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=be79920f2c3dc12adff782fff66412e3`
        $.ajax({
            url:UvUrl,
            method:'GET'
        }).then(function(data){
            var dtval = data.value
       
            if(dtval <= 2){
        $("#para4").text(` UV index: ${ data.value}`).css('color','green')
       
        localStorage.setItem("UV",data.value)
    }else if (dtval <= 5){
        $("#para4").text(` UV index: ${ data.value}`).css('color','yelow')
       
        localStorage.setItem("UV",data.value)
    }else if(dtval<= 7){
        $("#para4").text(` UV index: ${ data.value}`).css('color','orange')
       
        localStorage.setItem("UV",data.value)
    }else{
        $("#para4").text(` UV index: ${ data.value}`).css('color','red')
       
        localStorage.setItem("UV",data.value)
    }
    
        })
    }

            
    
