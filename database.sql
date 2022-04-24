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
 VALUES('Mark Scranton', '202-375-6743', '202-119-0764', 'MarkS@gmail.com', 'false'), 
('Phil Spencer', '202-179-1008', '202-346-9452', 'PhilS@gmail.com', 'false'),
('Bill Henderson', '202-179-1009', '202-346-9471', 'BillH@gmail.com', 'false'),
('Franklin Roosevelt', '202-179-1056', '202-346-9701', 'FranklinR@gmail.com', 'false'),
('Steve Johnson', '202-179-1056', '202-346-9701', 'SteveJ@gmail.com', 'false');

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
 VALUES('Brookshire Construction', 'Builder', 'BRK', '5.23', 3, '202-376-4765', '1791 Dovetale Dr', 'Clinton', 'MD', '20735', false ),
 ('Franklin Construction', 'Builder', 'FRK', '4', 3, '752-647-3726', '1791 Ridgedale Dr', 'Minneapolis', 'MN', '55111', false),
 ('Benjamin Construction', 'Industrial Construction', 'BJM', '4', 3, '202-376-4765', '1791 Finchtail Ave', 'Baltimore', 'MD', '21201', false),
 ('Constituional Designers', 'Designer', 'CTN', '4', 3, '202-376-4765', '1791 Apple Rd', 'Baltimore', 'MD', '21201', false),
('Maryland Contracting', 'Contractor', 'MYD', '4', 3, '202-376-4765', '1791 Cedar Ave', 'Baltimore', 'MD', '21201', false);

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
 VALUES('Palm Springs Retirement', 'BRK-2022-01', 1, 1, 1, 1, '2004-10-19 10:23:54+02', 'Building', 'Palm Springs Retirement', 'Retirement home', '123 main street', 'Bloomington', 'MN', 55437, 7.25, false);

 INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('City View Apartments', 'BRC-2022-01', 1, 1, 2, 1, '2004-10-19 10:23:54+02', 'Building', 'City View Apartments', 'Multi family', '476 Burlington ave', 'Minneapolis', 'MN', 55455, 7.25, false);

 INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Rambler House', 'BEC-2022-01', 1, 1, 3, 1, '2004-10-19 10:23:54+02', 'House', 'Carter House', 'Single family', '3333 Turnville Ave', 'Saint Paul', 'MN', 55119, 7.25, false);

 INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Capella Tower',  'COH-2022-01', 1, 1, 4, 1, '2004-10-19 10:23:54+02', 'building', 'Capella Tower', 'Building', '1313 5th Ave', 'Minneapolis', 'MN', 55437, 7.25, false);

 INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Griffen Cabin', 'MAC-2022-01', 1, 1, 5, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Essentail Amenities', 'Business plaza', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Brookshire Commons', 'BRK-2022-01', 1, 1, 1, 1, '2004-10-19 10:23:54+02', 'Housing Development', 'Brookshire Commons', 'Houses', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Brookview Manor', 'BRC-2022-01', 1, 1, 2, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Griffen Cabin', 'Single family', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Broward Hills', 'BEC-2022-01', 1, 1, 3, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Rascal Flatz', 'Retirement home', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Applewood Hills', 'COH-2022-01', 1, 1, 4, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Shaminee Estates', 'Multi family', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);

  INSERT INTO "opportunity" ("name", "opportunity_code", "status", "user_id", "contact_id", "partner_id", "due_date", "type", "community_name", "development_type", "address_line_1", "city", "state", "zip", "tax_rate", "disabled")
 VALUES('Waskish Mansion', 'MAC-2022-01', 1, 1, 5, 1, '2004-10-19 10:23:54+02', '3 Story Cabin', 'Barron Heights', 'Single family', '1993 No Name Lane', 'Waskish', 'MN', 55119, 7.25, false);
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
 VALUES('2004-10-19 10:23:54+02', 'BRK-2022-01-01', 1, 'Rambler', 'NOVA', '2004-10-19 10:23:54+02', 'COMAR 09.12.51', 8, 1, 'Dropping off on front of driveway', 333.13, 'See method message', 89.38, 'Welded railing together', false);

