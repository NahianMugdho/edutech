import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AuthContext from "../Auth/AuthContext";
import { Link } from "react-router-dom";
import {
  AcademicCapIcon,
  EnvelopeIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";
import { FaLinkedin } from "react-icons/fa";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { SparklesIcon } from "@heroicons/react/24/outline";

const TeacherCard = () => {
  const { user: currentUser } = useContext(AuthContext);

  const [teachers, setTeachers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [viewingTeacher, setViewingTeacher] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    education: "",
    experience: "",
    image: "",
    description: "",
    email: "",
    linkedin: "",
    fieldOfInterest: "",
    courses: [],
  });

  const fetchTeachers = async () => {
    try {
      const res = await axios.get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/teachers");
      setTeachers(res.data);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/videos");
      setVideos(res.data);
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
    fetchVideos();
  }, []);

  const handleOpen = (teacher = null) => {
    if (teacher) {
      setEditingTeacher(teacher);
      setFormData({
        name: teacher.name || "",
        designation: teacher.designation || "",
        education: teacher.education || "",
        experience: teacher.experience || "",
        image: teacher.image || "",
        description: teacher.description || "",
        email: teacher.email || "",
        linkedin: teacher.linkedin || "",
        fieldOfInterest: teacher.fieldOfInterest || "",
        courses: teacher.courses || [],
      });
    } else {
      setEditingTeacher(null);
      setFormData({
        name: "",
        designation: "",
        education: "",
        experience: "",
        image: "",
        description: "",
        email: "",
        linkedin: "",
        fieldOfInterest: "",
        courses: [],
      });
    }
    setViewingTeacher(null);
    setIsOpen(true);
  };

  const handleView = (teacher) => {
    setViewingTeacher(teacher);
    setIsOpen(true);
    setEditingTeacher(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingTeacher(null);
    setViewingTeacher(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseSelect = (courseId) => {
    const isSelected = formData.courses.includes(courseId);
    setFormData({
      ...formData,
      courses: isSelected
        ? formData.courses.filter((id) => id !== courseId)
        : [...formData.courses, courseId],
    });
  };

  const handleSave = async () => {
    if (!currentUser) {
      alert("Please login to continue.");
      return;
    }

    try {
      const payload = { ...formData, userEmail: currentUser.email };
      if (editingTeacher) {
        await axios.put(
          `https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/teachers/${editingTeacher._id}`,
          payload
        );
      } else {
        await axios.post("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/teachers", payload);
      }
      fetchTeachers();
      handleClose();
    } catch (error) {
      alert("Failed to save teacher. Make sure you are an admin.");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this teacher?"))
      return;
    if (!currentUser) {
      alert("Please login to continue.");
      return;
    }

    try {
      await axios.delete(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/teachers/${id}`, {
        data: { userEmail: currentUser.email },
      });
      fetchTeachers();
    } catch (error) {
      alert("Failed to delete teacher. Make sure you are an admin.");
      console.error(error);
    }
  };

  return (
    <div className="p-2 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-important-text dark:text-important-text-dark text-center text-base-content mb-2 sm:mb-6">
        Meet Our Teachers
      </h2>

      {currentUser?.role === "admin" && (
        <div className="flex justify-end mb-2 sm:mb-4">
          <button
            onClick={() => handleOpen()}
            className="bg-primary dark:bg-primary hover:scale-105 text-white px-2 sm:px-4 py-1 sm:py-2 rounded flex items-center gap-1 sm:gap-2 text-sm sm:text-base"
          >
            <FaPlus /> Add Teacher
          </button>
        </div>
      )}

      {teachers.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
          No teachers found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-6">
          {teachers.map((teacher) => (
            <div
              key={teacher._id}
              className="bg-base-200 text-base-content shadow-md sm:shadow-xl rounded-xl sm:rounded-3xl hover:drop-shadow-md sm:hover:drop-shadow-xl overflow-hidden relative group transition"
            >
              <div className="p-2 sm:p-6 flex flex-col items-center gap-1 sm:gap-2">
                <div className="w-20 sm:w-28 h-20 sm:h-28 bg-amber-100 rounded-full overflow-hidden border-2 sm:border-4 border-primary dark:border-primary shadow-md sm:shadow-lg">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-center">
                  {teacher.name}
                </h3>
                <p className="text-important-text dark:text-important-text-dark font-semibold text-sm sm:text-lg text-center">
                  {teacher.designation}
                </p>

                {teacher.education && (
                  <p className="text-xs sm:text-sm text-left w-full mt-1 sm:mt-2 flex items-center gap-1 sm:gap-2">
                    <AcademicCapIcon className="w-4 sm:w-5 h-4 sm:h-5 text-important-text dark:text-important-text-dark" />
                    <span className="font-semibold">Education:</span>{" "}
                    {teacher.education}
                  </p>
                )}

                {teacher.fieldOfInterest && (
                  <p className="text-xs sm:text-sm text-left w-full flex items-center gap-1 sm:gap-2">
                    <SparklesIcon className="w-4 sm:w-5 h-4 sm:h-5 text-important-text dark:text-important-text-dark" />
                    <span className="font-semibold">
                      Field of Interest:
                    </span>{" "}
                    {teacher.fieldOfInterest}
                  </p>
                )}

                <button
                  onClick={() => handleView(teacher)}
                  className="mt-1 sm:mt-3 px-4 sm:px-28 py-1 rounded border btn btn-outline text-important-text dark:text-important-text-dark 
                  font-semibold hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white text-xs sm:text-base"
                >
                  View Profile
                </button>
              </div>

              {currentUser?.role === "admin" && (
                <div className="absolute top-1 sm:top-2 right-1 sm:right-2 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleOpen(teacher)}
                    className="p-1 sm:p-2 bg-primary dark:bg-primary text-white dark:text-white rounded-full hover:scale-105"
                    aria-label="Edit Teacher"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="p-1 sm:p-2 bg-red-500 text-white rounded-full hover:scale-105"
                    aria-label="Delete Teacher"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 overflow-auto">
          <Dialog.Panel className="bg-base-200 text-base-content rounded-lg sm:rounded-xl p-2 sm:p-4 w-full max-w-4xl min-h-0 overflow-y-auto relative">
            <button
              onClick={handleClose}
              className="absolute top-2 right-4 text-important-text dark:text-important-text-dark text-2xl font-bold hover:scale-105"
              aria-label="Close Modal"
            >
              ×
            </button>
            {viewingTeacher ? (
              <>
                <h2 className="text-xl sm:text-2xl font-bold text-important-text dark:text-important-text-dark mb-2 sm:mb-3">
                  Teacher Profile
                </h2>

                <div className="flex flex-col sm:md:flex-row gap-2 sm:gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-40 sm:w-60 h-40 sm:h-60 bg-white border-2 sm:border-4 border-primary dark:border-primary shadow-md sm:shadow-lg rounded-full overflow-hidden">
                      <img
                        src={viewingTeacher.image}
                        alt={viewingTeacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 overflow-y-auto pr-0 max-w-full sm:max-w-[calc(100%-20rem)] text-left space-y-1 sm:space-y-3">
                    <h3 className="text-lg sm:text-xl font-bold">{viewingTeacher.name}</h3>
                    <p className="text-important-text dark:text-important-text-dark text-base sm:text-lg font-semibold">
                      {viewingTeacher.designation}
                    </p>

                    {viewingTeacher.education && (
                      <div className="flex items-start gap-1 sm:gap-2">
                        <AcademicCapIcon className="w-4 sm:w-5 h-4 sm:h-5 text-important-text dark:text-important-text-dark mt-0.5 sm:mt-1" />
                        <p>
                          <strong>Education:</strong> {viewingTeacher.education}
                        </p>
                      </div>
                    )}
                    {viewingTeacher.experience && (
                      <div className="flex items-start gap-1 sm:gap-2">
                        <BriefcaseIcon className="w-4 sm:w-5 h-4 sm:h-5 text-important-text dark:text-important-text-dark mt-0.5 sm:mt-1" />
                        <p>
                          <strong>Experience:</strong>{" "}
                          {viewingTeacher.experience}
                        </p>
                      </div>
                    )}
                    {viewingTeacher.fieldOfInterest && (
                      <div className="flex items-start gap-1 sm:gap-2">
                        <SparklesIcon className="w-4 sm:w-5 h-4 sm:h-5 text-important-text dark:text-important-text-dark mt-0.5 sm:mt-1" />
                        <p>
                          <strong>Field of Interest:</strong>{" "}
                          {viewingTeacher.fieldOfInterest}
                        </p>
                      </div>
                    )}
                    {viewingTeacher.email && (
                      <div className="flex items-start gap-1 sm:gap-2">
                        <EnvelopeIcon className="w-4 sm:w-5 h-4 sm:h-5 text-important-text dark:text-important-text-dark mt-0.5 sm:mt-1" />
                        <p>
                          <strong>Email:</strong>{" "}
                          <a
                            href={`mailto:${viewingTeacher.email}`}
                            className="text-important-text dark:text-important-text-dark hover:underline no-underline"
                          >
                            {viewingTeacher.email}
                          </a>
                        </p>
                      </div>
                    )}
                    {viewingTeacher.linkedin && (
                      <div className="flex items-start gap-1 sm:gap-2">
                        <FaLinkedin className="w-4 sm:w-5 h-4 sm:h-5 text-important-text dark:text-important-text-dark mt-0.5 sm:mt-1" />
                        <p>
                          <strong>LinkedIn:</strong>{" "}
                          <a
                            href={viewingTeacher.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="text-important-text dark:text-important-text-dark hover:underline no-underline"
                          >
                            {viewingTeacher.linkedin}
                          </a>
                        </p>
                      </div>
                    )}
                    {viewingTeacher.courses?.length > 0 && (
                      <div>
                        <p>
                          <BookOpenIcon className="w-4 sm:w-5 h-4 sm:h-5 text-important-text dark:text-important-text-dark inline-block mr-1" />
                          <strong>Courses:</strong>
                        </p>
                        <ul className="list-disc list-inside text-xs sm:text-sm text-important-text dark:text-important-text-dark hover:underline">
                          {viewingTeacher.courses.map((id) => {
                            const course = videos.find((v) => v._id === id);
                            return course ? (
                              <li key={id}>
                                <Link
                                  to={`/courses/${id}`}
                                  className="no-underline"
                                >
                                  {course.title}
                                </Link>
                              </li>
                            ) : null;
                          })}
                        </ul>
                      </div>
                    )}
                    {viewingTeacher.description && (
                      <div>
                        <p className="font-bold">
                          <UserCircleIcon className="w-4 sm:w-5 h-4 sm:h-5 text-important-text dark:text-important-text-dark inline-block mr-1" />
                          Bio:
                        </p>
                        <p>{viewingTeacher.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Dialog.Title className="text-lg sm:text-xl font-bold">
                  {editingTeacher ? "Edit Teacher" : "Add New Teacher"}
                </Dialog.Title>
                {[
                  "name",
                  "designation",
                  "education",
                  "experience",
                  "fieldOfInterest",
                  "email",
                  "linkedin",
                  "image",
                ].map((field) => (
                  <input
                    key={field}
                    type="text"
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full border p-1 sm:p-2 rounded bg-base-200 text-base-content text-sm sm:text-base"
                  />
                ))}
                <textarea
                  name="description"
                  placeholder="Short description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border p-1 sm:p-2 rounded bg-base-200 text-base-content text-sm sm:text-base"
                />
                <div>
                  <p className="font-medium mb-1 text-sm sm:text-base">Select Courses:</p>
                  <div className="max-h-20 sm:max-h-40 overflow-y-auto border p-1 sm:p-2 rounded bg-base-200">
                    {videos.map((video) => (
                      <label key={video._id} className="block text-sm sm:text-base">
                        <input
                          type="checkbox"
                          checked={formData.courses.includes(video._id)}
                          onChange={() => handleCourseSelect(video._id)}
                          className="mr-1 sm:mr-2"
                        />
                        {video.title}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-2 sm:mt-4">
                  <button
                    onClick={handleClose}
                    className="bg-base-300 px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-base-200 text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-primary dark:bg-primary px-2 sm:px-4 py-1 sm:py-2 text-white dark:text-white rounded hover:scale-105 text-sm sm:text-base"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default TeacherCard;