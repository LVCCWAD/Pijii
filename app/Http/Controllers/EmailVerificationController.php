<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\EntityActionOccurred;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

class EmailVerificationController extends Controller
{
    public function showNotice()
    {
        return inertia('Auth/VerifyEmail');
    }
    
    public function verify(EmailVerificationRequest $request) 
    {
        $request->fulfill();

        EntityActionOccurred::dispatch(
            $request->user()->id,
            'User',
            $request->user()->id,
            'verified email'
        );
        
        return redirect()->route('dashboard')->with('success', 'Registration Successfull! Welcome to Pijii!');
    }

    public function send(Request $request) 
    {
        $request->user()->sendEmailVerificationNotification();
     
        return back()->with('message', 'Verification link sent!');
    }
}
