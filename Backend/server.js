import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import recipeRoutes from "./routes/recipeRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://food-recipe-frontend-w3z3.onrender.com",
    credentials: true,
  }),
);

app.use("/api/recipes", recipeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Recipe API");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    const server = app.listen(process.env.PORT, () => {
      console.log("Server is running on port", process.env.PORT);
    });
    server.on("error", (error) => {
      console.error("Server error:", error);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import mongoose from "mongoose";
// // import recipeRoutes from "./routes/recipeRoutes.js";
// import authRoutes from "./routes/authRoutes.js";

// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(cookieParser());

// app.listen(process.env.PORT, () => {
//   console.log("Server is running on port", process.env.PORT);
// });

// app.get("/", (req, res) => {
//   res.send("Welcome to the Recipe API");
// });

// app.get("/home", (req, res) => {
//   res.status(200).json({ message: "This is the home page of the Recipe API" });
// });

// app.get("/about", (req, res) => {
//   res.status(200).send("This is the about page of the Recipe API");
// });

// // app.listen(4000, () => {
// //   console.log("Server is running on port 4000");
// // });

// // app.use("/api/recipes", recipeRoutes);
// app.use("/api/auth",  authRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     app.listen(process.env.PORT, () => {
//       console.log("Server is running on port", process.env.PORT);
//     });
//     console.log("Connected to MongoDB");
//   })

//   .catch((error) => {
//     console.error("Database connection error:", error);
//   });
