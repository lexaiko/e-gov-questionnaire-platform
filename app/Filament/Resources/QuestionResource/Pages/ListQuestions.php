<?php

namespace App\Filament\Resources\QuestionResource\Pages;

use Filament\Actions;
use Illuminate\Support\Facades\Cache;
use Filament\Resources\Pages\ListRecords;
use App\Filament\Resources\QuestionResource;

class ListQuestions extends ListRecords
{
    protected static string $resource = QuestionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
    protected function afterDelete(): void
    {
        Cache::forget('questions_with_answers');
    }

    protected function afterBulkDelete(): void
    {
        Cache::forget('questions_with_answers');
    }
}
