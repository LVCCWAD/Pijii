<?php

namespace App\Events;

use Illuminate\Foundation\Events\Dispatchable;

class EntityActionOccurred
{
    use Dispatchable;

    public $userId;
    public $entityType;
    public $entityId;
    public $action;

    public function __construct($userId, $entityType, $entityId, $action)
    {
        $this->userId = $userId;
        $this->entityType = $entityType;
        $this->entityId = $entityId;
        $this->action = $action;
    }
}
