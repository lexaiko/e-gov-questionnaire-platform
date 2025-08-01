<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Result;
use App\Exports\ResultExport;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Infolists\Components;
use Maatwebsite\Excel\Facades\Excel;
use Filament\Tables\Columns\TextColumn;
use App\Filament\Resources\ResultResource\Pages;

class ResultResource extends Resource
{
    protected static ?string $model = Result::class;

    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';

    public static function form(Forms\Form $form): Forms\Form
    {
        return $form->schema([
            Forms\Components\Select::make('pengguna_id')
                ->relationship('pengguna', 'name') // ganti 'nama' sesuai field
                ->required(),

            Forms\Components\TextInput::make('skor_total')->required(),
            Forms\Components\TextInput::make('hasil')->required(),


        ]);
    }

    public static function table(Tables\Table $table): Tables\Table
    {
        return $table
        ->query(fn () => Result::query()->withCount('resultDetails'))
        ->columns([
            TextColumn::make('index')
                ->label('No')
                ->rowIndex(),
            Tables\Columns\TextColumn::make('pengguna.name')->label('Nama Pengguna'),
            TextColumn::make('result_details_count')
    ->counts('resultDetails')
    ->label('Jumlah Jawaban')
    ->formatStateUsing(fn ($state) => "{$state} Jawaban")
                ->default(0),
            Tables\Columns\TextColumn::make('skor_total')
                ->formatStateUsing(fn ($state) => "{$state} %"),
            Tables\Columns\TextColumn::make('hasil'),
            Tables\Columns\TextColumn::make('created_at')->dateTime('d M Y H:i'),
        ])
        ->actions([
            Tables\Actions\ViewAction::make(),
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
            Tables\Actions\Action::make('export_excel')
    ->label('Export Excel')
    ->url(fn (Result $record): string => route('kuisioner.admin.download', ['id' => $record->id]))
    ->icon('heroicon-o-arrow-down-tray')
    ->hidden(fn (): bool => !auth()->user()->hasPermissionTo('view_result'))
    ->openUrlInNewTab()

        ])
        ->bulkActions([
            Tables\Actions\BulkActionGroup::make([
                Tables\Actions\DeleteBulkAction::make(),
            ]),
        ])
        ->defaultSort('created_at', 'desc');
    }

    // 🧾 INFO VIEW (Liat detail + list jawaban)
    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist->schema([
            Components\Section::make('Informasi Umum')
                ->schema([
                    Components\TextEntry::make('pengguna.nama')->label('Nama Pengguna'),
                    Components\TextEntry::make('skor_total'),
                    Components\TextEntry::make('hasil'),
                    Components\TextEntry::make('created_at')->dateTime('d M Y H:i'),
                ]),

            Components\Section::make('Detail Jawaban')
                ->schema([
                    Components\RepeatableEntry::make('resultDetails')
                        ->label('Jawaban')
                        ->schema([
                            Components\TextEntry::make('question.pertanyaan')->label('Pertanyaan'),
                            Components\TextEntry::make('answer.jawaban')->label('Jawaban'),
                            Components\TextEntry::make('bobot')->label('Bobot'),
                        ])
                        ->columns(3)
                        ->columnSpanFull(),
                ])
        ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListResults::route('/'),
            'create' => Pages\CreateResult::route('/create'),
            'edit' => Pages\EditResult::route('/{record}/edit'),
            'view' => Pages\ViewResult::route('/{record}'),
        ];
    }
}
