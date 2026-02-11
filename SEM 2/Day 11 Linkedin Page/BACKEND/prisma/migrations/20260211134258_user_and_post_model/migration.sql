-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "subheading" TEXT,
    "phone" INTEGER,
    "coverpic" TEXT,
    "ppic" TEXT,
    "Location" TEXT,
    "About" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "userpic" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "owner_desc" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "contentimg" TEXT,
    "contentvdo" TEXT,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
