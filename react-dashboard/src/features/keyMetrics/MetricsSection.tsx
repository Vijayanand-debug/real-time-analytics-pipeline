import { useAppStore } from '../../store/store';
import { menuItems } from '@/utils/utils';

export default function MetricsSection() {

    const response = useAppStore((state) => state.kpiMetrics);
    const kpiData = response[0];
    const Icon = menuItems.key_metrics;

    return (
        <>
            <section className="card glass p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Icon /> Key Metrics
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-indigo-100 p-4 rounded-lg text-center">
                        <h3 className="text-sm font-medium text-indigo-700">Events (last 24h)</h3>
                        <p className="text-3xl font-bold text-indigo-900">{kpiData?.events_last_24h}</p>
                    </div>
                    <div className="bg-rose-100 p-4 rounded-lg text-center">
                        <h3 className="text-sm font-medium text-rose-700">View Pricing</h3>
                        <p className="text-3xl font-bold text-rose-900">{kpiData?.unique_users_today}</p>
                    </div>
                    <div className="bg-cyan-100 p-4 rounded-lg text-center">
                        <h3 className="text-sm font-medium text-cyan-700">Most Frequent Event</h3>
                        <p className="text-xl font-bold text-cyan-900">{kpiData?.most_frequent_event}</p>
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg text-center">
                        <h3 className="text-sm font-medium text-gray-700">Total Search Events</h3>
                        <p className="text-3xl font-bold text-gray-900">{kpiData?.search_count}</p>
                    </div>
                </div>
            </section>
        </>
    );
}