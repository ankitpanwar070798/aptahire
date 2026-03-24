"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { blogPosts, slugify } from "./blog-data";
import BlogSidebar from "./BlogSidebar";
import styles from "./BlogListing.module.scss";

const POSTS_PER_PAGE = 6;

export default function BlogListing() {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(null);
  const [page, setPage] = useState(1);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  // pick up ?q= from URL (from sidebar search)
  const urlQuery = searchParams.get("q") || "";
  const [searchQuery] = useState(urlQuery);

  const filtered = useMemo(() => {
    let posts = blogPosts;
    if (activeCategory) posts = posts.filter((p) => p.categories.includes(activeCategory));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      posts = posts.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q) ||
          p.categories.some((c) => c.toLowerCase().includes(q)) ||
          p.author.toLowerCase().includes(q)
      );
    }
    return posts;
  }, [activeCategory, searchQuery]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  // Hero entrance
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-hero-el]", {
        y: 48, opacity: 0, duration: 0.9, stagger: 0.12, ease: "power4.out", delay: 0.1,
      });
    }, heroRef.current);
    return () => ctx.revert();
  }, []);

  // Cards stagger on change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-card]");
    if (!cards.length) return;
    gsap.fromTo(cards, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, ease: "power3.out" });
  }, [paginated]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handlePageChange = (p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      {/* ── Hero ── */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.hero_bg} aria-hidden="true" />
        <p className={styles.eyebrow} data-hero-el>Resources / Blog</p>
        <h1 className={styles.title} data-hero-el>Insights for Modern HR</h1>
        <p className={styles.subtitle} data-hero-el>
          Recruitment strategies, AI tools, and people practices — written by practitioners.
        </p>
      </section>

      {/* ── Body: grid + sidebar ── */}
      <div className={styles.body}>
        {/* Main column */}
        <main className={styles.main}>
          {searchQuery && (
            <p className={styles.search_label}>
              Results for <strong>"{searchQuery}"</strong> — {filtered.length} post{filtered.length !== 1 ? "s" : ""}
            </p>
          )}

          {paginated.length === 0 ? (
            <div className={styles.empty}>
              <span>∅</span>
              <p>No posts found{activeCategory ? ` in "${activeCategory}"` : ""}.</p>
            </div>
          ) : (
            <div className={styles.grid} ref={gridRef}>
              {paginated.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/resources/blogs/${slugify(post.title)}`}
                  className={`${styles.card} ${i === 0 && page === 1 && !activeCategory ? styles.card_featured : ""}`}
                  data-card
                >
                  <div className={styles.card_img_wrap}>
                    <img src={post.image} alt={post.title} className={styles.card_img} />
                    <div className={styles.card_img_overlay} />
                    <div className={styles.card_cats}>
                      {post.categories.map((cat) => (
                        <span key={cat} className={styles.card_cat}>{cat}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.card_body}>
                    <div className={styles.card_meta}>
                      <span className={styles.card_date}>{post.date}</span>
                      <span className={styles.card_dot}>·</span>
                      <span className={styles.card_read}>{post.readTime}</span>
                    </div>
                    <h2 className={styles.card_title}>{post.title}</h2>
                    <p className={styles.card_excerpt}>{post.excerpt}</p>
                    <div className={styles.card_author}>
                      <span className={styles.author_avatar}>{post.author.split(" ").map((w) => w[0]).join("")}</span>
                      <div>
                        <p className={styles.author_name}>{post.author}</p>
                        <p className={styles.author_role}>{post.authorRole}</p>
                      </div>
                      <span className={styles.card_cta}>Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pg_btn}
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
              >
                ← Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  className={`${styles.pg_btn} ${p === page ? styles.pg_active : ""}`}
                  onClick={() => handlePageChange(p)}
                >
                  {p}
                </button>
              ))}
              <button
                className={styles.pg_btn}
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
              >
                Next →
              </button>
            </div>
          )}
        </main>

        {/* Sidebar */}
        <BlogSidebar activeCategory={activeCategory} onCategoryClick={handleCategoryClick} />
      </div>
    </div>
  );
}
