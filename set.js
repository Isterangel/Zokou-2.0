const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUNDVHhxVW1IbUxIeXIyTEpBaGlDazBsQmtkakRxR1REOTNuQ3RKZ1lGOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZy8yTTZwKzI5UUYrMWwycTFNZ2x2S0dEMXRha1FsbFM1TVN5cVZiOG9DST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxTkxyNVNXcy8yRXRrN2JzN3NjVi9zazZCT3VOTjNSOXpvL29vL2NkTDA0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqUW43TEZvODVDU1ZsaFh1ZHYxRVNSRVYxY01QdFc0NjZmOHk4RmNjNzBBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktMWmlWdlhSYVlodTBucmZ5cFNHeWxERHVZb0gxMHZZNnRRcG5uc04vSEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJtL1V5ZitscHpocGhzSlRVRVR6d1VBNEQ2NXd0SHpLODBJQzI4R1Z2bWc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0UyZ1JRTFNRQ2QxRVExSTZLdlZuVVQ3Q1c0d0VnZTliSGZseVc2dDYzUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicjZCczUraUIrVkFpbTFiR3BnSldPT2VMTGRpdVZlcFIxMG0wZEwydm93OD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFydlFBZ0RQOTBhUk5URm9Gc1BTRFVBVFVMRWFNdEl0TFQzeFBMMVNuOWNtdEtkOXQwTHkrSFR4dEY2cjBxQTIzazVZUkJHQTJBWmZHWitCOHVXVGlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjUwLCJhZHZTZWNyZXRLZXkiOiJBMmwwQVR1WTVGM2loa0VKZE9oaXF0Z0l1SnZHcDhQR1RrSmlBS3pZVDFVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjEsImFjY291bnRTeW5jQ291bnRlciI6MCwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiOV9ucHBPZ21TdEMtUi16N0h2cVpMZyIsInBob25lSWQiOiIxMzQ3YTc1MC0wNTdmLTQxYjgtYTY0Yy1iYzA0NDgxMjBhODEiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZitoUWdUMjJjczZtejhNcjJkZzdiclpDYnJRPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im1HUnNDM3RYd29vVjZ0N05oQlA3dllCOExWMD0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJYNEhFNU04NyIsIm1lIjp7ImlkIjoiMjIzOTk1MDE2ODA6MzFAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiSc2mzKXwk4qI8JKGnPCdkIjwnZCS8J2Qk/CdkITwnZCR8JKGnPCdkIvwnZCE8J2QjvCdkI3wnZCI8J2Qg/CdkIDwnZCSIPCTiokifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ozRTJ1Z0VFTy84a0xrR0dCY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InU5U2dDcWdVRmRSNkdUaTk0c1hZYzV2RkduWjJQVjZCajI1Qi9LVUlvbHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkJQN1NTTy9pNWNtMjJ2eVBRNWw3UU1zTERzS1pDWVU1S2hSeG9vS3RQV0FtOU9UV2M0dElTQVc3MHVuc0lEd01MTlNWYUJCaVI1TGNxUDV3bGdOY0FRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ4Ti9NVElOcmFkQngremRrbkZhdVhLQU5qTjJNbEpuRXpESzVBZGlmc3VHc1hIV05KOGxrM1QyQWoyM3drWTQ5TVhuS1JaYzcvNVU1aXFLV2JVdUlodz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIyMzk5NTAxNjgwOjMxQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmJ2VW9BcW9GQlhVZWhrNHZlTEYySE9ieFJwMmRqMWVnWTl1UWZ5bENLSmMifX1dLCJwbGF0Zm9ybSI6InNtYmEifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,'🤍'
    NOM_OWNER: process.env.NOM_OWNER || "ISTER LÉONIDAS",
    NUMERO_OWNER : process.env.NUMERO_OWNER, '22399501680'             
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
