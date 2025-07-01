import React from "react";
import sscImg from "../../assets/ssc.jpg";       // Add your own images
import hscImg from "../../assets/hsc.jpg";
import undergradImg from "../../assets/undergrad.jpg";

const About = () => {
  return (
    <div className="bg-base-100 text-base-content">
      {/* Hero Section with Background */}
      <div
        className="relative h-64 flex items-center justify-center text-white"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1584697964154-5a89f4460b9d?auto=format&fit=crop&w=1400&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-black/50 w-full h-full absolute top-0 left-0" />
        <h1 className="z-10 text-4xl font-bold">About Us</h1>
      </div>

      {/* Cards Section */}
      <div className="max-w-5xl mx-auto py-12 px-6 space-y-8">
        {/* SSC */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-base-200 rounded-lg shadow-md p-6">
          <img src={sscImg} alt="SSC" className="w-full md:w-1/2 rounded-md object-cover" />
          <p className="text-lg text-justify">
            Our SSC preparation program is designed to build strong fundamentals in core subjects.
            With interactive content and real-world examples, students gain the skills to succeed in board exams and beyond.
          </p>
        </div>

        {/* HSC */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-6 bg-base-200 rounded-lg shadow-md p-6">
          <img src={hscImg} alt="HSC" className="w-full md:w-1/2 rounded-md object-cover" />
          <p className="text-lg text-justify">
            Our HSC track is tailored to ensure deep understanding of advanced topics with
            university-level problem solving and comprehensive guidance.
          </p>
        </div>

        {/* Undergraduate */}
        <div className="flex flex-col md:flex-row items-center gap-6 bg-base-200 rounded-lg shadow-md p-6">
          <img src={undergradImg} alt="Undergraduate" className="w-full md:w-1/2 rounded-md object-cover" />
          <p className="text-lg text-justify">
            For undergraduates, we offer career-building content in tech, business, and science—
            all crafted to bridge the gap between academics and industry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
