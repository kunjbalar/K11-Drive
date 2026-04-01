"use client"


import { ChevronRight } from "lucide-react"
import { FileRow ,FolderRow } from "./file-row";
import type { File, Folder  } from "@prisma/client";
import Link from "next/link";
import { SignedIn,SignInButton,SignedOut,UserButton } from "@clerk/nextjs";
import { UploadButton } from "@/components/uploadthing";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
 
export default function DriveContents(props: {
  files: File[];
  folders: Folder[];
  parents:Folder[];
  currentFolderId:number;
}) {
  
const navigation = useRouter();

  const posthog = usePostHog();
  
  return (
    <div className="min-h-screen bg-gray-900 px-4 py-6 text-gray-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 flex-1 items-center overflow-x-auto pb-1">

            <Link
              href="/f/13"
              className="mr-2 shrink-0 text-gray-300 hover:text-white"
            >
              My Drive
            </Link>

           {props.parents.map((folder) => (
              <div key={folder.id} className="flex shrink-0 items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`${folder.id}`}
                  className="truncate text-gray-300 hover:text-white"
                >
                  {folder.name}           
                </Link>
              </div>
            ))}
            
      </div>
          <div className="self-end sm:self-auto">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg bg-gray-800 shadow-xl">
          <div className="hidden border-b border-gray-700 px-6 py-4 sm:block">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-400">
              <div className="col-span-6">Name</div>
              <div className="col-span-3">Type</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-1"></div>
            </div>
          </div>
        <ul>
          {props.folders.map((folder)=>(
               <FolderRow key={folder.id} folder={folder} ></FolderRow>
            ))}
            {props.files.map((file) => (
              <FileRow key={file.id} file={file} ></FileRow>
            ))}
         </ul>
        </div>
        <div className="mt-6 flex justify-stretch sm:justify-end">
          <UploadButton endpoint="driveUploader" 
        onBeforeUploadBegin={(files) => {
            posthog.capture("files_uploading", {
              fileCount: files.length,
            });

            return files;
          }}
        onClientUploadComplete={()=>{navigation.refresh();}}  
        input={{folderId:props.currentFolderId}}
          />
        </div>
      </div>
    </div>
  )
}

