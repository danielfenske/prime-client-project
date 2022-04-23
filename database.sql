-- Database Name = r_f_metals
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE ,
    "password" VARCHAR (1000) ,
    "first_name" VARCHAR(80) ,
    "last_name" VARCHAR(100) ,
    "access_level" INT DEFAULT 1,
    "disabled" BOOLEAN NOT NULL DEFAULT FALSE
); -- will make almost all fields null/required later
 INSERT INTO "user" ("username", "password", "first_name", "last_name", "access_level", "disabled")
 VALUES('mark', 'password', 'mark', 'terry', 1, 'false');

CREATE TABLE "contact" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "phone" VARCHAR(80),
    "work_phone" VARCHAR(80),
    "email" VARCHAR(80),
    "disabled" BOOLEAN NOT NULL DEFAULT FALSE
);

 INSERT INTO "contact" ("name", "phone", "work_phone", "email", "disabled")
 VALUES('Mark Scranton', '2023756743', '2021190764', 'MarkS@gmail.com', 'false'), 
('Phil Spencer', '2021791008', '2023469452', 'PhilS@gmail.com', 'false'),
('Bill Henderson', '2021791009', '2023469471', 'BillH@gmail.com', 'false'),
('Franklin Roosevelt', '2021791056', '2023469701', 'FranklinR@gmail.com', 'false'),
('Steve Johnson', '2021791056', '2023469701', 'SteveJ@gmail.com', 'false');

CREATE TABLE "partner" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "type" VARCHAR(100),
    "partner_code" VARCHAR(80),
    "partner_discount" DECIMAL (25, 2),
    "rounding_type" INT,
    "phone_number" VARCHAR(20),
    "address_line_1" VARCHAR(250),
    "city" VARCHAR(80),
    "state" VARCHAR(2),
    "zip" VARCHAR,
    "disabled" BOOLEAN NOT NULL DEFAULT FALSE
);
 INSERT INTO "partner" ("name", "type", "partner_code", "partner_discount", "rounding_type", "phone_number", "address_line_1", "city", "state","zip", "disabled")
 VALUES('Brookshire Construction', 'Builder', 'BRK', '5.23', 3, 2023764765, '1791 Dovetale Dr', 'Clinton', 'MD', '', false ),
 ('Franklin Construction', 'Builder', 'FRK', '4', 3, 7526473726, '1791 Ridgedale Dr', 'Minneapolis', 'MN', '', false),
 ('Benjamin Construction', 'Builder', 'BJM', '4', 3, 2023764765, '1791 Finchtail Ave', 'Baltimore', 'MD', '', false),
 ('Constituional Housing', 'Builder', 'CTN', '4', 3, 2023764765, '1791 Apple Rd', 'Baltimore', 'MD', '', false),
('Maryland Contracting', 'Builder', 'MYD', '4', 3, 2023764765, '1791 Cedar Ave', 'Baltimore', 'MD', '', false);

CREATE TABLE "opportunity" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(80),
    "opportunity_code" VARCHAR(250),
    "status" INT,
    "user_id" INT REFERENCES "user",
    "contact_id" INT REFERENCES "contact",
    "partner_id" INT REFERENCES "partner",
    "due_date" TIMESTAMP,
    "type" VARCHAR(80),
    "community_name" VARCHAR(250),
    "development_type" VARCHAR(80),
    "address_line_1" VARCHAR(250),
    "city" VARCHAR(80),
    "state" VARCHAR(2),
    "zip" VARCHAR,
    "tax_rate" DECIMAL(25, 2),
    "disabled" BOOLEAN NOT NULL DEFAULT FALSE
);
-- Marks Dummy Data //////////////////////////////////////////////////////////////////////////////////////////////////
INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Housing Development', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', 'Building', 'Palm Springs', 'Building', '123 main street', 'Bloomington', 'MN', 55437, 7.25, false);

 INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('City View Apartments', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', 'Building', 'City View Apartments', 'building', '476 Burlington ave', 'Minneapolis', 'MN', 55455, 7.25, false);

 INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Rambler House', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', 'House', 'Carter House', 'building', '3333 Turnville Ave', 'Saint Paul', 'MN', 55119, 7.25, false);

 INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Capella Tower', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', 'building', 'Capella Tower', 'building', '1313 5th Ave', 'Minneapolis', 'MN', 55437, 7.25, false);

 INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Griffen Cabin', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Griffen Cabin', 'building', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Brookshire', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', 'Housing Development', 'Brookshire Commons', 'Houses', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Brookview Manor', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Griffen Cabin', 'building', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Broward Hills', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Griffen Cabin', 'building', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Applewood Hills', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Griffen Cabin', 'building', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Waskish Mansion', 1, 1, 1, 1, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Griffen Cabin', 'building', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);
