"use server";

import { cookies } from "next/headers";
// import { MyUser } from "./myUserModel";
// import { JwtHeader, JwtPayload, verify } from "jsonwebtoken";
// import { SigningKey } from "oidc-client-ts";

// import { JwksClient } from "jwks-rsa";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { MyUser } from "./myUserModel";

// const client = new JwksClient({
//   jwksUri:
//     "https://auth.snowse.duckdns.org/realms/advanced-frontend/protocol/openid-connect/certs",
// });

// // Function to asynchronously get the signing key
// const getKey = async (header: JwtHeader): Promise<string> => {
//   return new Promise((resolve, reject) => {
//     client.getSigningKey(header.kid!, (err, key) => {
//       if (err) {
//         return reject(err);
//       }
//       const signingKey = key?.getPublicKey();
//       resolve(signingKey ?? "");
//     });
//   });
// };

// // Verify the token asynchronously
// const verifyToken = async (token: string) => {
//   console.log("verifying");
//   try {
//     const decoded = await new Promise<JwtPayload | string>(
//       (resolve, reject) => {
//         verify(
//           token,
//           async (header, callback) => {
//             try {
//               const key = await getKey(header);
//               callback(null, key);
//             } catch (err: any) {
//               callback(err);
//             }
//           },
//           {
//             audience: "alex-in-class", // Replace with your audience (client ID)
//             issuer: "https://auth.snowse.duckdns.org/realms/advanced-frontend",
//             algorithms: ["RS256"],
//           },
//           (err, decoded) => {
//             if (err) {
//               reject(err);
//             } else {
//               resolve(decoded!);
//             }
//           }
//         );
//       }
//     );

//     console.log("Decoded token:", decoded);
//     return decoded;
//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return null;
//   }
// };
// // other library? https://github.com/auth0/node-jsonwebtoken
// export async function getUserFromCookie() {
//   const cookieStore = cookies();
//   // console.log(cookieStore);
//   const authToken = cookieStore.get("jwt");
//   // console.log("jwtcookie", authToken?.value);

//   const parsedToken = authToken ? await verifyToken(authToken?.value ?? "") : undefined;
//   console.log("token", parsedToken);
//   return parsedToken;
// }

const JWKS = createRemoteJWKSet(
  new URL(
    "https://auth.snowse.duckdns.org/realms/advanced-frontend/protocol/openid-connect/certs"
  )
);

// jose https://github.com/panva/jose/
export async function getUserFromCookie() {
  const cookieStore = cookies();
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
