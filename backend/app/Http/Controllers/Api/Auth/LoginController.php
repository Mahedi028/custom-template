<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Interfaces\AuthInterface;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\Auth\LoginRequest;

class LoginController extends Controller
{
    use ResponseTrait;
    //class variables
    protected $auth;
    //class constructor
    public function __construct(AuthInterface $authInterface)
    {
        $this->auth = $authInterface;
    }
    // LOGIN API URL:http://127.0.0.1:8000/api/v1/login

    public function Login(LoginRequest $request)
    {
        try {
            if (!(Auth::attempt($request->only('email', 'password')))) {
                return $this->authResponse(null, null, null, 'Invalid email or password', null, 403);
            }
            //create authenticated user
            $user = Auth::user();
            //email_verification_token is null or not
            if ($user->email_verified_at == null) {
                return $this->authResponse(null, null, null, 'User Account not activated please check your email and activate your account to login', null, 403);
            } else {
                //create token
                $token = $user->createToken('app')->plainTextToken;
                //get user role information
                $role = $user->roles->pluck("name")->first();
                //send json response
                return $this->authResponse($user, $token, $role, 'logged in successfully', null, 200);
            }
        } catch (\Exception $e) {
            return $this->authResponse(null, null, null, $e->getMessage(), $e, 400);
        }
    } //end of method
}
