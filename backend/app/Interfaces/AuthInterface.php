<?php

namespace App\Interfaces;


interface AuthInterface
{
    public function RegisterUser(array $data);

    public function getUserByEmail($email);

    public function getUserById($user_id);

    public function getRegisterUserId(array $data);

    public function VerifyToken($token);

    public function updateUser($token);

    public function emailNotMatch($email);

    public function resetPasswordEmail($email);

    public function emailCheck($email);

    public function tokenCheck($token);

    public function updatePassword($email,$password);

    public function deleteEmail($email);

    public function createUser(array $data);

    public function createNetworkUser(array $data);

    public function referredUserData($referral_code);

}

?>
