import React from "react";
import MySlider from "../Slider/Slider";

import CourseSection from "../CourseSection/courSec";

import Courses from "../Courses/Courses";
import ChooseUs from "../ChooseUS/ChooseUs";
import Faq from "../FAQ/Faq";

const Home = () => {
  return (
    <div>
      <MySlider></MySlider>

      <CourseSection></CourseSection>

      <Courses></Courses>
      <ChooseUs></ChooseUs>
      <Faq></Faq>
    </div>
  );
};

export default Home;
