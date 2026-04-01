import { Folder as FolderIcon, FileIcon } from "lucide-react"
import type{ File,Folder } from "@prisma/client";
import Link from "next/link";
import { DeleteFileButton } from "./delete-file-button";

export function FileRow(props:{file:File}){ 
const {file} = props;
return (<li key={file.id} className="border-b border-gray-700 px-4 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4">
                  <div className="min-w-0 sm:col-span-6">
                      <a href={file.url} className="flex items-center gap-3 text-gray-100 hover:text-blue-400" target="_blank" rel="noreferrer">
                        <FileIcon className="shrink-0" size={20} />
                        <span className="truncate">{file.name}</span>
                      </a>
                  </div>
                  <div className="flex items-center justify-between text-sm sm:col-span-3 sm:block sm:text-base">
                    <span className="text-gray-500 sm:hidden">Type</span>
                    <span className="text-gray-400">File</span>
                  </div>
                  <div className="flex items-center justify-between text-sm sm:col-span-2 sm:block sm:text-base">
                    <span className="text-gray-500 sm:hidden">Size</span>
                    <span className="text-gray-400">{file.size}</span>
                  </div>
                  <div className="flex justify-end sm:col-span-1">
                    <DeleteFileButton fileId={file.id} />
                  </div>
                </div>
              </li>
   )
}

export function FolderRow(props:{folder:Folder}){ 
    const {folder} =props;

return (<li key={folder.id} className="border-b border-gray-700 px-4 py-4 sm:px-6">
                <div className="flex flex-col gap-3 sm:grid sm:grid-cols-12 sm:items-center sm:gap-4">
                  <div className="min-w-0 sm:col-span-6">
                    
                      <Link
                        href={`/f/${folder.id}`}
                        className="flex items-center gap-3 text-gray-100 hover:text-blue-400"
                      >
                        <FolderIcon className="shrink-0" size={20} />
                        <span className="truncate">{folder.name}</span>
                      </Link>
                
                  </div>
                  <div className="flex items-center justify-between text-sm sm:col-span-3 sm:block sm:text-base">
                    <span className="text-gray-500 sm:hidden">Type</span>
                    <span className="text-gray-400">Folder</span>
                  </div>
                  <div className="hidden sm:block sm:col-span-2"></div>
                  <div className="hidden sm:block sm:col-span-1"></div>
                </div>
              </li>
)
}