INSERT INTO "proposal" ("date", "proposal_code", "opportunity_id", "house_type", "plan_identifier", "plan_date", "building_code", "partner_discount", "method", "method_message", "delivery_charge", "delivery_message", "field_weld_charge", "field_weld_message", "disabled")
 VALUES('2004-10-19 10:23:54+02', 'BRC-2022-01-01', 1, 'Victorian', 'ALPHA', '2004-10-19 10:23:54+02', 'COMAR 09.12.50', 3, 2, 'Transport to backyard for installation', 833.13, 'Leave small parts on front steps', 83.13, 'Welded corner beams together', false);

 INSERT INTO "proposal" ("date", "proposal_code", "opportunity_id", "house_type", "plan_identifier", "plan_date", "building_code", "partner_discount", "method", "method_message", "delivery_charge", "delivery_message", "field_weld_charge", "field_weld_message", "disabled")
 VALUES('2004-10-19 10:23:54+02', 'BEC-2022-01-01', 1, 'Colonial', 'BETA', '2004-10-19 10:23:54+02', 'COMAR 09.12.51', 5, 3, 'Coming by in morning for pickup', 0, 'N/A', 0, 'N/A', false);

 INSERT INTO "proposal" ("date", "proposal_code", "opportunity_id", "house_type", "plan_identifier", "plan_date", "building_code", "partner_discount", "method", "method_message", "delivery_charge", "delivery_message", "field_weld_charge", "field_weld_message", "disabled")
 VALUES('2004-10-19 10:23:54+02', 'COH-2022-01-01', 1, 'Cottage', 'GAMMA', '2004-10-19 10:23:54+02', 'COMAR 09.12.50', 3.75, 3, 'Coming by in morning for pickup', 0, 'N/A', 0, 'N/A', false);

 INSERT INTO "proposal" ("date", "proposal_code", "opportunity_id", "house_type", "plan_identifier", "plan_date", "building_code", "partner_discount", "method", "method_message", "delivery_charge", "delivery_message", "field_weld_charge", "field_weld_message", "disabled")
 VALUES('2004-10-19 10:23:54+02', 'MAC-2022-01-01', 1, 'Farmhouse', 'ARA', '2004-10-19 10:23:54+02', 'COMAR 09.12.51', 2.5, 1, 'Dropping off on front of driveway', 333.13, 'Leave on front steps', 73.13, 'Welded corner beams together', false);

 INSERT INTO "proposal" ("date", "proposal_code", "opportunity_id", "house_type", "plan_identifier", "plan_date", "building_code", "partner_discount", "method", "method_message", "delivery_charge", "delivery_message", "field_weld_charge", "field_weld_message", "disabled")
 VALUES('2004-10-19 10:23:54+02', 'FRC-2022-01-01', 1, 'French Country', 'ZETA', '2004-10-19 10:23:54+02', 'COMAR 09.12.50', 2.40, 2, 'Transport to backyard for installation', 833.13, 'Leave small parts on front steps', 123.13, 'Welded railing and together', false);

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
VALUES ('Railing', 'Exterior staircase railing', 1, 3.33, true );

	
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
VALUES ('821WF', 'WF Beam 8x21', 100, 2, 1), ('HB1644', 'H Beam  6.00 x .114 x 1.844', 120, 2, 4.40), ('P316', 'Steel Plate 3/16', 29.88, 7, 1), 
        ('SCR24', 'Steel Cold Rolled Sheet 24g', 14.43, 8, 0.98), ('DST16', 'DOM steel tube', 16.44, 3, 3.69), ('BLT50','Bolt', 9.99, 1, 1),
        ('P466', 'Steel Plate 5/8', 89.95, 6, 0.01), ('HB1667', 'H Beam 16.33" x .395" x 10.24"', 225, 4, 0.67 ), ('RB58', 'Steel Rebar 5/8"', 1.47, 5, 1);        

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
