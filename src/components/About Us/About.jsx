import React from "react";
import sscImg from "../../assets/ssc.jpg";
import hscImg from "../../assets/hsc.jpg";
import undergradImg from "../../assets/undergrad.jpg";

const About = () => {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero Section */}
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <h1 className="z-10 text-4xl font-bold">About bornoByte</h1>
      </div>

      <div className="p-4 sm:p-8 max-w-6xl mx-auto">
        {/* Who We Are */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-indigo-600 mb-4">Who We Are</h2>
          <p className="text-base-content text-lg">
            E-Learn is a modern platform making learning accessible, flexible, and affordable.
            Whether you're just starting or looking to upskill, we provide high-quality courses
            tailored to your goals.
          </p>
        </section>

        {/* Academic Levels */}
        <section className="mb-16">
          <h3 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            We Tutor These Academic Levels
          </h3>
          <div className="space-y-10">
            {/* SSC */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-base-200 rounded-lg shadow-md p-4 md:p-6">
              <img src={sscImg} alt="SSC" className="w-full md:w-1/2 rounded-md object-cover" />
              <p className="text-base-content text-lg text-justify">
                Our SSC track builds your foundation in key subjects with engaging tutorials,
                real-world examples, and mentorship to prepare you for the next academic steps.
              </p>
            </div>

            {/* HSC */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-6 bg-base-200 rounded-lg shadow-md p-4 md:p-6">
              <img src={hscImg} alt="HSC" className="w-full md:w-1/2 rounded-md object-cover" />
              <p className="text-base-content text-lg text-justify">
                Get ahead with our HSC courses focusing on conceptual clarity, exam strategies, and university preparation — all in one platform.
              </p>
            </div>

            {/* Undergraduate */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-base-200 rounded-lg shadow-md p-4 md:p-6">
              <img src={undergradImg} alt="Undergraduate" className="w-full md:w-1/2 rounded-md object-cover" />
              <p className="text-base-content text-lg text-justify">
                Undergraduate learners can boost careers with job-ready skills in technology,
                business, and science — curated by real-world professionals.
              </p>
            </div>
          </div>
        </section>

        {/* Platform Highlights */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center mb-16">
          <div className="bg-base-200 rounded shadow p-6">
            <h2 className="text-3xl font-bold text-indigo-600">100+</h2>
            <p className="mt-2 text-base-content">Expert Instructors</p>
          </div>
          <div className="bg-base-200 rounded shadow p-6">
            <h2 className="text-3xl font-bold text-indigo-600">5000+</h2>
            <p className="mt-2 text-base-content">Active Students</p>
          </div>
          <div className="bg-base-200 rounded shadow p-6">
            <h2 className="text-3xl font-bold text-indigo-600">300+</h2>
            <p className="mt-2 text-base-content">Available Courses</p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">Join Us Today</h2>
          <p className="text-base-content mb-6">
            Start learning and unlock your full potential with E-Learn.
          </p>
          <button className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700 transition">
            Explore Courses
          </button>
        </section>

        {/* Coursera-style Footer CTA */}
        <section className="bg-base-200 p-6 rounded-md shadow-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <button className="btn btn-outline w-full">Learn How to Get Started</button>
          <button className="btn btn-outline w-full">Join Our Team</button>
          <button className="btn btn-outline w-full">Read Our Blog</button>
          <button className="btn btn-outline w-full">Meet Our Leadership</button>
        </section>
      </div>
    </div>
  );
};

export default About;
