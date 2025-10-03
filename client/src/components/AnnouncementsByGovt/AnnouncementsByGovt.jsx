import React, { useEffect, useState } from "react";
import axios from "axios";

const AnnouncementsByGovt = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Your GNews API key
  const API_KEY = "f9cf5f6417c215cc52b44345a8ecbd05";

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://gnews.io/api/v4/search", {
          params: {
            q: "disaster OR earthquake OR flood OR cyclone OR wildfire",
            lang: "en",
            country: "in",
            max: 10,
            token: API_KEY
          },
        });
        setArticles(res.data.articles || []);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return (
    <div style={{
      minHeight: "300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
      color: "#244876",
    }}>
      Loading disaster news...
    </div>
  );

  return (
    <section style={{
      padding: "30px 5vw",
      background: "linear-gradient(to bottom,#e3f0fa 0%, #f8fafc 100%)",
      minHeight: "100vh",
      fontFamily: "'Segoe UI', 'Arial', 'sans-serif'",
    }}>
      <header style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderBottom: "4px solid #244876",
        marginBottom: "2rem",
      }}>
        <h2 style={{
          fontSize: "2.2rem",
          color: "#244876",
          letterSpacing: "1px",
          fontWeight: 700,
          margin: "0 0 .7em 0",
        }}>
          Government Disaster & Safety Announcements
        </h2>
        <p style={{
          fontSize: "1rem",
          color: "#416FA6",
          marginBottom: ".5em",
        }}>
          Latest updates about major disasters, safety alerts, and official advisories in India
        </p>
      </header>

      {articles.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          margin: "0 auto",
          maxWidth: "1400px",
        }}>
          {articles.map((article, idx) => (
            <article
              key={idx}
              style={{
                background: "#fff",
                border: "1px solid #dee4ef",
                borderRadius: "12px",
                boxShadow: "0 4px 16px rgba(36,72,118,0.07)",
                overflow: "hidden",
                transition: "box-shadow 0.2s",
                display: "flex",
                flexDirection: "column",
              }}
              tabIndex={0}
              aria-label={article.title}
            >
              {article.image && (
                <div style={{
                  width: "100%",
                  height: "200px",
                  background: "#e9e9e9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              )}
              <div style={{
                padding: "16px 18px",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                justifyContent: "space-between",
              }}>
                <h3 style={{
                  fontSize: "1.2rem",
                  color: "#244876",
                  margin: "0 0 0.5em 0",
                  fontWeight: 600,
                  lineHeight: 1.25,
                }}>{article.title}</h3>
                <p style={{
                  fontSize: "1rem",
                  color: "#3d546e",
                  marginBottom: "1.2em",
                }}>{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontWeight: 500,
                    fontSize: "0.98rem",
                    background: "#244876",
                    color: "#fff",
                    textDecoration: "none",
                    padding: "10px 16px",
                    borderRadius: "5px",
                    transition: "background .18s",
                    alignSelf: "flex-start",
                  }}
                  onMouseOver={e => e.currentTarget.style.background = "#416FA6"}
                  onMouseOut={e => e.currentTarget.style.background = "#244876"}
                >
                  Read More
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p style={{
          fontSize: "1.1rem",
          color: "#416FA6",
          textAlign: "center",
          marginTop: "2em",
          background: "#eaf4ff",
          borderRadius: "6px",
          padding: "24px",
        }}>
          No disaster news found at this time. Please check back later.
        </p>
      )}
    </section>
  );
};

export default AnnouncementsByGovt;
