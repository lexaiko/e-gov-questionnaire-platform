import { Link } from '@inertiajs/react';
import { useForm, usePage } from '@inertiajs/react';


export default function Register() {
const { flash } = usePage().props;
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleNameChange = (e) => {
    setData('name', e.target.value);
  }

  const handleEmailChange = (e) => {
    setData('email', e.target.value);
  }

  const handlePasswordChange = (e) => {
    setData('password', e.target.value);
  }

  const handlePasswordConfirmationChange = (e) => {
    setData('password_confirmation', e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('auth.register.submit'), data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Register Self Assessment</h2>

        {flash.message && <p className="text-green-500 text-sm mb-4">{flash.message}</p>}
        {flash.success && <p className="text-green-500 text-sm mb-4">{flash.success}</p>}
        {flash.error && <p className="text-red-500 text-sm mb-4">{flash.error}</p>}

        <div className="mb-4">
          <label>Nama</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            placeholder="John Doe"
            value={data.name}
            onChange={handleNameChange}
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label>Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="john.doe@example.com"
            value={data.email}
            onChange={handleEmailChange}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label>Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="password"
            value={data.password}
            onChange={handlePasswordChange}
            required
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>

        <div className="mb-4">
          <label>Konfirmasi Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="password"
            value={data.password_confirmation}
            onChange={handlePasswordConfirmationChange}
            required
          />
        </div>

        <p className="text-center">
          Sudah memiliki akun? <Link href={route('login')} className="text-blue-500">Klik disini</Link>
        </p>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition duration-300"
          disabled={processing}
        >
          Lanjut
        </button>
      </form>
    </div>
  );
}

