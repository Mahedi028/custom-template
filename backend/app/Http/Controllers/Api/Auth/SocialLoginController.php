<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Interfaces\AuthInterface;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Carbon\Carbon;

class SocialLoginController extends Controller
{
    use ResponseTrait;
    //define class variables
    protected $auth;
    //define class constructor
    public function __construct(AuthInterface $authInterface)
    {
        $this->auth = $authInterface;
    }

    public function redirectToProvider($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }
        try {
            //get redirect url
            $redirect_url = Socialite::driver($provider)
                ->scopes(['openid', 'email', 'https://www.googleapis.com/auth/userinfo.email'])
                ->with(['access_type' => 'offline', 'prompt' => 'consent select_account'])
                ->stateless()
                ->redirect()
                ->getTargetUrl();
            return $this->responseSuccess($redirect_url, 'User redirect to provider', 200);
        } catch (\Exception $e) {
            return $this->responseError($e->getMessage(), 'Error', 400);
        }
    } //end of method

    public function handleProviderCallback($provider)
    {
        $validated = $this->validateProvider($provider);
        if (!is_null($validated)) {
            return $validated;
        }
        //get social user information
        $userSocial = Socialite::driver($provider)->stateless()->user();
        try {
            //social user email
            $email = $userSocial->getEmail();
            //check user email
            $user = $this->auth->checkSocialUserEmail($email);
            if ($user != null) {
                //check if user exist
                Auth::login($user);
                //get logged in user
                $loginUser = Auth::user();
                //assign access token and user data
                $token = $user->createToken('app')->plainTextToken;
                //get user role
                $role = $user->roles->pluck("name")->first();
                //send response
                return $this->authResponse($loginUser, $token, $role, 'User registered successfully.please check your email for account activation', null, 200);
            } else {
                $now=Carbon::now();
                //check if user are not exist
                $data = [];
                $data['email'] = $userSocial->getEmail();
                $data['email_verified_at'] = $now;
                $data['name'] = $userSocial->getName() === null ? 'no-name' : $userSocial->getName();
                $data['password'] = bcrypt(str()->random(16));
                $data['phone_number'] = null;
                //create user in user table
                $userCreated = $this->auth->createUser($data);
                //create provider in provider table
                $userCreated->providers()->updateOrCreate(
                    [
                        'provider' => $provider,
                        'provider_id' => $userSocial->getId(),
                    ],
                    [
                        'avatar' => $userSocial->getAvatar()?$userSocial->getAvatar():'no-image'
                    ]
                );
                //check if social user provider record is stored
                $userSocialAccount = $this->auth->socialUser($userCreated->id, $provider);

                if ($userSocialAccount) {
                    //retrieve the user from users store
                    $user = $this->auth->findSocialUser($userSocialAccount->user_id);
                    //assign access token and user data
                    $token = $user->createToken('app')->plainTextToken;
                    //user role
                    $userRole = $user->assignRole('user');
                    //get user role
                    $role = $user->roles->pluck("name")->first();
                    //send response
                    return $this->authResponse($user, $token, $role , 'User LoggedIn Successfully', null, 200);
                }
            }
        } catch (\Exception $e) {
            return $this->responseError($e->getMessage(), 'Error', 400);
        }
    } //end of method

    protected function validateProvider($provider)
    {
        if (!in_array($provider, ['facebook', 'google', 'github'])) {
            return $this->responseError(null, 'Please login using facebook, google, github', 422);
        }
    } //end of method

    private function issueToken(User $user)
    {

        $userToken = $user->token() ?? $user->createToken('socialLogin');

        return [
            "token_type" => "Bearer",
            "access_token" => $userToken->accessToken
        ];
    }
}
