"use server";

import { cookies } from "next/headers";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { MyUser } from "./myUserModel";

const JWKS = createRemoteJWKSet(
  new URL(
    "https://auth.snowse.duckdns.org/realms/advanced-frontend/protocol/openid-connect/certs"
  )
);

// jose https://github.com/panva/jose/
export async function getUserFromCookie() {
  const cookieStore = await cookies();
  // console.log(cookieStore);
  const authToken = cookieStore.get("jwt");
  // console.log("jwtcookie", authToken?.value);

  if (!authToken?.value) return undefined;

  const { payload, protectedHeader } = await jwtVerify(
    authToken?.value ?? "",
    JWKS,
    {
      issuer: "https://auth.snowse.duckdns.org/realms/advanced-frontend",
      audience: "alex-in-class",
    }
  );
  
  const user: MyUser = {
    exp: payload.exp ?? -1,
    name: payload.name?.toString() ?? "",
    preferred_username: payload.preferred_username?.toString() ?? "",
    given_name: payload.given_name?.toString() ?? "",
    family_name: payload.family_name?.toString() ?? "",
    email: payload.email?.toString() ?? "",
    sub: payload.sub ?? "",
  };
  return user;
}
