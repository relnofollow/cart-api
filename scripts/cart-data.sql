CREATE TYPE cart_status AS ENUM ('OPEN', 'ORDERED');

CREATE TABLE carts (
	id uuid PRIMARY KEY,
	user_id uuid NOT NULL,
	created_at date NOT NULL DEFAULT NOW(),
	updated_at date NOT NULL DEFAULT NOW(),
	status cart_status NOT NULL DEFAULT 'OPEN'
)

CREATE TABLE cart_items (
	cart_id uuid REFERENCES carts (id) ON DELETE CASCADE,
	product_id uuid NOT NULL,
	"count" integer NOT NULL
)

CREATE TABLE orders (
	id uuid PRIMARY KEY,
	user_id uuid NOT NULL,
	cart_id uuid REFERENCES carts (id) ON DELETE SET NULL,
	payment json,
	delivery json,
	"comments" text,
	status text NOT NULL,
	total integer NOT NULL
)

-- CART #1 (2 items)

INSERT INTO carts VALUES 
('4f58c051-c881-43a3-933e-ec0919b3025f', 'e414b0c3-07ce-4127-b7f6-88145bf8f4a5', '2023-03-29', '2023-03-30', 'OPEN')

INSERT INTO cart_items VALUES 
('4f58c051-c881-43a3-933e-ec0919b3025f', 'f8081216-1360-4206-86cc-7bdd81144cdb', 1),
('4f58c051-c881-43a3-933e-ec0919b3025f', '99c79b84-f597-4936-90b5-6dcb09df6bbd', 1)

-- CART #2 (3 items)

INSERT INTO carts VALUES 
('8102f6c5-d460-4348-943a-7ec0ae4d04e5', 'c35310c0-88d0-4147-89ab-7ecf21018a0e', '2023-03-29', '2023-03-30', 'OPEN')

INSERT INTO cart_items VALUES 
('8102f6c5-d460-4348-943a-7ec0ae4d04e5', '39dd2bf8-d9eb-4448-aac4-e0f1bb9f6d95', 1),
('8102f6c5-d460-4348-943a-7ec0ae4d04e5', '4717ec5c-3643-4e9c-922d-f581d887314b', 1),
('8102f6c5-d460-4348-943a-7ec0ae4d04e5', 'e1cad783-9231-48c4-a223-781c391d545c', 1)

-- CART #3 (1 item)

INSERT INTO carts VALUES 
('a5f66aa6-8c5a-47e0-84ed-7da94f6df7f6', 'cc09cb06-c0c1-4168-9d62-3f992d7e12d8', '2023-03-29', '2023-03-30', 'OPEN')

INSERT INTO cart_items VALUES 
('a5f66aa6-8c5a-47e0-84ed-7da94f6df7f6', '99d70ca1-6a9a-4bc6-9bc9-3033def4aaaf', 1)