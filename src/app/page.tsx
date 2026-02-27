export default function LandingPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <div className="flex h-full grow flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-4 lg:px-20 py-3">
          <div className="flex items-center justify-between mx-auto max-w-7xl">
            <div className="flex items-center gap-4">
              <div className="size-8 text-blue-600 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">account_balance_wallet</span>
              </div>
              <h2 className="text-xl font-bold leading-tight tracking-tight">AccountMaster</h2>
            </div>
            <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
              <nav className="flex items-center gap-8">
                <a className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">Courses</a>
                <a className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">Instructors</a>
                <a className="text-sm font-medium hover:text-blue-600 transition-colors" href="#">Enterprise</a>
              </nav>
              <div className="flex items-center gap-4">
                <a className="text-sm font-medium hover:text-blue-600 transition-colors" href="/signin">Log In</a>
                <button className="flex h-10 px-5 cursor-pointer items-center justify-center rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md">
                  <span>Sign Up</span>
                </button>
              </div>
            </div>
            {/* Mobile Menu Icon */}
            <div className="md:hidden flex items-center">
              <span className="material-symbols-outlined cursor-pointer">menu</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-col items-center w-full grow">
          {/* Hero Section */}
          <section className="w-full px-4 lg:px-20 py-12 lg:py-20 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
              {/* Hero Text & Search */}
              <div className="flex-1 flex flex-col gap-8 max-w-2xl">
                <div className="flex flex-col gap-4">
                  <h1 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight text-gray-900 dark:text-gray-100">
                    Master Accounting with <span className="text-blue-600">Industry Experts</span>
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                    Advance your career with comprehensive courses in tax, auditing, and financial reporting designed for modern professionals.
                  </p>
                </div>
                {/* Search Bar */}
                <div className="w-full max-w-md">
                  <form className="relative flex items-center w-full h-14 rounded-xl shadow-lg shadow-blue-900/5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600 overflow-hidden transition-shadow">
                    <div className="grid place-items-center h-full w-12 text-gray-500 dark:text-gray-400">
                      <span className="material-symbols-outlined">search</span>
                    </div>
                    <input className="peer h-full w-full outline-none text-sm text-gray-900 dark:text-gray-100 pr-2 bg-transparent placeholder-gray-500 dark:placeholder-gray-400" id="search" placeholder="Search for courses (e.g., 'Tax', 'Audit')..." type="text" />
                    <button className="absolute right-1 top-1 bottom-1 px-6 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors">
                      Find
                    </button>
                  </form>
                  <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Popular: CPA Prep, QuickBooks, Forex</p>
                </div>
              </div>
              {/* Hero Image */}
              <div className="flex-1 w-full flex justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent mix-blend-overlay z-10"></div>
                  <img alt="Professional accountant analyzing financial charts" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZDbbxP6l_3VtVgdD5wBcGIHdsN5gYZpgrKyDzylYqPU5M5rn14gLIv7blUfC7hW_dahEgjC8e-AfuVscTjt13tZ_GOSP6LqepYSQDBD37NCSeivLmRD3Fo9g5NFMmEovJvikt3epDIkn1qEJuTnur4Cal3KOpSzLKzHSExUkxIzbwmKkNg-e1vwZi6aQQNM7UtyiePOVDvqBaHc0DDcNZJGsj7u9mSoPvKiLWySPN0nPHEE5oROilUAhbQRC9fpBbgrgBLerOI04" />
                </div>
              </div>
            </div>
          </section>

          {/* Featured Courses Section */}
          <section className="w-full px-4 lg:px-20 py-16 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
              <div className="flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Courses</h2>
                  <p className="text-gray-600 dark:text-gray-400">Handpicked by our experts to get you started.</p>
                </div>
                <a className="hidden sm:inline-flex items-center text-blue-600 font-semibold hover:underline group" href="#">
                  View all courses
                  <span className="material-symbols-outlined ml-1 text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Course Card 1 */}
                <div className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img alt="Tax forms and calculator on desk" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr9LyQsBNGV3z9T4omcw1KXcWeX65zMm9IQWI_IN48zV9FcU6T2XpFPjK4M1AYQDp8cs0IZgNwAPkdT_5p9o4FmrobzRf5b6rr07KN3Ax_qRCnmOXxgo0-VEUtZiZ9RXYAEtTnwUzVZ_ofSsvs_1YuqJJFqxZz8rWNW8A-Yab_XsWinvQxm8i5iJU3cP1bRB9NV917ZyT-QNFf37Q88mrNXrez_az1RXf7VyE9bKZaCJHBWqm8qNU5_YRdzVnrNle1q2KuYleCZ9Q" />
                    <div className="absolute top-2 right-2 bg-white dark:bg-slate-800 px-2 py-1 rounded text-xs font-bold shadow-sm">Bestseller</div>
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors">Tax Accounting 101</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">Learn the basics of tax preparation for individuals and small businesses.</p>
                    <div className="mt-auto pt-3 flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                        <span className="material-symbols-outlined text-base fill-current">star</span>
                        <span>4.8</span>
                        <span className="text-gray-600 dark:text-gray-400 font-normal">(1,240)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-slate-200 overflow-hidden">
                            <img alt="Instructor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBY3Pd8k8pzkBggXX07fANwwYWpj6kfCt1rjuhuv2BRANHn_jyB5grjIoFbYzgGDWMTD5GfpFyOjilXVjMi90r1jMaJHqKAvuHk8SJGnSK0Q6y1p3nTTaKvyfQTWTcQq-foLQ8uTUH0-8N9WVVfWWqTgvdkFgyPS4i_cNiVnvAU_u47MpQxXCTGg1lnREZS-Dr3wKcQ3XibRFukTulXBncX8kp9TsGuJhTZuBV_qV4_JY421NmOU6QnNZzyaJjRbMtvWtoQ1WwkUJQ" />
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">John D.</span>
                        </div>
                        <span className="font-bold text-lg">$49.99</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Course Card 2 */}
                <div className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img alt="Computer screen showing financial data" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCVE85rOmbNpUTKzMgQr5p_85Av7TFtrkgt_Un4ubaUEL66fpv6xQA-PBkKBfiMGieEw8Fo5-ddfGZmC-iTx_nt5KPq4fgSevXSlk6QX1-DwMsaSKzos-ZfoOInssTcF__U2-w9KbbNTMnn7R6Aju7lNyn0UKGQEB1G3uxuzKyXYrLCH4L-B2DE38P1FvXWuTb-kTz9c5WX4uocApUcVjjBBl0cF9FsFiQrGp8k2w0SiBaXyP6oNV73m1pxWD5KaFNlFNelXHgAiY" />
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors">QuickBooks Mastery</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">Master small business bookkeeping and reporting software.</p>
                    <div className="mt-auto pt-3 flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                        <span className="material-symbols-outlined text-base fill-current">star</span>
                        <span>4.9</span>
                        <span className="text-gray-600 dark:text-gray-400 font-normal">(856)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-slate-200 overflow-hidden">
                            <img alt="Instructor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCr8jthqmjSrq6Vv8ym9TSYnWFmO9VEPJpriQyZRKtxMuGC28XuM9XSQf8X3PaL_mqxLDNdy0TrVJGc8tSfSWYDdBlrFBc2bwNEOM_XX4XGwq_JS_yUYKfE7auvOH00CRu5nkgoYeegVF7ILcL04JaFn_xK7MIEXMjJq-KgJMDf-g9xKeljcOCoeYghv6FC06trohEVO81tUDOXCOGFBYjXtlXQOVZ2H2VLEKSYG3y5dwP50UizJZ069oST5icZKu30DNMvzdPXE50" />
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Sarah M.</span>
                        </div>
                        <span className="font-bold text-lg">$59.99</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Course Card 3 */}
                <div className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img alt="Business team discussing documents" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf4fuSqcNzGlitk_jArOUlEGeEL4YulAq3ZlzFeeWrUaspNDyL6qmEM0rRbzikWtDSkswoWM5w8NqXhQcsqnj_dix78hKtYagrNA6JOZKBaRe5KRh2tREAKKA1pEmzfyDW970afuIGJNXDcPkSkFjxhgf2ajizPpwfr6-R_HOPWat3clEdNSefHOjo-kvaR2gPO2XQRpt_8oj2R98j69gj8pSyOuUvOBkvHC2EPzYMF9AF8NDMupZclKkEK0PdvS9nXXvd5Caz3e0" />
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors">Advanced Auditing</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">Deep dive into auditing standards, ethics, and fraud detection.</p>
                    <div className="mt-auto pt-3 flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                        <span className="material-symbols-outlined text-base fill-current">star</span>
                        <span>4.7</span>
                        <span className="text-gray-600 dark:text-gray-400 font-normal">(542)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-slate-200 overflow-hidden">
                            <img alt="Instructor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCzxL0k1GRCapnGRGCcxt_ceWVT54nedQn-kHF60hfhyGE7Ww4eABVKXe8TiYS6Zd3II2SDrl1_2gyZPkEqrsf0zU8Q3nAF0vf3SUyeZaXpfhV_2TiLIxh9NwLHgpATKKR8JoIRbcVC08iJyJb96ZlCjDoccyTvqa23BsWi-MPDz_DgtfBSQPzHiYcR8BCiaqKwlSv58zuwkDTJ1slE84vW-AQPakVgR1CroYTtMWM55OpStJtTZ_PxFVIvcpzlqHlbQOlMpbV1FSk" />
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Robert K.</span>
                        </div>
                        <span className="font-bold text-lg">$69.99</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Course Card 4 */}
                <div className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="relative aspect-video overflow-hidden">
                    <img alt="Stock market analysis graph" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQ9yrpcXmjZy8SCBM0sXIe3Z1XYLKm3F1eKLJrJ2PoaLDN7Xp7hkpvI52a6yY2kRNo_uyGMxB1_B_1PUWq-t2WbEQxSGwntGAV_xOn0auUoMot7wWQ4g7B14pgraPPU1-T038HcGOTo-h31BgZMNWHcyIs7TkBK4jK-6QqFFDdaAM17175nf61os_kI-1hOcdT_EYyTjQWm1xxNylgn9_TiG24-L-dUvpBb5lNfPu8Mebjz6JcBEB5QvcJpecRCPjp_w7TLYxMOLM" />
                  </div>
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-bold leading-tight group-hover:text-blue-600 transition-colors">Financial Analysis</h3>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">Interpret financial statements and forecast growth like a pro.</p>
                    <div className="mt-auto pt-3 flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-yellow-500 text-sm font-medium">
                        <span className="material-symbols-outlined text-base fill-current">star</span>
                        <span>4.6</span>
                        <span className="text-gray-600 dark:text-gray-400 font-normal">(320)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="size-6 rounded-full bg-slate-200 overflow-hidden">
                            <img alt="Instructor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvw26feuwWdXjTZf1O3sIpJebVUew2lFhqJzKuTRofK5-bpKtaLex92qYGEHlcu0Cd3GTp7RwbrI9inpdkBf4kxPSJRORLJpq7iPHFX_IkNs4WgFSKqPQIA3vZLJEQSDVMNzIxGAjG-cWIWVxpTILEimuEG-GNx_lN856C3Af3vSNb8OadYeecuTvPDi4OXjNr9cT8x4W-nWr_JhmfGKT0xY-k4olYnxAY_OG6JBQr0TqoETGgzY3T8zaeWZiajZpndVkGEPI3NAg" />
                          </div>
                          <span className="text-xs text-gray-600 dark:text-gray-400">Elena W.</span>
                        </div>
                        <span className="font-bold text-lg">$54.99</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sm:hidden flex justify-center mt-4">
                <a className="btn btn-outline w-full justify-center" href="#">View all courses</a>
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="w-full px-4 lg:px-20 py-20 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto flex flex-col gap-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="flex flex-col gap-4 max-w-2xl">
                  <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-gray-900 dark:text-gray-100">
                    Why Choose Us?
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    Join thousands of finance professionals enhancing their skills and advancing their careers with our platform.
                  </p>
                </div>
                <button className="h-12 px-6 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/10 whitespace-nowrap">
                  Learn More
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1 */}
                <div className="flex flex-col gap-4 p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-600/30 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-2">
                    <span className="material-symbols-outlined text-3xl">school</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Learn directly from practicing CPAs, CFOs, and industry leaders with years of real-world experience.
                    </p>
                  </div>
                </div>
                {/* Feature 2 */}
                <div className="flex flex-col gap-4 p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-600/30 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-2">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Official Certification</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Earn certificates of completion that are recognized by top accounting firms and employers worldwide.
                    </p>
                  </div>
                </div>
                {/* Feature 3 */}
                <div className="flex flex-col gap-4 p-8 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-600/30 transition-colors">
                  <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mb-2">
                    <span className="material-symbols-outlined text-3xl">all_inclusive</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Lifetime Access</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      Buy a course once and access the materials, updates, and community discussions anytime, anywhere, forever.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Banner */}
          <section className="w-full px-4 lg:px-20 py-12 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden bg-blue-600 relative">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-10 md:p-16 gap-8">
                <div className="text-white max-w-xl">
                  <h2 className="text-3xl font-bold mb-4">Ready to start learning?</h2>
                  <p className="text-blue-100 text-lg">Join 10,000+ students and start your journey to becoming a master accountant today.</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="w-full border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 lg:px-20 py-12">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-blue-600">
                <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">AccountMaster</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Empowering accountants worldwide with top-tier education.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-gray-900 dark:text-gray-100">Platform</h4>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#">Browse Courses</a>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#">Instructors</a>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#">Pricing</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-gray-900 dark:text-gray-100">Company</h4>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#">About Us</a>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#">Careers</a>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#">Blog</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-bold text-gray-900 dark:text-gray-100">Support</h4>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#">Help Center</a>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#">Terms of Service</a>
              <a className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#">Privacy Policy</a>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">© 2026 AccountMaster Inc. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#"><span className="material-symbols-outlined text-xl">thumb_up</span></a>
              <a className="text-gray-600 dark:text-gray-400 hover:text-blue-600" href="#"><span className="material-symbols-outlined text-xl">share</span></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
