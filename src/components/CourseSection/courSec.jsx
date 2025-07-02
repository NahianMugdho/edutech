import React, { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

// Import SSC
import sscPhysics from "../../assets/Image/Courses/SSC/physics.jpg";
import sscChem from "../../assets/Image/Courses/SSC/chemistry.jpg";
import sscMath from "../../assets/Image/Courses/SSC/math.jpg";
import sscEng from "../../assets/Image/Courses/SSC/english.jpeg";
import sscBio from "../../assets/Image/Courses/SSC/biology.jpeg";

// Import HSC
import hscPhysics from "../../assets/Image/Courses/HSC/physics.jpg";
import hscChem from "../../assets/Image/Courses/HSC/chemistry.jpg";
import hscMath from "../../assets/Image/Courses/HSC/hmath.jpg";
import hscICT from "../../assets/Image/Courses/HSC/ict.jpg";
import hscBio from "../../assets/Image/Courses/HSC/biology.jpg";

// Import Undergraduate
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
    { name: "English", image: hscICT },
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

  const toggleFavorite = (courseName) => {
    setFavorites((prev) => ({
      ...prev,
      [courseName]: !prev[courseName],
    }));
  };

  const renderCourses = (category) => (
    <div className="overflow-x-auto flex gap-6 py-6 px-2">
      {courseData[category].map((course, index) => (
        <div
          key={index}
          className="min-w-[250px] bg-base-200 rounded-lg shadow-md overflow-hidden relative group hover:shadow-lg transition"
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
            {favorites[course.name] ? <FaStar className="text-yellow-400" /> : <FaRegStar />}
          </button>

          <div className="p-4">
            <h3 className="text-lg font-bold text-emerald-600">{course.name}</h3>
            <p className="text-sm text-gray-500 mt-1">Top-rated content by experts</p>
            <div className="mt-4 flex gap-2 justify-between">
              <button className="btn btn-sm btn-outline text-emerald-500 border-emerald-500 hover:bg-emerald-500 hover:text-white">
                Learn More
              </button>
              <button className="btn btn-sm bg-emerald-500 text-white hover:bg-emerald-600">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="my-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-emerald-500 mb-6">
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
                ? "bg-emerald-500 text-white"
                : "border-emerald-500 text-emerald-500 hover:bg-emerald-100"
            } transition`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Course Slider */}
      {renderCourses(activeTab)}
    </div>
  );
};

export default CourseSection;
