import { pool } from '../config/index.js';
import { getRecentEventsQuery } from '../db/queries/events.queries.js';


export async function getRecentEvents() {
    const result = await pool.query(getRecentEventsQuery);
    return result.rows;
}