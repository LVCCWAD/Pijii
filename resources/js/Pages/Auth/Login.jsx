import { useForm } from '@inertiajs/react';

function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-amber-50 p-6">
            <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md">
                <p className="text-center text-sm text-gray-500 italic mb-4">Note: This is just a placeholder.</p>
                <h1 className="text-2xl font-bold text-amber-700 mb-6 text-center">Login to Pijii</h1>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-700">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-amber-600 text-white py-2 rounded hover:bg-amber-700"
                    >
                        {processing ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>Don't have an account? <a className="text-amber-600 hover:text-amber-700" href="/register">Register</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;
