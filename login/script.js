const loginContainerEl = document.getElementById("loginContainer");
const loginEmailEl = document.getElementById("loginEmail");
const loginPasswordEl = document.getElementById("loginPassword");
const loginErrorMessageEl = document.getElementById("loginErrorMessage");
const loginPasswordErrorMessageEl = document.getElementById("loginPasswordErrorMessage");
const alreadyExistErrorMessageEl = document.getElementById("alreadyExistErrorMessage");

const registerContainerEl = document.getElementById("registerContainer");
const registerEmailEl = document.getElementById("registerEmail");
const registerPasswordEl = document.getElementById("registerPassword");
const registerErrorMessageEl = document.getElementById("registerErrorMessage");
const registerPasswordErrorMessageEl = document.getElementById("registerPasswordErrorMessage");
const registrationMessageEl = document.getElementById("registrationMessage");

const successDashboardEl = document.getElementById("successDashboard");
const loggedInUserEl = document.getElementById("loggedInUser");

function toggleForms(showLogin) {
    loginContainerEl.classList.toggle("d-none", !showLogin);
    registerContainerEl.classList.toggle("d-none", showLogin);
    registrationMessageEl.classList.add("d-none");
}

function isValidPassword(password) {
    return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(password);
}

function register() {
    const username = registerEmailEl.value;
    const password = registerPasswordEl.value;

    registerErrorMessageEl.textContent = '';
    registerPasswordErrorMessageEl.textContent = '';
    registrationMessageEl.classList.add("d-none");

    if (!username) {
        registerErrorMessageEl.textContent = 'Please enter an email.';
    }
     else if (!isValidPassword(password)) {
        registerPasswordErrorMessageEl.textContent = 'Password must be at least 8 characters long and contain letters and numbers.';
    } 
    else if (localStorage.getItem(username)) {
        registerErrorMessageEl.textContent = 'Email already exists.';
    
    } 
    else {
        localStorage.setItem(username, password);
        registrationMessageEl.textContent = 'Registration successful! You can now log in.';
        registrationMessageEl.classList.remove("d-none");
        registerEmailEl.value = '';
        registerPasswordEl.value = '';
    }
}

function login() {
    const username = loginEmailEl.value;
    const password = loginPasswordEl.value;

    loginErrorMessageEl.textContent = '';
    loginPasswordErrorMessageEl.textContent = '';
    alreadyExistErrorMessageEl.textContent = '';

    if (!username) {
        loginErrorMessageEl.textContent = 'Please enter an email.';
    } 

    else if (!isValidPassword(password)) {
        loginPasswordErrorMessageEl.textContent = 'Invalid password format.';
    } 

    else if (localStorage.getItem(username) === password) {
        loginContainerEl.classList.add("d-none");
        successDashboardEl.classList.remove("d-none");
        loggedInUserEl.textContent = username;
    } 
    
    else {
        alreadyExistErrorMessageEl.textContent = 'Invalid email or password.';
    }
}

function logout() {
    successDashboardEl.classList.add("d-none");
    loginContainerEl.classList.remove("d-none");
    loginEmailEl.value = '';
    loginPasswordEl.value = '';
}

function showRegisterForm() {
    toggleForms(false);
}

function showLoginForm() {
    toggleForms(true);
}
