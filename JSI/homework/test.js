const firebaseConfig = {
    apiKey: "AIzaSyBl1v4j0DMx-ce4rkGZpmijzyUYLLRm9NI",
    authDomain: "bai-3-2f0fc.firebaseapp.com",
    projectId: "bai-3-2f0fc",
    storageBucket: "bai-3-2f0fc.firebasestorage.app",
    messagingSenderId: "300263576892",
    appId: "1:300263576892:web:55c18b93e96985c55b3a39",
    measurementId: "G-38NJ0S7XEP"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupConfirmPassword = document.getElementById('signup-confirm-password');
const statusMessage = document.getElementById('status-message');
const logoutButton = document.getElementById('logout-button');

const loginGoogleButton = document.getElementById('login-google');
const loginFacebookButton = document.getElementById('login-facebook');
const signupGoogleButton = document.getElementById('signup-google');
const signupFacebookButton = document.getElementById('signup-facebook');

function setStatus(text, isError = false) {
    if (!statusMessage) {
        return;
    }
    statusMessage.textContent = text;
    statusMessage.classList.toggle('error', isError);
}

function validateEmail(email) {
    return email.includes('@');
}

function validatePassword(password) {
    return typeof password === 'string' && password.length >= 6;
}

function loginHandler(event) {
    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();

    if (!validateEmail(email)) {
        setStatus('Email phải có ký tự @', true);
        return;
    }

    if (!validatePassword(password)) {
        setStatus('Password cần tối thiểu 6 ký tự', true);
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            handleLoginSuccess(userCredential.user.email);
        })
        .catch(error => {
            setStatus(error.message, true);
        });
}

function signupHandler(event) {
    event.preventDefault();

    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();
    const confirmPassword = signupConfirmPassword.value.trim();

    if (!validateEmail(email)) {
        setStatus('Email phải có ký tự @', true);
        return;
    }

    if (!validatePassword(password)) {
        setStatus('Password cần tối thiểu 6 ký tự', true);
        return;
    }

    if (password !== confirmPassword) {
        setStatus('Password và Confirm password phải giống nhau', true);
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            handleLoginSuccess(userCredential.user.email);
        })
        .catch(error => {
            setStatus(error.message, true);
        });
}

function loginWithProvider(provider) {
    auth.signInWithPopup(provider)
        .then(result => {
            handleLoginSuccess(result.user.email);
        })
        .catch(error => {
            setStatus(error.message, true);
        });
}

if (loginForm) {
    loginForm.addEventListener('submit', loginHandler);
}

if (signupForm) {
    signupForm.addEventListener('submit', signupHandler);
}

if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        auth.signOut()
            .then(() => {
                setStatus('Bạn đã đăng xuất.');
                logoutButton.classList.add('hidden');
                // Chuyển hướng đến trang login sau 1 giây
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
            })
            .catch(error => {
                setStatus(error.message, true);
            });
    });
}

if (loginGoogleButton) {
    loginGoogleButton.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        loginWithProvider(provider);
    });
}

if (signupGoogleButton) {
    signupGoogleButton.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        loginWithProvider(provider);
    });
}

if (loginFacebookButton) {
    loginFacebookButton.addEventListener('click', () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        loginWithProvider(provider);
    });
}

if (signupFacebookButton) {
    signupFacebookButton.addEventListener('click', () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        loginWithProvider(provider);
    });
}

// Hàm kiểm tra trang hiện tại
function getCurrentPageType() {
    const currentUrl = window.location.pathname;
    if (currentUrl.includes('login.html')) return 'login';
    if (currentUrl.includes('signup.html')) return 'signup';
    if (currentUrl.includes('index.html') || currentUrl.endsWith('/')) return 'index';
    return 'other';
}

// Xử lý đăng nhập thành công
function handleLoginSuccess(userEmail) {
    setStatus(`Đăng nhập thành công: ${userEmail}`);
    if (logoutButton) logoutButton.classList.remove('hidden');
    
    // Cập nhật thông tin trên trang index.html nếu có
    const navbarEmail = document.getElementById('navbar-email');
    const welcomeEmail = document.getElementById('welcome-email');
    if (navbarEmail) navbarEmail.textContent = userEmail;
    if (welcomeEmail) welcomeEmail.textContent = 'Email: ' + userEmail;
    
    // Chuyển hướng đến trang chính sau 1 giây
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

auth.onAuthStateChanged(user => {
    const currentPage = getCurrentPageType();
    
    if (user) {
        const userEmail = user.email;
        
        // Nếu đang ở trang login hoặc signup, chuyển hướng đến index
        if (currentPage === 'login' || currentPage === 'signup') {
            setStatus(`Bạn đã đăng nhập: ${userEmail}`);
            if (logoutButton) logoutButton.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500);
        } else if (currentPage === 'index') {
            // Cập nhật thông tin người dùng trên trang index
            const navbarEmail = document.getElementById('navbar-email');
            const welcomeEmail = document.getElementById('welcome-email');
            if (navbarEmail) navbarEmail.textContent = userEmail;
            if (welcomeEmail) welcomeEmail.textContent = 'Email: ' + userEmail;
            if (logoutButton) logoutButton.classList.remove('hidden');
        } else {
            setStatus(`Người dùng hiện tại: ${userEmail}`);
            if (logoutButton) logoutButton.classList.remove('hidden');
        }
    } else {
        // Nếu không đăng nhập
        if (currentPage === 'index') {
            // Nếu ở trang index mà chưa đăng nhập, chuyển hướng đến login
            window.location.href = 'login.html';
        } else {
            setStatus('Bạn chưa đăng nhập.');
            if (logoutButton) logoutButton.classList.add('hidden');
        }
    }
});
