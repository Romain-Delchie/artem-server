BEGIN;

DROP TABLE IF EXISTS "quotation_has_product";
DROP TABLE IF EXISTS "product";
DROP TABLE IF EXISTS "range";
DROP TABLE IF EXISTS "quotation";
DROP TABLE IF EXISTS "delivery";
DROP TABLE IF EXISTS "account";
DROP TABLE IF EXISTS "profile";

CREATE TABLE "profile" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "discount" NUMERIC(10, 2) NOT NULL
);

CREATE TABLE "account" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" TEXT NOT NULL UNIQUE,
  "company" TEXT NOT NULL,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "phone_number" TEXT,
  "password" TEXT NOT NULL,
  "invoice_address" TEXT NOT NULL,
  "role" TEXT NOT NULL DEFAULT 'user' CHECK ("role" IN ('user', 'admin')),
  "profile_id" INT NOT NULL DEFAULT 1 REFERENCES "profile"("id") ON DELETE CASCADE
);

CREATE TABLE "delivery" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "delivery_address" TEXT NOT NULL,
  "account_id" INT NOT NULL REFERENCES "account"("id") ON DELETE CASCADE
);

CREATE TABLE "quotation" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "creation_date" DATE NOT NULL DEFAULT CURRENT_DATE,
  "expiration_date" DATE,
  "shipment" BOOLEAN,
  "reference" TEXT,
  "account_id" INT NOT NULL REFERENCES "account"("id") ON DELETE CASCADE
);

CREATE TABLE "range" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "image_link" TEXT NOT NULL
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
  "weight" NUMERIC(10, 2) NOT NULL,
  "delivery_time" TEXT NOT NULL,
  "stock" BOOLEAN NOT NULL,
  "range_id" INT NOT NULL REFERENCES "range"("id") ON DELETE CASCADE
);

CREATE TABLE "quotation_has_product" (
  "quotation_id" INT REFERENCES "quotation"("id") ON DELETE CASCADE,
  "product_id" INT REFERENCES "product"("id") ON DELETE CASCADE,
  "reference" TEXT,
  PRIMARY KEY("quotation_id", "product_id"),
  "quantity" NUMERIC(10, 2) NOT NULL
);

-- Création de la fonction déclenchée pour calculer la valeur par défaut de "expiration_date"
CREATE OR REPLACE FUNCTION set_default_expiration_date()
  RETURNS TRIGGER AS $$
BEGIN
  NEW.expiration_date := NEW.creation_date + INTERVAL '2 months';
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Création du déclencheur (trigger) pour appeler la fonction déclenchée lors de l'insertion
CREATE TRIGGER set_expiration_date_trigger
  BEFORE INSERT ON "quotation"
  FOR EACH ROW
  EXECUTE FUNCTION set_default_expiration_date();


COMMIT;