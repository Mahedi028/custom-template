<?php

namespace App\Providers;

use App\Interfaces\AuthInterface;
use App\Repositories\AuthRepository;
use App\Interfaces\UserInterface;
use App\Repositories\UserRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //bind all repositories
        $this->app->bind(AuthInterface::class, AuthRepository::class);
        $this->app->bind(UserInterface::class, UserRepository::class);
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}
