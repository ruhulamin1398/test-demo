export enum RoleEnum {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

export interface IPhoneNumber {
  countryCode: string;
  number: string;
}

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: IPhoneNumber;
  createdAt?: Date;
  role: RoleEnum;
  isActive: boolean;
}

export interface PaginationInput {
  page: number;
  limit: number;
}

export interface UserFilterInput {
  isActive?: boolean;
  username?: string;
  role?: string;
}

export interface UsersResponse {
  users: IUser[];
  totalCount: number;
}

// Mongoose extends Document when adding MongoDB-specific properties

export interface IUserDocument extends IUser, Document {}
