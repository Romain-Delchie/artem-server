BEGIN;

CREATE TABLE "profile" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "discount" NUMERIC(10, 2) NOT NULL
);

CREATE TABLE "user" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "company" TEXT NOT NULL,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "phone_number" TEXT,
  "password" TEXT NOT NULL,
  "invoice_address" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'user' CHECK ("role" IN ('user', 'admin'))
  "profile_id" INT NOT NULL REFERENCES "profile"("id") ON DELETE CASCADE
);

CREATE TABLE "delivery" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "delivery_address" TEXT NOT NULL,
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "quotation" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "creation_date" DATE NOT NULL DEFAULT CURRENT_DATE,
  "expiration_date" DATE NOT NULL DEFAULT DATEADD(MONTH, 2, "creation_date")
  "user_id" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

CREATE TABLE "range" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image_link" TEXT NOT NULL,
);

CREATE TABLE "product" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "reference" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "designation" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image_link" TEXT NOT NULL,
  "brand" TEXT NOT NULL,
  "price" NUMERIC(10, 2) NOT NULL,
  "unit" NUMERIC(10, 2) NOT NULL,
  "delivery_time" TEXT NOT NULL,
  "stock" BOOLEAN NOT NULL,
  "range_id" INT NOT NULL REFERENCES "range"("id") ON DELETE CASCADE


);

CREATE TABLE "quotation_has_product" (
  "quotation_id" INT REFERENCES "quotation"("id") ON DELETE CASCADE,
  "product_id" INT REFERENCES "product"("id") ON DELETE CASCADE,
  PRIMARY KEY("quotation_id", "product_id"),
  "quantity" NUMERIC(10, 2) NOT NULL,
);


COMMIT;