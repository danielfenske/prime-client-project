-- Database Name = r_f_metals
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80),
    "password" VARCHAR (1000),
    "first_name" VARCHAR(80) ,
    "last_name" VARCHAR(100) ,
    "access_level" INT ,
    "disabled" BOOLEAN 
); -- will make almost all fields null/required later

 INSERT INTO "user" ("username", "password", "first_name", "last_name", "access_level", "disabled")
 VALUES('mark', 'passoword', 'mark', 'terry', 1, 'false');

CREATE TABLE "contact" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "phone" VARCHAR(80),
    "work_phone" VARCHAR(80),
    "email" VARCHAR(80),
    "disabled" BOOLEAN NOT NULL
);

DROP TABLE "contact";

 INSERT INTO "contact" ("name", "phone", "work_phone", "email", "disabled")
 VALUES('mark', '6515555555', '6515555555', 'fake@gmail.com', 'false');

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
 INSERT INTO "partner" ("name", "type", "partner_code", "partner_discount", "rounding_type", "disabled")
 VALUES('Brookshire Construction', 'builder', 'BRK', '5.23', '3', false );


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
 INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('housing development', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', 'building', 'palm springs', 'building', '123 main street', 'saint paul', 'MN', 55119, 7.25, false);


CREATE TABLE "proposal" (
    "id" SERIAL PRIMARY KEY,
    "date" TIMESTAMPTZ,
    "proposal_code" VARCHAR(80),
    "opportunity_id" INT REFERENCES "opportunity",
    "house_type" VARCHAR(80),
    "plan_identifier" VARCHAR(80),
    "plan_date" TIMESTAMPTZ,
    "building_code" VARCHAR(80),
    "partner_discount" DECIMAL (5, 2),
    "surcharge" DECIMAL (5, 2),
    "surcharge_description" VARCHAR(250),
    "method" INT, -- will be a dropdown, we will simply target the INT or id
    "method_message" VARCHAR(250),
    "delivery_charge" DECIMAL (5, 2),
    "field_weld_charge" DECIMAL (5, 2),
    "field_weld_message" VARCHAR(250),
    "description" VARCHAR(250),
    "disabled" BOOLEAN NOT NULL
);
 INSERT INTO "proposal" ("date", "proposal_code", "opportunity_id", "house_type", "plan_identifier", "plan_date", "building_code", "partner_discount", "surcharge", "surcharge_description", "method", "method_message", "delivery_charge", "field_weld_charge", "field_weld_message", "description", "disabled")
 VALUES('2004-10-19 10:23:54+02', 'BRK', 2, 'Rambler', 'yayay', '2004-10-19 10:23:54+02', 'sdfsdfs', 3.33, 13.33, '2022 up-charge', 2, 'method message', 333.13, 23.13, 'Welded railing together', 'small house', false);

CREATE TABLE "heading" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"message" VARCHAR(250),
	"proposal_id" INT REFERENCES "proposal",
	"surcharge" DECIMAL (5, 2),
	"order" INT
);

INSERT INTO "heading" ("name", "message", "proposal_id", "surcharge", "order")
VALUES ('frank', 'exterior staircase railing', 7, 3.33, 4 );

SELECT * FROM "heading";

	
CREATE TABLE "unit_type" (
	"id" SERIAL PRIMARY KEY,
	"measurement_unit" VARCHAR(10),
	"pricing_unit" VARCHAR(10)
);

--INSERT INTO "unit_type" ("measurement_unit", "pricing_unit")
--VALUES ('EA', 'EA'),
--('FT','LBS'),
--('FT', 'FT'),
--('EA', 'EA'),
--('FT', 'CWT'),
--('LBS', 'LBS'),
--('LBS','CWT'),
--('SQFT', 'SQFT'),
--('SQFT', 'LBS'),
--('SQFT', 'CWT');


CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY,
	"item_code" VARCHAR (20),
	"name" VARCHAR(80),
	"description" VARCHAR (200),
	"price_per_price_unit" DECIMAL (9,2),
	"unit_type_id" INT,
	"disabled" BOOLEAN NOT NULL
);

--INSERT INTO "item" ("item_code", "name", "description", "price_per_price_unit", "unit_type_id", "disabled")
--VALUES ('W2765', 'Steel Rod', '10ft round steel rod', 3.33, 3, FAlSE);

CREATE TABLE "item_heading"(
	"id" SERIAL PRIMARY KEY,
	"heading_id" INT REFERENCES "heading",
	"item_id" INT REFERENCES "item",
	"order" INT,
	"item_price" DECIMAL (5,2),
	"qty_price_unit" INT,
	"qty_measure_unit" DECIMAL (5,2),
	"total_adj_price" DECIMAL (5,2)
	); 
	
--INSERT INTO "item_heading" ("heading_id", "item_id", "order","item_price", "qty_price_unit", "qty_measure_unit", "total_adj_price")
--VALUES (3, 1, 1, 3.33, 35.90, 13.33, 53.23);
--
--SELECT * FROM "item_heading";

CREATE TABLE "partner_pricing"(
	"id" SERIAL PRIMARY KEY,
	"price" DECIMAL (5,2),
	"item_id" INT REFERENCES "item",
	"partner_id" INT REFERENCES "partner",
	"disabled" BOOLEAN NOT NULL
);

INSERT INTO "partner_pricing"("price", "item_id", "partner_id", "disabled")
VALUES(3.33, 1, 1, TRUE);




