import React, { useState, useRef } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

// SSC
import sscPhysics from "../../assets/Image/Courses/SSC/physics.jpg";
import sscChem from "../../assets/Image/Courses/SSC/chemistry.jpg";
import sscMath from "../../assets/Image/Courses/SSC/math.jpg";
import sscEng from "../../assets/Image/Courses/SSC/english.jpeg";
import sscBio from "../../assets/Image/Courses/SSC/biology.jpeg";

// HSC
import hscPhysics from "../../assets/Image/Courses/HSC/physics.jpg";
import hscChem from "../../assets/Image/Courses/HSC/chemistry.jpg";
import hscMath from "../../assets/Image/Courses/HSC/hmath.jpg";
import hscICT from "../../assets/Image/Courses/HSC/ict.jpg";
import hscBio from "../../assets/Image/Courses/HSC/biology.jpg";

// UG
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
  const scrollRef = useRef(null);

  const toggleFavorite = (courseName) => {
    setFavorites((prev) => ({
      ...prev,
      [courseName]: !prev[courseName],
    }));
  };

  const scroll = (dir) => {
    const cardWidth = 260 + 24; // 260 card + 24 gap
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: dir === "left" ? -cardWidth : cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="my-12 px-4 max-w-[1152px] mx-auto bg-base-100 text-base-content">
      <h2 className="text-3xl font-bold text-center mb-6">
        Explore Our Courses by Category
      </h2>

      {/* Tabs */}
      <div className="bg-base-200 rounded-full w-fit mx-auto px-2 py-1 flex justify-center gap-2 mb-6 shadow-inner border border-base-300">
        {["SSC", "HSC", "Undergraduate"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeTab === tab
                ? "bg-orange-500 text-white"
                : "text-base-content hover:bg-[#fff4d0]/70 dark:hover:bg-[#b85d00]/80"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Arrows + Cards */}
      <div className="relative">
        {/* Left arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-base-100/70 hover:bg-orange-200 dark:bg-base-300/60 rounded-full shadow-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="flex flex-nowrap gap-6 overflow-x-auto scroll-smooth no-scrollbar px-6"
        >
          {courseData[activeTab].map((course, i) => (
            <div
              key={i}
              className="w-[260px] flex-shrink-0 bg-base-200 rounded-md shadow-md relative hover:shadow-xl transition"
            >
              <img
                src={course.image}
                alt={course.name}
                className="h-40 w-full object-cover rounded-t-md"
              />
              <button
                onClick={() => toggleFavorite(course.name)}
                className="absolute top-2 right-2 text-white bg-black/50 rounded-full p-1"
              >
                {favorites[course.name] ? (
                  <FaStar className="text-yellow-400" />
                ) : (
                  <FaRegStar />
                )}
              </button>
              <div className="p-4">
                <h3 className="text-lg font-bold">{course.name}</h3>
                <p className="text-sm mt-1">Expert-led & student-focused</p>
                <div className="mt-4 flex gap-2 justify-between">
                  <button className="btn btn-sm border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-500 hover:text-white transition">
                    Learn More
                  </button>
                  <button className="btn btn-sm bg-orange-500 text-white hover:bg-orange-600 transition">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-base-100/70 hover:bg-orange-200 dark:bg-base-300/60 rounded-full shadow-md"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CourseSection;
