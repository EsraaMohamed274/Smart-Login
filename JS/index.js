// Grab elements
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const alertBox = document.getElementById("alertBox");
const loginForm = document.getElementById("loginForm");

const users = JSON.parse(localStorage.getItem("users")) || [];

loginForm.onsubmit = function() {
  return false;
};

function loginUser() {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();

  if (!email || !password) {
    alertBox.className = "alert alert-danger";
    alertBox.innerText = "Please enter your email and password!";
    return;
  }

  const user = users.find(u => u.email === email);

  if (!user) {
    alertBox.className = "alert alert-danger";
    alertBox.innerText = "User not found. Please sign up first.";
    return;
  }

  if (user.password !== password) {
    alertBox.className = "alert alert-danger";
    alertBox.innerText = "Incorrect password. Please try again.";
    return;
  }

  localStorage.setItem("loggedInUser", JSON.stringify(user));

  alertBox.className = "alert alert-success";
  alertBox.innerText = `Login successful! Welcome, ${user.name}.`;

  clearForm();

  setTimeout(() => {
    window.location.href = "home.html";
  }, 3000);

  
}

function clearForm() {
  loginEmail.value = "";
  loginPassword.value = "";
}
