import React from 'react';
import { router } from '@inertiajs/react';

function Dashboard() {
    function handleLogout(e) {
        e.preventDefault();
        router.post('/logout');
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4 p-6">
            <p className="text-gray-500 italic text-center text-sm">Note: This is just a placeholder.</p>
            <h1 className="text-2xl font-bold text-center text-purple-700">Welcome to Pijii!</h1>
            <button
                className="bg-amber-500 hover:bg-amber-300 text-white font-semibold py-2 px-4 rounded-md transition"
                onClick={handleLogout}
            >
                Log out
            </button>
        </div>
    );
}

export default Dashboard;
