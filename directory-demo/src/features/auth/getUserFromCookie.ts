"use server";

import { cookies } from "next/headers";
import { MyUser } from "./myUserModel";
import { JwtHeader, JwtPayload, verify } from "jsonwebtoken";
import { SigningKey } from "oidc-client-ts";

import { JwksClient } from "jwks-rsa";

const client = new JwksClient({
  jwksUri:
    "https://auth.snowse.duckdns.org/realms/advanced-frontend/protocol/openid-connect/certs",
});

// Function to asynchronously get the signing key
const getKey = async (header: JwtHeader): Promise<string> => {
  return new Promise((resolve, reject) => {
    client.getSigningKey(header.kid!, (err, key) => {
      if (err) {
        return reject(err);
      }
      const signingKey = key?.getPublicKey();
      resolve(signingKey ?? "");
    });
  });
};

// Verify the token asynchronously
const verifyToken = async (token: string) => {
  try {
    const decoded = await new Promise<JwtPayload | string>(
      (resolve, reject) => {
        verify(
          token,
          async (header, callback) => {
            try {
              const key = await getKey(header);
              callback(null, key);
            } catch (err: any) {
              callback(err);
            }
          },
          {
            audience: "your-client-id", // Replace with your audience (client ID)
            issuer: "https://auth.snowse.duckdns.org/realms/advanced-frontend",
            algorithms: ["RS256"],
          },
          (err, decoded) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded!);
            }
          }
        );
      }
    );

    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
};
// other library? https://github.com/auth0/node-jsonwebtoken
export async function getUserFromCookie() {
  const cookieStore = cookies();
  // console.log(cookieStore);
  const authToken = cookieStore.get("jwt");
  // console.log(authToken?.value);

  const parsedToken = authToken ? verifyToken(authToken?.value ?? "") : undefined;
  console.log("token", parsedToken);
  return parsedToken;
}
