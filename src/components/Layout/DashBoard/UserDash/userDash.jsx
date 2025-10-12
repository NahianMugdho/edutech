// src/components/Layout/DashBoard/UserDash/UserDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../../Auth/AuthContext"; // adjust path if needed
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { FiClock, FiStar } from "react-icons/fi";

const UserDashboard = () => {
  const { user } = useContext(AuthContext); // ✅ get current user
  const [courses, setCourses] = useState([]);
  const [enrolledIds, setEnrolledIds] = useState([]);
  const [favoriteCourseIds, setFavoriteCourseIds] = useState([]);
  const [loadingFavorites, setLoadingFavorites] = useState([]);

  // ✅ Fetch all approved courses
  useEffect(() => {
    axios
      .get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/videos")
      .then((res) => {
        const approvedCourses = res.data.filter(course => course.status === "approved");
        setCourses(approvedCourses);
      })
      .catch(err => console.error("Error fetching courses:", err));
  }, []);

  // ✅ Fetch user's enrolled courses
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/enrollRequests", {
        headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` }
      })
      .then(res => {
        const approvedEnrollments = res.data
          .filter(e => e.userEmail === user.email && e.status === "approved")
          .map(e => e.courseId);
        setEnrolledIds(approvedEnrollments);
      })
      .catch(err => console.error("Error fetching enrollments:", err));
  }, [user?.email]);

  // ✅ Fetch user's favorite courses
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/favorites", {
        headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` }
      })
      .then(res => {
        const favIds = res.data
          .filter(f => f.userEmail === user.email)
          .map(f => f.courseId);
        setFavoriteCourseIds(favIds);
      })
      .catch(err => console.error("Error fetching favorites:", err));
  }, [user?.email]);

  // ✅ Favorite toggle
  const handleAddFavorite = async (courseId) => {
    if (loadingFavorites.includes(courseId)) return;
    setLoadingFavorites(prev => [...prev, courseId]);
    try {
      await axios.post(
        "https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/favorites",
        { courseId },
        { headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` } }
      );
      setFavoriteCourseIds(prev => [...prev, courseId]);
    } catch (err) {
      console.error("Failed to add favorite:", err);
    }
    setLoadingFavorites(prev => prev.filter(id => id !== courseId));
  };

  const handleRemoveFavorite = async (courseId) => {
    if (loadingFavorites.includes(courseId)) return;
    setLoadingFavorites(prev => [...prev, courseId]);
    try {
      await axios.delete(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/favorites/${courseId}`, {
        headers: { authorization: `Bearer ${localStorage.getItem("access-token")}` }
      });
      setFavoriteCourseIds(prev => prev.filter(id => id !== courseId));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
    setLoadingFavorites(prev => prev.filter(id => id !== courseId));
  };

  // ✅ Simple Course Card
  const CourseCard = ({ course }) => {
    const isEnrolled = enrolledIds.includes(course._id);
    const isFavorite = favoriteCourseIds.includes(course._id);

    return (
      <div className="card bg-base-200 hover:shadow-xl shadow-md transition duration-300 rounded-xl relative">
        <figure className="relative">
          <img
            src={course.thumbnail || "https://via.placeholder.com/300x150"}
            alt={course.title}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <button
            onClick={() =>
              isFavorite ? handleRemoveFavorite(course._id) : handleAddFavorite(course._id)
            }
            disabled={loadingFavorites.includes(course._id)}
            className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition ${
              isFavorite
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-white text-gray-400 hover:text-red-600 hover:bg-red-100"
            }`}
          >
            {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>
        </figure>
          <div className="card-body">
            <h2 className="card-title text-lg">{course.title}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{course.category}</p>
            <p className="text-sm font-medium mt-1">
              Teacher: <span className="text-orange-500">{course.instructor}</span>
            </p>
            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <FiClock /> {course.duration}
              </span>
            </div>

            {isEnrolled && (
              <p className="text-sm text-green-600 font-semibold mt-2">
                ✅ You are enrolled
              </p>
            )}

            <div className="card-actions mt-4 w-full">
              <Link
                to={`/courses/${course._id}`}
                target="_blank"
                className="btn btn-sm btn-primary w-full"
              >
                Go to Course
              </Link>
            </div>
          </div>

      </div>
    );
  };

  // ✅ Separate favorite and enrolled courses
  const favoriteCourses = courses.filter(c => favoriteCourseIds.includes(c._id));
  const enrolledCourses = courses.filter(c => enrolledIds.includes(c._id));

  return (
    <div className="p-6 pt-10 bg-base-100 min-h-screen text-base-content">
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-500">
        Welcome to your Dashboard!
      </h1>

      {/* Favorited Courses */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Favorited Courses ({favoriteCourses.length})
        </h2>
        {favoriteCourses.length === 0 ? (
          <p className="text-gray-500">No favorite courses yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteCourses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>

      {/* Enrolled Courses */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Enrolled Courses ({enrolledCourses.length})
        </h2>
        {enrolledCourses.length === 0 ? (
          <p className="text-gray-500">You are not enrolled in any courses yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {enrolledCourses.map(course => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
