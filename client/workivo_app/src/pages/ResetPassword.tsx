import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import api from '../api';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

type ResetPasswordForm = {
    newPassword: string;
    confirmPassword: string;
};

type ApiError = {
    message?: string;
};

export const ResetPassword = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordForm>()

    const submitHandler = (data: ResetPasswordForm) => {
        changePassMutation.mutate(data);
    }
    const changePassMutation = useMutation<unknown, AxiosError<ApiError>, ResetPasswordForm>({
        mutationKey: ['changePass'],
        mutationFn: async (data) => {
            const response = await api.patch('/users/update-password', data);
            return response.data;
        },
        onSuccess: () => {
            navigate('/user/dashboard');
        },
    })

    const allValidator = {
        newPassword: {
            required: {
                value: true,
                message: "New Password is required"
            }
        },
        confirmPassword: {
            required: {
                value: true,
                message: "Confirm Password is required"
            }
        }
    }
    return (
        <main className="min-h-screen bg-neutral-950 text-white">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <section className="hidden bg-neutral-900 lg:flex lg:w-1/2">
                    <div className="flex w-full flex-col justify-between p-12 xl:p-16">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">
                                MEET <span className="text-orange-500">PAPER TUBE</span>
                            </h1>
                            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-neutral-500">
                                Manufacturing
                            </p>
                        </div>

                        <div className="max-w-xl">
                            <p className="mb-5 text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                                Account Security
                            </p>
                            <h2 className="text-5xl font-bold leading-tight xl:text-6xl">
                                A fresh start for
                                <span className="block text-orange-500">your account.</span>
                            </h2>
                            <p className="mt-6 max-w-lg text-base leading-7 text-neutral-400">
                                Choose a password you have not used before to keep your account
                                protected.
                            </p>
                        </div>

                        <p className="text-xs text-neutral-600">
                            © 2026 PaperCore Manufacturing
                        </p>
                    </div>
                </section>

                <section className="flex min-h-screen w-full items-center justify-center px-5 py-10 sm:px-8 lg:w-1/2 lg:px-12">
                    <div className="w-full max-w-md">
                        <div className="mb-12 lg:hidden">
                            <h1 className="text-2xl font-bold tracking-tight">
                                MEET <span className="text-orange-500">PAPER TUBE</span>
                            </h1>
                            <p className="mt-1 text-xs uppercase tracking-[0.25em] text-neutral-500">
                                Manufacturing
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-500">
                                Secure your account
                            </p>
                            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                                Reset your password
                            </h2>
                            <p className="mt-3 text-sm leading-6 text-neutral-500">
                                Create a new password to continue to your dashboard.
                            </p>
                        </div>

                        <form className="mt-10 space-y-5" onSubmit={handleSubmit(submitHandler)}>
                            <div>
                                <label
                                    htmlFor="new-password"
                                    className="mb-2 block text-sm font-medium text-neutral-300"
                                >
                                    New Password
                                </label>
                                <input
                                    id="new-password"
                                    type="password"
                                    {...register('newPassword', allValidator.newPassword)}
                                    placeholder="Enter a new password"
                                    className="h-13 w-full rounded-lg border border-white/10 bg-white/4 px-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                />
                                {errors.newPassword && (
                                    <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="confirm-password"
                                    className="mb-2 block text-sm font-medium text-neutral-300"
                                >
                                    Confirm New Password
                                </label>
                                <input
                                    id="confirm-password"
                                    type="password"
                                    {...register('confirmPassword', allValidator.confirmPassword)}
                                    placeholder="Enter your new password again"
                                    className="h-13 w-full rounded-lg border border-white/10 bg-white/4 px-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            {changePassMutation.isError && (
                                <p role="alert" className="text-sm text-red-400">
                                    {changePassMutation.error.response?.data?.message ??
                                        changePassMutation.error.message ??
                                        'Could not update your password.'}
                                </p>
                            )}

                            {changePassMutation.isSuccess && (
                                <p role="status" className="text-sm text-emerald-400">
                                    Password updated successfully.
                                </p>
                            )}

                            <button
                                type="submit"
                                disabled={changePassMutation.isPending}
                                className="flex h-13 w-full items-center justify-center rounded-lg bg-orange-500 px-4 text-sm font-bold text-white transition hover:bg-orange-600"
                            >
                                {changePassMutation.isPending ? 'Updating...' : 'Update Password'}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-neutral-500">
                            Return to{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-orange-500 transition hover:text-orange-400"
                            >
                                sign in
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default ResetPassword;
