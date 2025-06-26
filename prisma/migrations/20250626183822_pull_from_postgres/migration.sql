-- CreateTable
CREATE TABLE "awards_catalog" (
    "award" VARCHAR(30) NOT NULL,

    CONSTRAINT "awards_catalog_pkey" PRIMARY KEY ("award")
);

-- CreateTable
CREATE TABLE "characters" (
    "id" SERIAL NOT NULL,
    "character" VARCHAR(100) NOT NULL,
    "participation_id" INTEGER NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "countries" (
    "country" CHAR(2) NOT NULL,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "countries_pkey" PRIMARY KEY ("country","picture_id")
);

-- CreateTable
CREATE TABLE "countries_catalog" (
    "country" CHAR(2) NOT NULL,
    "name" VARCHAR(80) NOT NULL,

    CONSTRAINT "countries_catalog_pkey" PRIMARY KEY ("country")
);

-- CreateTable
CREATE TABLE "favorite_genres" (
    "genre" CHAR(30) NOT NULL,
    "user_id" UUID NOT NULL,

    CONSTRAINT "pk_favorite_genres" PRIMARY KEY ("genre","user_id")
);

-- CreateTable
CREATE TABLE "favorite_persons" (
    "user_id" UUID NOT NULL,
    "person_id" INTEGER NOT NULL,

    CONSTRAINT "pk_favorite_persons" PRIMARY KEY ("user_id","person_id")
);

-- CreateTable
CREATE TABLE "featured" (
    "user_id" UUID NOT NULL,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "pk_featured" PRIMARY KEY ("user_id","picture_id")
);

-- CreateTable
CREATE TABLE "genres" (
    "genre" VARCHAR(30) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("genre")
);

-- CreateTable
CREATE TABLE "genres_list" (
    "genre" CHAR(30) NOT NULL,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "pk_genres_list" PRIMARY KEY ("genre","picture_id")
);

-- CreateTable
CREATE TABLE "grades" (
    "user_id" UUID NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "value" DECIMAL(3,1) NOT NULL,
    "rating_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pk_grades" PRIMARY KEY ("user_id","picture_id")
);

-- CreateTable
CREATE TABLE "participations" (
    "id" SERIAL NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "person_id" INTEGER NOT NULL,
    "role" VARCHAR(30) NOT NULL,

    CONSTRAINT "participations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "person_roles_catalog" (
    "role" VARCHAR(30) NOT NULL,

    CONSTRAINT "person_roles_catalog_pkey" PRIMARY KEY ("role")
);

-- CreateTable
CREATE TABLE "persons" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "second_name" VARCHAR(100) NOT NULL,
    "description" VARCHAR(500),
    "photo_url" VARCHAR(300),
    "birthdate" DATE NOT NULL,
    "death_date" DATE,
    "country" CHAR(2) NOT NULL,
    "town" VARCHAR(100) NOT NULL,
    "height" INTEGER NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "persons_awards" (
    "person_id" INTEGER NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "award" VARCHAR(30) NOT NULL,
    "award_presentation_date" DATE NOT NULL,
    "description" VARCHAR(200) NOT NULL,
    "id" SERIAL NOT NULL,

    CONSTRAINT "persons_awards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "picture_types" (
    "type" VARCHAR(30) NOT NULL,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "picture_types_pkey" PRIMARY KEY ("type","picture_id")
);

-- CreateTable
CREATE TABLE "picture_types_catalog" (
    "type" VARCHAR(30) NOT NULL,

    CONSTRAINT "picture_types_catalog_pkey" PRIMARY KEY ("type")
);

-- CreateTable
CREATE TABLE "pictures" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "original_name" VARCHAR(100) NOT NULL,
    "release_date" DATE NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "duration" INTEGER,
    "start_timestamp" INTEGER,
    "end_timestamp" INTEGER,
    "post_credits_scene_timestamp" INTEGER,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pictures_archive" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "original_name" VARCHAR(100) NOT NULL,
    "release_date" DATE NOT NULL,
    "description" VARCHAR(500) NOT NULL,
    "duration" INTEGER,
    "start_timestamp" INTEGER,
    "end_timestamp" INTEGER,
    "post_credits_scene_timestamp" INTEGER,
    "operation_type" TEXT NOT NULL,
    "deleted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_by" TEXT DEFAULT CURRENT_USER,

    CONSTRAINT "pk_pictures_archive" PRIMARY KEY ("id","deleted_at")
);

-- CreateTable
CREATE TABLE "posters" (
    "poster" VARCHAR(300) NOT NULL,
    "picture_id" INTEGER NOT NULL,

    CONSTRAINT "posters_pkey" PRIMARY KEY ("picture_id","poster")
);

-- CreateTable
CREATE TABLE "rating_origins_catalog" (
    "origin" VARCHAR(30) NOT NULL,

    CONSTRAINT "rating_origins_catalog_pkey" PRIMARY KEY ("origin")
);

