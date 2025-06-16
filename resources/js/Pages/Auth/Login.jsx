import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    return (
        <div className="bg-white min-h-screen flex items-center justify-center px-4 py-8 main-bg">
            <div className="flex flex-col xl:flex-row w-full max-w-[1440px] items-center justify-center xl:justify-center space-x-0 xl:space-x-2">

                {/* LEFT SIDE */}
                <div className="w-full xl:w-auto text-center xl:text-left flex flex-col items-center xl:items-start">
                    <h1 className="text-[36px] xl:text-[48px] font-bold mb-1">Pijii</h1>
                    <p className="text-[18px] xl:text-[24px] leading-snug mb-4">
                        Where your to-dos float like flying notes.
                    </p>
                    <img
                        src="/images/pigeon.png"
                        alt="Pijii Mascot"
                        className="mt-2 w-full max-w-[765.4px] h-auto max-h-[75vh] object-contain"
                    />
                </div>

                {/* RIGHT SIDE */}
                <div className="w-full max-w-md xl:self-center bg-[#c9dee2] rounded-xl shadow-md px-6 py-8 sm:px-8 sm:py-10">
                    <h2 className="text-[32px] xl:text-[40px] font-bold text-center">Log In</h2>
                    <p className="text-center text-[16px] xl:text-[18px] text-gray-700 mt-2 mb-6">
                        Welcome back! Log in to continue
                    </p>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-sm text-gray-700">Email</label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                className="w-full bg-[#edf4dd] border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#7fb191]"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm text-gray-700">Password</label>
                            <input
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                className="w-full bg-[#edf4dd] border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#7fb191]"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-[#7fb191] hover:bg-[#6ea185] text-white font-bold py-2 rounded-md transition"
                        >
                            {processing ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-6">
                        Don’t have an account?{' '}
                        <a href="/register" className="text-[#b26b47] font-semibold hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
