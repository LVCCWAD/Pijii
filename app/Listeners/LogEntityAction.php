<?php

namespace App\Listeners;

use App\Events\EntityActionOccurred;
use App\Models\Log;

class LogEntityAction
{
    public function handle(EntityActionOccurred $event): void
    {
        Log::create([
            'user_id'     => $event->userId,
            'entity_type' => $event->entityType,
            'entity_id'   => $event->entityId,
            'action'      => $event->action,
        ]);
    }
}
