export const getDailyActiveUsersQuery = `
 SELECT TO_CHAR(timestamp, 'DD') AS day, COUNT(DISTINCT user_id) AS active_users FROM events WHERE timestamp >= NOW() - INTERVAL '7 days' GROUP BY day ORDER BY day ASC;
`;

export const getTopEventsQuery = `
  SELECT event_type, COUNT(event_type) AS count FROM events GROUP BY event_type ORDER BY count DESC LIMIT 5;
`;