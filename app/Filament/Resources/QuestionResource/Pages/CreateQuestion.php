<?php

namespace App\Filament\Resources\QuestionResource\Pages;

use App\Filament\Resources\QuestionResource;
use Filament\Resources\Pages\CreateRecord;
use Illuminate\Support\Facades\Cache;

class CreateQuestion extends CreateRecord
{
    protected static string $resource = QuestionResource::class;
    protected static bool $canCreateAnother = false;

    // ✅ Clear cache setelah create
    protected function afterCreate(): void
    {
        Cache::forget('questions_with_answers');
    }

    // Optional: custom redirect
    public function getRedirectUrl(): string
    {
        return $this->getResource()::getUrl('index');
    }
}
