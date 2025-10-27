
import { DailyUsersChart } from './DailyUsersChart';
import { TopEventsChart } from './TopEventsChart';
import { menuItems } from '@/utils/utils';

export default function ChartsSection() {
    const Icon = menuItems.analytics;
    return (
        <>
            <section className="card glass p-6 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Icon /> Analytics Overview
                </h2>

                <section className="md:flex">
                    <DailyUsersChart />
                    <TopEventsChart />
                </section>
            </section>

        </>
    );
}