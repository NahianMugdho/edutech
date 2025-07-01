import React from "react";

const About = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Section 1: Platform Intro */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-indigo-600 mb-4">About E-Learn</h1>
        <p className="text-gray-700 text-lg">
          E-Learn is a modern e-learning platform designed to make knowledge accessible, affordable, and flexible. Whether you're a beginner or professional, we empower you with high-quality courses to upskill anytime, anywhere.
        </p>
      </section>

      {/* Section 2: Highlights */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-12">
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-3xl font-bold text-indigo-600">100+</h2>
          <p className="text-gray-600 mt-2">Expert Instructors</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-3xl font-bold text-indigo-600">5000+</h2>
          <p className="text-gray-600 mt-2">Active Students</p>
        </div>
        <div className="bg-white rounded shadow p-6">
          <h2 className="text-3xl font-bold text-indigo-600">300+</h2>
          <p className="text-gray-600 mt-2">Available Courses</p>
        </div>
      </section>

      {/* Section 3: CTA */}
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">Join Us Today</h2>
        <p className="text-gray-700 mb-6">
          Start learning and unlock your full potential with E-Learn.
        </p>
        <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition">
          Explore Courses
        </button>
      </section>
    </div>
  );
};

export default About;
