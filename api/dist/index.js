import { processType } from "./config/index.js";
import { producerService } from "./services/api.js";
import { consumerService } from "./services/consumer.js";
const main = async () => {
    if (processType === 'producer') {
        await producerService();
    }
    else if (processType === 'consumer') {
        await consumerService();
    }
    else {
        throw new Error(`Invalid process type : ${processType}. Should be either "producer" or "consumer".`);
    }
};
main().catch(error => {
    console.error('failed to start the app, error: ', error);
    process.exit(1);
});
