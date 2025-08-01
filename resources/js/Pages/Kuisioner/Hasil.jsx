// resources/js/Pages/Kuisioner/Hasil.jsx
export default function HasilKuisioner({ result }) {
    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold">Hasil Kuisioner</h1>
            <div className="flex items-center justify-between mb-6 bg-white shadow rounded-lg p-4">
                <div className="">
                    <p>
                        <strong>Nama:</strong> {result.pengguna.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {result.pengguna.email}
                    </p>
                    <p>
                        <strong>Total Skor:</strong> {result.skor_total}%
                    </p>
                    <p>
                        <strong>Hasil:</strong>{" "}
                        <span
                            className={
                                result.skor_total < 50
                                    ? "text-yellow-600"
                                    : "text-green-600"
                            }
                        >
                            {result.hasil}
                        </span>
                    </p>
                </div>
                <button
                    onClick={() =>
                        (window.location.href = route("kuisioner.download", {
                            id: result.id,
                        }))
                    }
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Download Hasil
                </button>
            </div>

            <div className="bg-white shadow rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Jawaban Anda</h2>
                <ul className="space-y-4">
                    {result.result_details.map((detail, index) => (
                        <li key={index} className="border-b pb-2">
                            <p>
                                <strong>Pertanyaan:</strong>{" "}
                                {detail.question.pertanyaan}
                            </p>
                            <p>
                                <strong>Jawaban:</strong>{" "}
                                {detail.answer.jawaban} (bobot:{" "}
                                {detail.answer.bobot})
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
