// eslint-disable-next-line no-shadow
// export enum UserGender {
//   M = 'M',
//   F = 'F',
//   NULL = '',
// }

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  gender: 'M' | 'F' | '';
}
