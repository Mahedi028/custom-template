<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Interfaces\AuthInterface;
use Illuminate\Support\Facades\Mail;
use App\Mail\EmailVerification;

class VerifyEmailController extends Controller
{
    use ResponseTrait;
    //define class variables
    protected $auth;
    //define class constructor
    public function __construct(AuthInterface $authInterface)
    {
        $this->auth = $authInterface;
    }
    public function sendEmailVerification(Request $request)
    {
        //user
        $user = $request->user();
        //if user exists
        if ($user) {
            //email address
            $email = $user->email;
            //send mail for email verification
            Mail::to($email)->send(new EmailVerification($user));
            //send success response
            return $this->responseSuccess(null, 'Email Verification Link Sent Your Mail Box', 200);
        }
        return $this->responseError(null, 'Email Verification Link Not Sent', 400);
    }

    public function verifyEmail(Request $request)
    {
        if (!$request->user()->email_verified_at) {
            $request->user()->forceFill([
                'email_verified_at' => now()
            ])->save();
            return $this->responseSuccess(null, 'Email Verified', 200);
        }
        return $this->responseError(null, 'Email is not Verified', 400);
    }
}
