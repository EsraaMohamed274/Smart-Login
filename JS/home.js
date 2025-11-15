const alertBox = document.getElementById("alertBox");
const username = document.getElementById("username");

const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedUser) {
  alertBox.className = "alert alert-danger";
  alertBox.innerText = "You are not logged in! Redirecting...";
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
} else {
  username.innerText = loggedUser.name;
}

function logout() {
  localStorage.removeItem("loggedInUser");
  alertBox.className = "alert alert-success";
  alertBox.innerText = "Logging out...";
  
  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
};
