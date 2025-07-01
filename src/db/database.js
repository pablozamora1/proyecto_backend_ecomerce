import mongoose from "mongoose";

mongoose.connect("mongodb+srv://pablozamora1:pablozamora1@cluster0.zvuon6a.mongodb.net/backen_ecomerce?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });
