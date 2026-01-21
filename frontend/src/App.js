import React, { useEffect, useRef } from "react";
import { FaLocationArrow } from "react-icons/fa";
import "./App.css";

function App() {
  const navItems = [
    "TSEGA YAEKOB",
    "CONTACTS",
    "", // middle empty item
    "WORK",
    "SOCIALS",
  ];

  // refs for positioning subtitle relative to title
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
const cursorRef = useRef(null);

useEffect(() => {
  const ball = cursorRef.current;
  if (!ball) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ballX = mouseX;
  let ballY = mouseY;
  let isVisible = false;

  const speed = 0.12; // lower = more bounce

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }

  function onScroll() {
    if (window.scrollY > 40 && !isVisible) {
      ball.classList.add("visible");
      isVisible = true;
    }
  }

  function animate() {
    ballX += (mouseX - ballX) * speed;
    ballY += (mouseY - ballY) * speed;

    ball.style.transform = `translate3d(${ballX}px, ${ballY}px, 0)`;

    requestAnimationFrame(animate);
  }

  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("scroll", onScroll);

  animate();

  return () => {
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("scroll", onScroll);
  };
}, []);

  useEffect(() => {
    function updatePosition() {
      const hero = heroRef.current;
      const title = titleRef.current;
      const subtitle = subtitleRef.current;
      if (!hero || !title || !subtitle) return;

      // On narrow viewports let subtitle flow under the title
      if (window.innerWidth <= 900) {
        subtitle.style.position = "static";
        subtitle.style.left = "";
        subtitle.style.top = "";
        subtitle.style.transform = "";
        subtitle.style.zIndex = "";
        title.style.zIndex = "";
        return;
      }

      const heroRect = hero.getBoundingClientRect();
      const titleRect = title.getBoundingClientRect();

      // place subtitle roughly under the title using a direct left offset
      const left =
        titleRect.left - heroRect.left + Math.round(titleRect.width * 0.3);
      const top = titleRect.bottom - heroRect.top;

      subtitle.style.position = "absolute";
      subtitle.style.left = `${Math.max(8, left)}px`;
      subtitle.style.top = `${top}px`;
      subtitle.style.transform = "";
      subtitle.style.zIndex = "50";
      title.style.zIndex = "10";
    }

    // initial placement and on resize
    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, []);

  return (
    <div className="App">
      <header className="site-header">
        <nav className="nav-bar" aria-label="Main navigation">
          <ul className="nav-list">
            {navItems.map((label, idx) => (
              <li
                key={idx}
                className={`nav-item ${label === "" ? "empty" : ""}`}
              >
                {label === "" ? (
                  <a href="#" aria-hidden="true"></a>
                ) : (
                  <a href="#">{label}</a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main className="hero" ref={heroRef}>
        <div className="title-wrap">
          <h1 className="hero-title title-creative" ref={titleRef}>
            Creative
          </h1>
          <div className="badge">
            <FaLocationArrow
              className="badge-arrow"
              aria-hidden="true"
              focusable="false"
            />
            <span>Visual Designer</span>
          </div>
        </div>
        <h2 className="hero-subtitle title-designer" ref={subtitleRef}>
            Designer
          </h2>
        <div className="subtitle-wrap">
          <div className="badge badge-top second">
            <FaLocationArrow
              className="badge-arrow"
              aria-hidden="true"
              focusable="false"
            />
            <span>Developer</span>
          </div>
          
          <div className="badge badge-bottom second">
            <FaLocationArrow
              className="badge-arrow"
              aria-hidden="true"
              focusable="false"
            />
            <span>UI/UX Designer</span>
          </div>
        </div>
        <div className="cursor-ball" ref={cursorRef} />
    
      </main>
    </div>
  );
}

export default App;
