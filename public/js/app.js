console.log("client side")

fetch("http://puzzle.mead.io/puzzle").then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})



const weatherform = document.querySelector("form")
const search = document.querySelector("input")
const message1 = document.querySelector("#message-1")
const message2 = document.querySelector("#message-2")

weatherform.addEventListener("submit",(e)=>{
    e.preventDefault()
    const address = search.value
    message1.textContent = "loading..."
    message2.textContent = ""
    fetch("http://localhost:8000/weather?address=" + encodeURIComponent(address)).then((response)=>{
    response.json().then((data)=>{
        if (data.error){
            message1.textContent = data.error
        }else{
            message1.textContent = data.location
            message2.textContent = data.forecast
        }

    })
})
    
})