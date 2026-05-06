import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, BarChart3, Medal } from 'lucide-react';
import TaskDashboard from './components/TaskDashboard';
import Analytics from './components/Analytics';
import Rewards from './components/Rewards';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 p-6">
          <h1 className="text-2xl font-bold text-indigo-600 mb-8">TaskMaster</h1>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/analytics" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                <BarChart3 size={20} />
                Analytics
              </Link>
            </li>
            <li>
              <Link to="/rewards" className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors">
                <Medal size={20} />
                Rewards
              </Link>
            </li>
          </ul>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Routes>
            <Route path="/" element={<TaskDashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/rewards" element={<Rewards />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
