
export default class User{
    _id!:string;
    first_name!:string;
    last_name!:string;
    email!:string;
    phone!:string;

}

export class UsersPagination {
  users!: User[];
  totalUsers!: number;
  totalPages!: number;
  currentPage!: number;
  pageLimit!: number;
}
