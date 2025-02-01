<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Interfaces\AuthInterface;
use App\Http\Requests\Auth\ForgetPasswordRequest;
use Illuminate\Support\Facades\Mail;
use App\Mail\ForgetPasswordMail;
class ForgetPasswordController extends Controller
{
    use ResponseTrait;
    //define class variables
    protected $auth;
    //define class constructor
    public function __construct(AuthInterface $authInterface)
    {
        $this->auth = $authInterface;
    }
    // LOGIN API URL:http://127.0.0.1:8000/api/v1/forget-password
    public function ForgetPassword(ForgetPasswordRequest $request)
    {
        //get email address
        $email = $request->input('email');
        //check if email is valid or not
        if ($this->auth->emailNotMatch($email)) {
            return $this->responseError(null, 'Email not found', 401);
        }
        try {
            $this->auth->resetPasswordEmail($email);
            //send mail for forget password
            Mail::to($email)->send(new ForgetPasswordMail($email));
            //send reset password response
            return $this->responseSuccess(
                null,
                'Reset password link sent your inbox',
                200
            );
        } catch (\Exception $e) {
            return $this->responseError(
                $e->getMessage(),
                'Something error',
                401
            );
        }
    } //end of method

}
