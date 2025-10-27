import { useEffect } from 'react';
import { useAppStore } from '../../store/store';
import MetricsSection from "@/features/keyMetrics/MetricsSection";
import ChartsSection from "@/features/charts/ChartsSection";

export default function PollingDasboard() {

    const startPolling = useAppStore((state) => state.startPolling);
    const stopPolling = useAppStore((state) => state.stopPolling);

    useEffect(() => {
        startPolling();

        return () => stopPolling();
    }, [startPolling, stopPolling]);

    return (
        <>
            <MetricsSection />
            <ChartsSection />
        </>
    );
}