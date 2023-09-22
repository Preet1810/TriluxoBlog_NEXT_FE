'use client'
import { useState, useEffect } from "react";
import "./globals.css";
import { AuthContextProvider, UserAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from 'next/navigation';
import Navbar from "@/components/Navbar";
import { auth } from "@/fireBase";
export default function RootLayout({ children }) {
  const [user, setUser]=useState(null);

  const pathname=usePathname(); // Get the current pathname
  const isLoginPage=pathname==="/login"||pathname==="/signup"; // Update the condition

  return (
    <html lang="en">
      <body style={{ margin: "0px", padding: "0px" }}>

        <AuthContextProvider>
          {!isLoginPage&&<Navbar />}
          {children}
        </AuthContextProvider>
      </body>
    </html>
  )
}
