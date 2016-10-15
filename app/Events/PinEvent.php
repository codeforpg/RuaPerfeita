<?php

namespace App\Events;

use App\Events\Event;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PinEvent extends Event implements ShouldBroadcast
{
    use SerializesModels;

    public $data;

    public function __construct($pin)
    {
        $this->data = $pin;
    }

    public function broadcastOn()
    {
        return ['rua-perfeita'];
    }
}
