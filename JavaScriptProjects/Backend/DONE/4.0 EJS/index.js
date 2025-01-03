import express from "express";

const app = express();
const port = 3000;

const d = new Date();
var day = d.getDay();


function todayAdvise(){

    if (day === 5 || day === 6) {
        return "Never loss your progress, cause it's the weekend! ";
    } else {
        return "Today is the day, today is the best day ever to create your extordniry Future!";
    }

}

function todayCheck(){

    if (day === 5 || day === 6) {
        return "It's the Weekend!";
    } else {
        return "It's the Weekday!";
    }

}

app.get("/", (req, res)=>{
    res.render("index.ejs", 
        ({
            todayIs: todayCheck(),
            advise: todayAdvise()
    })
    )
})



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

