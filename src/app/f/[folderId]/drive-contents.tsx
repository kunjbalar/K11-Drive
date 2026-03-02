"use client"


import { Upload, ChevronRight } from "lucide-react"
import { FileRow ,FolderRow } from "./file-row";
import type { File, Folder  } from "generated/prisma";
import Link from "next/link";
import { SignedIn,SignInButton,SignedOut,UserButton } from "@clerk/nextjs";
import { UploadButton } from "~/components/uploadthing";
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
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">

            <Link
              href="/f/13"
              className="text-gray-300 hover:text-white mr-2"
            >
              My Drive
            </Link>

           {props.parents.map((folder, index) => (
              <div key={folder.id} className="flex items-center">
                <ChevronRight className="mx-2 text-gray-500" size={16} />
                <Link
                  href={`${folder.id}`}
                  className="text-gray-300 hover:text-white"
                >
                  {folder.name}           
                </Link>
              </div>
            ))}
            
      </div>
           <div>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg shadow-xl">
          <div className="px-6 py-4 border-b border-gray-700">
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
  )
}

