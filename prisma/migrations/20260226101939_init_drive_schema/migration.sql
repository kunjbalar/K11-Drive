-- CreateTable
CREATE TABLE "drive-tutorial_files_table" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "parent" INTEGER NOT NULL,

    CONSTRAINT "drive-tutorial_files_table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drive-tutorial_folders_table" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "parent" INTEGER,

    CONSTRAINT "drive-tutorial_folders_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "file_parent_index" ON "drive-tutorial_files_table"("parent");

-- CreateIndex
CREATE INDEX "folder_parent_index" ON "drive-tutorial_folders_table"("parent");

-- AddForeignKey
ALTER TABLE "drive-tutorial_files_table" ADD CONSTRAINT "drive-tutorial_files_table_parent_fkey" FOREIGN KEY ("parent") REFERENCES "drive-tutorial_folders_table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "drive-tutorial_folders_table" ADD CONSTRAINT "drive-tutorial_folders_table_parent_fkey" FOREIGN KEY ("parent") REFERENCES "drive-tutorial_folders_table"("id") ON DELETE SET NULL ON UPDATE CASCADE;
