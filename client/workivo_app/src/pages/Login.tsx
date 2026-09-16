import api from '../api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm();

  const submitHandler = async (data: object) => {
    try {
      const response = await api.post('/users/login', data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const shortId = 'Yt567gvw23' + response.data.user._id;
        localStorage.setItem('id', shortId);
        toast.success('Login success!!', {
          position: 'top-right',
          autoClose: 1700,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce,
        });
        setTimeout(() => {
          if (response.data.user.role === 'admin') {
            navigate('/admin/dashboard'); // Redirect to the dashboard or desired page
          } else navigate('/user/dashboard'); // Redirect to the dashboard or desired page
        }, 2000); // 2 seconds delay before redirecting
      }
    } catch (error: unknown) {
      const err = error as {
        status?: number;
        response?: {
          data?: {
            message?: string;
          };
        };
      };

      if (err.status === 401) {
        toast.error(err.response?.data?.message);
      } else if (err.status === 400) {
        toast.error(err.response?.data?.message);
      } else {
        console.log(err.response);
        toast.error('Something went wrong');
      }
    }
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1700}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <div className="min-h-screen bg-neutral-950 text-white">
        <div className="flex min-h-screen flex-col lg:flex-row">
          {/* Left - Company Introduction */}
          <div className="hidden bg-neutral-900 lg:flex lg:w-1/2">
            <div className="flex w-full flex-col justify-between p-12 xl:p-16">
              {/* Logo */}
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  MEET <span className="text-orange-500"> PAPER TUBE</span>
                </h1>

                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Manufacturing
                </p>
              </div>

              {/* Main Content */}
              <div className="max-w-xl">
                <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                  Production Management
                </p>

                <h2 className="text-5xl font-bold leading-tight xl:text-6xl">
                  Precision in
                  <span className="block text-orange-500">
                    every production.
                  </span>
                </h2>

                <p className="mt-6 max-w-lg text-base leading-7 text-neutral-400">
                  Manage daily production, employee work, production rates and
                  monthly salary from one simple system.
                </p>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-3 border border-white/10">
                  <div className="border-r border-white/10 p-5">
                    <p className="text-2xl font-bold">4.5</p>
                    <p className="mt-1 text-xs text-neutral-500">Rate / KG</p>
                  </div>

                  <div className="border-r border-white/10 p-5">
                    <p className="text-2xl font-bold">320</p>
                    <p className="mt-1 text-xs text-neutral-500">Fixed Rate</p>
                  </div>

                  <div className="p-5">
                    <p className="text-2xl font-bold">24/7</p>
                    <p className="mt-1 text-xs text-neutral-500">Tracking</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-600">
                © 2026 PaperCore Manufacturing
              </p>
            </div>
          </div>

          {/* Right - Login */}
          <div className="flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-1/2 lg:px-12">
            <div className="w-full max-w-md">
              {/* Mobile Logo */}
              <div className="mb-12 lg:hidden">
                <h1 className="text-2xl font-bold tracking-tight">
                  MEET <span className="text-orange-500">PAPER TUBE</span>
                </h1>

                <p className="mt-1 text-xs uppercase tracking-[0.25em] text-neutral-500">
                  Manufacturing
                </p>
              </div>

              {/* Heading */}
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                  Welcome Back
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Sign in to your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  Access your production and salary dashboard.
                </p>
              </div>

              {/* Form */}
              <form
                className="mt-10 space-y-5"
                onSubmit={handleSubmit(submitHandler)}
              >
                {/* Email / Mobile */}
                <div>
                  <label
                    htmlFor="emailOrMobile"
                    className="mb-2 block text-sm font-medium text-neutral-300"
                  >
                    Email or Mobile Number
                  </label>

                  <input
                    id="emailOrMobile"
                    {...register('emailOrMobile')}
                    type="text"
                    required
                    placeholder="Enter email or mobile number"
                    className="h-13 w-full rounded-lg border border-white/10 bg-white/4 px-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-neutral-300"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs font-medium text-orange-500 transition hover:text-orange-400"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      id="password"
                      required
                      {...register('password')}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="h-13 w-full rounded-lg border border-white/10 bg-white/4 px-4 pr-14 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-500 transition hover:text-white"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center gap-3">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-orange-500"
                  />

                  <label
                    htmlFor="remember"
                    className="text-sm text-neutral-500"
                  >
                    Keep me signed in
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="flex h-13 w-full items-center justify-center rounded-lg bg-orange-500 px-5 text-sm font-semibold text-white transition hover:bg-orange-600 active:scale-[0.99]"
                >
                  Sign In
                </button>
              </form>

              {/* Employee Help */}
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-center text-xs leading-5 text-neutral-600">
                  Employee access is provided by the company administrator.
                </p>
              </div>

              {/* Back */}
              <div className="mt-6 text-center">
                <Link
                  to="/"
                  className="text-sm text-neutral-500 transition hover:text-white"
                >
                  ← Back to company
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
