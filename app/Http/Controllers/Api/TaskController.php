<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\TaskRequest;
use App\Http\Resources\TaskCollection;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use App\Http\Controllers\Controller;
use Illuminate\Http\Response;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     *
     */
    public function index()
    {
        $tasks = Task::all();
        return new TaskCollection($tasks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  TaskRequest $request
     * @param Task $task
     * @return
     */
    public function store(TaskRequest $request, Task $task)
    {
        return new TaskResource($task->create([
            'name' => $request->get('name'),
            'status' => $request->get('status'),
            'priority' => $request->get('priority'),
            'date_end' => ($request->get('date_end') == '') ? date('Y-m-d') : $request->get('date_end'),
            'date_actual' => null
        ]));
    }

    /**
     * Display the specified resource.
     *
     * @param  Task $task
     * @return TaskResource
     */
    public function show(Task $task)
    {
        TaskResource::withoutWrapping();
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  TaskRequest $request
     * @param  Task $task
     * @return
     */
    public function update(TaskRequest $request, Task $task)
    {
        $task->update([
            'name' => $request->get('name'),
            'status' => $request->get('status'),
            'priority' => $request->get('priority'),
            'date_end' => $request->get('date_end'),
            'date_actual' => ($request->get('status') == 'Завершен') ? date("Y-m-d") : null
        ]);
        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Task $task
     * @return Response
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response(['message' => 'Deleted']);
    }
}
