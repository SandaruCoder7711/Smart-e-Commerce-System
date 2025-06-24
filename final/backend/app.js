const express= require('express')
const mongoose = require('mongoose')

const Promotion = require('./routes/Promotion.route.js');

const ReviewRoute = require('./routes/Reviews.route.js');
// const emailRoutes = require("./routes/emailRoutes");
const promoEmailRoutes = require("./routes/promo_emailRoutes");
const reviewEmailRoutes = require("./routes/review_emailRoutes.js");

const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use("/promo",Promotion)
app.use("/review",ReviewRoute)

app.use("/promo_mail", promoEmailRoutes);
app.use("/review_mail", reviewEmailRoutes);

mongoose.connect("mongodb+srv://admin:fhi00XoMrFZHVlNM@cluster0.40jt53t.mongodb.net/itp_project")
    .then(()=>console.log("connected to mongo"))
    .then(()=>{
        app.listen(5000)
    })
    .catch((err)=> console.log((err)))
