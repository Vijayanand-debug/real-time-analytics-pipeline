export const getRecentEventsQuery = `
  SELECT id, event_type AS type, user_id AS userid, metadata, timestamp
  FROM events
  ORDER BY id DESC
  LIMIT 20;
`;