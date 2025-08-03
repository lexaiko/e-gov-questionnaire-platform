<?php

namespace App\Filament\Resources\TotalQuestionResource\Widgets;

use App\Models\Question;
use Filament\Widgets\Widget;

class TotalQuestion extends Widget
{
    protected static ?int $sort = -2;
    protected static bool $isLazy = false;

    protected static string $view = 'filament.resources.total-question-resource.widgets.total-question';

    public function getViewData(): array
    {
        return [
            'totalQuestions' => Question::count(),
        ];
    }
    
}
