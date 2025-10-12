import React, { useState, useEffect, useContext } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import AuthContext from "../Auth/AuthContext"; // adjust path if needed
import axios from "axios";

const Blog = () => {
  const { user } = useContext(AuthContext);
  const isAdmin = user?.role === "admin";

  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view"); // "view" | "edit" | "add"
  const [selectedBlog, setSelectedBlog] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    content: "", // for full blog content
  });

  // Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to load blogs", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Open modal to view blog
  const openViewModal = (blog) => {
    setSelectedBlog(blog);
    setModalMode("view");
    setModalOpen(true);
  };

  // Open modal to edit blog
  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description || blog.content?.slice(0, 100) || "",
      imageUrl: blog.imageUrl || "",
      content: blog.content || "",
    });
    setModalMode("edit");
    setModalOpen(true);
  };

  // Open modal to add new blog
  const openAddModal = () => {
    setSelectedBlog(null);
    setFormData({ title: "", description: "", imageUrl: "", content: "" });
    setModalMode("add");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedBlog(null);
    setFormData({ title: "", description: "", imageUrl: "", content: "" });
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Helper: get token from current Firebase user (fixed)
  // (Removed unused getAuthToken function)

  // Handle blog add or update
  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Title and content are required");
      return;
    }

    try {
      // const token = await getAuthToken();

      if (modalMode === "add") {
        await axios.post(
          "https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/blogs",
          {
            ...formData,
            timestamp: new Date(),
          },
          {
             headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`
          }
          }
        );
      } else if (modalMode === "edit" && selectedBlog) {
        await axios.patch(
          `https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/blogs/${selectedBlog._id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access-token")}`,
            },
          }
        );
      }
      await fetchBlogs();
      closeModal();
    } catch (error) {
      console.error("Failed to save blog", error);
      alert("Failed to save blog");
    }
  };

  // Handle blog delete
  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      // const token = await getAuthToken();

      await axios.delete(`https://bornobyte-680lol1f2-mugdhos-projects-9c18dfda.vercel.app/blogs/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access-token")}`,
        },
      });

      await fetchBlogs();
    } catch (error) {
      console.error("Failed to delete blog", error);
      alert("Failed to delete blog");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 bg-base-100 text-base-content">
      <h1 className="text-3xl font-bold text-amber-500 mb-6">bornoByte Blog</h1>
      {isAdmin && (
        <button
          onClick={openAddModal}
          className="btn bg-amber-500 hover:bg-amber-600 text-white mb-6 flex items-center gap-2"
        >
          <FaPlus /> Add Blog
        </button>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length === 0 && <p>No blogs available.</p>}
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-base-200 rounded-md shadow-md p-4 flex flex-col"
          >
            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="rounded mb-3 object-cover h-40 w-full"
              />
            )}
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="flex-grow text-sm my-2 line-clamp-3">
              {blog.description || blog.content?.slice(0, 150)}
            </p>
            <div className="flex justify-between items-center mt-4">
              <button
                className="btn btn-sm btn-info"
                onClick={() => openViewModal(blog)}
              >
                See More
              </button>

              {isAdmin && (
                <div className="flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => openEditModal(blog)}
                    aria-label="Edit Blog"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleDelete(blog._id)}
                    aria-label="Delete Blog"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-base-100 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-xl font-bold btn btn-ghost"
              aria-label="Close Modal"
            >
              ✕
            </button>

            {modalMode === "view" && selectedBlog && (
              <>
                <h2 className="text-2xl font-bold mb-3">{selectedBlog.title}</h2>
                {selectedBlog.imageUrl && (
                  <img
                    src={selectedBlog.imageUrl}
                    alt={selectedBlog.title}
                    className="rounded mb-4 w-full object-cover max-h-64"
                  />
                )}
                <p className="whitespace-pre-line">{selectedBlog.content}</p>
              </>
            )}

            {(modalMode === "edit" || modalMode === "add") && (
              <>
                <h2 className="text-xl font-bold mb-4">
                  {modalMode === "edit" ? "Edit Blog" : "Add New Blog"}
                </h2>

                <input
                  type="text"
                  name="title"
                  placeholder="Blog Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-3"
                />

                <input
                  type="text"
                  name="imageUrl"
                  placeholder="Image URL (optional)"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="input input-bordered w-full mb-3"
                />

                <textarea
                  name="content"
                  placeholder="Full Blog Content"
                  rows={6}
                  value={formData.content}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full mb-3"
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={closeModal}
                    className="btn btn-sm btn-outline"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="btn btn-sm btn-primary"
                  >
                    Save
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;