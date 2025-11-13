// teacher-auth.js
// Handles teacher registration and login (simple client-side storage for demo)

function getStoredTeachers() {
  try {
    return JSON.parse(localStorage.getItem("teachersRegistered") || "[]");
  } catch (e) {
    return [];
  }
}

function saveStoredTeachers(list) {
  localStorage.setItem("teachersRegistered", JSON.stringify(list));
}

// Registration
const teacherRegisterForm = document.getElementById("teacher-register-form");
if (teacherRegisterForm) {
  teacherRegisterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("t-name").value.trim();
    const username = document.getElementById("t-username").value.trim();
    const password = document.getElementById("t-password").value;
    const subject = document.getElementById("t-subject").value.trim();

    if (!name || !username || !password) {
      alert("Please fill all required fields");
      return;
    }

    const list = getStoredTeachers();
    if (list.find((t) => t.username === username)) {
      alert("Username already exists");
      return;
    }

    list.push({ name, username, password, subject });
    saveStoredTeachers(list);
    alert("Registration successful. You can now login.");
    window.location.href = "index.html#login-teacher";
  });
}

// Login
const teacherLoginForm = document.getElementById("teacher-login-form");
if (teacherLoginForm) {
  teacherLoginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("t-username").value.trim();
    const password = document.getElementById("t-password").value;

    const list = getStoredTeachers();
    const found = list.find(
      (t) => t.username === username && t.password === password
    );

    // demo fallback: allow demo teacher if none registered
    if (
      !found &&
      list.length === 0 &&
      username === "teacher" &&
      password === "password"
    ) {
      // set demo
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("role", "teacher");
      window.location.href = "scheduling.html";
      return;
    }

    if (found) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("role", "teacher");
      window.location.href = "scheduling.html";
    } else {
      alert("Invalid credentials");
    }
  });
}
