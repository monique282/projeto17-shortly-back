/* conectando o pg */
import pg from "pg";
import dotenv from "dotenv";

// configurando o banco
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
};

export const db = new Pool(configDatabase);
