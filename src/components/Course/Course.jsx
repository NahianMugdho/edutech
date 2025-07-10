import { IoTime } from "react-icons/io5";
import { Link } from "react-router-dom";
const Course = ({ course }) => {
  const { duration, image, title, id } = course;
  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          className="w-full h-52 object-cover rounded-lg"
          src={image}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <div className=" flex justify-start">
          <p className="text-2xl flex-grow-0 mr-2">
            <IoTime />
          </p>
          <p>{duration}</p>
        </div>

        <div className="card-actions justify-between">
          <Link to={`/courses/${id}`}>
            <button className="btn btn-outline btn-primary">Learn More</button>
          </Link>
          <button className="btn btn-primary">Enroll</button>
        </div>
      </div>
    </div>
  );
};

export default Course;
