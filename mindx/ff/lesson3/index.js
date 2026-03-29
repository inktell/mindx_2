// let arr = [1, 2, 3, 4, 5];

// for (let i = 0; i < arr.length; i++) {
//     console.log(arr[i]);
// }

// let arr2 = [1, 2, 3, 4];
// arr2.push(5,10);
// console.log(arr2);

// let arr3 = [1, 2, 3, 4, 5];
// arr3.splice(0, 1, "phan tu moi");
// console.log(arr3);

// const fruits = ["Banana", "Orange", "Apple", "Mango"];
// console.log(fruits.indexOf("Orange"));
// console.log(fruits.indexOf("Banana"));
// console.log(fruits.indexOf("Grapes"));

// let persons = {
//     name: "John",
//     age: 30,
//     job: "Developer",
// }
// console.log(persons.name);
// console.log(persons["age"]);

// for (let key in persons) {
//     console.log(key, persons[key]);
// }

// if ('age' in persons) {
//     console.log("Key 'age' exists in persons object");
// }
// if (persons.hasOwnProperty('job')) {
//     console.log("Key 'job' exists in persons object");
// }

// delete persons.job;
// console.log(persons);

///////// thuc hanh //////////
let students = [
    {
        name: "John",
        age: 20,
        class: "10A"
    },
    {
        name: "Jane",
        age: 21,
        class: "10B"
    },
    {
        name: "Jim",
        age: 22,
        class: "10C"
    }
]

students.push({
    name: "Kien",
    age: 23,
    class: "10D"
})

console.log(students);

students.forEach(student => {
    console.log(student.name, student.age, student.class);
});

for (let student of students) {
    console.log(student.name, student.age, student.class);
}

for (let i = 0; i < students.length; i++) {
    console.log(students[i].name, students[i].age, students[i].class);
}

students[1].name = "Jane Doe";

console.log(students);

students.splice(1, 1);

console.log(students);