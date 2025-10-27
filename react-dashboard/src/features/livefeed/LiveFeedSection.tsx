import { useAppStore } from '@/store/store';
import { menuItems } from '@/utils/utils';

export default function LiveFeedSection() {

    const events = useAppStore((state) => state.liveFeedEvents);
    const highlight = useAppStore((state) => state.highlight);
    const Icon = menuItems.live_feed;

    return (
        <>
            <section className={`card glass p-6 rounded-2xl shadow-md transition-all duration-700 ${highlight
                ? 'ring-4 ring-cyan-400/70 shadow-cyan-200/50 scale-[1.01]'
                : 'ring-0'
                }`}>
                <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-4 flex items-center gap-2">
                    <Icon /> Live Event Feed
                </h2>
                <p className="text-sm text-gray-700 mb-4">
                    Real Time Kafka event feed. Displays the latest 20 activities from all connected users instantly.
                </p>
                <div className="overflow-auto max-h-64 border border-indigo-200 rounded-lg">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-indigo-100 text-gray-900">
                            <tr>
                                <th className="py-2 px-4">Timestamp</th>
                                <th className="py-2 px-4">Type</th>
                                <th className="py-2 px-4">User ID</th>
                                <th className="py-2 px-4">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length > 0 ? (
                                <>
                                    {events.map((event) =>

                                        <tr key={event.id} className="bg-white border-b hover:bg-cyan-50 transition">
                                            <td className="py-2 px-4">{event.timestamp}</td>
                                            <td className="py-2 px-4">{event.type}</td>
                                            <td className="py-2 px-4">{event.userid}</td>
                                            <td className="py-2 px-4">{event?.metadata ? JSON.stringify(event.metadata) : 'No Metadata'}</td>
                                        </tr>
                                    )}

                                </>
                            ) : (
                                <tr>
                                    <td colSpan={4} className="py-2 px-4 text-center text-gray-500">No Events Registered Yet</td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}