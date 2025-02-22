
import express from "express";
import session from "express-session";
import passport from "passport";


function applyMiddlewares(app){
    app.use(express.static("public"));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    
    app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: {maxAge: 1000*60*60*24},
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());
}




export default applyMiddlewares