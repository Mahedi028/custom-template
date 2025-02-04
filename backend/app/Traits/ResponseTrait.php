<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;

trait ResponseTrait
{

    public function responseSuccess($data, $message, $code): JsonResponse
    {
        return response()->json([
            'statusCode' => true,
            'message' => $message,
            'data' => $data,
            'errors' => null
        ], $code);
    }


    public function authResponse($user, $token, $role, $message, $errors, $code)
    {
        return response()->json([
            'user' => $user,
            'token' => $token,
            'role' => $role,
            'message' => $message,
            'errors' => $errors
        ], $code);
    }
    public function responseError($errors, $message, $code): JsonResponse
    {
        return response()->json([
            'status' => false,
            'message' => $message,
            'data' => null,
            'errors' => $errors
        ], $code);
    }
}
