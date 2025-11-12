import { betterAuth } from "better-auth";
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from "./db";
import * as schema from './db/schema'

export const auth = betterAuth({
  appName : "Next.js 15 blog",
  secret : process.env.BETTER_AUTH_SECRET || 'BETTER_AUTH_SECRET',
  baseURL : process.env.BASE_URL,
  database : drizzleAdapter(db,{
    provider : 'pg',
    schema : {
        ...schema,
        user : schema.users,
        session : schema.sessions,
        account : schema.accounts,
    }
  }),
  
  emailAndPassword : {
    enabled: true,
    requireEmailVerification: false,
    minPasswordLength: 6,
	  maxPasswordLength: 128,
    autoSignIn: true,
  },

  session: {
    expiresIn: 604800,
    updateAge: 86400,
    cookieCache: {
		enabled: true, // Enable caching session in cookie (default: `false`)	
		maxAge: 300 // 5 minutes
	}
  },

  disableSessionRefresh: true,
  advanced : {
    useSecureCookies : process.env.NODE_ENV === 'production',
    defaultCookieAttributes : {
        httpOnly : true,
        secure : process.env.NODE_ENV === 'production',
    }
  }

});