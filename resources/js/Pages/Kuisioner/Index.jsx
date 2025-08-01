// resources/js/Pages/Kuisioner.jsx
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function Kuisioner({ questions }) {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const { data, setData, post, processing } = useForm({
    answers: {},
  });

  const handleNext = () => {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      post(route('kuisioner.store'), {
        onSuccess: () => setCompleted(true),
      });
    }
  };

  if (completed) return <div className="p-4 text-green-600">Kuisioner selesai, silakan cek hasilnya di halaman hasil.</div>;

  const currentQuestion = questions[step];

  return (
    <div className="h-screen p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Pertanyaan {step + 1} dari {questions.length}</h2>
      <p className="mb-4">{currentQuestion.pertanyaan}</p>
      <div className="space-y-2">
        {currentQuestion.answers.map((answer) => (
          <label key={answer.id} className="block p-2 border rounded cursor-pointer">
            <input
              type="radio"
              name={`question_${currentQuestion.id}`}
              value={answer.id}
              checked={data.answers[currentQuestion.id] == answer.id}
              onChange={() => setData('answers', {
                ...data.answers,
                [currentQuestion.id]: answer.id
              })}
            /> {answer.jawaban} (bobot: {answer.bobot})
          </label>
        ))}
      </div>
      <button
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleNext}
        disabled={processing || !data.answers[currentQuestion.id]}
      >
        {step === questions.length - 1 ? 'Selesai' : 'Lanjut' }
      </button>
    </div>
  );
}
