const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utilities/geocode")
const forecast = require("./utilities/forecast")


const app = express()
const port = process.env.PORT || 3000 

// Define path for express config
const PublicDirectoryPath = path.join(__dirname,"../public")
const ViewPath = path.join(__dirname,"../templates")
const PartialPath = path.join(__dirname,"../templates/partials")

// set up handlebar engine and views location
app.set("view engine", "hbs")
app.set("views",ViewPath)
hbs.registerPartials(PartialPath)

// set up static directory to serve
app.use(express.static(PublicDirectoryPath))


// routes
app.get("",(req,res)=>{
    res.render("index",{
        name:"ali",
        title:"Weather"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        name:"Ali",
        title:"about me"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        name:"Ali",
        title:"help page"
    })
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you should provide an address"
        })
    }
    const address = req.query.address
    geocode(address,(error,data)=>{
        if (error){
            return res.send({
                error
            })
        }
        const latitude = data.latitude
        const longtitude = data.longtitude
        const location = data.location
        forecast(latitude,longtitude,(error,weadata)=>{
            if (error){
                return res.send({error})
            }
            res.send({
                forecast:weadata,
                location 
            })
        })
    })
    //res.send({
    //    forecast:"",
    //    location:address
    //})
})

app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"you should provide search term"
        })
    }
    res.send({
        procucts:[]
    })
})

// 404
app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        errorMessage:"help article not found"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{title:"404",errorMessage:"Page not found"})
})

// serving port
app.listen(port)


