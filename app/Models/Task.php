<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    protected $table = 'tasks';

    protected $fillable = [
        'name', 'status', 'priority', 'date_end', 'date_actual'
    ];

    public $timestamps = false;

    public function getDateEndAttribute($date)
    {
        return Carbon::parse($date)->format('d.m.Y');
    }

    public function getDateActualAttribute($date)
    {
        if($date != null){
            return Carbon::parse($date)->format('d.m.Y');
        }
        return null;
    }
}
