import dotenv from 'dotenv';
const envName=process.env.ENV ||'qa';
dotenv.config({ path: `./env/.env.${envName}` });