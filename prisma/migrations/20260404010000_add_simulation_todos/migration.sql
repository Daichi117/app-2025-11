-- CreateTable
CREATE TABLE "simulation_todos" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT,
    "kind" TEXT NOT NULL,
    "note" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "simulation_todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "simulation_todos_user_id_completed_idx" ON "simulation_todos"("user_id", "completed");

-- CreateIndex
CREATE INDEX "simulation_todos_user_id_kind_idx" ON "simulation_todos"("user_id", "kind");

-- AddForeignKey
ALTER TABLE "simulation_todos" ADD CONSTRAINT "simulation_todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
