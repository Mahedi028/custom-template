<?php

namespace App\Interfaces;


interface UserInterface
{
    public function getAuthUser($request);

    public function getAllOrderFromUser();

    public function getUserById($id);

    public function updateUserData(array $data, $user);

}

?>
