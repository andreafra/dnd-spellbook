CREATE TABLE "User" (
    id UUID PRIMARY KEY,
    name STRING
);

CREATE TABLE "Spellbook" (
    id UUID PRIMARY KEY,
    title STRING,
    owner_id UUID REFERENCES "User"("id") ON DELETE CASCADE,
    last_updated TIMESTAMP DEFAULT now(),
    spells JSONB
);
