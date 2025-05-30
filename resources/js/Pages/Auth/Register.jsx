import React from 'react';
import { useForm } from '@inertiajs/react';

function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="flex items-center justify-center min-h-screen main-bg p-6">
            <div className="w-full max-w-sm bg-white rounded-lg shadow-md "style={{padding:"4rem"}}>
                {/* <p className="text-center text-sm text-gray-500 italic mb-4">Note: This is just a placeholder.</p> */}
                <h1 className="text-2xl font-bold text-amber-700 mb-6 text-center">Register for Pijii</h1>

                <form onSubmit={submit} className='gap-2'>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-700">Name</label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full border rounded px-4 py-2 mt-1"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-700">Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full border rounded px-4 py-2 mt-1"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm text-gray-700">Password</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full border rounded px-4 py-2 mt-1"
                        />
                        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full border rounded px-4 py-2 mt-1"
                        />
                        {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition"
                        style={{padding:'0.5rem', marginTop:'10px'}}
                    >
                        {processing ? 'Registering...' : 'Register'}
                    </button>

                    <div className="mt-4 text-center">
                    <p>Already have an account? <a className="text-amber-600 hover:text-amber-700" href="/login">Login</a></p>
                </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
