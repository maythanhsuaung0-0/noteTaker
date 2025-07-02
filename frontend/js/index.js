console.log("hello")
fetch('/notes').then((res)=>res.json()).then((data)=>console.log(data))
