interface NameOfSubjects {
  mathematics: Subject;
  biology: Subject;
  geography: Subject;
  chemistry: Subject;
}

interface Subject {
  students: number;
  teachers: number;
}

const subjects = {
  mathematics: {
    students: 200,
    teachers: 6
  },
  biology: {
    students: 120,
    teachers: 6
  },
  geography: {
    students: 60,
    teachers: 2
  },
  chemistry: {
    students: 100,
    teachers: 3
  }
};

//1.

function getSubjectNamesString(subjects: NameOfSubjects): string {
  return Object.keys(subjects).join(', ');
}

console.log(getSubjectNamesString(subjects));

//2.

function getTotalNumberOfPeople(subjects: NameOfSubjects): number {
  return Object.values(subjects).reduce(
    (acc, { students, teachers }) => acc + students + teachers,
    0
  );
}

console.log(getTotalNumberOfPeople(subjects));

//3.

function getAverageNumberOfStudents(subjects: NameOfSubjects): number {
  const totalNumberOfStudents: number = Object.values(subjects).reduce(
    (acc, { students }) => acc + students,
    0
  );

  return totalNumberOfStudents / Object.keys(subjects).length;
}

console.log(getAverageNumberOfStudents(subjects));

//4.

function getArrayOfSubjects(
  subjects: NameOfSubjects
): Array<[string, Subject]> {
  return Object.entries(subjects);
}

console.log(getArrayOfSubjects(subjects));

//5.

function sorSubjectsByTeachers(): Array<[string, Subject]> {
  return getArrayOfSubjects(subjects).sort(
    (subjectA, subjectB) => subjectB[1].teachers - subjectA[1].teachers
  );
}

console.log(sorSubjectsByTeachers());
