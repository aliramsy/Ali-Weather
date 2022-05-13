const request = require("request")

const geocode = (address,callback)=>{
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) +".json?access_token=pk.eyJ1IjoiYWxpYjE5OTUiLCJhIjoiY2wxd3JtaGtkMDhraTNpcDg5bHFpdmt4aSJ9.IDruWkGvPk9jv0NaV1Oh0A&limit=1"
    request({url:url,json:true},(error,response)=>{
        if (error){
            callback("check your internet connection",undefined)
        }else if(response.body.features.length === 0){
            callback("the location not found",undefined)
        }else {
            data=response.body.features
            const longtitude = data[0].center[0]
            const latitude = data[0].center[1]
            const location = data[0].place_name
            callback(undefined,{
                longtitude:longtitude,
                latitude:latitude,
                location:location
            })
    }
    })
}

module.exports = geocode