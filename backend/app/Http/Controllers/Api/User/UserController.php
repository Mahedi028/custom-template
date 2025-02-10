<?php

namespace App\Http\Controllers\Api\User;

use App\Http\Controllers\Controller;
use App\Traits\ResponseTrait;
use Illuminate\Http\Request;
use App\Interfaces\UserInterface;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    use ResponseTrait;

    protected $user;

    public function __construct(UserInterface $userInterface)
    {
        $this->user=$userInterface;
    }

    public function getUser()
    {
        try{
            $user=Auth::user();
            return $this->responseSuccess($user,'Authenticate user',200);
        }catch(\Exception $e){
            return $this->responseError($e->getMessage(),'Error',401);
        }
    }

    public function editUser($id)
    {
        try{
            $user=$this->user->getUserById($id);
            return $this->responseSuccess($user,'Authenticated Updated User',200);
        }catch(\Exception $e){
            return $this->responseError($e->getMessage(),'Error',401);
        }
    }

    public function updateUser(Request $request, $id)
    {
        $existing_user=$this->user->getUserById($id);

        if($existing_user){
            //get all input values
            $data=[];
            $data['name']=$request->input('name')?$request->input('name'):$existing_user->name;
            $data['email']=$request->input('email')?$request->input('email'):$existing_user->email;
            $data['phone_number']=$request->input('phone_number')?$request->input('phone_number'):$existing_user->phone_number;
            try{
                $updateUser=$this->user->updateUserData($data,$existing_user);
                return $this->responseSuccess($updateUser,'Authenticate user',200);
            }catch(\Exception $e){
                return $this->responseError($e->getMessage(),'Error',401);
            }
        }
        return $this->responseError("User not Found",'Error',401);
    }
}
