import { Server } from "http";
import app from "./app";
import config from "./app/config";

const main = async () => {
  let server: Server;
  server = app.listen(config.port, () => {
    console.log(`Flat share server listening on port ${config.port}`);
  });
};
main();
