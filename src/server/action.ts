"use server";

import { db } from "./db"; // Ensure this points to your Prisma db instance
import { auth } from "@clerk/nextjs/server";
import { UTApi } from "uploadthing/server";
import { cookies } from "next/headers";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) {
    return { error: "Unauthorized" };
  }

  // 1. PRISMA: Find the file and verify the user actually owns it
  const file = await db.file.findFirst({
    where: {
      id: fileId,
      ownerId: session.userId,
    },
  });

  if (!file) {
    return { error: "File not found" };
  }

  // 2. Extract the file key for UploadThing
  // NOTE: If your database saved the new ufs.sh URL, replace the string accordingly!
  // A safer way to get the key regardless of the domain is splitting by "/f/"
  const fileKey:any = file.url.split("/f/")[1]; 
  
  const utapiResult = await utApi.deleteFiles([fileKey]);
  console.log("UploadThing Deletion:", utapiResult);

  // 3. PRISMA: Delete the file record from the database
  const dbDeleteResult = await db.file.delete({
    where: {
      id: fileId,
    },
  });

  console.log("Database Deletion:", dbDeleteResult);

  // 4. Force Next.js to refresh the UI
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  return { success: true };
}