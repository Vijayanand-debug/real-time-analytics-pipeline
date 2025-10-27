import { consumer } from "../lib/kafka.js";
import { Client } from 'pg';
import { dbConfig } from "../config/index.js";
import { checkKafkaTopic } from "../lib/createKafkaTopic.js";
const pgClient = new Client(dbConfig);
export const consumerService = async () => {
    try {
        await pgClient.connect();
        await checkKafkaTopic('events');
        await consumer.subscribe({ topic: 'events', fromBeginning: true });
        console.log('Worker is now running and waiting for messages...');
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (!message.value)
                    return;
                const eventString = message.value.toString();
                try {
                    const event = JSON.parse(eventString);
                    const query = `
                        INSERT INTO events(event_type, user_id, metadata, timestamp)
                        VALUES($1, $2, $3, $4)
                    `;
                    const values = [
                        event.type,
                        event.userid,
                        event.metadata,
                        event.timestamp
                    ];
                    await pgClient.query(query, values);
                }
                catch (error) {
                    console.error('Failed to insert event:', error);
                }
            },
        });
    }
    catch (error) {
        console.error('Worker failed to start:', error);
        process.exit(1);
    }
};
