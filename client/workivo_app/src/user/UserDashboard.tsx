
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

type User = {
  name: string;
};

type Production = {
  date: string;
  craft: number;
  white: number;
  total: number;
  rate: number;
  amount: number;
};

const UserDashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [production, setProduction] = useState<Production[]>([]);
  const [todayProduction, setTodayProduction] = useState<Production | null>(
    null,
  );

  const getUser = async (): Promise<void> => {
    const id: string | null = localStorage.getItem('id');
    const userId = id?.substring(10); // Extract the user ID from the stored value
    const response = await api.get('/users/user/' + userId);
    setUser(response.data.data);
  };

  const getProduction = async (): Promise<void> => {
    const id: string | null = localStorage.getItem('id');
    const userId = id?.substring(10); // Extract the user ID from the stored value
    const response = await api.get('/production/user/' + userId);
    setProduction(response.data.data);
  };

  const getTodayProduction = async (): Promise<void> => {
    const id: string | null = localStorage.getItem('id');
    const userId = id?.substring(10);
    const response = await api.get('/production/user/' + userId + '/today');
    setTodayProduction(response.data.data);
  };

  useEffect(() => {
    Promise.all([getUser(), getProduction(), getTodayProduction()]);
  }, []);

  const currentHour = new Date().getHours();
  const username: string | undefined = user?.name.split(' ')[0];
  const greeting =
    currentHour >= 5 && currentHour < 12
      ? 'Good Morning'
      : currentHour < 18
        ? 'Good Afternoon'
        : currentHour < 22
          ? 'Good Evening'
          : 'Good Night';

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-neutral-800 bg-neutral-950">
        <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-bold tracking-tight">
              MEET <span className="text-orange-500"> PAPER TUBE</span>
            </h1>

            <p className="hidden text-[10px] uppercase tracking-widest text-neutral-500 sm:block">
              Production Management
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-white">{user?.name}</p>

              <p className="text-xs text-neutral-500">Employee</p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500/10 text-sm font-bold text-orange-400">
              {user
                ? user?.name.split(' ')[0].substring(0, 2).toUpperCase()
                : 'RP'}
            </div>

            <Link
              to="/login"
              className="rounded-lg border border-neutral-700 px-3 py-2 text-xs font-semibold text-neutral-300 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 sm:px-4"
            >
              Logout
            </Link>
          </div>
        </div>
      </header>

      <main className="px-4 py-5 sm:px-6 lg:px-8">
        {/* Welcome */}
        <section className="mb-6">
          <p className="text-sm text-neutral-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {`${greeting}, ${username} 👋`}
          </h2>

          <p className="mt-1 text-sm text-neutral-500">
            Here is your production summary.
          </p>
        </section>

        {/* Today's Summary */}
        <section className="grid grid-cols-2 gap-3 lg:grid-cols-2">
          {/* <div className="border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Today's Production
            </p>

            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {todayProduction.total}
              <span className="ml-1 text-sm font-medium text-neutral-500">
                KG
              </span>
            </p>
          </div> */}

          <div className="border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Today's Earning
            </p>

            <p className="mt-2 text-2xl font-bold text-orange-500 sm:text-3xl">
              ₹{todayProduction?.amount || "-"}
            </p>
          </div>

          {/* <div className="border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Monthly Production
            </p>

            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              {monthlyProduction.toLocaleString()}
              <span className="ml-1 text-sm font-medium text-neutral-500">
                KG
              </span>
            </p>
          </div> */}

          <div className="border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
              Monthly Earning
            </p>

            <p className="mt-2 text-2xl font-bold text-white sm:text-3xl">
              ₹ {
                production.reduce((total, item) => total + item.amount, 0)
              }
            </p>
          </div>
        </section>

        {/* Today's Production */}
        <section className="mt-5 border border-neutral-800 bg-neutral-900 ">
          <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-4 sm:px-6">
            <div>
              <h3 className="font-bold text-white">Today's Production</h3>

              <p className="mt-1 text-xs text-neutral-500">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-neutral-500">Rate</p>

              <p className="font-bold text-orange-500">₹4.50/KG</p>
            </div>
          </div>

          {todayProduction ? (
            <div className="grid grid-cols-3 divide-x divide-neutral-800">
              <div className="p-4 text-center">
                <p className="text-xs text-neutral-500">Craft</p>

                <p className="mt-1 text-xl font-bold text-white">
                  {todayProduction.craft}
                  <span className="ml-1 text-xs font-normal text-neutral-500">
                    KG
                  </span>
                </p>
              </div>

              <div className="p-4 text-center">
                <p className="text-xs text-neutral-500">White</p>

                <p className="mt-1 text-xl font-bold text-white">
                  {todayProduction.white}
                  <span className="ml-1 text-xs font-normal text-neutral-500">
                    KG
                  </span>
                </p>
              </div>

              <div className="p-4 text-center">
                <p className="text-xs text-neutral-500">Total</p>

                <p className="mt-1 text-xl font-bold text-orange-500">
                  {todayProduction.craft + todayProduction.white}
                  <span className="ml-1 text-xs font-normal text-neutral-500">
                    KG
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <center className='p-2'>
              <span className="rounded-xl bg-red-500/10 px-4 text-sm text-red-400 py-2">
                No production Today!!
              </span>
            </center>
          )}
        </section>

        {/* Production History */}
        <section className="mt-5 border border-neutral-800 bg-neutral-900">
          <div className="border-b border-neutral-800 px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white">Production History</h3>

                <p className="mt-1 text-xs text-neutral-500">
                  Your daily production records
                </p>
              </div>

              <button className="text-xs font-semibold text-orange-500 hover:text-orange-400">
                This Month
              </button>
            </div>
          </div>

          {/* Scroll through history while keeping the dashboard compact */}
          <div className="h-96 max-h-[17vh] overflow-x-auto overflow-y-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="sticky top-0 border-b border-neutral-800 bg-neutral-950">
                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500 sm:px-6">
                    Date
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Craft KG
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    White KG
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Total KG
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Rate
                  </th>

                  <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>
                {production.map((item, index) => (
                  <tr
                    key={item.date}
                    className={`border-b border-neutral-800 last:border-0 ${
                      index === 0 ? 'bg-orange-500/5' : ''
                    }`}
                  >
                    <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-white sm:px-6">
                      {item.date}
                      {/* {index === 0 && (
                        <span className="ml-2 rounded bg-orange-500/10 px-1.5 py-1 text-[10px] font-bold text-orange-400">
                          TODAY
                        </span>
                      )} */}
                    </td>

                    <td className="px-4 py-4 text-sm text-neutral-300">
                      {item.craft} KG
                    </td>

                    <td className="px-4 py-4 text-sm text-neutral-300">
                      {item.white} KG
                    </td>

                    <td className="px-4 py-4 text-sm font-semibold text-white">
                      {item.total} KG
                    </td>

                    <td className="px-4 py-4 text-sm text-neutral-400">
                      ₹{item.rate}
                    </td>

                    <td className="px-4 py-4 text-sm font-bold text-orange-500">
                      ₹{item.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Monthly Summary */}
        <section className="mt-5 grid gap-5 lg:grid-cols-2">
          <div className="border border-neutral-800 bg-neutral-900 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              September 2026
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              Monthly Production
            </h3>

            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-3xl font-bold text-white">
                  monthpro : 12kg
                </p>

                <p className="mt-1 text-sm text-neutral-500">Total KG</p>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-orange-500">
                  ₹month ear : 4555
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  Estimated earnings
                </p>
              </div>
            </div>

            <div className="mt-6 h-2 overflow-hidden bg-neutral-800">
              <div className="h-full w-[72%] bg-orange-500" />
            </div>

            <div className="mt-2 flex justify-between text-xs text-neutral-500">
              <span>Monthly target</span>
              <span>72%</span>
            </div>
          </div>

          <div className="border border-neutral-800 bg-neutral-900 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              Salary Information
            </p>

            <h3 className="mt-2 text-xl font-bold text-white">
              Current Month
            </h3>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-sm text-neutral-400">
                  Production earnings
                </span>

                <span className="font-semibold text-white">₹8,325</span>
              </div>

              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <span className="text-sm text-neutral-400">
                  Days worked
                </span>

                <span className="font-semibold text-white">18 Days</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">
                  Estimated Salary
                </span>

                <span className="text-xl font-bold text-orange-500">
                  ₹8,325
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="sticky bottom-0 mt-6 border-t border-neutral-800 bg-neutral-950 sm:hidden">
        <div className="grid grid-cols-3">
          <Link
            to="/dashboard"
            className="flex flex-col items-center gap-1 py-3 text-orange-500"
          >
            <span className="text-lg">⌂</span>
            <span className="text-[10px] font-semibold">Home</span>
          </Link>

          <Link
            to="/production"
            className="flex flex-col items-center gap-1 py-3 text-neutral-500"
          >
            <span className="text-lg">＋</span>
            <span className="text-[10px] font-semibold">Production</span>
          </Link>

          <Link
            to="/salary"
            className="flex flex-col items-center gap-1 py-3 text-neutral-500"
          >
            <span className="text-lg">₹</span>
            <span className="text-[10px] font-semibold">Salary</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default UserDashboard;

