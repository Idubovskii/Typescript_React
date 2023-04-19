type NameOfSubjects = 'mathematics' | 'biology' | 'geography' | 'chemistry';

type Lesson = {
  students: number;
  teachers: number;
};

const lessons = {
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

function getSubjectNamesString(subj: Record<NameOfSubjects, Lesson>): string {
  return Object.keys(subj).join(',');
}
console.warn(getSubjectNamesString(lessons));

//2.

function getTotalNumberOfStudents(
  subj: Record<NameOfSubjects, Lesson>
): number {
  return Object.values(subj).reduce(
    (accumulator, { students }) => accumulator + students,
    0
  );
}

function getTotalNumberOfTeachers(
  subj: Record<NameOfSubjects, Lesson>
): number {
  return Object.values(subj).reduce(
    (accumulator, { teachers }) => accumulator + teachers,
    0
  );
}

console.warn(
  getTotalNumberOfStudents(lessons) + getTotalNumberOfTeachers(lessons)
);

//3.

function getAverageNumberOfStudents(total: number, quantity: number): number {
  return total / quantity;
}

console.warn(
  getAverageNumberOfStudents(
    getTotalStudents(lessons),
    getSubjectNamesAsArray(lessons).length
  )
);

//4.

function getArrayOfLessonsName(
  lessons: Record<NameOfSubjects, Lesson>
): Array<[string, Lesson]> {
  return Object.entries(lessons);
}

console.warn(getArrayOfLessonsName(lessons));

//5.

function sorSubjectsByTeachers(): Array<[string, Lesson]> {
  return getArrayOfLessonsName(lessons).sort(
    (lessonA, lessonB) => lessonB[1].teachers - lessonA[1].teachers
  );
}

console.warn(sorSubjectsByTeachers());
