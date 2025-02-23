<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;

class Provider extends Model
{
    use HasFactory;

    protected $guarded=[];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
