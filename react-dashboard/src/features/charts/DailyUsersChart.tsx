import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../../store/store';

export const DailyUsersChart = () => {
    const dailyMetrics = useAppStore((state) => state.dailyMetrics);

    return (
        <>
            <section className='w-full'>
                <span>Daily Users Chart</span>
                <ResponsiveContainer height={250}>
                    <LineChart data={dailyMetrics}>

                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="uniqueUsers" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </section>
        </>
    );
};