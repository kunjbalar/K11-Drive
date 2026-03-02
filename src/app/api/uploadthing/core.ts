import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { MUTATIONS, QUERIES } from "@/server/queries";
import { z } from "zod";



const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  driveUploader: f({
    blob: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "1GB",
      maxFileCount: 999,
    },
  }).input(
    z.object({
      folderId:z.number(),
    }),
  )
    // Set permissions and file types for this FileRoute
    .middleware(async ({input}) => {
      // This code runs on your server before upload
      const user = await auth();

      // If you throw, the user will not be able to upload
      if (!user.userId) throw new Error("Unauthorized");

      const folder = await QUERIES.getFolderById(input.folderId);

      if(!folder) throw new Error("Folder is not found");

      if(folder.ownerId !== user.userId){
        throw new Error("Unauthorized");
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.userId ,parentId:input.folderId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
       
        await MUTATIONS.createFile({
          file: {
            name: file.name,
            size: file.size,
            url: file.url, // If your console says this is undefined, use file.ufsUrl here!
            parentId: metadata.parentId, 
            userId:metadata.userId
          },
        });
        

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
