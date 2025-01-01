"use client";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import React from "react";

const ProfilePage = () => {
  return (
    <Button onClick={() => signOut({ callbackUrl: "/login" })}>logut</Button>
  );
};

export default ProfilePage;
