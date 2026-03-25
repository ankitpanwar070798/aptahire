"use client";
import styles from "./FeaturedProjects.module.scss";
import TextSlideEffect from "../TextSlideEffect";
import featuredProjectsContent from "./featured-projects-content";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const FeaturedProjects = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const featuredProjectCards = gsap.utils.toArray(
      `.${styles.featured_project_card}`
    );

    featuredProjectCards.forEach((featuredProjectCard, index) => {
      if (index < featuredProjectCards.length - 1) {
        const featuredProjectCardInner = featuredProjectCard.querySelector(
          `.${styles.featured_project_card_inner}`
        );

        const isMobile = window.innerWidth <= 1000;

        gsap.fromTo(
          featuredProjectCardInner,
          {
            y: "0%",
            z: 0,
            rotationX: 0,
          },
          {
            y: "-50%",
            z: -250,
            rotationX: 45,
            scrollTrigger: {
              trigger: featuredProjectCards[index + 1],
              start: isMobile ? "top 85%" : "top 100%",
              end: "top -75%",
              scrub: true,
              pin: featuredProjectCard,
              pinSpacing: false,
            },
          }
        );

        gsap.to(featuredProjectCardInner, {
          "--after-opacity": 1,
          scrollTrigger: {
            trigger: featuredProjectCards[index + 1],
            start: "top 55%",
            end: "top 0%",
            scrub: true,
          },
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className={styles.featured_Projects_Container}>
      <div className={styles.container}>
        <div className={styles.featured_Projects_Header_Callout}>
          <TextSlideEffect delay={0.1}>
            <div>Unleash hiring potential with aptahire features</div>
          </TextSlideEffect>
        </div>
        <div className={styles.featured_Projects_Header}>
          <TextSlideEffect delay={0.15}>
            <div>Discover how aptahire’s AI-driven technology transforms hiring. Streamline interviews and elevate candidate selection with our advanced tools.</div>
          </TextSlideEffect>
        </div>
      </div>

      <div className={styles.featured_projects}>
        {featuredProjectsContent.map((project, index) => (
          <div key={index} className={styles.featured_project_card}>
            <div className={styles.featured_project_card_inner}>
              <div className={styles.featured_project_card_content}>
                <div className={styles.featured_project_card_info}>
                  <p>{project.info}</p>
                </div>
                <div className={styles.featured_project_card_content_main}>
                  <div className={styles.featured_project_card_title}>
                    <h2>{project.title}</h2>
                  </div>
                  <div className={styles.featured_project_card_description}>
                    <p className="lg">{project.description}</p>
                  </div>
                </div>
              </div>
              <div className={styles.featured_project_card_img}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1000px) 100vw, 50vw"
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
