<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Interfaces\AuthInterface;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Auth\ResetPasswordRequest;
class ResetPasswordController extends Controller
{
    use ResponseTrait;
    //define class variables
    protected $auth;
    //define class constructor
    public function __construct(AuthInterface $authInterface)
    {
        $this->auth = $authInterface;
    }
    public function ResetPassword(ResetPasswordRequest $request)
    {
        $email = $request->input('input_email');

        $password = Hash::make($request->input('password'));
        //check email
        $emailCheck = $this->auth->emailCheck($email);

        if (!$emailCheck) {
            return $this->responseError(
                null,
                'Email not found',
                404
            );
        }
        try {
            //delete email
            $this->auth->deleteEmail($email);
            //update password
            $this->auth->updatePassword($email, $password);
            return $this->responseSuccess(
                null,
                'Password reset successful',
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
