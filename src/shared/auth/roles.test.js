import * as Roles from './roles';

beforeAll(() => {
  Roles.available({
    teacher: {
      students: ['GET', 'POST', 'PUT'],
      classroom: ['*'],
    },
  });
});

test('Invalid role', () => {
  expect(() => {
    Roles.verify('student');
  }).toThrow(/Unknown role.*/);
});

test('Invalid resource', () => {
  expect(() => {
    Roles.verify('teacher', 'users');
  }).toThrow(/Unknown resource.*/);
});

test('Invalid method', () => {
  expect(() => {
    Roles.verify('teacher', 'students', 'OPTION');
  }).toThrow(/Invalid method.*/);
});

test('Unavailable method', () => {
  expect(() => {
    Roles.verify('teacher', 'students', 'DELETE');
  }).toThrow(/Unavailable method.*/);
});

test('Verified role', () => {
  expect(() => {
    Roles.verify('teacher', 'students', 'GET');
  }).not.toThrow();
});

test('Verified role', () => {
  expect(() => {
    Roles.verify('teacher', 'classroom', 'GET');
  }).not.toThrow();
});
