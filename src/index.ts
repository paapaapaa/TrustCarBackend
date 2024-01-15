import server from "./server";
import { PORT } from "./utility/Config";

server.listen(PORT, () => {
    console.log("Server is listening on port "+PORT);
});