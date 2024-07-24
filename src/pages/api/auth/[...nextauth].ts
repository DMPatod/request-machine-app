import { NextApiRequest, NextApiResponse } from "next";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "one",
      name: "one",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("authorize one");
        if (!credentials?.username && !credentials?.password) {
          return null;
        }
        return {
          id: "",
          email: "",
        };
      },
    }),
    CredentialsProvider({
      id: "two",
      name: "two",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("authorize two");
        if (!credentials?.username && !credentials?.password) {
          return null;
        }
        return {
          id: "",
          email: "",
        };
      },
    }),
  ],
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options);
};

export default handler;
