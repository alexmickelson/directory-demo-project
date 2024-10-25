import type { Metadata } from "next";
import "./globals.css";
import MyAuthProvider from "@/features/auth/MyAuthProvider";
import Header from "./header";
import { getUserFromCookie } from "@/features/auth/getUserFromCookie";
import { MyQueryProvider } from "./MyQueryProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserFromCookie();
  console.log("rendering root layout", user);

  return (
    <html lang="en">
      <body>
        <MyQueryProvider>
          <MyAuthProvider>
            <Header user={user} />
            {children}
          </MyAuthProvider>
        </MyQueryProvider>
      </body>
    </html>
  );
}
