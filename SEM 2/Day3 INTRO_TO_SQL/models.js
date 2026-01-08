import {Client}  from "pg";

const client = new Client({
    connectionString: "postgresql://neondb_owner:npg_gexACwsrh4o2@ep-polished-fog-adbzsatz-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
})
client.connect();

