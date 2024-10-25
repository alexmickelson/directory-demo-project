"use server";
import { postgresService } from "./postgresService";
import { AttributeStatus } from "./directoryUser";

export async function createUserAction(
  first_name: string,
  last_name: string,
  email: string
) {
  console.log("creating user");
  await postgresService.createUser({
    first_name,
    last_name,
    phone: "",
    email: email,
    first_name_status: AttributeStatus.WEB_VISIBLE,
    last_name_status: AttributeStatus.WEB_VISIBLE,
    phone_status: AttributeStatus.PRIVATE,
    email_status: AttributeStatus.PRIVATE,
  });
}
