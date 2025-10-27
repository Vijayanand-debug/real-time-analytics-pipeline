export interface Event {
    id: number;
    type: string;
    userid: string;
    timestamp: string;
    metadata?: Record<string, any>;
}

export interface DailyMetric {
    day: string;
    uniqueUsers: number;
}

export interface KpiMetric {
    events_last_24h: string;
    unique_users_today: number;
    most_frequent_event: number;
    search_count: number;
}

export interface TopEventsMetric {
    event_type: string;
    count: number;
}

export interface Appstate {
    liveFeedEvents: Event[];
    dailyMetrics: DailyMetric[];
    kpiMetrics: KpiMetric[];
    topEventsMetrics: TopEventsMetric[];
    isLoading: boolean;
    userId: string;
    error: string | null;
    pollingInterval: NodeJS.Timeout | null;
    highlight: boolean;
    startPolling: () => void;
    stopPolling: () => void;
    fetchPollinBoardsData: () => Promise<void>,
    initializeWebSocket: () => void;
    fetchInitialFeed: () => Promise<void>;
    sendEvent: (eventType: string, metadata?: Record<string, any>) => Promise<void>;
}