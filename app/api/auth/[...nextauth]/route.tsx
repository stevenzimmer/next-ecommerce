
import NextAuth from "next-auth";
import {prisma} from "@/lib/prisma";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {stripe} from "@/util/stripe"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],

  events: {
    createUser: async({user}) => {
      // const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY!, {
      //   apiVersion: "2022-11-15"
      // });
      
      // Create customer
      if(user.name && user.email) {

        const customer  = await stripe.customers.create({
          email: user.email,
          name: user.name
        });

        // Upddate prisma user with stripe ID
        await prisma.user.update({
          where: {
            id: user.id
          },
          data: {
            stripeCustomerId: customer.id
          }
        })
      }
    }
  },
  callbacks: {
    async session({session, token, user}) {
      session.user = user;
      return session;
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };