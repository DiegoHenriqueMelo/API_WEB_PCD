import * as Server from "./controller/server/controller.js";

let PORT = process.env.PORT || "3000";

Server.conectServ(PORT);