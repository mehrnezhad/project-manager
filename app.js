import Application from "./app/server.js"
import dotenv from "dotenv"
dotenv.config()
const DB_URL = process.env.DB_URL
const PORT = process.env.PORT
new Application(PORT,DB_URL)