-- CreateTable
CREATE TABLE "ratings" (
    "origin" VARCHAR(30) NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "value" DECIMAL(3,1) NOT NULL,

    CONSTRAINT "pk_ratings" PRIMARY KEY ("picture_id","origin")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" SERIAL NOT NULL,
    "user_id" UUID NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "review_date" DATE NOT NULL DEFAULT CURRENT_DATE,
    "grade" DECIMAL(3,1) NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "settings" (
    "user_id" UUID NOT NULL,
    "theme" CHAR(1) NOT NULL DEFAULT 'S',
    "video_quality" VARCHAR(10) NOT NULL DEFAULT '1080p',
    "data_saving" BOOLEAN NOT NULL DEFAULT true,
    "auto_skip_credits" BOOLEAN NOT NULL DEFAULT false,
    "auto_rotate_screen" BOOLEAN NOT NULL DEFAULT true,
    "vibration" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "users_archive" (
    "id" CHAR(36) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "birthdate" DATE NOT NULL,
    "operation_type" TEXT NOT NULL,
    "deleted_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_by" TEXT DEFAULT CURRENT_USER,

    CONSTRAINT "pk_users_archive" PRIMARY KEY ("id","deleted_at")
);

-- CreateTable
CREATE TABLE "users_roles" (
    "user_id" UUID NOT NULL,
    "role" VARCHAR(30) NOT NULL DEFAULT 'USER',

    CONSTRAINT "users_roles_pkey" PRIMARY KEY ("role","user_id")
);

-- CreateTable
CREATE TABLE "users_roles_catalog" (
    "role" VARCHAR(30) NOT NULL,

    CONSTRAINT "users_roles_catalog_pkey" PRIMARY KEY ("role")
);

-- CreateTable
CREATE TABLE "video_quality_catalog" (
    "quality" VARCHAR(10) NOT NULL,

    CONSTRAINT "video_quality_catalog_pkey" PRIMARY KEY ("quality")
);

-- CreateTable
CREATE TABLE "watch_history" (
    "user_id" UUID NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "watch_date" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp" INTEGER NOT NULL,
    "watch_count" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "pk_watch_history" PRIMARY KEY ("user_id","picture_id")
);

-- CreateTable
CREATE TABLE "watch_history_archive" (
    "archive_id" SERIAL NOT NULL,
    "user_id" CHAR(36) NOT NULL,
    "picture_id" INTEGER NOT NULL,
    "watch_date" TIMESTAMP(6) NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "watch_count" INTEGER NOT NULL,
    "operation_type" VARCHAR(10) NOT NULL,
    "changed_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "changed_by" TEXT DEFAULT CURRENT_USER,

    CONSTRAINT "watch_history_archive_pkey" PRIMARY KEY ("archive_id")
);

-- CreateIndex
CREATE INDEX "idx_countries_country" ON "countries"("country");

-- CreateIndex
CREATE INDEX "idx_participations_person_id" ON "participations"("person_id");

-- CreateIndex
CREATE INDEX "idx_participations_picture_id" ON "participations"("picture_id");

-- CreateIndex
CREATE INDEX "idx_picture_types_type" ON "picture_types"("type");

-- CreateIndex
CREATE INDEX "idx_pictures_release_date" ON "pictures"("release_date");

-- CreateIndex
CREATE INDEX "idx_ratings_picture_origin" ON "ratings"("picture_id", "origin");

-- CreateIndex
CREATE INDEX "idx_ratings_value" ON "ratings"("value");

-- CreateIndex
CREATE INDEX "idx_reviews_review_date" ON "reviews"("review_date");

-- CreateIndex
CREATE INDEX "idx_watch_history_picture" ON "watch_history"("picture_id");

-- CreateIndex
CREATE INDEX "idx_watch_history_user" ON "watch_history"("user_id");

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "fk_participation_id" FOREIGN KEY ("participation_id") REFERENCES "participations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "fk_country" FOREIGN KEY ("country") REFERENCES "countries_catalog"("country") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "countries" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorite_genres" ADD CONSTRAINT "fk_genre" FOREIGN KEY ("genre") REFERENCES "genres"("genre") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorite_genres" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorite_persons" ADD CONSTRAINT "fk_person_id" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "favorite_persons" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "featured" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "featured" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "genres_list" ADD CONSTRAINT "fk_genre" FOREIGN KEY ("genre") REFERENCES "genres"("genre") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "genres_list" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grades" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "fk_person_id" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participations" ADD CONSTRAINT "fk_role" FOREIGN KEY ("role") REFERENCES "person_roles_catalog"("role") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "persons" ADD CONSTRAINT "fk_country" FOREIGN KEY ("country") REFERENCES "countries_catalog"("country") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "persons_awards" ADD CONSTRAINT "fk_award" FOREIGN KEY ("award") REFERENCES "awards_catalog"("award") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "persons_awards" ADD CONSTRAINT "fk_person_id" FOREIGN KEY ("person_id") REFERENCES "persons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "persons_awards" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "picture_types" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "picture_types" ADD CONSTRAINT "fk_type" FOREIGN KEY ("type") REFERENCES "picture_types_catalog"("type") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "posters" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ratings" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "settings" ADD CONSTRAINT "fk_video_quality" FOREIGN KEY ("video_quality") REFERENCES "video_quality_catalog"("quality") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "fk_role" FOREIGN KEY ("role") REFERENCES "users_roles_catalog"("role") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_roles" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "watch_history" ADD CONSTRAINT "fk_picture_id" FOREIGN KEY ("picture_id") REFERENCES "pictures"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "watch_history" ADD CONSTRAINT "fk_user_id" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
