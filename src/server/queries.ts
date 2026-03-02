import "server-only";

import { db } from "~/server/db";
import type { Folder } from "generated/prisma";
import type { StringMappingType } from "typescript";


export const QUERIES = {

    // Prisma Style: Fetch files WHERE parentId matches the URL
    getFiles: function (folderId: number) {
        return db.file.findMany({
            where: {
                parentId: folderId,
            },
        });
    },

    // Prisma Style: Fetch folders WHERE parentId matches the URL
    getFolders: function (folderId: number) {
        return db.folder.findMany({
            where: {
                parentId: folderId,
            },
        });
    },


    getAllParents: async function (folderId: number) {
        const parents: Folder[] = [];
        let currentId: number | null = folderId;

        while (currentId !== null) {
            const folder: Folder | null = await db.folder.findUnique({
                where: {
                    id: currentId
                },
            });

            // Prisma returns the object directly, not an array, so no need for [0]
            if (!folder) {
                throw new Error("Parent folder not found");
            }

            // Add the folder to the beginning of the array
            parents.unshift(folder);
            console.log(parents);
            // Prisma Style: Use 'parentId' instead of 'parent' because of your schema mapping
            currentId = folder.parentId;
        }
        return parents;
    },

    getFolderById: async function (folderId: number) {
    const folder = await db.folder.findUnique({
      where: {
        id: folderId,
      },
    });
    return folder; // Prisma returns null if not found, no need for folder[0]
  },

  getRootFolderForUser: async function (userId: string) {
    const folder = await db.folder.findFirst({
      where: {
        ownerId: userId,
        parentId: null, // Prisma natively understands `null` for "is empty"
      },
    });
    
    return folder; 
  },

}

export const MUTATIONS= {
 createFile: async function (input:{
    file:{
        name:string;
        size:number;
        url:string;
        parentId:number;
        userId: string;
    };
    
 }){
    return await db.file.create({
    data: {
    name: input.file.name,
    size: input.file.size,
    url: input.file.url,
    parentId:input.file.parentId, 
    ownerId:input.file.userId
  },
});
 },
 
 onboardUser: async function (userId: string) {
    // 1. PRISMA: Create the root folder and immediately get the returned object
    const rootFolder = await db.folder.create({
      data: {
        name: "Root",
        parentId: null, // Remember, your schema uses parentId, not parent!
        ownerId: userId,
      },
    });

    // No need to extract from an array, Prisma gives you the object directly
    const rootFolderId = rootFolder.id;

    // 2. PRISMA: Batch insert all the default subfolders at once
    await db.folder.createMany({
      data: [
        {
          name: "Trash",
          parentId: rootFolderId,
          ownerId: userId,
        },
        {
          name: "Shared",
          parentId: rootFolderId,
          ownerId: userId,
        },
        {
          name: "Documents",
          parentId: rootFolderId,
          ownerId: userId,
        },
      ],
    });

    return rootFolderId;
  },

}

