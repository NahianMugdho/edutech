import React, { useEffect, useMemo, useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function clsx(...args) {
  return args.filter(Boolean).join(" ");
}

const slides = [
  {
    id: "s1",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop",
    title: "Study. Learn. Apply.",
    subtitle: "Most reliable academic partner.",
    cta: { label: "Get Started", href: "#get-started" },
    route: "login",
  },
  {
    id: "s2",
    image:
      "https://images.unsplash.com/photo-1636772523547-5577d04e8dc1?w=800&auto=format&fit=crop",
    // "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1600&auto=format&fit=crop",
    title: "Enroll & Learn Smarter",
    subtitle: "Beautiful courses, seamless streaming.",
    cta: { label: "Browse Courses", href: "#courses" },
    route: "courses",
  },
  {
    id: "s3",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Got Stuck?",
    subtitle: "Reach us, we're here to help.",
    cta: { label: "Contact Us", href: "#pricing" },
    route: "contactUs",
  },
];

export function BannerCarousel({
  slides,
  className,
  height = "h-[48svh] md:h-[68svh]",
  autoPlay = true,
  autoPlayMs = 3000,
  startIndex = 0,
}) {
  const [index, setIndex] = useState(
    Math.max(0, Math.min(startIndex, slides.length - 1))
  );
  const [isHover, setIsHover] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const containerRef = useRef(null);
  const announceRef = useRef(null);
  const controls = useAnimation();

  // eslint-disable-next-line no-unused-vars
  const goTo = (i) => setIndex((prev) => (i + slides.length) % slides.length);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // autoplay
  useEffect(() => {
    if (!isPlaying || isHover || isFocus || slides.length <= 1) return;
    const id = setInterval(next, autoPlayMs);
    return () => clearInterval(id);
  }, [isPlaying, isHover, isFocus, next, autoPlayMs, slides.length]);

  // announce changes (a11y)
  useEffect(() => {
    if (!announceRef.current) return;
    announceRef.current.textContent = `${index + 1} / ${slides.length}: ${
      slides[index]?.title ?? "Slide"
    }`;
  }, [index, slides]);

  // keyboard controls
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prev();
          break;
        case "ArrowRight":
          e.preventDefault();
          next();
          break;
        case " ":
          e.preventDefault();
          setIsPlaying((p) => !p);
          break;
        default:
          break;
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [prev, next]);

  const prevIndex = usePrevious(index);
  const direction = useMemo(() => {
    if (prevIndex === null) return 0;
    const diff = index - prevIndex;
    if (diff === 0) return 0;
    if (diff < -1) return 1;
    if (diff > 1) return -1;
    return diff;
  }, [index, prevIndex]);

  const handleDragEnd = (_e, info) => {
    const threshold = 120;
    const velocityThreshold = 300;
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    if (offsetX < -threshold || velocityX < -velocityThreshold) {
      next();
    } else if (offsetX > threshold || velocityX > velocityThreshold) {
      prev();
    } else {
      controls.start({
        x: 0,
        transition: { type: "spring", stiffness: 300, damping: 28 },
      });
    }
  };

  return (
    <section
      ref={containerRef}
      className={clsx(
        "relative w-full select-none overflow-hidden rounded-2xl bg-neutral-950 text-white",
        height,
        className
      )}
      role="region"
      aria-roledescription="carousel"
      aria-label="Site highlights"
      tabIndex={0}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
    >
      <div className="sr-only" aria-live="polite" ref={announceRef} />

      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <Slide
            key={s.id}
            active={i === index}
            direction={direction}
            onDragEnd={handleDragEnd}
            controls={controls}
            {...s}
          />
        ))}
      </div>

      {slides[index] && (
        <motion.div
          key={slides[index].id + "-content"}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-4"
        >
          <div className="max-w-xl space-y-3 md:space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl text-yellow-50">
              {slides[index].title}
            </h2>
            {slides[index].subtitle && (
              <p className="text-sm/6 text-white/85 md:text-base/7 lg:text-lg/8">
                {slides[index].subtitle}
              </p>
            )}
            {slides[index].cta && (
              <Link
                to={slides[index].route}
                href={slides[index].cta.href}
                className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-sm font-medium text-neutral-900 shadow-lg transition hover:scale-[1.02] hover:shadow-xl active:scale-[0.99] md:text-base"
              >
                {slides[index].cta.label}
              </Link>
            )}
          </div>
        </motion.div>
      )}

      {/* Arrows (hidden on small devices) */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex group absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-2xl bg-white/10 p-2 backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
      >
        <ChevronLeft className="size-5 transition group-hover:-translate-x-0.5" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex group absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-2xl bg-white/10 p-2 backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/60"
      >
        <ChevronRight className="size-5 transition group-hover:translate-x-0.5" />
      </button>
    </section>
  );
}

function Slide({ image, title, active, direction, onDragEnd, controls }) {
  return (
    <motion.div
      role="group"
      aria-roledescription="slide"
      aria-label={title}
      className={clsx(
        "absolute inset-0 origin-center",
        active ? "z-[1]" : "z-0 pointer-events-none"
      )}
      initial={{
        opacity: 0,
        x: direction > 0 ? 60 : direction < 0 ? -60 : 0,
        scale: 0.98,
      }}
      animate={{
        opacity: active ? 1 : 0,
        x: 0,
        scale: active ? 1 : 1,
        transition: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <motion.div
        drag="x"
        dragElastic={0.08}
        dragMomentum={true}
        onDragEnd={onDragEnd}
        animate={controls}
        className="absolute inset-0"
      >
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/20 to-black/10" />
      </motion.div>
    </motion.div>
  );
}

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 p-4 text-white">
      <BannerCarousel slides={slides} />
    </div>
  );
}
