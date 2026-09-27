/**
 * FutureCity | Smart City of Tomorrow
 * Client-Side JavaScript Logic
 */

document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------------------------------
  // 1. Navbar Scroll State & Active Section Highlighting
  // --------------------------------------------------------------------------
  const navbar = document.getElementById("navbar");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    let currentId = "";
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      const isSectionLink = href.startsWith("#");
      const isActive = isSectionLink
        ? href === `#${currentId}`
        : new URL(link.href).pathname === window.location.pathname;
      link.classList.toggle("active", isActive);
      link.classList.toggle(
        "has-underline",
        isActive && link.classList.contains("nav-link"),
      );
    });
  }

  window.addEventListener("scroll", handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Drawer
  // --------------------------------------------------------------------------
  const mobileToggle = document.getElementById("mobile-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener("click", () => {
      mobileToggle.classList.toggle("active");
      mobileNav.classList.toggle("open");
      const isOpen = mobileNav.classList.contains("open");
      mobileToggle.setAttribute("aria-expanded", String(isOpen));
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    document.querySelectorAll(".mobile-nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.classList.remove("active");
        mobileNav.classList.remove("open");
        mobileToggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  // --------------------------------------------------------------------------
  // 3. Impact Stats Counter Animation
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll(".impact-number");
  let statsTriggered = false;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsTriggered) {
          statsTriggered = true;
          animateImpactCounters();
        }
      });
    },
    { threshold: 0.25 },
  );

  const impactSection = document.querySelector(".impact-section");
  if (impactSection) {
    statsObserver.observe(impactSection);
  }

  function animateImpactCounters() {
    statNumbers.forEach((item) => {
      const target = parseFloat(item.getAttribute("data-target"));
      const prefix = item.getAttribute("data-prefix") || "";
      const suffix = item.getAttribute("data-suffix") || "";
      const decimals = parseInt(item.getAttribute("data-decimals") || "0", 10);
      const duration = 2000;
      const startTime = performance.now();

      function step(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Exponential ease out
        const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = (ease * target).toFixed(decimals);

        item.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          item.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
        }
      }

      requestAnimationFrame(step);
    });
  }

  // --------------------------------------------------------------------------
  // 4. City Operations Dashboard Real-Time Telemetry Simulation
  // --------------------------------------------------------------------------
  const airVal = document.getElementById("dash-air-val");
  const powerVal = document.getElementById("dash-power-val");
  const transitVal = document.getElementById("dash-transit-val");

  if (airVal && powerVal && transitVal) {
    setInterval(() => {
      const air = (98.6 + Math.random() * 0.4).toFixed(1);
      const power = (94.2 + (Math.random() * 0.6 - 0.3)).toFixed(1);
      const transit = (99.4 + Math.random() * 0.4).toFixed(1);

      airVal.innerHTML = `${air}<span>%</span>`;
      powerVal.innerHTML = `${power}<span>GW</span>`;
      transitVal.innerHTML = `${transit}<span>%</span>`;
    }, 3000);
  }

  // Dashboard Tabs Filter
  const dashTabs = document.querySelectorAll(".dash-tab-btn");
  dashTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      dashTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // --------------------------------------------------------------------------
  // 5. Watch Video Buttons
  // --------------------------------------------------------------------------
  const heroWatchBtn = document.getElementById("hero-watch-btn");
  const visionPlayBtn = document.getElementById("vision-play-btn");

  function openVideoModal() {
    // Smooth scroll to vision section or visual highlight
    const visionSec = document.querySelector(".vision-section");
    if (visionSec) {
      visionSec.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (heroWatchBtn) {
    heroWatchBtn.addEventListener("click", openVideoModal);
  }
  if (visionPlayBtn) {
    visionPlayBtn.addEventListener("click", () => {
      alert(
        "FutureCity Vision Experience: Initiating 4K Solarpunk Urban Flythrough.",
      );
    });
  }

  // --------------------------------------------------------------------------
  // 6. Contact / Inquiry Form Submission
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById("futurecity-form");
  const formToast = document.getElementById("form-toast");
  const formSubmitBtn = document.getElementById("form-submit-btn");

  if (contactForm && formToast && formSubmitBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const origText = formSubmitBtn.innerHTML;
      formSubmitBtn.innerHTML = "Sending Telemetry...";
      formSubmitBtn.disabled = true;

      setTimeout(() => {
        formSubmitBtn.innerHTML = origText;
        formSubmitBtn.disabled = false;
        contactForm.reset();

        formToast.classList.add("show");
        setTimeout(() => {
          formToast.classList.remove("show");
        }, 5000);
      }, 1000);
    });
  }

  // --------------------------------------------------------------------------
  // 7. Newsletter Form Submission
  // --------------------------------------------------------------------------
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector("input");
      const origPlaceholder = input.placeholder;
      input.value = "";
      input.placeholder = "✓ Subscribed to FutureCity Dispatch!";
      setTimeout(() => {
        input.placeholder = origPlaceholder;
      }, 3500);
    });
  }
});
