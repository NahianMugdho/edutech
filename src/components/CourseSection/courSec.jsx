import React, { useState, useEffect, useRef, useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiClock, FiStar } from "react-icons/fi";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";

const CourseSection = () => {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState("SSC");
  const [categories] = useState([
    "SSC",
    "HSC",
    "Undergraduate",
    "Skill Development",
  ]);

  const [courses, setCourses] = useState([]);
  const [ratingsData, setRatingsData] = useState({});
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [favoriteCourseIds, setFavoriteCourseIds] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState([]);

  const sliderRef = useRef();

  // Fetch courses from backend
  useEffect(() => {
    axios
      .get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/videos")
      .then((res) => setCourses(res.data))
      .catch((err) => console.error("Failed to fetch courses:", err));
  }, []);

  // Fetch ratings for all courses
  useEffect(() => {
    if (courses.length === 0) return;

    const fetchAllRatings = async () => {
      const ratings = {};
      await Promise.all(
        courses.map(async (course) => {
          try {
            const res = await axios.get(
              `https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/reviews/${course._id}/average`
            );
            ratings[course._id] = {
              avgRating: res.data.avgRating || 0,
              count: res.data.count || 0,
            };
          } catch {
            ratings[course._id] = { avgRating: 0, count: 0 };
          }
        })
      );
      setRatingsData(ratings);
    };

    fetchAllRatings();
  }, [courses]);

  // Fetch user's favorite courses
  useEffect(() => {
    if (!user?.email) {
      setFavoriteCourseIds([]);
      return;
    }

    axios
      .get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/favorites", {
        headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` },
      })
      .then((res) => {
        const favIds = res.data.map((fav) => fav.courseId);
        setFavoriteCourseIds(favIds);
      })
      .catch(() => {
        setFavoriteCourseIds([]);
      });
  }, [user?.email]);

  // Fetch user's enrolled courses
  useEffect(() => {
    if (!user?.email) return;
    axios
      .get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/enrollRequests", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      })
      .then((res) => {
        const approved = res.data
          .filter(
            (item) =>
              item.userEmail === user.email && item.status === "approved"
          )
          .map((item) => item.courseId);
        setEnrolledIds(approved);
      });
  }, [user?.email]);

  // Handle favorite toggle
  const handleAddFavorite = async (courseId) => {
    if (loadingFavorites.includes(courseId)) return;
    setLoadingFavorites((prev) => [...prev, courseId]);
    try {
      await axios.post(
        "https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/favorites",
        { courseId },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` },
        }
      );
      setFavoriteCourseIds((prev) => [...prev, courseId]);
    } catch (err) {
      console.error("Failed to add favorite", err);
    }
    setLoadingFavorites((prev) => prev.filter((id) => id !== courseId));
  };

  const handleRemoveFavorite = async (courseId) => {
    if (loadingFavorites.includes(courseId)) return;
    setLoadingFavorites((prev) => [...prev, courseId]);
    try {
      await axios.delete(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/favorites/${courseId}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` },
      });
      setFavoriteCourseIds((prev) => prev.filter((id) => id !== courseId));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
    setLoadingFavorites((prev) => prev.filter((id) => id !== courseId));
  };

  const scrollLeft = () =>
    sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
  const scrollRight = () =>
    sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });

  const filteredCourses = courses.filter(
    (course) => course.category === activeTab && course.status === "approved"
  );

  return (
    <div className="my-12 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center text-important-text dark:text-important-text-dark mb-6">
        Explore Our Courses by Category
      </h2>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="inline-flex gap-2 bg-base-200 p-1 rounded-full overflow-x-auto no-scrollbar w-full sm:w-auto">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 px-3 py-1 sm:px-6 sm:py-2 rounded-full font-semibold transition text-sm sm:text-base ${
                activeTab === tab
                  ? "bg-primary text-base-100 dark:bg-primary dark:text-base-100"
                  : "text-base-content hover:bg-indigo-300 dark:hover:bg-amber-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Slider with arrows */}
      <div className="relative">
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md
            bg-gray-400/60 dark:bg-gray-600/60 hover:bg-indigo-300 dark:bg-indigo-300 transition-colors"
        >
          <MdArrowBackIosNew size={20} className="text-black dark:text-white" />
        </button>

        <button
          onClick={scrollRight}
          className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full shadow-md
            bg-gray-400/60 dark:bg-gray-600/60 hover:bg-indigo-300 dark:bg-indigo-300 transition-colors"
        >
          <MdArrowForwardIos size={20} className="text-black dark:text-white" />
        </button>

        {/* Courses */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scroll-smooth px-1"
        >
          {filteredCourses.length === 0 && (
            <p className="text-center text-gray-500">
              No courses found in this category.
            </p>
          )}

          {filteredCourses.map((course) => {
            const isEnrolled = enrolledIds.includes(course._id);
            const ratingInfo = ratingsData[course._id];
            const averageRating = ratingInfo
              ? ratingInfo.avgRating.toFixed(1)
              : null;
            const totalCount = ratingInfo?.count || 0;

            return (
              <div
                key={course._id}
                className="flex-shrink-0 w-[calc(100%-1rem)] sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.5rem)]
                  card bg-base-200 shadow-md hover:shadow-2xl transition duration-300 rounded-xl relative"
              >
                <figure className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <button
                    onClick={() =>
                      favoriteCourseIds.includes(course._id)
                        ? handleRemoveFavorite(course._id)
                        : handleAddFavorite(course._id)
                    }
                    disabled={loadingFavorites.includes(course._id)}
                    title={
                      favoriteCourseIds.includes(course._id)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                    className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition
                      ${
                        favoriteCourseIds.includes(course._id)
                          ? "bg-red-100 text-red-600 hover:bg-red-200"
                          : "bg-white text-gray-400 hover:text-red-600 hover:bg-red-100"
                      }`}
                  >
                    {favoriteCourseIds.includes(course._id) ? (
                      <FaHeart size={20} />
                    ) : (
                      <FaRegHeart size={20} />
                    )}
                  </button>
                </figure>
                <div className="card-body">
                  <h2 className="card-title text-lg">{course.title}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {course.category}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Teacher:{" "}
                    <span className="text-important-text dark:text-important-text-dark">{course.instructor}</span>
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span className="flex items-center gap-1 text-sm">
                      <FiClock /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-important-text dark:text-important-text-dark">
                      <FiStar />
                      {averageRating
                        ? `${averageRating} (${totalCount})`
                        : "No Rating"}
                    </span>
                  </div>

                  <div className="card-actions mt-4 flex flex-col items-start gap-2">
                    {isEnrolled && (
                      <p className="text-sm text-green-600 font-semibold">
                        ✅ You are already enrolled
                      </p>
                    )}
                    <div className="flex gap-2 w-full">
                      <Link
                        to={`/courses/${course._id}`}
                        target="_blank"
                        className={`btn btn-md font-semibold flex-1 ${
                          isEnrolled ? "btn font-semibold bg-primary dark:bg-primary text-white dark:text-white" 
                          : 
                          "btn-outline btn-md text-important-text dark:text-important-text-dark hover:bg-primary dark:bg-primary hover:text-white dark:hover:text-white"
                        }`}
                      >
                        {isEnrolled ? "Go to Course" : "View Details"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseSection;
