import { Kafka } from "kafkajs";
import { kafkaBrokers } from "../config/index.js";

console.log('your brokers are ', kafkaBrokers);

export const kafka = new Kafka({
    clientId: 'event-tracker-app',
    brokers: kafkaBrokers,
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'event-processing-group' });