<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Interfaces\AuthInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Database\QueryException;
use App\Http\Requests\Auth\RegisterRequest;
use App\Mail\EmailVerification;

class RegisterController extends Controller
{
    use ResponseTrait;
    //define class variables
    protected $auth;
    //define class constructor
    public function __construct(AuthInterface $authInterface)
    {
        $this->auth = $authInterface;
    }
    public function Register(RegisterRequest $request)
    {
        //catch all frontend data
        $data = [];
        $email = $request->email;
        $data['name'] = $request->input('name');
        $data['email'] = $request->input('email');
        $data['password'] = Hash::make($request->input('password'));
        $data['phone_number'] = $request->input('phone_number');
        try {
            $user = $this->auth->RegisterUser($data);
            //create token
            $token = $user->createToken('app')->plainTextToken;
            //send mail for email verification
            Mail::to($email)->send(new EmailVerification($user));
            //send register response
            return $this->authResponse($user, $token, 'User registered successfully.please check your email for account activation', null, 200);
        } catch (QueryException $e) {
            // Handle duplicate entry or other database errors
            if ($e->errorInfo[1] == 1062) {
                return $this->authResponse(null, null, 'The email address is already in use', $e->getMessage(), 409);
            }
        } catch (\Exception $e) {
            return $this->responseError('Error', 'Invalid Referral code', 401);
        }
    } //end of method

}
