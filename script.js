function listOfTasksToDo() {
  let taskChoice;

  while (taskChoice !== 12) {
    taskChoice = +prompt(
      "Please choose a task's number to do:\n1- Add studentData.\n2- Update studentData.\n3- Remove a student.\n4- Add lessonData.\n5- Update lessons for students.\n6- Delete a lesson.\n7- Calculate a student's Average.\n8- Sort Students by Average.\n9- Get a list of probationStudents.\n10- Calculate all students' average.\n11- Remove a lesson from lessonData\n12- Exit."
    );

    switch (taskChoice) {
      case 1:
        studentData.push(getStudentData());
        console.log(studentData);
        break;

      case 2:
        updateStudentInfo();
        break;

      case 3:
        removeStudent();
        break;

      case 4:
        let continueAddingLessons = true;

        while (continueAddingLessons) {
          let lesson = createLessonScoreList();
          lessonData.push(lesson);

          console.log(
            `Lesson "${lesson.lessonName}" added successfully to lessonData.`
          );

          continueAddingLessons = confirm("Do you want to add another lesson?");
        }

        console.log(lessonData);
        break;

      case 5:
        updateStudentLessonScore();
        break;

      case 6:
        deleteScore();
        break;

      case 7:
        let average = calculateStudentAverage();

        console.log(`The average of student is ${average}.`);
        break;

      case 8:
        let sortedStudentList = sortedStudentByAverage(studentData);

        console.log(sortedStudentList);
        break;

      case 9:
        console.log("Probation students:", probationStudentsList(studentData));
        break;

      case 10:
        console.log(
          "All students' averages:",
          calculateAllStudentAverage(studentData)
        );
        break;

      case 11:
        removeLesson();
        break;

      case 12:
        alert("Exiting the program.");
        break;

      default:
        alert("Invalid Choice. Try Again!");
    }
  }
}

//1-1
let studentListTemplate = {
  firstName: "",
  lastName: "",
  fatherName: "",
  nationalCode: 0,
  dateOfBirth: "",
  cityOfBirth: "",
  age: 0,
  educationalBase: "",
  homePhoneNumber: "",
  parentsPhoneNumber: "",
  fatherJob: "",
  motherJob: "",
  address: "",

  lessons: [],
};

function getStudentData() {
  let student = { ...studentListTemplate };

  while (true) {
    student.nationalCode = +prompt("Enter student's nationalCode:");

    let currentStudent = studentData.find(
      (newStudent) => newStudent.nationalCode === student.nationalCode
    );

    if (currentStudent) {
      alert("This national code is already registered.");
    } else {
      break;
    }
  }

  student.firstName = prompt("Enter student's firstName:");
  student.lastName = prompt("Enter student's lastName:");
  student.fatherName = prompt("Enter student's fatherName:");
  student.dateOfBirth = prompt("Enter student's dateOfBirth:");
  student.cityOfBirth = prompt("Enter student's cityOfBirth:");
  student.age = +prompt("Enter student's age:");
  student.educationalBase = prompt("Enter student's educationalBase:");
  student.homePhoneNumber = prompt("Enter student's homePhoneNumber:");
  student.parentsPhoneNumber = prompt("Enter student's parentsPhoneNumber:");
  student.fatherJob = prompt("Enter student's fatherJob:");
  student.motherJob = prompt("Enter student's motherJob:");
  student.address = prompt("Enter student's address:");

  student.lessons = [];

  return student;
}

let studentData = [];
let lessonData = [];

//1-2
function updateStudentInfo() {
  let student;
  while (!student) {
    let studentNationalCode = +prompt(
      "Enter the student's nationalCode to update:"
    );

    student = studentData.find(
      (student) => student.nationalCode === studentNationalCode
    );

    if (!student) {
      alert("No student Found with this nationalCode");
    }
  }

  let property = prompt("which property do you want to update?");

  let propertyValue = prompt("Enter new value.");

  student[property] = propertyValue;

  console.log("Updated student data:", student);
}

//1-3
function removeStudent() {
  let studentNationalCode;
  let student;

  while (!student) {
    studentNationalCode = +prompt(
      "Enter the student's nationalCode to remove:"
    );

    student = studentData.find(
      (student) => student.nationalCode === studentNationalCode
    );

    if (!student) {
      alert("No student Found with this nationalCode");
    }
  }

  let index = studentData.findIndex(
    (student) => student.nationalCode === studentNationalCode
  );

  if (index !== -1) {
    studentData.splice(index, 1);
    console.log(`Student with nationalCode ${studentNationalCode} removed.`);
  }
}

//1-4
let lessonsScoreListTemplate = {
  lessonName: "",
  lessonCoefficient: 0,
  lessonScore: 0,
};

function createLessonScoreList() {
  let lessonScoreList = { ...lessonsScoreListTemplate };

  lessonScoreList.lessonName = prompt("Enter lessonName:");
  lessonScoreList.lessonCoefficient = +prompt("Enter lessonCoefficient:");

  return lessonScoreList;
}

//1-5

