const request = require("request")


const forecast = (latitude,longtitude,callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=d39ae4b552451ca48de835da877b9632&query="+encodeURIComponent(latitude)+","+encodeURIComponent(longtitude)
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("check your connection!",undefined)
        }else if(response.body.error){
            callback("location can not be found",undefined)
        }else {
            const data = response.body.current
        callback(undefined,data.weather_descriptions + " and the tempreture is "+ data.temperature +" degree and it feels like " + data.feelslike + " and the humidity is "+ data.humidity)

        }
    })
}

module.exports = forecast