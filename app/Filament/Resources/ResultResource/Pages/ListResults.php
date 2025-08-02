<?php

namespace App\Filament\Resources\ResultResource\Pages;

use App\Filament\Resources\ResultResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;
use Filament\Pages\Actions\ButtonAction;

class ListResults extends ListRecords
{
    protected static string $resource = ResultResource::class;



protected function getHeaderActions(): array
{
    return [
        Actions\CreateAction::make(),
        ButtonAction::make('Export All')
            ->label('Export All')
            ->icon('heroicon-m-arrow-down-tray')
            ->url(route('kuisioner.export.all')) // route yang kamu bikin untuk export all
            ->openUrlInNewTab(), // optional
    ];
}

}
