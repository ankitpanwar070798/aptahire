"use client";
import { useState } from "react";
import Link from "next/link";
import { blogPosts, allCategories, slugify } from "./blog-data";
import styles from "./BlogSidebar.module.scss";

const recentPosts = blogPosts.slice(0, 3);

export default function BlogSidebar({ activeCategory, onCategoryClick, currentSlug }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    window.location.href = `/resources/blogs?q=${encodeURIComponent(search.trim())}`;
  };

  return (
    <aside className={styles.sidebar}>
      {/* ── Search ── */}
      <div className={styles.widget}>
        <h4 className={styles.widget_title}>Search</h4>
        <form className={styles.search_form} onSubmit={handleSearch}>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Search posts…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className={styles.search_btn} type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>

      {/* ── Categories ── */}
      <div className={styles.widget}>
        <h4 className={styles.widget_title}>Categories</h4>
        <ul className={styles.category_list}>
          <li>
            <button
              className={`${styles.category_btn} ${!activeCategory ? styles.category_active : ""}`}
              onClick={() => onCategoryClick?.(null)}
            >
              <span>All Posts</span>
              <span className={styles.category_count}>{blogPosts.length}</span>
            </button>
          </li>
          {allCategories.map((cat) => {
            const count = blogPosts.filter((p) => p.categories.includes(cat)).length;
            return (
              <li key={cat}>
                <button
                  className={`${styles.category_btn} ${activeCategory === cat ? styles.category_active : ""}`}
                  onClick={() => onCategoryClick?.(cat)}
                >
                  <span>{cat}</span>
                  <span className={styles.category_count}>{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── Recent Posts ── */}
      <div className={styles.widget}>
        <h4 className={styles.widget_title}>Recent Posts</h4>
        <ul className={styles.recent_list}>
          {recentPosts
            .filter((p) => slugify(p.title) !== currentSlug)
            .slice(0, 3)
            .map((post) => (
              <li key={post.id} className={styles.recent_item}>
                <Link href={`/resources/blogs/${slugify(post.title)}`} className={styles.recent_link}>
                  <div className={styles.recent_img_wrap}>
                    <img src={post.image} alt={post.title} className={styles.recent_img} />
                  </div>
                  <div className={styles.recent_info}>
                    <p className={styles.recent_title}>{post.title}</p>
                    <span className={styles.recent_date}>{post.date}</span>
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
}
