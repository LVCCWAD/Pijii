import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

function VerifyEmail() {
    const { auth, flash } = usePage().props;

    // Form setup
    const { post, processing, errors } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/email/verification-notification'); 
    };

    return (
        <div className="min-h-screen bg-amber-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <p className="text-center text-sm text-gray-500 italic mb-4">Note: This is just a placeholder.</p>
                <h1 className="text-2xl font-bold text-center text-amber-700 mb-4">Verify Your Email</h1>
                <p className="text-gray-600 text-sm text-center mb-6">
                    Hello, {auth?.user?.name}! Please check your email at <strong>{auth?.user?.email}</strong> for a verification link.
                </p>

                {flash.success && (
                    <div className="text-green-600 text-sm text-center mb-4">
                        {flash.success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <button
                        type="submit"
                        disabled={processing} 
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                        {processing ? 'Resending...' : 'Resend Verification Email'}
                    </button>
                </form>

                <div>
                    {flash.message && (
                        <div className="text-green-600 text-sm text-center mb-4">
                            {flash.message}
                        </div>
                    )}
                </div>

                {errors && (
                    <div className="text-red-600 text-sm text-center mt-4">
                        {Object.values(errors).map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default VerifyEmail;
