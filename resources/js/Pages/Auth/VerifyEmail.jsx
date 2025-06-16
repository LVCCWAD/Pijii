import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

function VerifyEmail() {
    const { auth, flash } = usePage().props;
    const { post, processing, errors } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/email/verification-notification');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fdfaf6] px-4 py-8 main-bg">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md px-6 py-8 sm:px-8 sm:py-10 border border-[#d3e2e6]">
                <h1 className="text-[28px] font-bold text-center text-teal-900 mb-4">
                    Verify Your Email
                </h1>

                <p className="text-gray-700 text-[15px] text-center mb-5 leading-relaxed">
                    Hi <strong>{auth?.user?.name}</strong>, please check your email at<br />
                    <span className="text-[#7fb191] font-medium">{auth?.user?.email}</span><br />
                    and click the verification link.
                </p>

                {flash.success && (
                    <div className="bg-green-100 text-green-700 text-sm text-center px-4 py-2 rounded mb-4">
                        {flash.success}
                    </div>
                )}

                {flash.message && (
                    <div className="bg-blue-100 text-blue-700 text-sm text-center px-4 py-2 rounded mb-4">
                        {flash.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#7fb191] hover:bg-[#6ea185] text-white font-semibold py-2 rounded-md transition"
                    >
                        {processing ? 'Resending...' : 'Resend Verification Email'}
                    </button>
                </form>

                {errors && Object.keys(errors).length > 0 && (
                    <div className="text-red-600 text-sm text-center mt-4 space-y-1">
                        {Object.values(errors).map((error, i) => (
                            <p key={i}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;
