// const user = [{
//     name: "John",
//     age: 30,
//     email: "john@example.com"
// }]
// // thêm vào localStorage
// localStorage.setItem('user', JSON.stringify(user))
// // xóa khỏi localStorage
// localStorage.removeItem('user')
// // lấy từ localStorage
// var userList = JSON.parse(localStorage.getItem('user'))
// console.log(userList);

const form = document.querySelector('form');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const confirmPassword = document.querySelector('#confirm-password');
const name = document.querySelector('#name');

if (localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}

function checkEmailExists(users, email) {
    for (let user of users) {
        if (user.email === email) {
            return true;
        }
        return false;
    }
}

function findUser(users, email, password) {
    for (let user of users) {
        if (user.email === email && user.password === password) {
            return user;
        }
        return null;
    }
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem('users')) || [];

    let existed = checkEmailExists(users, email.value);
    if (!existed) {
        alert('Email does not exist. Please register first.');
        return;
    }

    let user = findUser(users, email.value, password.value);
    if (uesr === null) {
        alert('Incorrect password. Please try again.');
        return;
    }

    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful!');
    window.location.href = 'index.html';
});
