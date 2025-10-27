import { create } from 'zustand';
import { type Appstate } from '@/types/types';
import toast from 'react-hot-toast';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const WebSocketUrl = import.meta.env.VITE_WEB_SOCKET_URL;

export const useAppStore = create<Appstate>((set, get) => ({

    liveFeedEvents: [],
    dailyMetrics: [],
    kpiMetrics: [],
    topEventsMetrics: [],
    isLoading: false,
    error: null,
    highlight: false,
    pollingInterval: null as NodeJS.Timeout | null,
    userId: `user_${Math.floor(Math.random() * 10000)}`,

    initializeWebSocket: () => {
        const ws = new WebSocket(WebSocketUrl);

        ws.onopen = () => {
            console.log('web socket opened');
        };

        ws.onmessage = (message) => {
            try {
                const newEventData = JSON.parse(message.data.toString());

                set((state) => ({
                    liveFeedEvents: [
                        newEventData,
                        ...(Array.isArray(state.liveFeedEvents) ? state.liveFeedEvents : [])
                    ].slice(0, 20),
                }));

                get().highlight = true;

                setTimeout(() => {
                    set({ highlight: false });
                }, 5000);
                toast.success(`Live Feed Updated`, { duration: 2000 });

            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        }

        ws.onclose = (error) => {
            console.error('Websocket close error: ', error);
            ws.close();
        }
    },

    fetchPollinBoardsData: async () => {
        set({ isLoading: true });
        try {
            const [metricsResponse, topEventsResponse, kpisResponse] = await Promise.all([
                fetch(`${apiUrl}stats/daily-active-users`),
                fetch(`${apiUrl}stats/top-events`),
                fetch(`${apiUrl}kpis`)
            ]);

            const dailyMetricsResult = await metricsResponse.json();
            const topEventsMetricsResult = await topEventsResponse.json();
            const kpiMetricsResult = await kpisResponse.json();

            const dailyMetrics = dailyMetricsResult.lastSevenDaysData;
            const topEventsMetrics = topEventsMetricsResult.topEvents;
            const kpiMetrics = kpiMetricsResult.kpiData;

            set({ dailyMetrics, topEventsMetrics, kpiMetrics, isLoading: false });
            toast.success(`Key Metrics Updated`, { duration: 2000 });
            toast.success(`Analytics Updated`, { duration: 2000 });

        } catch (error) {
            set({ error: 'Failed to fetch dashboard data.', isLoading: false });
        }
    },

    startPolling: () => {
        if (get().pollingInterval) return;

        get().fetchPollinBoardsData();

        const intervalId = setInterval(() => {
            get().fetchPollinBoardsData();
        }, 10000);

        set({ pollingInterval: intervalId });

    },

    stopPolling: () => {
        const intervalId = get().pollingInterval;
        if (intervalId) {
            clearInterval(intervalId);
            set({ pollingInterval: null });
        }
    },

    fetchInitialFeed: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`${apiUrl}events`);
            const data = await response.json();
            const events = data?.eventInfo ? [...data.eventInfo] : [];

            set({ liveFeedEvents: events, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch live feed.', isLoading: false });
        }
    },
    sendEvent: async (eventType, metadata) => {

        try {
            const eventPayload = {
                type: eventType,
                userid: get().userId,
                metadata: metadata
            };

            await fetch(`${apiUrl}track`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(eventPayload),
            });


        } catch (error) {
            console.error('Failed to send event:', error);

        }

    },
}));