-- Marks Dummy Data //////////////////////////////////////////////////////////////////////////////////////////////////






CREATE TABLE "proposal" (
    "id" SERIAL PRIMARY KEY,
    "date" TIMESTAMP,
    "proposal_code" VARCHAR(80),
    "opportunity_id" INT REFERENCES "opportunity",
    "house_type" VARCHAR(80),
    "plan_identifier" VARCHAR(80),
    "plan_date" TIMESTAMP,
    "building_code" VARCHAR(80),
    "partner_discount" DECIMAL (25, 2),
    "method" INT, -- will be a dropdown, we will simply target the INT or id
    "method_message" VARCHAR(250),
    "delivery_charge" DECIMAL (25, 2),
    "delivery_message" VARCHAR(250),
    "field_weld_charge" DECIMAL (25, 2),
    "field_weld_message" VARCHAR(250),
    "disabled" BOOLEAN NOT NULL DEFAULT FALSE
);
 INSERT INTO "proposal" ("date", "proposal_code", "opportunity_id", "house_type", "plan_identifier", "plan_date", "building_code", "partner_discount", "method", "method_message", "delivery_charge", "delivery_message", "field_weld_charge", "field_weld_message", "disabled")
 VALUES('2004-10-19 10:23:54+02', 'BRK', 1, 'Rambler', 'yayay', '2004-10-19 10:23:54+02', 'sdfsdfs', 2, 3, 'method message', 333.13, 'Leave on front steps', 23.13, 'Welded railing together', false);

CREATE TABLE "heading" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"message" VARCHAR(250),
	"proposal_id" INT REFERENCES "proposal",
	"surcharge" DECIMAL (25, 2),
	"order" INT,
    "taxable" BOOLEAN
);


INSERT INTO "heading" ("name", "message", "proposal_id", "surcharge", "taxable")
VALUES ('frank', 'exterior staircase railing', 1, 3.33, true );

	
CREATE TABLE "unit_type" (
	"id" SERIAL PRIMARY KEY,
	"measurement_unit" VARCHAR(10),
	"pricing_unit" VARCHAR(10)
);

INSERT INTO "unit_type" ("measurement_unit", "pricing_unit")
VALUES ('EA', 'EA'),
('FT', 'FT'),
('FT','LBS'),
('FT', 'CWT'),
('LBS', 'LBS'),
('LBS','CWT'),
('SQFT', 'SQFT'),
('SQFT', 'LBS'),
('SQFT', 'CWT');


CREATE TABLE "item" (
	"id" SERIAL PRIMARY KEY,
	"item_code" VARCHAR (20),
	"name" VARCHAR(80),
	"price_per_pricing_unit" DECIMAL (25, 2),
	"unit_type_id" INT,
	"unit_weight" DECIMAL (25, 2), -- unit weight is the relationship between the mesure_unit and price_unit
	"disabled" BOOLEAN NOT NULL DEFAULT FALSE 
);

INSERT INTO "item" ("item_code", "name", "price_per_pricing_unit", "unit_type_id", "unit_weight")
VALUES ('821WF', 'WF Beam 8x21', 100, 2, 1), ('SCR50', 'screw', 10, 1, 1), ('');

CREATE TABLE "item_heading"(
	"id" SERIAL PRIMARY KEY,
	"heading_id" INT REFERENCES "heading",
	"item_id" INT REFERENCES "item",
	"message" VARCHAR (200),
	"order" INT,
	"price_per_pricing_unit" DECIMAL (25, 2),
	"ft" INT,
	"inches" INT,
	"measurement_per_unit" DECIMAL (25,2),
	"rounded_measurement_per_unit" DECIMAL (25, 2),
	"rounded_measurement_per_unit_unit_weight" DECIMAL (25, 2),
	"qty" INT,
	"single_item_price" DECIMAL (25, 2),
	"item_price_total" DECIMAL (25,2)
	); 
	

CREATE TABLE "partner_pricing"(
	"id" SERIAL PRIMARY KEY,
	"price" DECIMAL (25, 2),
	"item_id" INT REFERENCES "item",
	"partner_id" INT REFERENCES "partner",
	"disabled" BOOLEAN NOT NULL DEFAULT FALSE
);
