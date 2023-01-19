-- CreateTable
CREATE TABLE "Spellbook" (
    "id" UUID NOT NULL,
    "title" STRING NOT NULL,
    "last_updated" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "spell_ids" STRING[],
    "owner_id" UUID NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "name" STRING NOT NULL,

    CONSTRAINT "primary" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Spellbook" ADD CONSTRAINT "Spellbook_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
