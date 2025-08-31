import { Link } from "react-router-dom";

const ChooseUs = () => {
  return (
    <section className="bg-base-100 py-16 px-4 max-w-[1280px] mx-auto transition-colors duration-300">
      <h2 className="text-4xl font-bold text-center text-important-text dark:text-important-text-dark text-base-content mb-12 leading-tight">
        Why We're the Best Choice
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Card 1 */}
        <div className="rounded-xl border-t-4 border-blue-600 bg-base-200 p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-blue-600 mb-2">
            SSC Mastery
          </h3>
          <p className="text-base-content/70">
            Structured lessons, chapter quizzes, and smart summaries to help you
            crush your board exams with confidence.
          </p>
        </div>

        {/* Card 2 */}
        <div className="rounded-xl border-t-4 border-green-600 bg-base-200 p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-green-600 mb-2">
            HSC Success Path
          </h3>
          <p className="text-base-content/70">
            Complete syllabus coverage, board-specific mock tests, and
            subject-wise expert guidance to help you shine.
          </p>
        </div>

        {/* Card 3 */}
        <div className="rounded-xl border-t-4 border-purple-600 bg-base-200 p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            University Mentorship
          </h3>
          <p className="text-base-content/70">
            Support for BUET, DU, IBA, and more — from first-year struggles to
            final-year specialization.
          </p>
        </div>

        {/* Card 4 */}
        <div className="rounded-xl border-t-4 border-yellow-500 bg-base-200 p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-yellow-500 mb-2">
            100% Bangla Lessons
          </h3>
          <p className="text-base-content/70">
            No language barrier — we explain complex topics in Bangla so you
            learn faster and deeper.
          </p>
        </div>

        {/* Card 5 */}
        <div className="rounded-xl border-t-4 border-red-500 bg-base-200 p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-red-500 mb-2">
            Anytime Access
          </h3>
          <p className="text-base-content/70">
            Study at your pace — day or night. Watch offline or online. All
            devices supported.
          </p>
        </div>

        {/* Card 6 */}
        <div className="rounded-xl border-t-4 border-indigo-600 bg-base-200 p-6 shadow-md hover:shadow-xl transition">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">
            Achievement Certificates
          </h3>
          <p className="text-base-content/70">
            Receive digital certificates after course completion — helpful for
            CVs, university admission & job interviews.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 text-center">
        <Link to="/courses">
          <button
            className="px-8 py-3 bg-gradient-to-r from-indigo-700 to-blue-700 dark:from-indigo-700 dark:to-blue-700 hover:scale-105
           hover:to-indigo-700 hover:from-blue-700 dark:hover:to-indigo-700 dark:hover:from-blue-700 text-white rounded-full text-lg font-medium transition"
          >
            Explore All Courses
          </button>
        </Link>
      </div>
    </section>
  );
};

export default ChooseUs;
