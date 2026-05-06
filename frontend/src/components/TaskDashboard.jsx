import { useState, useEffect } from 'react';
import api from '../api';
import { Plus, Trash2, Check, X } from 'lucide-react';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        generateDates();
        fetchTasks();
    }, []);

    const generateDates = () => {
        const today = new Date();
        const dateList = [];
        // Show last 6 days + today = 7 days, or maybe current week?
        // Let's do partial week: 3 days before, today, 3 days after? 
        // Or just "This Week" (Mon-Sun)?
        // The image shows "Monday 1" to "Sunday 7". Let's show current week (Mon-Sun) or last 7 days.
        // Let's go with "Last 6 days + Today" for immediate feedback loop, or a fixed 7-day window ending today.
        // Actually, the image looks like a calendar view. Let's do "Last 7 days" including today for simplicity.

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            dateList.push(d);
        }
        setDates(dateList);
    };

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        if (!newTask.title) return;
        try {
            await api.post('/tasks', newTask);
            setNewTask({ title: '', description: '' });
            setIsFormOpen(false);
            fetchTasks();
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const toggleTaskDate = async (taskId, date) => {
        try {
            // Format date as YYYY-MM-DD for the API
            const dateStr = date.toISOString().split('T')[0];
            await api.patch(`/tasks/${taskId}/toggle?date=${dateStr}`);
            fetchTasks(); // Refresh to get updated history
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    };

    const deleteTask = async (id) => {
        if (!window.confirm('Delete this task?')) return;
        try {
            await api.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const isCompletedOnDate = (task, date) => {
        if (!task.completionHistory) return false;
        const dateStr = date.toISOString().split('T')[0];
        // completionHistory is array of strings (dates) from JSON
        return task.completionHistory.some(d => d === dateStr);
    };

    return (
        <div className="max-w-6xl mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Habit Tracker</h2>
                    <p className="text-gray-500 mt-1">Consistency is key!</p>
                </div>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    <Plus size={20} />
                    New Habit
                </button>
            </div>

            {isFormOpen && (
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 animate-fade-in-down max-w-lg mx-auto">
                    <h3 className="text-lg font-semibold mb-4">New Habit</h3>
                    <form onSubmit={handleCreateTask} className="space-y-4">
                        <div>
                            <input
                                type="text"
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                                placeholder="Habit Name (e.g., Read 30 mins)"
                            />
                        </div>
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsFormOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="w-full min-w-[800px]">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-1/4">
                                Habit
                            </th>
                            {dates.map((date, index) => (
                                <th key={index} className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <div className="flex flex-col items-center">
                                        <span>{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                                        <span className="text-gray-900 font-bold">{date.getDate()}</span>
                                    </div>
                                </th>
                            ))}
                            <th className="px-4 py-4 w-12"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {tasks.map((task) => (
                            <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{task.title}</div>
                                    {task.description && <div className="text-xs text-gray-500">{task.description}</div>}
                                </td>
                                {dates.map((date, index) => {
                                    const completed = isCompletedOnDate(task, date);
                                    return (
                                        <td key={index} className="px-4 py-4 whitespace-nowrap text-center">
                                            <button
                                                onClick={() => toggleTaskDate(task.id, date)}
                                                className={`
                                                    w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200
                                                    ${completed
                                                        ? 'bg-green-500 text-white shadow-md shadow-green-200 transform scale-105'
                                                        : 'bg-gray-100 text-gray-300 hover:bg-gray-200'
                                                    }
                                                `}
                                            >
                                                {completed && <Check size={20} />}
                                            </button>
                                        </td>
                                    );
                                })}
                                <td className="px-4 py-4 whitespace-nowrap text-center">
                                    <button
                                        onClick={() => deleteTask(task.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {tasks.length === 0 && (
                            <tr>
                                <td colSpan={dates.length + 2} className="px-6 py-12 text-center text-gray-500">
                                    No habits yet. Start by adding one!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskDashboard;
