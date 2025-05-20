document.addEventListener("DOMContentLoaded", function () {
  // Typing effect for hero section
  const text = "Hello, I'm Abdurazak Mohammed👋";
  const typedText = document.getElementById("typed-text");
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      typedText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 80);
    }
  }
  typeWriter();

  // Dark mode toggle
  const toggle = document.getElementById("dark-mode-toggle");
  const body = document.body;

  // Load dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode");
  }

  toggle.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    // Save preference
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled");
    } else {
      localStorage.setItem("darkMode", "disabled");
    }
  });

  const mobileDarkToggle = document.getElementById('mobile-dark-mode-toggle');
  if (mobileDarkToggle) {
    mobileDarkToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      // Save preference
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
      } else {
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  }

  // Responsive nav toggle
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.querySelector("nav ul.nav-links");
  navToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", function () {
      document
        .querySelectorAll(".nav-links a")
        .forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
});
