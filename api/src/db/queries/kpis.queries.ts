export const getKpisQuery = `
SELECT
    (SELECT COUNT(*) FROM events WHERE timestamp >= NOW() - INTERVAL '24 hours') AS events_last_24h,
    (SELECT COUNT(DISTINCT user_id) FROM events WHERE DATE(timestamp) = CURRENT_DATE) AS unique_users_today,
    (SELECT event_type FROM events GROUP BY event_type ORDER BY COUNT(*) DESC LIMIT 1) AS most_frequent_event,
    (SELECT COUNT(*) FROM events WHERE event_type = 'search') AS search_count;
`;