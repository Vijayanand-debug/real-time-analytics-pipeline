import { getKpis } from "../repositories/kpis.repository.js";


export async function fetchKpis() {
    return await getKpis();
}