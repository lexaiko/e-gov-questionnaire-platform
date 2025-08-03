<x-filament-widgets::widget class="fi-account-widget">
    <x-filament::section>
        <div class="flex items-center gap-x-3">
            <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 text-lg font-semibold text-white"
            >
                {{ $totalQuestions }}
            </span>

            <div class="flex-1">
                <h2
                    class="grid flex-1 text-base font-semibold leading-6 text-gray-950 dark:text-white"
                >
                    Jumlah Pertanyaan
                </h2>

                <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ $totalQuestions }}
                </p>
            </div>
        </div>
    </x-filament::section>
</x-filament-widgets::widget>
