<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\ForgetPasswordController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\VerifyEmailController;
use App\Http\Controllers\Api\User\UserController;
use App\Http\Controllers\Api\Auth\SocialLoginController;


Route::prefix('v1')->group(function () {
    //------------------------------Guest Routes Starts------------------------------------------//
    //-----register api
    Route::post('/register', [RegisterController::class, 'Register']);
    //-----login api
    Route::post('/login', [LoginController::class, 'Login']);
    //-----verify email address
    Route::post('/send/email/verification', [
        VerifyEmailController::class,
        'sendEmailVerification',
    ]);
    //-----forget-password
    Route::post('/forget-password', [
        ForgetPasswordController::class,
        'ForgetPassword',
    ])->name('forget.password');
    //-----reset-password
    Route::post('/reset-password', [
        ResetPasswordController::class,
        'ResetPassword',
    ])
        ->name('reset.password')
        ->middleware('signed');
    //social login
    Route::get('/login/{provider}/redirect', [SocialLoginController::class, 'redirectToProvider']);
    Route::get('/login/{provider}/callback', [SocialLoginController::class, 'handleProviderCallback']);
    //------------------------------Guest Routes  Ends------------------------------------------//

    //------------------------------Authenticated Routes Start------------------------------------------//
    Route::middleware(['auth:sanctum'])->group(function () {

        //-----verify email address
        Route::post('/verify-email', [
            VerifyEmailController::class,
            'verifyEmail',
        ])
            ->middleware('signed')
            ->name('verify-email');

        //-------users api--------------------------------
        Route::get('/user', [UserController::class, 'getUser']);
        Route::get('/user/{id}/edit', [UserController::class, 'editUser']);
        Route::put('/user/{id}/update', [UserController::class, 'updateUser']);
    });
    //------------------------------Authenticated Routes End--------------------------------------------//

    //-----------------------------Admin guest route start--------------------------------------------//
    Route::prefix('admin')->group(function () {
        //-----register api
        Route::post('/register', [RegisterController::class, 'Register']);
        //-----login api
        Route::post('/login', [LoginController::class, 'Login']);
    });
    //-----------------------------Admin guest route start--------------------------------------------//

});
