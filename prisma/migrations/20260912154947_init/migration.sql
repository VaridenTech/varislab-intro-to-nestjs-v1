-- CreateTable
CREATE TABLE "coffee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "recommendations" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "coffee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "payload" JSONB NOT NULL,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flavor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "flavor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CoffeeToFlavor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CoffeeToFlavor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "event_name_idx" ON "event"("name");

-- CreateIndex
CREATE INDEX "event_name_type_idx" ON "event"("name", "type");

-- CreateIndex
CREATE UNIQUE INDEX "flavor_name_key" ON "flavor"("name");

-- CreateIndex
CREATE INDEX "_CoffeeToFlavor_B_index" ON "_CoffeeToFlavor"("B");

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavor" ADD CONSTRAINT "_CoffeeToFlavor_A_fkey" FOREIGN KEY ("A") REFERENCES "coffee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CoffeeToFlavor" ADD CONSTRAINT "_CoffeeToFlavor_B_fkey" FOREIGN KEY ("B") REFERENCES "flavor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
