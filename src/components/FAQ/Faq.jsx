const Faq = () => {
  return (
    <div>
      <section className="bg-base-100 py-16 px-4 w-full">
        <h2 className="text-3xl font-bold text-center text-neutral-800 text-important-text-dark dark:text-neutral-100 mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4 w-full">
          <div className="collapse collapse-arrow bg-base-200 dark:bg-base-200 w-full">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium dark:text-base-content">
              What types of courses do you offer?
            </div>
            <div className="collapse-content text-gray-400">
              We offer SSC, HSC, and Undergraduate courses including science,
              commerce, and university admission prep with expert instructors.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 dark:bg-base-200 w-full">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium dark:text-base-content">
              Are the classes in Bangla?
            </div>
            <div className="collapse-content text-gray-400 dark:text-base-content/70">
              Yes, all courses are taught in Bangla to ensure better
              understanding for Bangladeshi students.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 dark:bg-base-200 w-full">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium dark:text-base-content">
              Can I access the courses offline?
            </div>
            <div className="collapse-content text-gray-400 dark:text-base-content/70">
              Yes! You can download classes and watch them anytime without an
              internet connection.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 dark:bg-base-200 w-full">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium dark:text-base-content">
              Will I get certificates after completing a course?
            </div>
            <div className="collapse-content text-gray-400 dark:text-base-content/70">
              Absolutely! Each course comes with a verifiable digital
              certificate upon successful completion.
            </div>
          </div>

          <div className="collapse collapse-arrow bg-base-200 dark:bg-base-200 w-full">
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium dark:text-base-content">
              How do I enroll in a course?
            </div>
            <div className="collapse-content text-gray-400 dark:text-base-content/70">
              Simply create an account, browse available courses, and click
              “Enroll” — it's fast and easy!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Faq; 
