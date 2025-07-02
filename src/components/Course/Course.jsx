import { IoTime } from "react-icons/io5";
const Course = ({ course }) => {
  const { duration, image, title } = course;
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

        <div className="card-actions justify-end">
          <div className="badge badge-outline">Fashion</div>
          <div className="badge badge-outline">Products</div>
        </div>
      </div>
    </div>
  );
};

export default Course;
