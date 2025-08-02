<?php

namespace App\Filament\Resources\ResultResource\Pages;

use Filament\Actions;
use Filament\Pages\Actions\ButtonAction;
use Filament\Resources\Pages\ViewRecord;
use App\Filament\Resources\ResultResource;

class ViewResult extends ViewRecord
{
    protected static string $resource = ResultResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\EditAction::make(),
            ButtonAction::make('Export Result')
            ->label('Export Result')
            ->icon('heroicon-m-arrow-down-tray')
            ->url(function () {
                return route('kuisioner.admin.download', $this->record->id);
            }) // route yang kamu bikin untuk export all
            ->openUrlInNewTab(),
        ];
    }
}
