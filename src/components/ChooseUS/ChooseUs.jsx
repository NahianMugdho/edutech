const ChooseUs = () => {
  return (
    <div>
      <section className="bg-white dark:bg-base-100 py-16 px-4 max-w-[1280px] mx-auto transition-colors duration-300">
        <h2 className="text-4xl font-bold text-center text-neutral-800 dark:text-neutral-100 mb-12 leading-tight">
          Why We're the Best Choice
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="rounded-xl border-t-4 border-blue-600 bg-gray-50 dark:bg-gray-800 p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
              SSC Mastery
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Structured lessons, chapter quizzes, and smart summaries to help
              you crush your board exams with confidence.
            </p>
          </div>

          <div className="rounded-xl border-t-4 border-green-600 bg-gray-50 dark:bg-gray-800 p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-400 mb-2">
              HSC Success Path
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Complete syllabus coverage, board-specific mock tests, and
              subject-wise expert guidance to help you shine.
            </p>
          </div>

          <div className="rounded-xl border-t-4 border-purple-600 bg-gray-50 dark:bg-gray-800 p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-400 mb-2">
              University Mentorship
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Support for BUET, DU, IBA, and more — from first-year struggles to
              final-year specialization.
            </p>
          </div>

          <div className="rounded-xl border-t-4 border-yellow-500 bg-gray-50 dark:bg-gray-800 p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-yellow-600 dark:text-yellow-400 mb-2">
              100% Bangla Lessons
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              No language barrier — we explain complex topics in Bangla so you
              learn faster and deeper.
            </p>
          </div>

          <div className="rounded-xl border-t-4 border-red-500 bg-gray-50 dark:bg-gray-800 p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
              Anytime Access
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Study at your pace — day or night. Watch offline or online. All
              devices supported.
            </p>
          </div>

          <div className="rounded-xl border-t-4 border-indigo-600 bg-gray-50 dark:bg-gray-800 p-6 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-indigo-700 dark:text-indigo-400 mb-2">
              Achievement Certificates
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Receive digital certificates after course completion — helpful for
              CVs, university admission & job interviews.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-600 hover:to-blue-700 text-white rounded-full text-lg font-medium transition">
            Explore All Courses
          </button>
        </div>
      </section>
    </div>
  );
};

export default ChooseUs;
