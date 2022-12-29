import Route from "core/routes.interface";
import express from "express";
import mongoose from "mongoose";

export default class App {
  public app: express.Application;
  public port: string | number;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 5000;

    this.initializeRoutes(routes);
    this.connectToDatabase();
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running at ${this.port}`);
    });
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  private async connectToDatabase() {
    try {
      const connectString =
        "mongodb+srv://admin:123abc@master.owash8r.mongodb.net/?retryWrites=true&w=majority";
      await mongoose.connect(connectString);
      console.log("Connect to database successfully");
    } catch (error) {
      console.log("Connect to database failed");
    }
  }
}