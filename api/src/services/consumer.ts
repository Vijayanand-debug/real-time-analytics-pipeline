import { consumer, kafka } from "../lib/kafka.js";
import { pool } from '../config/index.js';
import { checkKafkaTopic } from "../lib/createKafkaTopic.js";

export const consumerService = async () => {
    try {
        await checkKafkaTopic('events');
        await consumer.subscribe({ topic: 'events', fromBeginning: true });

        console.log('Worker is now running and waiting for messages...');
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {

                if (!message.value) return;

                const eventString = message.value.toString();

                try {
                    const event = JSON.parse(eventString);

                    const query = `
                        INSERT INTO events(id, event_type, user_id, metadata, timestamp)
                        VALUES($1, $2, $3, $4, $5)
                    `;

                    const values = [
                        event.id,
                        event.type,
                        event.userid,
                        event.metadata,
                        event.timestamp
                    ];

                    await pool.query(query, values);

                } catch (error) {
                    console.error('Failed to insert event:', error);
                }
            },
        });

    } catch (error) {
        console.error('Worker failed to start:', error);
        process.exit(1);
    }
};