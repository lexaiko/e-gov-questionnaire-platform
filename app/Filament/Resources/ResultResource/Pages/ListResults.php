<?php

namespace App\Filament\Resources\ResultResource\Pages;

use App\Filament\Resources\ResultResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListResults extends ListRecords
{
    protected static string $resource = ResultResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
            Actions\Action::make('export_all')
                ->label('Export All')
                ->icon('heroicon-m-arrow-down-tray')
                ->url(route('kuisioner.export.all'))
                ->openUrlInNewTab(),
        ];
    }
}
