export interface AnalyticsEvent {
    type: string;
    userid: string;
    timestamp?: string;
    metadata?: Record<string, any>;
}


