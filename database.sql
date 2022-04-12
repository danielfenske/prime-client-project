-- Database Name = r_f_metals
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR(80) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "access_level" INT NOT NULL,
    "disabled" BOOLEAN NOT NULL
);
-- INSERT INTO "user" ("username", "password", "first_name", "last_name", "access_level", "disabled")
-- VALUES('mark', 'passoword', 'mark', 'terry', 1, 'false');

CREATE TABLE "contact" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "phone" VARCHAR(80),
    "work_phone" VARCHAR(80),
    "email" VARCHAR(80),
    "diasbled" BOOLEAN NOT NULL
);
-- INSERT INTO "contact" ("name", "phone", "work_phone", "email", "disabled")
-- VALUES('mark', '6515555555', '6515555555', 'fake@gmail.com', 'false');

CREATE TABLE "partner" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "type" VARCHAR(100),
    "partner_code" VARCHAR(80),
    "partner_discount" DECIMAL (5, 2),
    "rounding_type" INT,
    "phone_number" INT,
    "address_line_1" VARCHAR(250),
    "city" VARCHAR(80),
    "state" VARCHAR(2),
    "zip" INT,
    "disabled" BOOLEAN NOT NULL
);
-- INSERT INTO "partner" ("name", "type", "partner_code", "partner_discount", "rounding_type", "disabled")
-- VALUES('Brookshire Construction', 'builder', 'BRK', '5.23', '3', false );


CREATE TABLE "opportunity" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80) NOT NULL,
    "opportunity_code" INT NOT NULL,
    "status" INT,
    "user_id" INT REFERENCES "user",
    "contact_id" INT REFERENCES "contact",
    "partner_id" INT REFERENCES "partner",
    "due_date" TIMESTAMPTZ,
    "type" VARCHAR(80),
    "community_name" VARCHAR(250),
    "development_type" VARCHAR(80),
    "address_line_1" VARCHAR(250),
    "city" VARCHAR(80),
    "state" VARCHAR(2),
    "zip" INT,
    "tax_rate" DECIMAL(5, 2),
    "disabled" BOOLEAN NOT NULL
);
-- INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
-- VALUES('housing development', 1, 1, 3, 1, 1, '2004-10-19 10:23:54+02', 'building', 'palm springs', 'building', '123 main street', 'saint paul', 'MN', 55119, 7.25, false);


CREATE TABLE "proposal" (
    "id" SERIAL PRIMARY KEY,
    "date" TIMESTAMPZ,
    "proposal_code" VARCHAR(80),
    "opportunity_id" INT REFERENCES "opportunity",
    "house_type" VARCHAR(80),
    "plan_identifier" VARCHAR(80),
    "plan_date" TIMESTAMPTZ,
    "building_code" VARCHAR(80),
    "partner_discount" DECIMAL (5, 2),
    "surcharge" DECIMAL (5, 2),
    "surcharge_description" VARCHAR(250),
    "method" INT,
    "method_message" VARCHAR(250),
    "delivery_charge" DECIMAL (5, 2),
    "field_weld_charge" DECIMAL (5, 2),
    "field_weld_message" VARCHAR(250),
    "description" VARCHAR(250),
    "disabled" BOOLEAN NOT NULL
);
-- INSERT INTO "proposal" ("date", "proposal_code", "opportunity_id", "house_type", "plan_identifier", "plan_date", "building_code", "partner_discount", "surcharge", "surcharge_description", "method", "method_message", "delivery_charge", "field_weld_charge", "field_weld_message", "description", "disabled")
-- VALUES('2004-10-19 10:23:54+02', 'BRK', 1, 'Rambler', 'yayay', '2004-10-19 10:23:54+02', 'sdfsdfs', 3.33, 13.33, '2022 up-charge', 3, 'method message', 333.13, 23.13, 'Welded railing together', 'small house', false);




