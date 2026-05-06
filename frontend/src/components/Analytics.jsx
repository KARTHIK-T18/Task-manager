import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import api from '../api';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Analytics = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/tasks/stats');
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    if (!stats) return <div className="p-8">Loading stats...</div>;

    const completionData = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                data: [stats.completed, stats.pending],
                backgroundColor: ['#4F46E5', '#E5E7EB'],
                borderColor: ['#4338CA', '#D1D5DB'],
                borderWidth: 1,
            },
        ],
    };

    const weeklyData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Tasks Completed',
                data: [0, 0, 0, 0, 0, 0, stats.today || 0], // Mocking weekly data for now as backend only sends summary
                backgroundColor: 'rgba(79, 70, 229, 0.5)',
            },
        ],
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Performance Analytics</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Summary Cards */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-center items-center">
                    <h3 className="text-gray-500 mb-2">Completion Rate</h3>
                    <div className="h-64 w-full flex justify-center">
                        <Doughnut data={completionData} options={{ maintainAspectRatio: false }} />
                    </div>
                    <p className="mt-4 text-2xl font-bold text-indigo-600">
                        {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
                    </p>
                </div>

                {/* Weekly Progress */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-gray-500 mb-4">Weekly Activity</h3>
                    <div className="h-64">
                        <Bar
                            data={weeklyData}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        ticks: { stepSize: 1 }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
