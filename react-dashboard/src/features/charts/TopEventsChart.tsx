import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAppStore } from '../../store/store';

export const TopEventsChart = () => {

    const topEvents = useAppStore((state) => state.topEventsMetrics);
    return (
        <section className='w-full'>
            <span>Top Users Chart</span>
            <ResponsiveContainer height={250}>
                <BarChart data={topEvents} margin={{ top: 5, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="event_type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </section>
    );
};