// "use client";
// import { useEffect, useRef } from "react";
// import Image from "next/image";
// import gsap from "gsap";
// import styles from "./BrandsSection.module.scss";

// const brandLogos = [
//   { src: "https://deepsense.in/wp-content/uploads/2024/10/Classmate.png.webp", alt: "Classmate" },
//   { src: "https://deepsense.in/wp-content/uploads/2024/10/Cavins.png.webp", alt: "Cavins" },
//   { src: "https://deepsense.in/wp-content/uploads/2024/11/Rectangle-3105.png.webp", alt: "Nippon" },
//   { src: "https://deepsense.in/wp-content/uploads/2024/10/Walkaro.png.webp", alt: "Walkaro" },
//   { src: "https://deepsense.in/wp-content/uploads/2024/10/Suguna-Foods.png.webp", alt: "Suguna Foods" },
//   { src: "https://deepsense.in/wp-content/uploads/2024/11/Rectangle-3105-2.png.webp", alt: "ITC" },
// ];

// const BrandsSection = () => {
//   const containerRef = useRef(null);
//   const tweenRef = useRef(null);

//   useEffect(() => {
//     const container = containerRef.current;

//     tweenRef.current = gsap.to(container, {
//       xPercent: -50,
//       ease: "none",
//       duration: window.innerWidth < 768 ? 10 : 20, // faster on mobile
//       repeat: -1,
//     });

//     container.addEventListener("mouseenter", () => tweenRef.current.pause());
//     container.addEventListener("mouseleave", () => tweenRef.current.play());

//     return () => {
//       tweenRef.current?.kill();
//     };
//   }, []);

//   return (
//     <section className={styles.brands_section}>
//       <div className={styles.track} ref={containerRef}>
//         {[...brandLogos, ...brandLogos].map((brand, idx) => (
//           <div key={idx} className={styles.logo}>
//             <Image src={brand.src} alt={brand.alt} width={150} height={80} />
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default BrandsSection;
"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import styles from "./BrandsSection.module.scss"
import MagneticElement from "../MagneticElement"


const defaultLogos = [
  { src: "https://deepsense.in/wp-content/uploads/2024/10/Classmate.png.webp", name: "Classmate", alt: "Classmate" },
  { src: "https://deepsense.in/wp-content/uploads/2024/10/Cavins.png.webp", name: "Cavins", alt: "Cavins" },
  { src: "https://deepsense.in/wp-content/uploads/2024/11/Rectangle-3105.png.webp", name: "Nippon", alt: "Nippon" },
  { src: "https://deepsense.in/wp-content/uploads/2024/10/Walkaro.png.webp", name: "Walkaro", alt: "Walkaro" },
  { src: "https://deepsense.in/wp-content/uploads/2024/10/Suguna-Foods.png.webp", name: "Suguna Foods", alt: "Suguna Foods" },
  { src: "https://deepsense.in/wp-content/uploads/2024/11/Rectangle-3105-2.png.webp", name: "ITC", alt: "ITC" },
]

export default function BrandsSection({ logos = defaultLogos, intervalMs = 2000, monochrome = true }) {
  const [displayedLogos, setDisplayedLogos] = useState(logos.slice(0, 6))
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [loadedImages, setLoadedImages] = useState(new Set())

  const logosRef = useRef(logos)
  logosRef.current = logos

  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = logos.map((logo) => {
        return new Promise((resolve, reject) => {
          const img = new window.Image()
          img.onload = () => resolve(logo.src)
          img.onerror = () => reject(logo.src)
          img.src = logo.src
        })
      })

      try {
        const loadedSrcs = await Promise.allSettled(imagePromises)
        const successfullyLoaded = loadedSrcs
          .filter((result) => result.status === "fulfilled")
          .map((result) => result.value)

        setLoadedImages(new Set(successfullyLoaded))
      } catch (error) {
        console.warn("Some images failed to preload:", error)
      }
    }

    // Defer preload to idle time so it doesn't compete with above-the-fold resources
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(() => preloadImages());
      return () => window.cancelIdleCallback(handle);
    } else {
      const t = setTimeout(preloadImages, 3000);
      return () => clearTimeout(t);
    }
  }, [logos])

  const shuffleLogos = () => {
    const shuffled = [...logosRef.current].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 6)
  }

  useEffect(() => {
    if (isPaused || logos.length <= 6) {
      return
    }

    const interval = setInterval(() => {
      setIsTransitioning(true)

      setTimeout(() => {
        setDisplayedLogos(shuffleLogos())

        setTimeout(() => {
          setIsTransitioning(false)
        }, 100)
      }, 300)
    }, intervalMs)

    return () => {
      clearInterval(interval)
    }
  }, [isPaused, logos.length, intervalMs])

  return (
    <section
      className={styles.brands_section}
      aria-label="Trusted by leading companies"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.trusted_header}>
        <p className={styles.trusted_label}>Our AI Hiring Tool Clientele</p>
      </div>

      <div className={styles.logo_grid}>
        {displayedLogos.map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className={styles.logo_item}
            style={{
              transition: "opacity 200ms ease-out, transform 200ms ease-out, filter 200ms ease-out",
              transitionDelay: isTransitioning ? `${index * 20}ms` : `${index * 30}ms`,
              opacity: isTransitioning ? 0.3 : loadedImages.has(logo.src) ? 1 : 0.3,
              transform: isTransitioning ? "scale(0.95)" : "scale(1)",
              filter: isTransitioning ? "blur(3px)" : "blur(0px)",
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <MagneticElement >
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              width={360}
              height={196}
              className={`${styles.logo_image} ${hoveredIndex === index ? styles.logo_image_hovered : ""}`}
              priority={index < 6}
              onLoad={() => {
                setLoadedImages((prev) => new Set([...prev, logo.src]))
              }}
            />
            </MagneticElement>

            {/* {hoveredIndex === index && (
              <div className={styles.logo_overlay}>
                <p className={styles.overlay_text}>Read Case Study</p>
              </div>
            )} */}
          </div>
        ))}
      </div>
    </section>
  )
}