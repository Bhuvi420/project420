// student-auth.js
// Handles student registration and login (simple client-side storage for demo)

function getStoredStudents() {
  try {
    return JSON.parse(localStorage.getItem("studentsRegistered") || "[]");
  } catch (e) {
    return [];
  }
}

function saveStoredStudents(list) {
  localStorage.setItem("studentsRegistered", JSON.stringify(list));
}

// Registration
const studentRegisterForm = document.getElementById("student-register-form");
if (studentRegisterForm) {
  studentRegisterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("s-name").value.trim();
    const username = document.getElementById("s-username").value.trim();
    const password = document.getElementById("s-password").value;
    const studentClass = document.getElementById("s-class").value.trim();

    if (!name || !username || !password) {
      alert("Please fill all required fields");
      return;
    }

    const list = getStoredStudents();
    if (list.find((s) => s.username === username)) {
      alert("Username already exists");
      return;
    }

    list.push({ name, username, password, class: studentClass });
    saveStoredStudents(list);
    alert("Registration successful. You can now login.");
    window.location.href = "index.html#login-student";
  });
}

// Login
const studentLoginForm = document.getElementById("student-login-form");
if (studentLoginForm) {
  studentLoginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("s-username").value.trim();
    const password = document.getElementById("s-password").value;

    const list = getStoredStudents();
    const found = list.find(
      (s) => s.username === username && s.password === password
    );

    // demo fallback
    if (
      !found &&
      list.length === 0 &&
      username === "student" &&
      password === "password"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("role", "student");
      window.location.href = "student-dashboard.html";
      return;
    }

    if (found) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", username);
      localStorage.setItem("role", "student");
      window.location.href = "student-dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  });
}
