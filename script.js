document.addEventListener("DOMContentLoaded", function () {
    // Typing effect
    const text = "Hello, I'm Abdurazak Mohammed👋";
    const typedText = document.getElementById("typed-text");
    let i = 0;

    function typeWriter() {
        if (typedText && i < text.length) {
            typedText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    }
    typeWriter();

    // Dark mode functionality
    const body = document.body;
    const desktopDarkModeToggle = document.getElementById("dark-mode-toggle");
    const mobileDarkModeToggle = document.getElementById("mobile-dark-mode-toggle");

    // Function to update dark mode and emoji visibility
    function updateDarkMode(isDark) {
        body.classList.toggle("dark-mode", isDark);
        localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");

        // Helper function to update icons for a given toggle element
        function updateToggleIcons(toggleElement) {
            if (!toggleElement) return;
            const darkIcon = toggleElement.querySelector('.dark-icon');
            const lightIcon = toggleElement.querySelector('.light-icon');

            if (darkIcon && lightIcon) {
                if (isDark) {
                    darkIcon.style.display = 'none';
                    lightIcon.style.display = 'inline-block';
                } else {
                    darkIcon.style.display = 'inline-block';
                    lightIcon.style.display = 'none';
                }
            }
        }

        updateToggleIcons(desktopDarkModeToggle);
        updateToggleIcons(mobileDarkModeToggle);
    }

    // Initialize dark mode from localStorage
    const isDarkInitialized = localStorage.getItem("darkMode") === "enabled";
    updateDarkMode(isDarkInitialized);

    // Add event listeners for dark mode toggles
    if (desktopDarkModeToggle) {
        desktopDarkModeToggle.addEventListener("click", () => {
            updateDarkMode(!body.classList.contains("dark-mode"));
        });
    }

    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.addEventListener("click", () => {
            updateDarkMode(!body.classList.contains("dark-mode"));
        });
    }

    // Responsive navigation toggle
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelector("nav ul.nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", function () {
            navLinks.classList.toggle("open");
        });
    }

    // Active navigation link highlighting
    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", function () {
            document.querySelectorAll(".nav-links a")
                .forEach(l => l.classList.remove("active"));
            this.classList.add("active");

            // Close the mobile menu when a link is clicked (optional, but good UX)
            if (navLinks && navLinks.classList.contains("open")) {
                navLinks.classList.remove("open");
            }
        });
    });
});