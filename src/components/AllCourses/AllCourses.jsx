// src/pages/AllCourses.jsx

import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiSearch, FiStar, FiClock } from "react-icons/fi";
import AuthContext from "../Auth/AuthContext"; // ✅ import context
import { FaHeart, FaRegHeart } from "react-icons/fa";


const AllCourses = () => {
  const { user } = useContext(AuthContext); // ✅ get current user
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("all");
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [ratingsData, setRatingsData] = useState({}); // ✅ New: Ratings by courseId
  const [favoriteCourseIds, setFavoriteCourseIds] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState([]);

  // ✅ Fetch approved courses
  useEffect(() => {
    axios
      .get("https://bornobyte.vercel.app/videos")
      .then((res) => {
        const approvedCourses = res.data.filter((course) => course.status === "approved");
        setCourses(approvedCourses);
      })
      .catch(() => {
        // ❌ 'err' removed because it wasn't used
      });
  }, []);

  // ✅ Fetch ratings
    useEffect(() => {
      if (courses.length === 0) return;

      const fetchAllRatings = async () => {
        const ratings = {};
        await Promise.all(
          courses.map(async (course) => {
            try {
              const res = await axios.get(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/reviews/${course._id}/average`);
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

  // ✅ Fetch user's favorite courses
    useEffect(() => {
    if (!user?.email) {
      setFavoriteCourseIds([]);
      return;
    }

    axios
      .get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/favorites", {
        headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` },
      })
      .then(res => {
        // res.data = array of favorite objects with courseId
        const favIds = res.data.map(fav => fav.courseId);
        setFavoriteCourseIds(favIds);
      })
      .catch(() => {
        setFavoriteCourseIds([]);
      });
  }, [user?.email]);



  // ✅ Fetch user's enrolled courses
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

  // ✅ Handle favorite toggle
  const handleAddFavorite = async (courseId) => {
    if (loadingFavorites.includes(courseId)) return;
    setLoadingFavorites(prev => [...prev, courseId]);
    try {
      await axios.post(
        "https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/favorites",
        { courseId },
        {
          headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` },
        }
      );
      setFavoriteCourseIds(prev => [...prev, courseId]);
    } catch (err) {
      console.error("Failed to add favorite", err);
    }
    setLoadingFavorites(prev => prev.filter(id => id !== courseId));
  };

  const handleRemoveFavorite = async (courseId) => {
    if (loadingFavorites.includes(courseId)) return;
    setLoadingFavorites(prev => [...prev, courseId]);
    try {
      await axios.delete(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/favorites/${courseId}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` },
      });
      setFavoriteCourseIds(prev => prev.filter(id => id !== courseId));
    } catch (err) {
      console.error("Failed to remove favorite", err);
    }
    setLoadingFavorites(prev => prev.filter(id => id !== courseId));
  };



  // ✅ Filtering logic
  const filteredCourses = courses.filter((course) => {
    const matchCategory = category === "all" || course.category.toLowerCase() === category.toLowerCase();
    const matchDuration = duration === "all" || course.duration.toLowerCase().includes(duration.toLowerCase());
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchDuration && matchSearch;
  });

  return (
    <div className="p-6 min-h-screen bg-base-100 text-base-content">
      {/* Title and Filters */}
      <h2 className="text-3xl font-bold mb-6 text-center text-important-text dark:text-important-text-dark">All Courses</h2>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <FiSearch className="text-lg" />
          <input
            type="text"
            placeholder="Search by title..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <select className="select select-bordered" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="ssc">SSC</option>
            <option value="hsc">HSC</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="skill">Skill Development</option>
          </select>
          <select className="select select-bordered" value={duration} onChange={(e) => setDuration(e.target.value)}>
            <option value="all">All Durations</option>
            <option value="1">1 Month</option>
            <option value="2">2 Months</option>
            <option value="3">3 Months</option>
          </select>
        </div>
      </div>

      {/* ✅ Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isEnrolled = enrolledIds.includes(course._id);
          const ratingInfo = ratingsData[course._id];
          const averageRating = ratingInfo ? ratingInfo.avgRating.toFixed(1) : null;
          const totalCount = ratingInfo?.count || 0;


          return (
            <div key={course._id} className="card bg-base-200 hover:shadow-xl shadow-md transition duration-300 rounded-xl">
              <figure>
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
                <p className="text-sm text-gray-500 dark:text-gray-400">{course.category}</p>
                <p className="text-sm font-medium mt-1">
                  Teacher: <span className="text-important-text dark:text-important-text-dark">{course.instructor}</span>
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="flex items-center gap-1 text-sm">
                    <FiClock /> {course.duration}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-important-text dark:text-important-text-dark">
                    <FiStar />
                    {averageRating ? `${averageRating} (${totalCount})` : "No Rating"}
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
                        className={`btn btn-sm flex-1 ${
                          isEnrolled ? "btn btn-md font-semibold hover:shadow-2xl bg-primary dark:bg-primary text-white dark:text-white" 
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

      {filteredCourses.length === 0 && (
        <p className="text-center mt-10 text-gray-400">No matching courses found.</p>
      )}
    </div>
  );
};

export default AllCourses;
