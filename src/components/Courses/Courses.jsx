import React, { useEffect, useState } from "react";
import Course from "../Course/Course";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("Courses.json")
      .then((res) => res.json())
      .then((data) => setCourses(data));
  }, []);
  return (
    <div>
      <h1 className="text-center font-bold text-2xl my-5">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-5 justify-center">
        {courses.map((course) => (
          <Course course={course} key={course.id}></Course>
        ))}
      </div>
    </div>
  );
};

export default Courses;
