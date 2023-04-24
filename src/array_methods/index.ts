/**
 * Исходные данные
 **/

interface Users {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  age: number;
}

const users: Users[] = [
  {
    id: 7,
    email: 'michael.lawson@reqres.in',
    first_name: 'Michael',
    last_name: 'Lawson',
    avatar: 'https://reqres.in/img/faces/7-image.jpg',
    age: 23
  },
  {
    id: 8,
    email: 'lindsay.ferguson@reqres.in',
    first_name: 'Lindsay',
    last_name: 'Ferguson',
    avatar: 'https://reqres.in/img/faces/8-image.jpg',
    age: 20
  },
  {
    id: 9,
    email: 'tobias.funke@reqres.in',
    first_name: 'Tobias',
    last_name: 'Funke',
    avatar: 'https://reqres.in/img/faces/9-image.jpg',
    age: 40
  },
  {
    id: 10,
    email: 'byron.fields@reqres.in',
    first_name: 'Byron',
    last_name: 'Fields',
    avatar: 'https://reqres.in/img/faces/10-image.jpg',
    age: 36
  },
  {
    id: 11,
    email: 'george.edwards@reqres.in',
    first_name: 'George',
    last_name: 'Edwards',
    avatar: 'https://reqres.in/img/faces/11-image.jpg',
    age: 70
  },
  {
    id: 12,
    email: 'rachel.howell@reqres.in',
    first_name: 'Rachel',
    last_name: 'Howell',
    avatar: 'https://reqres.in/img/faces/12-image.jpg',
    age: 45
  }
];

/**
 * 1. Получить строку с именами и фамилиями всех
 * пользователей через запятую.
 **/
const getUserFullname = (user: Users) => `${user.first_name} ${user.last_name}`;
const mappedUsers: string[] = users.map(getUserFullname);
const fullnames: string = mappedUsers.join(', ');

console.warn(fullnames);

/**
 * 2. Создать массив из emails по алфавиту
 **/
type UsersEmail = string[];

const getUsersEmails = (user: Users) => user.email;
const emails: UsersEmail = users.map(getUsersEmails);
const sortedEmails: UsersEmail = emails.sort();

console.warn(sortedEmails);

/**
 * 3.Создать новый массив пользователей,где объект пользователя должен
 * содержать только id и поле, отвечающее за имя пользователя
 * (например, username), которое должно содержать имя и фамилию.
 **/
type UsersShortDetails = Pick<Users, 'id'> & { fullname: string };

const getUsersId = (user: Users) => user.id;
const shortDetails: UsersShortDetails[] = users.map((user: Users) => ({
  id: getUsersId(user),
  fullname: getUserFullname(user)
}));

console.warn(shortDetails);

/**
 * 4. Создать массив пользователей, где они отсортированы
 * по возрасту по возрастанию и все пользователи младше 40 лет.
 **/
const getUsersAge = (user: Users) => user.age;
const youngUsers: Users[] = users.filter(
  (user: Users) => getUsersAge(user) < 40
);
const sortedYoungUsers: Users[] = youngUsers.sort(
  (a: Users, b: Users) => a.age - b.age
);

console.warn(sortedYoungUsers);

/**
 * Получить объект, где были бы
 * a) данные о среднем возрасте пользователей
 * b) количество пользователей старше 30
 * c) количество пользователей старше 40
 * d) количество пользователей старше 18
 **/
interface Stats {
  gt30: number;
  gt40: number;
  gt18: number;
  avgAge: number;
}

const stats: Stats = users.reduce(
  (accumulator: Stats, user: Users, index: number) => {
    if (user.age > 40) {
      accumulator.gt40 += 1;
    }
    if (user.age > 30) {
      accumulator.gt30 += 1;
    }
    if (user.age > 18) {
      accumulator.gt18 += 1;
    }

    // Формула: https://habr.com/ru/company/ruvds/blog/458030/
    accumulator.avgAge = (user.age + accumulator.avgAge * index) / (index + 1);
    return accumulator;
  },
  {
    gt30: 0,
    gt40: 0,
    gt18: 0,
    avgAge: 0
  }
);

console.warn(stats);

/**
 * 6. Создать объект,где ключ,это первая буква фамилии,а значение -
 * массив из фамилий пользователей начинающихся на эту букву. Объект
 * должен состоять только из ключей существующих фамилий в этом массиве.
 **/
type AlphabetStats = {
  [Letter: string]: string[];
};

const getUsersFirstLatter = (lastname: string) => lastname.slice(0, 1);

const alphabetStats = (users: Users[]) => {
  return users.reduce((accumulator: AlphabetStats, user: Users) => {
    const firstLetter = getUsersFirstLatter(user.last_name);
    if (!accumulator[firstLetter]) {
      accumulator[firstLetter] = [];
    }
    accumulator[firstLetter].push(user.last_name);
    return accumulator;
  }, {});
};

const reduceAlphabetStats: AlphabetStats = alphabetStats(users);

console.warn(reduceAlphabetStats);

/**
 * Пример каррирования
 **/
const getUsersFilter = (age: number) => (user: Users) => user.age > age;

const isPensioner = getUsersFilter(63);
const isAdult = getUsersFilter(21);

const pensioneers: Users[] = users.filter(isPensioner);
const adults: Users[] = users.filter(isAdult);

console.warn(pensioneers);
console.warn(adults);
