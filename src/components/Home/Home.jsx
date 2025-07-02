import React from "react";
import MySlider from "../Slider/Slider";

import CourseSection from "../CourseSection/courSec";

import Courses from "../Courses/Courses";


const Home = () => {
  return (
    <div>
      <MySlider></MySlider>


      <CourseSection></CourseSection>

      <Courses></Courses>

    </div>
  );
};

export default Home;
