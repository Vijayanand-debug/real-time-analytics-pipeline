
import { consumer, kafka } from "../lib/kafka.js";
import * as kafkajs from 'kafkajs';

// since we are not adding the kafka topic manually on start, the consumer app will fail
// as it cannot connect to kafka with events topic, hence create a topic
const { KafkaJSProtocolError } = kafkajs;

export const checkKafkaTopic = async (topic: string) => {
    const admin = kafka.admin();

    try {
        await admin.connect();

        await admin.createTopics({
            validateOnly: false,
            waitForLeaders: true,
            topics: [{
                topic: topic,
                numPartitions: 1,
                replicationFactor: 1
            }],
        });

    } catch (error: any) {
        // if the topic already exists, Kafka throws an error.
        // catch this error as suuccess.
        if (error instanceof kafkajs.KafkaJSProtocolError && error.type === 'TOPIC_ALREADY_EXISTS') {
            console.log(` topic: ${topic} already exists.`);
        } else {
            // other errors
            console.error(`Failed to ensure topic "${topic}" exists:`, error);
            throw error;
        }
    } finally {
        await admin.disconnect();
        console.log('Admin client disconnected.');
    }
};
