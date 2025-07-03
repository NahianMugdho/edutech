import React, { useRef, useState } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos, MdAccessTime } from "react-icons/md";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";

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

// Course Data
const courseData = {
  SSC: [
    { name: "Physics", image: sscPhysics, duration: "1.5 hrs", rating: 4.6, reviews: 1287 },
    { name: "Chemistry", image: sscChem, duration: "2 hrs", rating: 4.7, reviews: 1111 },
    { name: "Mathematics", image: sscMath, duration: "2.5 hrs", rating: 4.4, reviews: 1030 },
    { name: "English", image: sscEng, duration: "1.2 hrs", rating: 4.5, reviews: 900 },
    { name: "Biology", image: sscBio, duration: "1.8 hrs", rating: 4.3, reviews: 840 },
  ],
  HSC: [
    { name: "Physics", image: hscPhysics, duration: "2 hrs", rating: 4.7, reviews: 1021 },
    { name: "Chemistry", image: hscChem, duration: "2.5 hrs", rating: 4.6, reviews: 1102 },
    { name: "Higher Math", image: hscMath, duration: "3 hrs", rating: 4.8, reviews: 1221 },
    { name: "ICT", image: hscICT, duration: "1.5 hrs", rating: 4.5, reviews: 800 },
    { name: "Biology", image: hscBio, duration: "2.2 hrs", rating: 4.4, reviews: 760 },
  ],
  Undergraduate: [
    { name: "Linear Algebra", image: ugLinear, duration: "4 hrs", rating: 4.9, reviews: 1560 },
    { name: "C Programming", image: ugC, duration: "5 hrs", rating: 4.8, reviews: 1700 },
    { name: "Python Programming", image: ugPython, duration: "6 hrs", rating: 4.9, reviews: 1950 },
    { name: "Machine Learning", image: ugML, duration: "5.5 hrs", rating: 4.7, reviews: 1830 },
    { name: "Electronics & Circuits", image: ugElectronics, duration: "4.3 hrs", rating: 4.6, reviews: 1500 },
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
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md
            bg-gray-400/60 dark:bg-gray-600/60 hover:bg-orange-300 transition-colors"
        >
          <MdArrowBackIosNew size={20} className="text-black dark:text-white" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md
            bg-gray-400/60 dark:bg-gray-600/60 hover:bg-orange-300 transition-colors"
        >
          <MdArrowForwardIos size={20} className="text-black dark:text-white" />
        </button>

        {/* Course Cards */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-hidden scroll-smooth px-1"
        >
          {courseData[activeTab].map((course, index) => (
            <div
              key={index}
              className="w-[calc(100%/3-1.5rem)] min-w-[320px] bg-base-200 rounded-lg shadow-md overflow-hidden relative hover:-translate-y-1 hover:shadow-lg transition-transform duration-300"
            >
              <img
                src={course.image}
                alt={course.name}
                className="h-40 w-full object-cover"
              />
              {/* Favorite Button */}
              <button
                className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full p-1"
                onClick={() => toggleFavorite(course.name)}
              >
                {favorites[course.name] ? (
                  <FaHeart className="text-rose-500" />
                ) : (
                  <FaRegHeart />
                )}
              </button>

              <div className="p-4">
                <h3 className="text-lg font-bold text-base-content">
                  {course.name}
                </h3>
                {/* Duration */}
                <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                  <MdAccessTime size={16} /> <span>{course.duration}</span>
                </div>
                {/* Rating */}
                <div className="text-sm text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    {course.rating} ({course.reviews})
                  </span>
                </div>

                {/* Buttons */}
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
