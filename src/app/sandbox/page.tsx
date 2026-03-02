import { auth } from "@clerk/nextjs/server";
import { mockFolder } from "@/lib/mock-data"; // Make sure this path matches your mock-data file!
import { db } from "@/server/db";

export default async function Sandbox() {
  const user = await auth();
  if (!user.userId) {
    throw new Error("User not found");
  }

  // PRISMA: Fetch folders owned by the logged-in user
  const folders = await db.folder.findMany({
    where: {
      ownerId: user.userId,
    },
  });

  console.log("Current folders:", folders);

  return (
    <div className="p-8">
      <form
        action={async () => {
          "use server";
          const user = await auth();
          if (!user.userId) {
            throw new Error("User not found");
          }

          // 1. PRISMA: Create the "root" folder for this specific user
          const rootFolder = await db.folder.create({
            data: {
              name: "root",
              ownerId: user.userId,
              parentId: null,
            },
          });

          // 2. Map the mock folders to include the new root folder's ID and the owner ID
          const insertableFolders = mockFolder.map((folder) => ({
            name: folder.name,
            ownerId: user.userId,
            parentId: rootFolder.id, // Using the ID of the root folder we just created
          }));

          // 3. PRISMA: Insert all the sub-folders at once
          await db.folder.createMany({
            data: insertableFolders,
          });
          
          console.log("Seeding successful for user:", user.userId);
        }}
      >
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Seed My Folders
        </button>
      </form>
    </div>
  );
}