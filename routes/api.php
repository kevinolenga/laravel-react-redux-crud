<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => 'cors'], function () {
    Route::get('tasks',['as' => 'task.index', 'uses' => 'Api\TaskController@index']);
    Route::post('tasks',['as' => 'task.store', 'uses' => 'Api\TaskController@store']);
    Route::put('tasks/{task}',['as' => 'task.update', 'uses' => 'Api\TaskController@update']);
    Route::get('tasks/{task}',['as' => 'task.show', 'uses' => 'Api\TaskController@show']);
    Route::delete('/tasks/{task}',['as' => 'task.destroy', 'uses' => 'Api\TaskController@destroy']);
});