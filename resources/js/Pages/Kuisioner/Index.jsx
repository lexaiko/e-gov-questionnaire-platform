// resources/js/Pages/Kuisioner.jsx
import { useForm, Link } from '@inertiajs/react';
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

  const handleBack = () => {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  };

  if (completed) return <div className="p-4 text-green-600">Kuisioner selesai, silakan cek hasilnya di halaman hasil.</div>;

  const currentQuestion = questions[step];

  return (
    <div className="pt-32 flex items-center justify-center">
      <div className="p-6 w-3/4 mx-auto bg-white rounded-lg shadow-md sm:w-2/3">
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
              /> {answer.jawaban}
            </label>
          ))}
        </div>
        <div className="flex justify-between">
          {step === 0 ? (
  <Link
    className="mt-6 bg-gray-500 text-white px-4 py-2 rounded"
    href={route('pengguna.dashboard')}
    disabled={processing}
  >
    Kembali
  </Link>
) : (
  <button
    className="mt-6 bg-gray-500 text-white px-4 py-2 rounded"
    onClick={handleBack}
    disabled={processing}
  >
    Kembali
  </button>
)}


          <button
            className="mt-6 bg-yellow-500 text-white px-4 py-2 rounded"
            onClick={handleNext}
            disabled={processing || !data.answers[currentQuestion.id]}
          >
            {step === questions.length - 1 ? 'Selesai' : 'Lanjut' }
          </button>
        </div>
      </div>
    </div>
  );
}


