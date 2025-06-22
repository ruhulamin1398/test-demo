export enum RoleEnum {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

export enum GenderEnum {
  MALE = "Male",
  FEMALE = "Female",
  NA = "N/A",
}

export enum AuthProviderEnum {
  CUSTOM = "custom",
  GOOGLE = "google",
  FACEBOOK = "facebook",
}

export interface IPhoneNumber {
  countryCode: string;
  number: string;
}

export interface IUser {
  id: string;
  name: string;
  email?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: IPhoneNumber;
  authProvider: AuthProviderEnum;
  socialId?: string; // Stores the social media ID (Google, Facebook, Instagram)
  profilePicture?: string;
  createdAt?: Date;
  role: RoleEnum;
  isActive: boolean;
  updatedAt: Date;
  country?: string; // Optional country
  gender?: GenderEnum;
  state?: string; // Optional state
  city?: string; // Optional city
  address?: string; // Optional address
  zipCode?: string; // Optional zip code
  elrollIds: string[]; // Array of competition IDs the user is enrolled in
}

export interface PaginationInput {
  page: number;
  limit: number;
}

export interface UserFilterInput {
  isActive?: boolean;
  name?: string;
  role?: string;
}

export interface UsersResponse {
  users: IUser[];
  totalCount: number;
}

// Mongoose extends Document when adding MongoDB-specific properties

export interface IUserDocument extends IUser, Document {}
