import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Navbar */}
      <header className="border-b border-white/10">
        <div className="flex h-20 items-center justify-between px-6 lg:px-12">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              MEET <span className="text-orange-500">PAPER TUBE</span>
            </h1>
            <p className="text-xs text-neutral-500">Manufacturing Solutions</p>
          </div>

          <Link
            to="/login"
            className="rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-orange-500 hover:text-white"
          >
            Employee Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="relative overflow-hidden px-6 py-24 lg:px-12 lg:py-32">
          {/* Background decoration */}
          <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative grid items-center gap-16 lg:grid-cols-2">
            {/* Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                Paper Tube Manufacturing
              </div>

              <h2 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
                Precision in Every
                <span className="block text-orange-500">Paper Tube.</span>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-neutral-400">
                We manufacture reliable and high-quality paper tubes and paper
                cores with a strong focus on production efficiency, consistent
                quality and customer requirements.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/login"
                  className="rounded-lg bg-orange-500 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  Access Production System
                </Link>

                <a
                  href="#about"
                  className="rounded-lg border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
                >
                  About Our Business
                </a>
              </div>
            </div>

            {/* Production visual */}
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden border border-white/10 bg-neutral-900">
                <div className="flex h-full flex-col justify-between p-8">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">PRODUCTION</span>

                    <span className="text-sm text-green-400">● ACTIVE</span>
                  </div>

                  <div>
                    <p className="text-sm text-neutral-500">
                      Today's Production
                    </p>

                    <div className="mt-2 flex items-end gap-3">
                      <span className="text-6xl font-bold">1,250</span>

                      <span className="mb-2 text-xl text-orange-500">KG</span>
                    </div>

                    <div className="mt-8 h-2 w-full bg-neutral-800">
                      <div className="h-full w-[76%] bg-orange-500" />
                    </div>

                    <div className="mt-3 flex justify-between text-xs text-neutral-500">
                      <span>Daily Target</span>
                      <span>76%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small floating card */}
              <div className="absolute -bottom-6 -left-6 border border-white/10 bg-neutral-900 p-5 shadow-2xl">
                <p className="text-xs text-neutral-500">Production Rate</p>

                <p className="mt-1 text-2xl font-bold">
                  ₹4.50
                  <span className="text-sm font-normal text-neutral-500">
                    / KG
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-t border-white/10 bg-neutral-900 px-6 py-20 lg:px-12"
        >
          <div className="grid gap-12 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                Our Business
              </p>

              <h3 className="mt-4 text-3xl font-bold">
                Manufacturing built around production.
              </h3>
            </div>

            <div className="lg:col-span-2">
              <p className="text-lg leading-8 text-neutral-400">
                Our manufacturing operation produces paper tubes and paper cores
                based on production requirements. Every day, employee production
                is recorded and calculated according to the applicable
                production rate.
              </p>

              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                <div className="border-l-2 border-orange-500 pl-5">
                  <p className="text-2xl font-bold">4.5+</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    Production Rate / KG
                  </p>
                </div>

                <div className="border-l-2 border-orange-500 pl-5">
                  <p className="text-2xl font-bold">320</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    Fixed Daily Rate
                  </p>
                </div>

                <div className="border-l-2 border-orange-500 pl-5">
                  <p className="text-2xl font-bold">100%</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    Production Tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* System introduction */}
        <section className="px-6 py-20 lg:px-12">
          <div className="border border-white/10 bg-white/[0.02] p-8 lg:p-12">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
                  Production Management
                </p>

                <h3 className="mt-4 text-3xl font-bold lg:text-4xl">
                  Simple production tracking for our team.
                </h3>

                <p className="mt-5 leading-7 text-neutral-400">
                  Track employee production, calculate production-based earnings
                  and manage monthly salary from one centralized system.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
                <div className="bg-neutral-950 p-6">
                  <p className="text-2xl font-bold">Production</p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Record daily KG
                  </p>
                </div>

                <div className="bg-neutral-950 p-6">
                  <p className="text-2xl font-bold">Employees</p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Track individual work
                  </p>
                </div>

                <div className="bg-neutral-950 p-6">
                  <p className="text-2xl font-bold">Earnings</p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Calculate automatically
                  </p>
                </div>

                <div className="bg-neutral-950 p-6">
                  <p className="text-2xl font-bold">Salary</p>
                  <p className="mt-2 text-sm text-neutral-500">
                    Monthly calculation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 lg:px-12">
        <div className="flex flex-col justify-between gap-4 text-sm text-neutral-500 sm:flex-row">
          <p>© 2026 PaperCore Manufacturing.</p>

          <p>Production Management System</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
