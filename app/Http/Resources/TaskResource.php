<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'status' => $this->status,
            'priority' => $this->priority,
            'date_end' => $this->date_end,
            'date_actual' => $this->date_actual,
            'links' => route('task.show', ['id' => $this->id])
        ];
    }
}
