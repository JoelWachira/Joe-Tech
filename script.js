document.addEventListener("DOMContentLoaded", () => {
  // Scroll-to-top button
  const topBtn = document.createElement("button");
  topBtn.innerText = "↑ Top";
  topBtn.id = "topBtn";
  document.body.appendChild(topBtn);

  topBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #0f172a;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 50%;
    font-size: 18px;
    cursor: pointer;
    display: none;
    z-index: 1000;
  `;

  window.addEventListener("scroll", () => {
    topBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Hover effect on laptop boxes
  const boxes = document.querySelectorAll('.box');
  boxes.forEach(box => {
    box.addEventListener('mouseover', () => {
      box.style.boxShadow = "0 0 12px #3b82f6";
    });
    box.addEventListener('mouseout', () => {
      box.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.05)";
    });
  });

  // Fade-in animation for boxes and extras
  const fadeElements = document.querySelectorAll('.box, .box-2, .left-bottom');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease-out";
    observer.observe(el);
  });
});

// Wait for the page to load before running script
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const fname = document.querySelector("input[name='fname']");
  const sname = document.querySelector("input[name='sname']");
  const email = document.querySelector("input[name='email']");
  const message = document.querySelector("textarea[name='message']");

  // Create an area for messages
  const feedback = document.createElement("div");
  feedback.style.marginTop = "10px";
  form.appendChild(feedback);

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page reload

    // Reset feedback
    feedback.innerHTML = "";
    feedback.style.color = "red";

    // Validation
    if (fname.value.trim() === "") {
      feedback.textContent = "⚠ Please enter your first name.";
      fname.focus();
      return;
    }
    if (sname.value.trim() === "") {
      feedback.textContent = "⚠ Please enter your second name.";
      sname.focus();
      return;
    }
    if (email.value.trim() === "") {
      feedback.textContent = "⚠ Please enter your email.";
      email.focus();
      return;
    }
    // Simple email format check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.value)) {
      feedback.textContent = "⚠ Please enter a valid email address.";
      email.focus();
      return;
    }
    if (message.value.trim() === "") {
      feedback.textContent = "⚠ Please leave us a message.";
      message.focus();
      return;
    }

    // If everything is valid
    feedback.style.color = "green";
    feedback.textContent = "✅ Thank you! Your message has been submitted successfully.";

    // Reset form after a delay
    setTimeout(() => {
      form.reset();
    }, 2000);
  });
});
