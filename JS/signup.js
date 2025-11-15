var userInputName = document.getElementById("userInputName");
var userInputEmail = document.getElementById("userInputEmail");
var userInputPassword = document.getElementById("userInputPassword");
var alertBox = document.getElementById("alertBox");

var users = JSON.parse(localStorage.getItem("users")) || [];

var regex = {
  userInputName: { value: /^[a-zA-Z]{3,}$/, isValid: false },
  userInputEmail: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    isValid: false,
  },
  userInputPassword: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
    isValid: false,
  },
};

function validateInputs(element) {
  if (regex[element.id].value.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    regex[element.id].isValid = true;
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    regex[element.id].isValid = false;
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }

  if (element.value === "") {
    element.classList.remove("is-invalid", "is-valid");
  }
}

function addUser() {
  if (
    !regex.userInputName.isValid ||
    !regex.userInputEmail.isValid ||
    !regex.userInputPassword.isValid
  ) {
    alertBox.className = "alert alert-danger";
    alertBox.innerText = "Please fill all fields correctly!";
    return;
  }

  var exists = users.some((u) => u.email === userInputEmail.value);
  if (exists) {
    alertBox.className = "alert alert-warning";
    alertBox.innerText = "Email already registered!";
    return;
  }

  var user = {
    id: users.length + 1,
    name: userInputName.value,
    email: userInputEmail.value,
    password: userInputPassword.value,
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alertBox.className = "alert alert-success";
  alertBox.innerText = "User created successfully! Redirecting...";

  clearForm();

  setTimeout(() => {
    window.location.href = "index.html";
  }, 3000);
}

function clearForm() {
  userInputName.value = "";
  userInputEmail.value = "";
  userInputPassword.value = "";

  userInputName.classList.remove("is-valid");
  userInputEmail.classList.remove("is-valid");
  userInputPassword.classList.remove("is-valid");
}
