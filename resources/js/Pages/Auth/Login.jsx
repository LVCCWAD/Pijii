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
        <div className="bg-white min-h-screen flex items-center justify-center px-4 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl w-full gap-8 lg:gap-20">

                {/* LEFT PANEL */}
                <div className="w-full lg:w-1/2 text-center lg:text-left flex flex-col items-center lg:items-start">
                    <h1 className="text-[36px] md:text-[48px] leading-[44px] md:leading-[56px] font-bold">Pijii</h1>
                    <p className="text-[18px] md:text-[24px] leading-[28px] md:leading-[32px] mt-2">
                        Where your to-dos float like flying notes.
                    </p>
                    <img
                        src="/images/PIJI%20SPRITE1.png"
                        alt="Pijii Mascot"
                        className="mt-6 w-[80%] max-w-[400px] md:max-w-[500px] lg:max-w-[650px]"
                    />
                </div>

                {/* RIGHT PANEL */}
                <div className="w-full max-w-md bg-[#c9dee2] rounded-xl shadow-md px-6 py-8 sm:px-8 sm:py-10">
                    <h2 className="text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] font-bold text-center">Log In</h2>
                    <p className="text-center text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-gray-700 font-poppins mt-2 mb-6">
                        Welcome back! Log in to continue
                    </p>

                    <form onSubmit={submit}>
                        {/* Email */}
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

                        {/* Password */}
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

                    {/* OR Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm font-poppins text-gray-600">
                            <span className="bg-[#c9dee2] px-2">Or log in with</span>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center space-x-6 text-2xl">
                        <a href="#"><i className="fab fa-facebook text-[#1877F2]"></i></a>
                        <a href="#"><i className="fab fa-google text-[#EA4335]"></i></a>
                        <a href="#"><i className="fab fa-apple text-black"></i></a>
                    </div>

                    {/* Register Prompt */}
                    <p className="text-center text-sm mt-6 font-poppins">
                        Don’t have an account?{' '}
                        <a href="/register" className="text-[#b26b47] font-semibold hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>

            {/* Font Awesome */}
            <script src="https://kit.fontawesome.com/a2f3a6e648.js" crossOrigin="anonymous" async></script>
        </div>
    );
}

export default Login;
