import { WebSocket, WebSocketServer } from "ws";
import { kafka } from "../lib/kafka.js";
import { checkKafkaTopic } from "../lib/createKafkaTopic.js";
export const startWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server });
    const clients = new Set();
    wss.on('connection', (ws) => {
        console.log('client connected');
        clients.add(ws);
        ws.on('close', () => {
            console.log('client disconnected');
            clients.delete(ws);
        });
    });
    const broadcast = (message) => {
        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    };
    const broadCastConsumer = kafka.consumer({ groupId: 'websocket-group' });
    const sendMessages = async () => {
        await checkKafkaTopic('events');
        await broadCastConsumer.subscribe({ topic: 'events', fromBeginning: true });
        console.log('Kafka broadcaster consumer is running...');
        await broadCastConsumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                if (message.value) {
                    const eventString = message.value.toString();
                    console.log(`Broadcasting event to ${clients.size} clients: ${eventString}`);
                    broadcast(eventString);
                }
            },
        });
    };
    sendMessages().catch(console.error);
};
