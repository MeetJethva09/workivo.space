import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../api';
import { useForm } from 'react-hook-form';

type Productions = {
  craft: number;
  white: number;
  user: any
  total: number;
  date: any;
  rate: 'Per KG' | 'Fixed' | 'Dynamic';
  amount: number;
};

type Users = {
  name: string
  email: string
  mobile: number
  salaryType: string
  rate: number
  role: string
}

type UserPayload = {
  name: string;
  mobile: string;
  salaryType: 'Per KG' | 'Fixed' | 'Dynamic';
  rate: number;
  password: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour >= 5 && currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
        ? 'Good Afternoon'
        : currentHour < 22
          ? 'Good Evening'
          : 'Good Night';

  const { data: productions } = useQuery({
    queryKey: ['productions'],
    queryFn: async () => {
      const response = await api.get('/production');
      return response.data;
    },
  });


  const { data: allEmployees } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get("/users");
      return response.data;
    }
  })

  const productionsList: Productions[] = productions?.data ?? [];
  const employees: Users[] = allEmployees?.data ?? [];
  const filterEmployees = employees.filter((employee) => employee.role === 'employee');

  const today = new Date().toISOString().split('T')[0];
  const todayProductions = productionsList.filter(
    (prod) => prod.date === today
  );

  const logoutAction = () => {
    localStorage.removeItem('id');
    navigate('/login');
  };

  const allValidator = {
    nameValidator : {
      required : {
        value : true,
        message: "*Field is required!"
      }
    },
    mobileValidator : {
      required : {
        value : true,
        message: "*Field is required!"
      },
      minLength : {
        value : 10,
        message: "Mobile number must be 10 digits!"
      },
      maxLength : {
        value : 10,
        message: "Mobile number must be 10 digits!"
      }
  },
    salaryTypeValidator : {
      required : {
        value : true,
        message : "*Field is Required!"
    }
  },
    rateValidator : {
      required : {
        value : true,
        message : "*Field is Required!"
      }
    },
    passwordValidator : {
      required : {
        value : true,
        message : "*Field is required!"
      }
    }
  };

  //Add employee
  const { register, handleSubmit , reset , formState : {errors} } = useForm<UserPayload>();
  const queryClient = useQueryClient();

  const submitHandler = (data: UserPayload) => {
    addUserMutation.mutate(data);
  };
  const addUserMutation = useMutation({
    mutationKey: ['addUser'],
    mutationFn: async (userPayload: UserPayload) => {
      const response = await api.post('/users/signup', userPayload);
      return response.data;
    },
     onSuccess: async () => {
    await queryClient.invalidateQueries({ queryKey: ['users'] });
    reset();
    setIsAddEmployeeOpen(false);
  },
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">
              MEET <span className="text-orange-500"> PAPER TUBE</span>
            </h1>

            <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-500">
              Manufacturing Management
            </p>
          </div>

          {/* Admin */}
          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-white">Admin</p>
              <p className="text-xs text-neutral-500">Owner</p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-400 ring-1 ring-orange-500/20">
              A
            </div>

            <button
              type="button"
              onClick={logoutAction}
              className="rounded-lg border border-neutral-800 px-3 py-2 text-sm font-medium text-neutral-300 transition hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="w-full px-4 py-5 pb-24 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="mb-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm text-neutral-500">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
                {`${greeting} , Admin 👋`}
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                Here&apos;s your production overview for today.
              </p>
            </div>
          </div>
        </section>

        {/* ================= STATS ================= */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {/* Employees */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Employees
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                👥
              </div>
            </div>

            <p className="text-2xl font-bold sm:text-3xl">{filterEmployees.length}</p>

            <p className="mt-1 text-xs text-neutral-500">Active employees</p>
          </div>

          {/* Today's Production */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Today KG
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                ⚖
              </div>
            </div>

            <p className="text-2xl font-bold sm:text-3xl">455 KG</p>

            <p className="mt-1 text-xs text-emerald-400">
              +8.5% from yesterday
            </p>
          </div>

          {/* Today's Earnings */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Today Salary
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                ₹
              </div>
            </div>

            <p className="text-2xl font-bold sm:text-3xl">₹2,047.50</p>

            <p className="mt-1 text-xs text-neutral-500">Production earnings</p>
          </div>

          {/* Monthly */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Monthly KG
              </p>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                📦
              </div>
            </div>

            <p className="text-2xl font-bold sm:text-3xl">8,420 KG</p>

            <p className="mt-1 text-xs text-emerald-400">September 2026</p>
          </div>
        </section>

        {/* ================= QUICK ACTIONS ================= */}
        <section className="mt-6">
          <div className="mb-3">
            <h3 className="text-lg font-bold">Quick Actions</h3>
            <p className="text-sm text-neutral-500">
              Manage your manufacturing operations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {/* Add Employee */}

            <button
              type="button"
              onClick={() => setIsAddEmployeeOpen(true)}
              className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4 text-left transition hover:border-orange-500/40 hover:bg-neutral-900/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-xl text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
                +
              </div>

              <p className="text-sm font-bold">Add Employee</p>

              <p className="mt-1 text-xs text-neutral-500">Add employee in production</p>
            </button>

            <Link
              to="/admin/production"
              className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4 transition hover:border-orange-500/40 hover:bg-neutral-900/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-xl text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
                ⚖
              </div>

              <p className="text-sm font-bold">Production</p>

              <p className="mt-1 text-xs text-neutral-500">View production</p>
            </Link>

            {/* Salary */}
            <Link
              to="/admin/salary"
              className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4 transition hover:border-orange-500/40 hover:bg-neutral-900/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-xl text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
                ₹
              </div>

              <p className="text-sm font-bold">Salary</p>

              <p className="mt-1 text-xs text-neutral-500">Manage salary</p>
            </Link>

            {/* Rates */}
            <Link
              to="/admin/rates"
              className="group rounded-2xl border border-neutral-800 bg-neutral-900 p-4 transition hover:border-orange-500/40 hover:bg-neutral-900/80"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-xl text-orange-400 transition group-hover:bg-orange-500 group-hover:text-white">
                %
              </div>

              <p className="text-sm font-bold">Rates</p>

              <p className="mt-1 text-xs text-neutral-500">Manage rates</p>
            </Link>
          </div>
        </section>

        {/* ================= TODAY PRODUCTION ================= */}
        <section className="mt-6">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <h3 className="text-lg font-bold">Today&apos;s Production</h3>

              <p className="text-sm text-neutral-500">
                Production recorded by employees.
              </p>
            </div>

            <Link
              to="/admin/production"
              className="text-xs font-semibold text-orange-400 hover:text-orange-300"
            >
              View all
            </Link>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
            {/* Desktop Table */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full min-w-[700px] text-left">
                <thead className="border-b border-neutral-800 bg-neutral-950">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Employee
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Craft
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      White
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Total
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Rate
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {
                    todayProductions.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-5 py-8 text-center text-sm text-neutral-500"
                        >
                          No production recorded today!!
                        </td>
                      </tr>
                    ) :
                      todayProductions.map((productions, index) => {
                        return (

                          <tr key={index} className="border-b border-neutral-800">
                            <td className="px-5 py-4">
                              <p className="text-sm font-semibold">{productions.user?.name}</p>
                              <p className="text-xs text-neutral-500">Production</p>
                            </td>

                            <td className="px-5 py-4 text-sm text-neutral-300">
                              {productions?.craft} KG
                            </td>

                            <td className="px-5 py-4 text-sm text-neutral-300">
                              {productions?.white} KG
                            </td>

                            <td className="px-5 py-4 text-sm font-semibold">{productions?.total} KG</td>

                            <td className="px-5 py-4 text-sm text-orange-400">₹4.50</td>

                            <td className="px-5 py-4 text-right text-sm font-bold">
                              ₹{productions?.amount.toFixed(2)}
                            </td>
                          </tr>
                        )
                      })
                  }

                </tbody>
              </table>
            </div>

            {/* Mobile Production Cards */}
            <div className="divide-y divide-neutral-800 sm:hidden">
              {todayProductions.length === 0 ? (
                <div className="px-5 py-12 text-center text-sm text-neutral-500">
                  No production recorded today.
                </div>
              ) : (
                todayProductions.map((production, index) => (
                  <div key={index} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold">
                          {production.user?.name ?? 'Unknown employee'}
                        </p>
                        <p className="mt-0.5 text-xs text-neutral-500">
                          Production
                        </p>
                      </div>

                      <p className="text-base font-bold text-orange-400">
                        ₹{production.amount.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <div className="rounded-xl bg-neutral-950 p-3">
                        <p className="text-[10px] uppercase text-neutral-500">
                          Craft
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {production.craft} KG
                        </p>
                      </div>

                      <div className="rounded-xl bg-neutral-950 p-3">
                        <p className="text-[10px] uppercase text-neutral-500">
                          White
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {production.white} KG
                        </p>
                      </div>

                      <div className="rounded-xl bg-neutral-950 p-3">
                        <p className="text-[10px] uppercase text-neutral-500">
                          Total
                        </p>
                        <p className="mt-1 text-sm font-semibold">
                          {production.total} KG
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ================= EMPLOYEES ================= */}
        <section className="mt-6">
          <div className="mb-3">
            <div>
              <h3 className="text-lg font-bold">Employees</h3>

              <p className="text-sm text-neutral-500">
                Manage your production employees.
              </p>
            </div>

          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filterEmployees.map((employee, index) => (
              <div
                key={index}
                className="rounded-2xl border border-neutral-800 bg-neutral-900 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500/10 font-bold text-orange-400">
                      {employee.name.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold">
                        {employee.name}
                      </p>

                      <p className="text-xs text-neutral-500">
                        {employee.mobile}
                      </p>
                    </div>
                  </div>

                  <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-semibold text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Active
                  </span>
                </div>

                <div className="mt-4 rounded-xl bg-neutral-950 p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      Salary Type
                    </span>

                    <span className="text-xs font-semibold text-neutral-300">
                      {employee.salaryType}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">Rate</span>

                    <span className="text-sm font-bold text-orange-400">
                      {employee.salaryType === 'Per KG' ? `₹${employee.rate.toFixed(2)}` : `N/A`}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ================= MOBILE NAV ================= */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur sm:hidden">
        <div className="grid grid-cols-4">
          <Link
            to="/admin"
            className="flex flex-col items-center gap-1 px-2 py-3 text-orange-400"
          >
            <span className="text-lg">⌂</span>
            <span className="text-[10px] font-semibold">Home</span>
          </Link>

          <Link
            to="/admin/employees"
            className="flex flex-col items-center gap-1 px-2 py-3 text-neutral-500"
          >
            <span className="text-lg">👥</span>
            <span className="text-[10px] font-semibold">Employees</span>
          </Link>

          <Link
            to="/admin/production"
            className="flex flex-col items-center gap-1 px-2 py-3 text-neutral-500"
          >
            <span className="text-lg">⚖</span>
            <span className="text-[10px] font-semibold">Production</span>
          </Link>

          <Link
            to="/admin/salary"
            className="flex flex-col items-center gap-1 px-2 py-3 text-neutral-500"
          >
            <span className="text-lg">₹</span>
            <span className="text-[10px] font-semibold">Salary</span>
          </Link>
        </div>
      </nav>

      {isAddEmployeeOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={() => setIsAddEmployeeOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-employee-title"
            className="w-full rounded-t-3xl border border-neutral-800 bg-neutral-900 shadow-2xl sm:max-w-lg sm:rounded-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="flex items-center justify-between border-b border-neutral-800 px-5 py-4 sm:px-6">
              <div>
                <h2 id="add-employee-title" className="text-lg font-bold">
                  Add Employee
                </h2>
                <p className="mt-0.5 text-xs text-neutral-500">
                  Enter the employee details.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close add employee dialog"
                onClick={() => setIsAddEmployeeOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-800 text-lg text-neutral-400 transition hover:bg-neutral-700 hover:text-white"
              >
                ×
              </button>
            </header>

            <form id="add-employee-form" className="space-y-4 px-5 py-5 sm:px-6" onSubmit={handleSubmit(submitHandler)}>
              <div>
                <label htmlFor="employee-name" className="mb-1.5 block text-xs font-semibold text-neutral-300">
                  Employee Name
                </label>
                <input
                  id="employee-name"
                  type="text"
                  {...register('name', allValidator.nameValidator)}
                  placeholder="Enter employee name"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="employee-mobile" className="mb-1.5 block text-xs font-semibold text-neutral-300">
                  Mobile Number
                </label>
                <input
                  id="employee-mobile"
                  type="tel"
                  {...register('mobile' , allValidator.mobileValidator)}
                  placeholder="Enter mobile number"
                  maxLength={10}
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                 {errors.mobile && (
                  <p className="mt-1 text-xs text-red-500">{errors.mobile.message}</p>
                )}
              </div>

               <div>
                <label htmlFor="employee-password" className="mb-1.5 block text-xs font-semibold text-neutral-300">
                  Password
                </label>
                <input
                  id="employee-password"
                  type="tel"
                  {...register('password', allValidator.passwordValidator)}
                  placeholder="Enter password"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                 {errors.password && (
                  <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="employee-salary-type" className="mb-1.5 block text-xs font-semibold text-neutral-300">
                  Salary Type
                </label>
                <select
                  id="employee-salary-type"
                  {...register('salaryType', allValidator.salaryTypeValidator)}
                  defaultValue="Per KG"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                >
                   {errors.salaryType && (
                  <p className="mt-1 text-xs text-red-500">{errors.salaryType.message}</p>
                )}
                  <option>Per KG</option>
                  <option>Fixed</option>
                  <option>Dynamic</option>
                </select>
              </div>

              <div>
                <label htmlFor="employee-rate" className="mb-1.5 block text-xs font-semibold text-neutral-300">
                  Rate
                </label>
                <input
                  id="employee-rate"
                  type="number"
                  {...register('rate', allValidator.rateValidator)}
                  min="0"
                  step="0.01"
                  placeholder="Enter rate"
                  className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                 {errors.rate && (
                  <p className="mt-1 text-xs text-red-500">{errors.rate.message}</p>
                )}
              </div>
            </form>

            <footer className="flex gap-3 border-t border-neutral-800 px-5 py-4 sm:px-6">
              <button
                type="button"
                onClick={() => setIsAddEmployeeOpen(false)}
                className="flex-1 rounded-xl border border-neutral-700 px-4 py-3 text-sm font-semibold text-neutral-300 transition hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="add-employee-form"
                className="flex-1 rounded-xl bg-orange-500 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
              >
                Create Employee
              </button>
            </footer>
          </section>
        </div>
      )}

    </div>
  );
};


export default AdminDashboard;
