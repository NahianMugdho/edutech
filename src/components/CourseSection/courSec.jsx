import React, { useState, useRef } from "react";
import { FaRegStar, FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";

// --- SSC
import sscPhysics from "../../assets/Image/Courses/SSC/physics.jpg";
import sscChem from "../../assets/Image/Courses/SSC/chemistry.jpg";
import sscMath from "../../assets/Image/Courses/SSC/math.jpg";
import sscEng from "../../assets/Image/Courses/SSC/english.jpeg";
import sscBio from "../../assets/Image/Courses/SSC/biology.jpeg";

// --- HSC
import hscPhysics from "../../assets/Image/Courses/HSC/physics.jpg";
import hscChem from "../../assets/Image/Courses/HSC/chemistry.jpg";
import hscMath from "../../assets/Image/Courses/HSC/hmath.jpg";
import hscICT from "../../assets/Image/Courses/HSC/ict.jpg";
import hscBio from "../../assets/Image/Courses/HSC/biology.jpg";

// --- Undergrade (Undergraduate)
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

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (!current) return;
    if (direction === "left") current.scrollLeft -= 300;
    else current.scrollLeft += 300;
  };

  const toggleFavorite = (courseName) => {
    setFavorites((prev) => ({
      ...prev,
      [courseName]: !prev[courseName],
    }));
  };

  return (
    <div className="my-12 px-4 max-w-6xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center text-primary mb-6">
        Explore Our Courses by Category
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6 flex-wrap">
        {["SSC", "HSC", "Undergraduate"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full font-semibold border ${
              activeTab === tab
                ? "bg-primary text-white"
                : "border-primary text-primary hover:bg-primary/10"
            } transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Arrow-controlled slider */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-base-300 hover:bg-base-200 p-2 rounded-full shadow"
        >
          <FaArrowLeft />
        </button>

        {/* Course Cards */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 px-6 scroll-smooth no-scrollbar"
        >
          {courseData[activeTab].map((course, index) => (
            <div
              key={index}
              className="min-w-[250px] bg-base-200 rounded-lg shadow-md overflow-hidden relative hover:shadow-lg transition"
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
                <h3 className="text-lg font-bold text-primary">
                  {course.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Expert-led & student-focused
                </p>
                <div className="mt-4 flex gap-2 justify-between">
                  <button className="btn btn-sm btn-outline text-primary border-primary hover:bg-primary hover:text-white">
                    Learn More
                  </button>
                  <button className="btn btn-sm bg-primary text-white hover:bg-primary-focus">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-base-300 hover:bg-base-200 p-2 rounded-full shadow"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CourseSection;
