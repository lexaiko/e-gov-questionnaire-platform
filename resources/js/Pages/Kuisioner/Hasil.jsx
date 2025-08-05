// resources/js/Pages/Kuisioner/Hasil.jsx
export default function HasilKuisioner({ result }) {
    return (
        <div className="max-w-3xl mx-auto  p-6 bg-white">
            <h1 className="text-2xl font-bold text-yellow-500">Hasil Assesment</h1>
            <div className="flex items-center justify-between mb-6 shadow rounded-lg p-4">
                <div className="flex-1">
                    <p>
                        <strong>Nama:</strong> {result.pengguna.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {result.pengguna.email}
                    </p>
                    <p>
                        <strong>Total Skor:</strong>{" "}
                        <span
                            className={
                                result.skor_total < 62
                                    ? "text-red-600"
                                    : result.skor_total < 78
                                    ? "text-yellow-600"
                                    : "text-green-600"
                            }
                        >{result.skor_total}%
                        </span>
                    </p>
                    <p>
                        <strong>Kategori:</strong>{" "}
                            {result.kategori}
                    </p>
                    <p>
                        <strong>Rekomendasi:</strong>{" "}
                            {result.rekomendasi}
                    </p>
                </div>
                <button
                    onClick={() =>
                        (window.location.href = route("kuisioner.download", {
                            id: result.id,
                        }))
                    }
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Download Hasil
                </button>
            </div>

            <div className="shadow rounded-lg p-4">
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
                                {detail.answer.jawaban}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

