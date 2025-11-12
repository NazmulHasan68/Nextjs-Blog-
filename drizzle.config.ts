import type {Config} from 'drizzle-kit'


export default {
    schema : './src/lib/db/schema.ts', // database schema ta kothay ase 
    out : './drizzle',
    dialect : 'postgresql', // konta use korte cai
    dbCredentials : {
        url : process.env.DATABASE_URL || '' // dataurl
    },
    verbose : true,
    strict : true,
} satisfies Config