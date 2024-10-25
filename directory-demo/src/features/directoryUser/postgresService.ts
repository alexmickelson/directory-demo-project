import { Pool } from "pg";
import { AttributeStatus, DirectoryUser } from "./directoryUser";

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT ?? "5432"),
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

export const postgresService = {
  createUser: async ({
    first_name,
    last_name,
    phone,
    email,
    first_name_status,
    last_name_status,
    phone_status,
    email_status,
  }: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    first_name_status: AttributeStatus;
    last_name_status: AttributeStatus;
    phone_status: AttributeStatus;
    email_status: AttributeStatus;
  }) => {
    await pool.query(
      `insert into directory_user
        (first_name, last_name, phone, email, first_name_status, last_name_status, phone_status, email_status) 
      values
        ($1, $2, $3, $4, $5, $6, $7, $8)
      `,
      [
        first_name,
        last_name,
        phone,
        email,
        first_name_status,
        last_name_status,
        phone_status,
        email_status,
      ]
    );
  },
  getAllUsers: async () => {
    const res = await pool.query<DirectoryUser>(`
      select 
        id,
        first_name,
        last_name,
        phone,
        email,
        first_name_status,
        last_name_status,
        phone_status,
        email_status
      from directory_user
    `);
    return res.rows;
  },
};
