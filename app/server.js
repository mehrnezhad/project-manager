import mongoose from "mongoose";
import express from "express";
import path from "path";
import url from "url";
import http from "http"
import AllRouter from "./routers/routes.js";
class Application {
  #app = express();
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL);
    this.configApplication();
    this.createServer(PORT);
    this.createRoutes();
    this.errorHandler();
  }

  configDatabase(DB_URL) {
    mongoose.connect(DB_URL);
  }

  configApplication() {
    const __dirname = url.fileURLToPath(new URL('.',import.meta.url))
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname,"..","public")))
  }

  createServer(PORT) {

    const server = http.createServer(this.#app)
    server.listen(PORT,() => {
      return console.log(`server connected port http://localhost:${PORT}`);
    });
  }


  createRoutes() {
    this.#app.get("/",(req,res,next)=>{
        res.send('home page')
    })
    this.#app.use(AllRouter)
  }

  errorHandler() {
    this.#app.use((req, res, next) => {
      res.json({
        status: 404,
        message: "page not found",
      });
    });
    this.#app.use((err, req, res, next) => {
      const status = err?.status ?? err?.statusCode ?? 500;
      const message = err?.message ?? "internal server error";
      res.json({
        status: status,
        message: message,
      });
    });
  }
}

export default Application