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

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (password.value !== confirmPassword.value) {
        alert('Passwords do not match!');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    users.forEach(user => {
        if (user.email === email.value) {
            alert('Email already exists!');
            return;
        }
    });

    users.push({
        email: email.value,
        password: password.value,
        name: name.value
    });

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify({
        email: email.value,
        name: name.value
    }));

    alert('Registration successful!');
    window.location.href = 'index.html';
});
