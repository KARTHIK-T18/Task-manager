import { useEffect, useState } from 'react';
import { Trophy, Star, Gift } from 'lucide-react';
import api from '../api';

const Rewards = () => {
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

    if (!stats) return <div className="p-8">Loading rewards...</div>;

    const points = stats.completed * 100;
    const level = Math.floor(points / 500) + 1;
    const progressToNextLevel = (points % 500) / 500 * 100;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="p-4 bg-yellow-100 rounded-full text-yellow-600">
                    <Trophy size={40} />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Your Rewards</h2>
                    <p className="text-gray-500">Keep completing tasks to level up!</p>
                </div>
            </div>

            {/* Level Card */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-lg mb-8">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <span className="text-indigo-100 font-medium">Current Level</span>
                        <h3 className="text-5xl font-bold mt-1">{level}</h3>
                    </div>
                    <div className="text-right">
                        <span className="text-indigo-100 font-medium">Total Points</span>
                        <h3 className="text-3xl font-bold mt-1">{points} pts</h3>
                    </div>
                </div>

                <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                        <div className="text-xs font-semibold inline-block py-1 uppercase rounded-full text-indigo-100">
                            Progress to Level {level + 1}
                        </div>
                        <div className="text-xs font-semibold inline-block text-indigo-100">
                            {points % 500} / 500
                        </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200 bg-opacity-30">
                        <div
                            style={{ width: `${progressToNextLevel}%` }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-white"
                        ></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-xl border-2 ${points >= 100 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 bg-white opacity-50'} text-center`}>
                    <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                        <Star size={32} />
                    </div>
                    <h4 className="font-bold text-gray-900">Novice Achiever</h4>
                    <p className="text-sm text-gray-500 mt-2">Complete your first task</p>
                </div>

                <div className={`p-6 rounded-xl border-2 ${points >= 500 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 bg-white opacity-50'} text-center`}>
                    <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                        <Gift size={32} />
                    </div>
                    <h4 className="font-bold text-gray-900">Productivity Master</h4>
                    <p className="text-sm text-gray-500 mt-2">Reach 500 points</p>
                </div>

                <div className={`p-6 rounded-xl border-2 ${points >= 1000 ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 bg-white opacity-50'} text-center`}>
                    <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4">
                        <Trophy size={32} />
                    </div>
                    <h4 className="font-bold text-gray-900">Task Legend</h4>
                    <p className="text-sm text-gray-500 mt-2">Reach 1000 points</p>
                </div>
            </div>
        </div>
    );
};

export default Rewards;
