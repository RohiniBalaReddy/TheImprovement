import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      token: string;
      roles: {
        id: string;
        roleName: string;
      };
      [key: string]: any;
    };
    token?: string;
    error?: string;
  }

  interface User {
    id: number;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    token: string;
    roles: {
      id: string;
      roleName: string;
    };
    [key: string]: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      id: number;
      token: string;
      roles: {
        id: string;
        roleName: string;
      };
      [key: string]: any;
    };
    sub?: string;
  }
}
