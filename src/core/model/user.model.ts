export interface LoginPayload {
    username: string;
    password: string;
}

export interface SignupPayload {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    cPassword: string;
}

export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    emailVerified?: boolean;
    emailHash?: string;
    passwordLastUpdated?: any;
    lastLogin?: Date;
    phone?: any;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserAuth {
    name: string;
    accessToken: string;
    isSignedIn: boolean;
    isSignedUp: boolean;
    loading: boolean;
}
export interface Settings {
    open?: boolean;
    isDefaultTheme?: boolean;
    layout?: Record<string, any>;
    isReset?: boolean;
    isCollapsed?: boolean;
}
