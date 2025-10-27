import { pool } from '../config/index.js';
import { getDailyActiveUsersQuery, getTopEventsQuery } from '../db/queries/stats.queries.js';


export async function getDailyActiveUsers() {
    const result = await pool.query(getDailyActiveUsersQuery);
    return result.rows;
}

export async function getTopEvents() {
    const result = await pool.query(getTopEventsQuery);
    return result.rows;
}