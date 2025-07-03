import React, { useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

// Course Images
import sscPhysics from "../../assets/Image/Courses/SSC/physics.jpg";
import sscChem from "../../assets/Image/Courses/SSC/chemistry.jpg";
import sscMath from "../../assets/Image/Courses/SSC/math.jpg";
import sscEng from "../../assets/Image/Courses/SSC/english.jpeg";
import sscBio from "../../assets/Image/Courses/SSC/biology.jpeg";

import hscPhysics from "../../assets/Image/Courses/HSC/physics.jpg";
import hscChem from "../../assets/Image/Courses/HSC/chemistry.jpg";
import hscMath from "../../assets/Image/Courses/HSC/hmath.jpg";
import hscICT from "../../assets/Image/Courses/HSC/ict.jpg";
import hscBio from "../../assets/Image/Courses/HSC/biology.jpg";

import ugLinear from "../../assets/Image/Courses/Undergrade/linear.jpeg";
import ugC from "../../assets/Image/Courses/Undergrade/c.jpg";
import ugPython from "../../assets/Image/Courses/Undergrade/python.jpeg";
import ugML from "../../assets/Image/Courses/Undergrade/ml.jpg";
import ugElectronics from "../../assets/Image/Courses/Undergrade/elec.jpeg";

const courseData = {
  SSC: [
    { name: "Physics", image: sscPhysics },
    { name: "Chemistry", image: sscChem },
    { name: "Mathematics", image: sscMath },
    { name: "English", image: sscEng },
    { name: "Biology", image: sscBio },
  ],
  HSC: [
    { name: "Physics", image: hscPhysics },
    { name: "Chemistry", image: hscChem },
    { name: "Higher Math", image: hscMath },
    { name: "ICT", image: hscICT },
    { name: "Biology", image: hscBio },
  ],
  Undergraduate: [
    { name: "Linear Algebra", image: ugLinear },
    { name: "C Programming", image: ugC },
    { name: "Python Programming", image: ugPython },
    { name: "Machine Learning", image: ugML },
    { name: "Electronics & Circuits", image: ugElectronics },
  ],
};

const CourseSection = () => {
  const [activeTab, setActiveTab] = useState("HSC");
  const [favorites, setFavorites] = useState({});
  const sliderRef = useRef();

  const toggleFavorite = (courseName) => {
    setFavorites((prev) => ({
      ...prev,
      [courseName]: !prev[courseName],
    }));
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <div className="my-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-base-content mb-6">
        Explore Our Courses by Category
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex gap-4 bg-base-200 p-2 rounded-full">
          {["SSC", "HSC", "Undergraduate"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                activeTab === tab
                  ? "bg-amber-500 text-white"
                  : "text-base-content hover:bg-amber-100 dark:hover:bg-amber-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Arrows + Slider */}
      <div className="relative">
      {/* Left Arrow Button */}
      <button
        onClick={scrollLeft}
        className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md
          bg-gray-400/60 dark:bg-gray-600/60 hover:bg-orange-300 transition-colors"
      >
        <MdArrowBackIosNew size={20} className="text-black dark:text-white" />
      </button>

      {/* Right Arrow Button */}
      <button
        onClick={scrollRight}
        className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md
          bg-gray-400/60 dark:bg-gray-600/60 hover:bg-orange-300 transition-colors"
      >
        <MdArrowForwardIos size={20} className="text-black dark:text-white" />
      </button>


        {/* Card Container */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth px-1"
        >
          {courseData[activeTab].map((course, index) => (
            <div
              key={index}
              className="w-[calc(100%/3-1.5rem)] min-w-[320px] bg-base-200 rounded-lg shadow-md overflow-hidden relative transform transition-transform duration-300 hover:-translate-y-2"
            >
              <img
                src={course.image}
                alt={course.name}
                className="h-40 w-full object-cover"
              />
              <button
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
                onClick={() => toggleFavorite(course.name)}
              >
                {favorites[course.name] ? (
                  <FaStar className="text-yellow-400" />
                ) : (
                  <FaRegStar />
                )}
              </button>

              <div className="p-4">
                <h3 className="text-lg font-bold text-base-content">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Expert-led content by professionals
                </p>
                <div className="mt-4 flex gap-2 justify-between">
                  <button className="btn btn-sm btn-outline text-amber-600 border-amber-600 hover:bg-amber-600 hover:text-white">
                    Learn More
                  </button>
                  <button className="btn btn-sm bg-amber-600 text-white hover:bg-amber-700">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
