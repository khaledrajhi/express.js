const express = require("express")

const app = express()
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6
  const hour = now.getHours();

  // Check if the request is made between Monday (1) and Friday (5), and between 9:00 and 17:00
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) {
    next(); // Allow the request to proceed
  } else {
    res.status(403).send("The application is only available during working hours (Monday to Friday, 9:00 AM to 5:00 PM).");
  }
};
// app.use(express.static(__dirname))
app.get("/home", workingHoursMiddleware,(req,res)=>{
    res.sendFile(__dirname+"/page1.html")

})




app.get("/services",workingHoursMiddleware, (req,res)=>{
    res.sendFile(__dirname+"/page2.html")

})
app.get("/link", workingHoursMiddleware,(req,res)=>{
    res.sendFile(__dirname+"/page3.html")

})







app.listen(3000)