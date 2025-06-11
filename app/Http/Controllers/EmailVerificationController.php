<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
     
        return redirect()->route('dashboard')->with('success', 'Registration Successfull! Welcome to Pijii!');
    }

    public function send(Request $request) 
    {
        $request->user()->sendEmailVerificationNotification();
     
        return back()->with('message', 'Verification link sent!');
    }
}
