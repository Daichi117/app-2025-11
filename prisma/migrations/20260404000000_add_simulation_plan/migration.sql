-- CreateTable
CREATE TABLE "simulation_plans" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "target_amount" DOUBLE PRECISION NOT NULL,
    "monthly_contribution" DOUBLE PRECISION NOT NULL,
    "years" INTEGER NOT NULL,
    "annual_return" DOUBLE PRECISION NOT NULL,
    "last_mode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "simulation_plans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "simulation_plans_user_id_key" ON "simulation_plans"("user_id");

-- CreateIndex
CREATE INDEX "simulation_plans_user_id_idx" ON "simulation_plans"("user_id");

-- AddForeignKey
ALTER TABLE "simulation_plans" ADD CONSTRAINT "simulation_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
