import { pool } from '../config/index.js';
import { getKpisQuery } from '../db/queries/kpis.queries.js';


export async function getKpis() {
    const result = await pool.query(getKpisQuery);
    return result.rows;
}