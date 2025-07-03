import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./Slider.css";

const slides = [
  {
    image:
      "https://elearningindustry.com/wp-content/uploads/2013/08/321-free-tools-for-teachers-free-educational-technology-e1536653067167.png",
    title: "Welcome to Slide One",
    subtitle: "This is the first page",
    btn1: "Learn More",
    btn2: "Get Started",
  },
  {
    image:
      "https://d33xpen3f57qeo.cloudfront.net/wp-content/uploads/sites/2/2022/09/30194241/edtech-trends-620x348.jpg",
    title: "Explore Slide Two",
    subtitle: "More info here",
    btn1: "See Features",
    btn2: "Try Now",
  },
  {
    image:
      "https://prezibase.com/free/preview/edtech-educational-technology-school-teaching-ipad-prezi-presentation-template.jpg",
    title: "Final Slide",
    subtitle: "Thank you for watching",
    btn1: "Back to Home",
    btn2: "Contact Us",
  },
];

export default function MySlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      loop={true}
      className="w-full h-[80vh] md:h-[70vh]"
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="w-full h-full bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="bg-black/60 text-white p-6 md:p-10 rounded-lg text-center max-w-3xl mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-md md:text-lg mb-6">{slide.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-2 bg-white text-black rounded hover:bg-gray-200 transition">
                  {slide.btn1}
                </button>
                <button className="px-6 py-2 bg-transparent border border-white text-white rounded hover:bg-white hover:text-black transition">
                  {slide.btn2}
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
