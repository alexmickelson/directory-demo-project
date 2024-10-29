"use server";
import { revalidatePath } from "next/cache";

export async function revalidatePathAfterAuth() {
  console.log("revalidating");
  revalidatePath("/", "layout");
  revalidatePath("/", "page");
}
