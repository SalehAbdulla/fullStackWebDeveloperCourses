// import 8 packages
import express from "express";
import pg from "pg";
import bcrypt from "bcrypt";
import GoogleStrategy from "passport-google-oauth2";
import session from "express-session";
import env from "dotenv";
import { Strategy } from "passport-local";
import passport from "passport";

// initalise methods

const app = express();
const port = 3000;
const saltRounds = 12;
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

db.connect();

// initialise middlewares

