<?php

namespace App\Repositories;

use App\Models\User;
use App\Models\Order;
use App\Interfaces\UserInterface;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class UserRepository implements UserInterface
{
    public function getAuthUser($request)
    {

        $bearerToken= $request->bearerToken();

        if($bearerToken){
            [$id, $token] = explode('|', $bearerToken, 2);
            $token = PersonalAccessToken::findToken($token);

             // Get the assigned user
             $user = $token->tokenable;

             return $user;
        }

        return "Unauthorized";


    }
    public function getAllOrderFromUser()
    {
        // return Order::where('user_id',Auth::id())->orderBy('id','DESC')->get();
    }//end of method

    public function getUserById($id)
    {
        return User::findOrFail($id);
    }//end of method

    public function updateUserData(array $data, $user)
    {
        //update user data in the database
        return $user->update($data);
    }


}
?>