function updateStudentLessonScore() {
  let studentNationalCode = +prompt("Enter the student's nationalCode:");

  let student = studentData.find(
    (student) => student.nationalCode === studentNationalCode
  );

  if (!student) {
    alert("No student found with this nationalCode.");
    return;
  }

  let continueUpdatingLessons = true;

  while (continueUpdatingLessons) {
    let lessonName = prompt("Enter the lessonName that you want to update:");

    let lessonInLessonData = lessonData.find(
      (lesson) => lesson.lessonName === lessonName
    );

    if (!lessonInLessonData) {
      alert(`Lesson "${lessonName}" does not exist in the lessonData.`);
    } else {
      let lesson = student.lessons.find(
        (course) => course.lessonName === lessonName
      );

      if (!lesson) {
        let addNewLesson = confirm(
          `The lesson "${lessonName}" is not in the student's records. Do you want to add it?`
        );

        if (addNewLesson) {
          lesson = {
            lessonName: lessonName,
            lessonCoefficient: lessonInLessonData.lessonCoefficient,
            lessonScore: 0,
          };
          student.lessons.push(lesson);
        } else {
          continueUpdatingLessons = confirm(
            "Do you want to update another lesson for this student?"
          );
          continue;
        }
      }

      lesson.lessonScore = +prompt(
        `Enter the new score for the lesson "${lessonName}":`
      );

      console.log(
        `Updated the score of "${lessonName}" for student with national code ${student.nationalCode}.`
      );
    }

    continueUpdatingLessons = confirm(
      "Do you want to update another lesson for this student?"
    );
  }
}

//1-6
function deleteScore() {
  let studentNationalCode;
  let student;

  while (!student) {
    studentNationalCode = +prompt("Enter the student's nationalCode:");

    student = studentData.find(
      (student) => student.nationalCode === studentNationalCode
    );

    if (!student) {
      alert("No student found with this nationalCode.");
    }
  }

  let deletedLessonName = prompt("Enter the lessonName for Remove");

  let deletedLessonIndex = student.lessons.findIndex(
    (lesson) => lesson.lessonName === deletedLessonName
  );

  if (deletedLessonIndex !== -1) {
    student.lessons.splice(deletedLessonIndex, 1);

    console.log(
      `Lesson "${deletedLessonName}" removed from student with national code ${student.nationalCode}.`
    );
  } else {
    alert(
      `Lesson '${deletedLessonName}' not found for studentNationalCode ${studentNationalCode}`
    );
  }
}

//1-7
function calculateStudentAverage() {
  let studentNationalCode;
  let student;

  while (!student) {
    studentNationalCode = +prompt("Enter the student's nationalCode:");

    student = studentData.find(
      (student) => student.nationalCode === studentNationalCode
    );

    if (!student) {
      alert("No student found with this nationalCode.");
    }
  }

  let sumOfStudentScore = student.lessons.reduce(
    (acc, currentLesson) =>
      acc + currentLesson.lessonScore * currentLesson.lessonCoefficient,
    0
  );

  let totalCoefficients = student.lessons.reduce(
    (acc, currentLesson) => acc + currentLesson.lessonCoefficient,
    0
  );

  return totalCoefficients === 0 ? 0 : sumOfStudentScore / totalCoefficients;
}

//1-8
function sortedStudentByAverage(studentData) {
  let listOfStudents = studentData.map((student) => {
    return { ...student, average: calculateStudentAverage(student) };
  });

  let sortedStudentList = listOfStudents.sort((a, b) => b.average - a.average);

  return sortedStudentList;

  function calculateStudentAverage(student) {
    let sumOfStudentScore = student.lessons.reduce(
      (acc, currentLesson) =>
        acc + currentLesson.lessonScore * currentLesson.lessonCoefficient,
      0
    );

    let totalCoefficients = student.lessons.reduce(
      (acc, currentLesson) => acc + currentLesson.lessonCoefficient,
      0
    );

    return totalCoefficients === 0 ? 0 : sumOfStudentScore / totalCoefficients;
  }
}

//1-9
function probationStudentsList(studentData) {
  let probationStudents = [];

  studentData.forEach((student) => {
    let studentAverages = calculateStudentAverages(student);

    let lowScoreLessons = student.lessons
      .filter((lesson) => lesson.lessonScore < 10)
      .map((lesson) => lesson.lessonName);

    if (studentAverages < 12 || lowScoreLessons.length > 0) {
      probationStudents.push({
        nationalCode: student.nationalCode,
        average: studentAverages,
        lowScoreLessons: lowScoreLessons,
      });
    }
  });

  return probationStudents;
}

function calculateStudentAverages(student) {
  let studentScoreSum = student.lessons.reduce(
    (acc, currentLesson) =>
      acc + currentLesson.lessonScore * currentLesson.lessonCoefficient,
    0
  );

  let CoefficientsSum = student.lessons.reduce(
    (acc, currentLesson) => acc + currentLesson.lessonCoefficient,
    0
  );

  return CoefficientsSum === 0 ? 0 : studentScoreSum / CoefficientsSum;
}

//1-10
function calculateAllStudentAverage(studentData) {
  let allStudents = [];

  studentData.forEach((student) => {
    let studentScoreSums = student.lessons.reduce(
      (acc, currentLesson) =>
        acc + currentLesson.lessonScore * currentLesson.lessonCoefficient,
      0
    );

    let CoefficientSum = student.lessons.reduce(
      (acc, currentLesson) => acc + currentLesson.lessonCoefficient,
      0
    );

    let averageOfStudents = studentScoreSums / CoefficientSum;

    allStudents.push({
      student: student.nationalCode,
      average: averageOfStudents,
    });

    // return averageOfStudents;
  });

  return allStudents;
}

//1-11
function removeLesson() {
  let deletedLessonName;
  let lesson;

  while (!lesson) {
    deletedLessonName = prompt("Enter the lessonName to remove:");

    lesson = lessonData.find(
      (lesson) => lesson.lessonName === deletedLessonName
    );

    if (!lesson) {
      alert("No lesson Found with this name");
    }
  }

  let index = lessonData.findIndex(
    (lesson) => lesson.lessonName === deletedLessonName
  );

  if (index !== -1) {
    lessonData.splice(index, 1);
    console.log(`lesson "${deletedLessonName}" removed from lessonData.`);
  }
}

listOfTasksToDo();
