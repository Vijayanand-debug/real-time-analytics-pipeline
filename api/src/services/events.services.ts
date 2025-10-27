import { getRecentEvents } from "../repositories/events.repository.js";


export async function fetchRecentEvents() {
    return await getRecentEvents();
}