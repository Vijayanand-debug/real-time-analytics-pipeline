import { getDailyActiveUsers, getTopEvents } from "../repositories/stats.repository.js";
import { getLastSevenDays } from '../utils.js';


export async function fetchDailyActiveUsers() {
    const activeUsers = await getDailyActiveUsers();
    const lastSevenDaysData = getLastSevenDays().map((date) => (
        {
            day: date,
            uniqueUsers: 0
        }
    ));

    activeUsers.forEach(userData => {
        const dayIndex = lastSevenDaysData.findIndex(item => item.day === userData.day);
        if (dayIndex !== -1) {
            lastSevenDaysData[dayIndex].uniqueUsers = parseInt(userData.active_users);
        }
    });

    return lastSevenDaysData;
}

export async function fetchTopEvents() {
    return await getTopEvents();
}