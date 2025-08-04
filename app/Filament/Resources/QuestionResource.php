<?php

namespace App\Filament\Resources;

use Filament\Forms;
use Filament\Tables;
use App\Models\Question;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Infolists\Infolist;
use Filament\Resources\Resource;
use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Resources\Pages\ViewRecord;
use Illuminate\Database\Eloquent\Builder;
use Filament\Infolists\Components\Section;
use Filament\Infolists\Components\TextEntry;
use App\Filament\Resources\QuestionResource\Pages;
use Filament\Infolists\Components\RepeatableEntry;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use App\Filament\Resources\QuestionResource\RelationManagers;
use Illuminate\Support\Facades\Cache;


class QuestionResource extends Resource
{
    protected static ?string $model = Question::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';
    protected static ?string $navigationLabel = 'Pertanyaan';
    protected static ?string $pluralModelLabel = 'Pertanyaan';
    protected static ?string $slug = 'pertanyaan';
    protected static ?string $navigationGroup = 'Master Data';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('pertanyaan')
                    ->label('Pertanyaan')
                    ->required()
                    ->maxLength(255),
                Forms\Components\TextInput::make('order')
                    ->label('Urutan')
                    ->numeric()
                    ->default(0)
                    ->required()
                    ->minValue(0)
                    ->maxValue(1000),

                Forms\Components\Repeater::make('answers')
                    ->relationship()
                    ->label('Jawaban')
                    ->schema([
                        Forms\Components\TextInput::make('jawaban')
                            ->label('Teks Jawaban')
                            ->required(),

                        Forms\Components\TextInput::make('bobot')
                            ->label('Bobot')
                            ->numeric()
                            ->required(),
                    ])
                    ->minItems(1)
                    ->collapsible()
                    ->defaultItems(1),
            ]);
    }

    public static function infolist(Infolist $infolist): Infolist
{
    return $infolist
        ->schema([
            Section::make('Informasi Pertanyaan')
                ->schema([
                    TextEntry::make('pertanyaan')->label('Pertanyaan'),
                    TextEntry::make('order')->label('Urutan'),
                ]),

            Section::make('Jawaban Terkait')
                ->schema([
                    RepeatableEntry::make('answers')
                        ->label('')
                        ->schema([
                            TextEntry::make('jawaban')->label('Jawaban'),
                            TextEntry::make('bobot')->label('Bobot'),
                        ])
                        ->columns(2),
                ]),
        ]);
}

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('index')
                ->label('No')
                ->rowIndex(),
                Tables\Columns\TextColumn::make('pertanyaan')
                    ->label('Pertanyaan')
                    ->searchable(),
                Tables\Columns\TextColumn::make('order')
                    ->label('Urutan'),
                Tables\Columns\TextColumn::make('answers_count')
                    ->counts('answers')
                    ->label('Jumlah Jawaban'),
            ])
            ->filters([
                //
            ])
            ->actions([
                ViewAction::make(),
                Tables\Actions\EditAction::make(),
   Tables\Actions\DeleteAction::make()
   ->after(function () {
        \Illuminate\Support\Facades\Cache::forget('questions_with_answers');
    }),

            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                    ->after(function () {
        \Illuminate\Support\Facades\Cache::forget('questions_with_answers');
    }),
                ]),
            ])
            ->defaultSort('order');

    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListQuestions::route('/'),
            'create' => Pages\CreateQuestion::route('/create'),
            'edit' => Pages\EditQuestion::route('/{record}/edit'),
            'view' => Pages\ViewQuestion::route('/{record}'),
        ];
    }
}
