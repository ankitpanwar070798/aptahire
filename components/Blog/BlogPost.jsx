"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { blogPosts, slugify } from "./blog-data";
import BlogSidebar from "./BlogSidebar";
import styles from "./BlogPost.module.scss";

export default function BlogPost({ slug }) {
  const post = blogPosts.find((p) => slugify(p.title) === slug);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-entry]", {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.1, ease: "power4.out", delay: 0.1,
      });
    }, heroRef.current);
    return () => ctx.revert();
  }, [slug]);

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, { y: 32, opacity: 0, duration: 0.8, ease: "power3.out", delay: 0.45 });
    });
    return () => ctx.revert();
  }, [slug]);

  if (!post) {
    return (
      <div className={styles.not_found}>
        <h2>Post not found</h2>
        <Link href="/resources/blogs" className={styles.back_link}>← Back to Blog</Link>
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.categories.some((c) => post.categories.includes(c)))
    .slice(0, 3);

  return (
    <div className={styles.wrapper}>
      {/* ── Hero ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.hero_img_wrap}>
          <img src={post.image} alt={post.title} className={styles.hero_img} />
          <div className={styles.hero_overlay} />
        </div>
        <div className={styles.hero_content}>
          <div className={styles.hero_cats} data-entry>
            {post.categories.map((cat) => (
              <span key={cat} className={styles.hero_cat}>{cat}</span>
            ))}
          </div>
          <h1 className={styles.hero_title} data-entry>{post.title}</h1>
          <div className={styles.hero_meta} data-entry>
            <span className={styles.author_avatar}>
              {post.author.split(" ").map((w) => w[0]).join("")}
            </span>
            <div>
              <p className={styles.author_name}>{post.author}</p>
              <p className={styles.author_role}>{post.authorRole}</p>
            </div>
            <span className={styles.meta_sep}>·</span>
            <span className={styles.meta_text}>{post.date}</span>
            <span className={styles.meta_sep}>·</span>
            <span className={styles.meta_text}>{post.readTime}</span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div className={styles.body}>
        <main className={styles.main}>
          {/* Back */}
          <Link href="/resources/blogs" className={styles.back_link}>
            ← All Posts
          </Link>

          {/* Article content */}
          <article
            ref={contentRef}
            className={styles.article}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* ── Related posts ── */}
          {relatedPosts.length > 0 && (
            <section className={styles.related}>
              <h3 className={styles.related_title}>Related Posts</h3>
              <div className={styles.related_grid}>
                {relatedPosts.map((rp) => (
                  <Link key={rp.id} href={`/resources/blogs/${slugify(rp.title)}`} className={styles.related_card}>
                    <div className={styles.related_img_wrap}>
                      <img src={rp.image} alt={rp.title} className={styles.related_img} />
                    </div>
                    <div className={styles.related_body}>
                      <div className={styles.related_cats}>
                        {rp.categories.map((c) => <span key={c}>{c}</span>)}
                      </div>
                      <p className={styles.related_post_title}>{rp.title}</p>
                      <span className={styles.related_date}>{rp.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </main>

        {/* Sidebar */}
        <BlogSidebar currentSlug={slug} />
      </div>
    </div>
  );
}
