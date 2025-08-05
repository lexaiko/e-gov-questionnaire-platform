<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Pengguna;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Illuminate\Support\Facades\Hash;
use Filament\Support\Enums\FontWeight;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextInput;
use App\Filament\Resources\PenggunaResource\Pages;


class PenggunaResource extends Resource
{
    protected static ?string $model = Pengguna::class;

    protected static ?string $navigationIcon = 'heroicon-o-user';
    protected static ?string $navigationLabel = 'Pengguna';
    protected static ?string $pluralModelLabel = 'Pengguna';
    protected static ?string $slug = 'pengguna';
    protected static ?string $navigationGroup = 'Master Data';
    public static function form(Form $form): Form
    {
        return $form->schema([
            TextInput::make('name')->required(),
            TextInput::make('email')->email()->required(),
            TextInput::make('password')
            ->label('Password')
            ->password()
            ->required(fn (string $context) => $context === 'create') // hanya wajib saat create
            ->dehydrateStateUsing(fn ($state) => filled($state) ? Hash::make($state) : null)
            ->dehydrated(fn ($state) => filled($state))
            ->afterStateHydrated(fn (TextInput $component) => $component->state('')),

        TextInput::make('password_confirmation')
            ->label('Konfirmasi Password')
            ->password()
            ->required(fn (string $context) => $context === 'create')
            ->same('password')
            ->dehydrated(false),

        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            TextColumn::make('index')
                ->label('No')
                ->rowIndex(),
            Tables\Columns\ImageColumn::make('avatar_url')
                        ->circular()
                        ->grow(false)
                        ->getStateUsing(fn($record) => $record->avatar_url
                            ? $record->avatar_url
                            : "https://ui-avatars.com/api/?name=" . urlencode($record->name)),
            Tables\Columns\TextColumn::make('name')
                        ->searchable()
                        ->weight(FontWeight::Bold),
            TextColumn::make('name')->sortable()->searchable(),
            TextColumn::make('email')->sortable()->searchable(),
            TextColumn::make('created_at')->label('Dibuat')->dateTime('d M Y H:i'),
        ])->actions([
            Tables\Actions\ViewAction::make(), // <-- VIEW
            Tables\Actions\EditAction::make(),
            Tables\Actions\DeleteAction::make(),
        ])->bulkActions([
            Tables\Actions\DeleteBulkAction::make(),
        ]);

    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPenggunas::route('/'),
            'create' => Pages\CreatePengguna::route('/create'),
            'edit' => Pages\EditPengguna::route('/{record}/edit'),
            'view' => Pages\ViewPengguna::route('/{record}'), // <-- VIEW PAGE
        ];
    }
}
