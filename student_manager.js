const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let students = [];

function showMenu() {
    console.log("\n--- Student List Manager ---");
    console.log("1. Add Student");
    console.log("2. Show All Students");
    console.log("3. Search Student");
    console.log("4. Delete Student");
    console.log("5. Edit Student");
    console.log("6. Sort & Filter (Pass/Fail)");
    console.log("7. Exit");
    
    rl.question("Choose an option (1-7): ", (choice) => {
        switch(choice) {
            case '1': addStudent(); break;
            case '2': showStudents(); break;
            case '3': searchStudent(); break;
            case '4': deleteStudent(); break;
            case '5': editStudent(); break;
            case '6': sortAndFilter(); break;
            case '7': 
                console.log("Exiting the program. Goodbye!");
                rl.close(); 
                break;
            default: 
                console.log("Invalid choice, try again.");
                showMenu();
        }
    });
}


function addStudent() {
    rl.question("Enter student name: ", (name) => {
        rl.question("Enter roll number: ", (roll) => {
            rl.question("Enter marks (0-100): ", (marks) => {
                // Object তৈরি করা (Extra: roll, marks)
                const newStudent = {
                    name: name,
                    roll: roll,
                    marks: parseInt(marks)
                };
                students.push(newStudent); 
                console.log(`✅ ${name} added successfully!`);
                showMenu();
            });
        });
    });
}

function showStudents() {
    if (students.length === 0) {
        console.log("No students in the list yet.");
    } else {
        console.log("\n--- Student List ---");
        students.forEach((student, index) => {
            console.log(`${index + 1}. Name: ${student.name}, Roll: ${student.roll}, Marks: ${student.marks}`);
        });
    }
    showMenu();
}

function searchStudent() {
    rl.question("Enter student name to search: ", (searchName) => {
        const found = students.filter(s => s.name.toLowerCase() === searchName.toLowerCase());
        
        if (found.length > 0) {
            console.log(`\nFound ${found.length} student(s):`);
            found.forEach(s => console.log(`Name: ${s.name}, Roll: ${s.roll}, Marks: ${s.marks}`));
        } else {
            console.log(`❌ No student found with name "${searchName}".`);
        }
        showMenu();
    });
}

function deleteStudent() {
    rl.question("Enter student name to delete: ", (delName) => {
        const initialLength = students.length;
        students = students.filter(s => s.name.toLowerCase() !== delName.toLowerCase());
        
        if (students.length < initialLength) {
            console.log(`🗑️ Student "${delName}" deleted successfully.`);
        } else {
            console.log(`❌ Student "${delName}" not found.`);
        }
        showMenu();
    });
}

function editStudent() {
    rl.question("Enter student name to edit: ", (editName) => {
        const student = students.find(s => s.name.toLowerCase() === editName.toLowerCase());
        
        if (student) {
            rl.question(`Enter new marks for ${student.name} (current: ${student.marks}): `, (newMarks) => {
                student.marks = parseInt(newMarks);
                console.log(`✏️ Marks updated for ${student.name}.`);
                showMenu();
            });
        } else {
            console.log(`❌ Student "${editName}" not found.`);
            showMenu();
        }
    });
}


function sortAndFilter() {
    if (students.length === 0) {
        console.log("No students to sort or filter.");
        return showMenu();
    }

    console.log("\n--- Sorted by Name ---");
    
    const sortedStudents = [...students].sort((a, b) => a.name.localeCompare(b.name));
    sortedStudents.forEach(s => console.log(`${s.name} (Marks: ${s.marks})`));

    console.log("\n--- Pass/Fail Filter (Pass >= 33) ---");
    const passed = students.filter(s => s.marks >= 33);
    const failed = students.filter(s => s.marks < 33);

    console.log(`Passed Students (${passed.length}):`);
    passed.forEach(s => console.log(`${s.name} - ${s.marks}`));
    
    console.log(`Failed Students (${failed.length}):`);
    failed.forEach(s => console.log(`${s.name} - ${s.marks}`));

    showMenu();
}

console.log("Welcome to Student Manager!");
showMenu();
