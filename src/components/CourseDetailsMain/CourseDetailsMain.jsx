import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../Auth/AuthContext";

import Navbar from "../shared/Navbar"; // Adjust this path if needed
import Footer from "../shared/Footer"; // Adjust this path if needed
import CourseVideo from "./CourseVideo";

const CourseDetailsMain = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isApproved, setIsApproved] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [progress, setProgress] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [commentRefreshTrigger, setCommentRefreshTrigger] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [avgRating, setAvgRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [ratingInput, setRatingInput] = useState(0);
  const [commentInput, setCommentInput] = useState("");
  const [isEditingReview, setIsEditingReview] = useState(false);
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);

  const [activeTab, setActiveTab] = useState("reviews"); // "reviews" or "comments"

  const videoRef = useRef(null);
  const [showTick, setShowTick] = useState(false);

  const [watchedLast10Videos, setWatchedLast10Videos] = useState(new Set());

  const token = localStorage.getItem("access-token");
  const isEnrolled = isApproved || isAdmin;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://bornobyte.vercel.app/videos/${id}`);
        setCourse(res.data);
        setSelectedVideo(res.data.videos?.[0] || null);
      } catch (err) {
        console.error("Error loading course", err);
      }
    };

    const checkStatus = async () => {
      try {
        const [approvalRes, adminRes] = await Promise.all([
          axios.get(`https://bornobyte.vercel.app/checkApproval`, {
            params: { userEmail: user?.email, courseId: id },
            headers: { authorization: `Bearer ${token}` },
          }),
          axios.get(`https://bornobyte.vercel.app/users/admin/${user?.email}`),
        ]);
        setIsApproved(approvalRes.data.approved);
        setIsAdmin(adminRes.data.admin);
      } catch (err) {
        console.error("Status check failed", err);
      }
    };

    fetchData();
    if (user?.email) checkStatus();
  }, [id, user?.email, token]);

  useEffect(() => {
    if (!user?.email) return;
    axios
      .get(`https://bornobyte.vercel.app/progress`, {
        params: { userEmail: user.email, courseId: id },
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const completed = res.data.completedVideos || [];
        setProgress(completed);
        setWatchedLast10Videos(new Set(completed)); // Initialize with completed videos
      })
      .catch(() => {
        setProgress([]);
        setWatchedLast10Videos(new Set());
      });
  }, [id, user?.email, token]);

  useEffect(() => {
    axios
      .get(`https://bornobyte.vercel.app/comments/${id}`)
      .then((res) => setComments(res.data));
  }, [id, commentRefreshTrigger]);

  useEffect(() => {
    if (!course?._id) return;

    // Fetch reviews
    axios
      .get(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/reviews/${course._id}`)
      .then((res) => {
        setReviews(res.data);
        // Find if current user already reviewed
        if (user?.email) {
          const existing = res.data.find((r) => r.userEmail === user.email);
          if (existing) {
            setUserReview(existing);
            setRatingInput(existing.rating);
            setCommentInput(existing.comment);
          } else {
            setUserReview(null);
            setRatingInput(0);
            setCommentInput("");
          }
        }
      })
      .catch(console.error);

    // Fetch average rating
    axios
      .get(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/reviews/${course._id}/average`)
      .then((res) => {
        setAvgRating(res.data.avgRating);
        setReviewCount(res.data.count);
      })
      .catch(console.error);
  }, [course?._id, user?.email, reviewRefreshTrigger]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isEnrolled) return;

    // Reset tick when a new video is selected
    setShowTick(progress.includes(selectedVideo?.url || ""));

    const handleTimeUpdate = async () => {
      if (!video.duration) return;
      if (video.currentTime >= video.duration - 10) {
        if (!progress.includes(selectedVideo?.url || "")) {
          setShowTick(true);
          setWatchedLast10Videos((prev) => {
            const newSet = new Set(prev);
            newSet.add(selectedVideo.url);
            return newSet;
          });

          try {
            await axios.post(
              `https://bornobyte.vercel.app/progress`,
              {
                courseId: id,
                userEmail: user.email,
                videoUrl: selectedVideo.url,
              },
              { headers: { authorization: `Bearer ${token}` } }
            );
          } catch (err) {
            console.error("Failed to save video progress:", err);
          }

          // Update progress locally without triggering effect again
          setProgress((prev) => {
            if (!prev.includes(selectedVideo.url)) return [...prev, selectedVideo.url];
            return prev;
          });
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [selectedVideo, isEnrolled, id, token, user?.email, progress]);

  // eslint-disable-next-line no-unused-vars
  const extractYouTubeID = (url) => {
    try {
      const parsed = new URL(url);
      if (parsed.hostname === "youtu.be") return parsed.pathname.slice(1);
      if (parsed.hostname.includes("youtube.com"))
        return new URLSearchParams(parsed.search).get("v");
    } catch {
      return "";
    }
  };

  const handleVideoClick = (vid) => {
    if (!isEnrolled) {
      document.getElementById("enrollCard")?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setSelectedVideo(vid);
    setShowTick(false); // Reset tick on new video selection

    axios
      .post(
        `https://bornobyte.vercel.app/progress`,
        { courseId: id, userEmail: user.email, videoUrl: vid.url },
        { headers: { authorization: `Bearer ${token}` } }
      )
      .then(() => {
        // Update progress locally (commented out to avoid infinite loop)
        // setProgress((prev) => [...new Set([...prev, vid.url])]);
      });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;

    await axios.post(
      `https://bornobyte.vercel.app/comments`,
      {
        userEmail: user.email,
        courseId: id,
        text: newComment,
      },
      { headers: { authorization: `Bearer ${token}` } }
    );

    setNewComment("");
    setCommentRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteComment = async (commentId) => {
    await axios.delete(`https://bornobyte.vercel.app/comments/${commentId}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    setCommentRefreshTrigger((prev) => prev + 1);
  };

  const handleEditSave = async (commentId) => {
    await axios.patch(
      `https://bornobyte.vercel.app/comments/${commentId}`,
      { text: editedText },
      { headers: { authorization: `Bearer ${token}` } }
    );

    setEditingCommentId(null);
    setEditedText("");
    setCommentRefreshTrigger((prev) => prev + 1);
  };

  const handleReviewSubmit = async () => {
    if (ratingInput === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      if (userReview) {
        await axios.patch(
          `https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/reviews/${userReview._id}`,
          {
            rating: ratingInput,
            comment: commentInput,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
      } else {
        await axios.post(
          `https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/reviews`,
          {
            courseId: course._id,
            rating: ratingInput,
            comment: commentInput,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
      }
      setIsEditingReview(false);
      setReviewRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Are you sure you want to delete your review?")) return;

    try {
      await axios.delete(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/reviews/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });
      setUserReview(null);
      setRatingInput(0);
      setCommentInput("");
      setReviewRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error(err);
      alert("Failed to delete review");
    }
  };

  const StarRatingInput = ({ rating, setRating }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            onClick={() => setRating(star)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={star <= rating ? "#f59e0b" : "none"}
            stroke="#f59e0b"
            strokeWidth={2}
            className="w-6 h-6 cursor-pointer transition-colors duration-200 hover:fill-yellow-400 hover:stroke-yellow-400"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
        ))}
      </div>
    );
  };

  const grouped =
    course?.videos?.reduce((acc, vid) => {
      acc[vid.chapter] = acc[vid.chapter] || [];
      acc[vid.chapter].push(vid);
      return acc;
    }, {}) || {};

  return (
    <>
      <Navbar />

      <div className="bg-base-100 text-base-content min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {/* LEFT MAIN */}
          <div className="md:col-span-2 space-y-6">
            {isEnrolled && selectedVideo && (
              <div className="w-full aspect-video relative">
                <video
                  ref={videoRef}
                  width={"100%"}
                  className="w-full h-full rounded-lg"
                  src={selectedVideo.url}
                  title={selectedVideo.title}
                  controls
                  controlsList="nodownload"
                  preload="metadata"
                />
                {showTick && (
                  <div className="absolute top-2 right-2 text-green-500 text-2xl font-bold select-none z-10">
                    ✅
                  </div>
                )}
              </div>
            )}

            <h1 className="text-3xl font-bold text-important-text dark:text-important-text-dark">
              {course?.title}
            </h1>
            <p className="text-sm text-gray-500">Instructor: {course?.instructor}</p>
            <p className="text-sm">Category: {course?.category}</p>
            <p className="text-sm">Duration: {course?.duration}</p>
            <div className="flex items-center space-x-4 my-2">
              <div className="flex items-center">
                <StarRatingInput rating={Math.round(avgRating)} setRating={() => {}} />
                <span className="ml-2 text-sm text-gray-600">
                  {avgRating.toFixed(1)} / 5 ({reviewCount}{" "}
                  {reviewCount === 1 ? "review" : "reviews"})
                </span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">Overview</h3>
              <p>{course?.overview}</p>
            </div>

            <div>
              <h3 className="font-semibold">What You’ll Learn</h3>
              <ul className="list-disc ml-6">
                {course?.whatYouWillLearn?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold">Requirements</h3>
              <ul className="list-disc ml-6">
                {course?.requirements?.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4 mb-4 text-base-content">
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "reviews"
                    ? "bg-primary dark:bg-primary text-white dark:text-white"
                    : "bg-base-300 text-base-content"
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab("comments")}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === "comments"
                    ? "bg-primary dark:bg-primary text-white dark:text-white"
                    : "bg-base-300"
                }`}
              >
                Comments
              </button>
            </div>

            {/* YOUR REVIEW — only for enrolled users */}
            {activeTab === "reviews" && (
              <>
                {isEnrolled && (
                  <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Your Review</h3>
                    {userReview && !isEditingReview ? (
                      <div className="bg-base-200 p-4 rounded space-y-2">
                        <StarRatingInput rating={ratingInput} setRating={() => {}} />
                        <p>{commentInput}</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setIsEditingReview(true)}
                            className="btn btn-sm btn-outline text-important-text dark:text-important-text-dark 
                            hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white"
                          >
                            Edit
                          </button>
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteReview(userReview._id)}
                              className="btn btn-sm btn-error"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-base-200 p-4 rounded space-y-2">
                        <StarRatingInput rating={ratingInput} setRating={setRatingInput} />
                        <textarea
                          className="textarea w-full"
                          placeholder="Write your review here..."
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                          rows={4}
                        />
                        <button
                          onClick={handleReviewSubmit}
                          className="btn bg-primary dark:bg-primary text-white dark:text-white"
                        >
                          {userReview ? "Update Review" : "Submit Review"}
                        </button>
                        {isEditingReview && (
                          <button
                            onClick={() => {
                              setIsEditingReview(false);
                              setRatingInput(userReview.rating);
                              setCommentInput(userReview.comment);
                            }}
                            className="btn btn-ghost ml-2 text-important-text dark:text-important-text-dark"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ALL REVIEWS — show to everyone */}
                <div className="mt-6">
                  <h3 className="text-xl font-bold mb-2">All Reviews</h3>
                  <div className="space-y-4">
                    {reviews.length === 0 && <p>No reviews yet.</p>}
                    {reviews
                      .filter((r) => r._id !== userReview?._id) // exclude user’s own review from this list
                      .map((rev) => (
                        <div key={rev._id} className="bg-base-200 p-4 rounded space-y-1">
                          <div className="flex items-center space-x-2">
                            <StarRatingInput rating={rev.rating} setRating={() => {}} />
                            <span className="text-sm font-semibold">{rev.userEmail}</span>
                          </div>
                          <p>{rev.comment}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(rev.timestamp).toLocaleDateString()}
                          </p>
                          {isAdmin && (
                            <button
                              onClick={async () => {
                                if (window.confirm("Delete this review?")) {
                                  try {
                                    await axios.delete(
                                      `https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/reviews/${rev._id}`,
                                      {
                                        headers: {
                                          authorization: `Bearer ${localStorage.getItem("access-token")}`,
                                        },
                                      }
                                    );
                                    setReviewRefreshTrigger((prev) => prev + 1);
                                  } catch {
                                    alert("Failed to delete review");
                                  }
                                }
                              }}
                              className="btn btn-sm btn-error mt-1"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}

            {!isEnrolled && (
              <div>
                <h3 className="text-xl font-bold mt-6 mb-3">Course Contents</h3>
                {Object.entries(grouped).map(([chapter, vids]) => (
                  <details key={chapter} className="collapse collapse-arrow bg-base-200 mb-2">
                    <summary className="collapse-title font-semibold">{chapter}</summary>
                    <div className="collapse-content px-4">
                      <ul>
                        {vids.map((vid, idx) => (
                          <li
                            key={idx}
                            onClick={() => handleVideoClick(vid)}
                            className="hover:text-primary dark:hover:text-primary text-gray-400 cursor-pointer"
                          >
                            • {vid.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            )}

            {/* COMMENTS SECTION */}
            {activeTab === "comments" && (
              <>
                {isEnrolled && (
                  <div className="mt-6">
                    <h3 className="text-xl font-bold mb-2">Comments</h3>
                    <textarea
                      className="textarea textarea-bordered w-full"
                      placeholder="Write a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <button
                      onClick={handleCommentSubmit}
                      className="btn bg-primary dark:bg-primary mt-2 text-white dark:text-white"
                    >
                      Post
                    </button>

                    <div className="mt-4 space-y-2">
                      {comments
                        .filter((com) => isAdmin || com.userEmail === user.email)
                        .map((com) => (
                          <div key={com._id} className="bg-base-200 p-3 rounded">
                            <p className="font-semibold text-sm">{com.userEmail}</p>
                            {editingCommentId === com._id ? (
                              <>
                                <textarea
                                  className="textarea textarea-sm w-full mb-2"
                                  value={editedText}
                                  onChange={(e) => setEditedText(e.target.value)}
                                />
                                <button
                                  onClick={() => handleEditSave(com._id)}
                                  className="btn btn-sm btn-success mr-2"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => setEditingCommentId(null)}
                                  className="btn btn-sm btn-ghost text-important-text dark:text-important-text-dark"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <p>{com.text}</p>
                                <p className="text-xs text-gray-500">
                                  {com.timestamp
                                    ? new Date(com.timestamp).toLocaleString()
                                    : ""}
                                </p>
                                {(user?.email === com.userEmail || isAdmin) && (
                                  <div className="flex gap-2 mt-1">
                                    <button
                                      onClick={() => {
                                        setEditingCommentId(com._id);
                                        setEditedText(com.text);
                                      }}
                                      className="text-blue-500 text-xs"
                                    >
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => handleDeleteComment(com._id)}
                                      className="text-red-500 text-xs"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT PANEL */}
          <div className="w-full">
            {isEnrolled ? (
              <div className="bg-base-200 p-4 rounded-lg space-y-2">
                <div className="mb-4">
                  <div className="font-semibold text-sm mb-1 text-base-content">
                    Progress: {progress.length} / {course?.videos?.length || 0}{" "}
                    completed
                  </div>
                  <progress
                    className="progress progress-primary w-full"
                    value={progress.length}
                    max={course?.videos?.length || 1}
                  />
                </div>

                <h3 className="font-semibold mb-2">Contents</h3>
                {Object.entries(grouped).map(([chapter, vids]) => (
                  <details
                    key={chapter}
                    className="collapse collapse-arrow bg-base-100 mb-2"
                  >
                    <summary className="collapse-title font-semibold">
                      {chapter} (
                      {vids.filter((vid) => progress.includes(vid.url)).length}/
                      {vids.length})
                    </summary>
                    <div className="collapse-content px-2">
                      <ul>
                        {vids.map((vid, idx) => (
                          <li
                            key={idx}
                            className={`cursor-pointer flex items-center gap-2 hover:text-primary dark:hover:text-primary ${
                              selectedVideo?.url === vid.url
                                ? "text-important-text dark:text-important-text-dark font-semibold"
                                : ""
                            }`}
                            onClick={() => handleVideoClick(vid)}
                          >
                            {watchedLast10Videos.has(vid.url) && progress.includes(vid.url) ? (
                              <svg
                                className="h-5 w-5 text-important-text dark:text-important-text"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="h-5 w-5 text-important-text dark:text-important-text"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                              </svg>
                            )}
                            {vid.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </details>
                ))}
              </div>
            ) : (
              <div
                id="enrollCard"
                className="bg-base-200 p-4 rounded-lg shadow space-y-2"
              >
                <img
                  src={course?.thumbnail}
                  alt={course?.title}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h2 className="font-bold text-lg">{course?.title}</h2>
                <p className="text-sm">Instructor: {course?.instructor}</p>
                <p className="text-sm">Duration: {course?.duration}</p>
                <p className="text-lg font-bold text-orange-500">
                  {course?.price === 0 ? "Free" : `৳${course?.price}`}
                </p>
                <button
                  onClick={() => navigate(`/enroll-form/${course._id}`)}
                  className="btn btn-primary w-full"
                >
                  Enroll Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CourseDetailsMain;