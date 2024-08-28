import server from "./server";
import { PORT } from "./config/envs";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";

// server.listen(PORT, () => {
//   console.log(`Servidor corriendo correctamente en puerto: ${PORT}`);
// });

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    server.listen(PORT, () => {
      console.log(`Servidor corriendo correctamente en puerto: ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  })