CREATE TABLE "custom_categories" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "custom_categories_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "custom_categories_user_id_type_name_key" ON "custom_categories"("user_id", "type", "name");
CREATE INDEX "custom_categories_user_id_type_idx" ON "custom_categories"("user_id", "type");

ALTER TABLE "custom_categories" ADD CONSTRAINT "custom_categories_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
