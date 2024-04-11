import {httpsServer} from "./server";
import { PORT } from "./utility/Config";

httpsServer.listen(PORT, () => {
    console.log("Server is listening on port "+PORT);
});