ALTER TABLE article ADD COLUMN author_id INT;

-- Uuenda juba olemasolevaid andmeid
UPDATE article SET author_id = 1 WHERE id = 1;
UPDATE article SET author_id = 1 WHERE id = 2;
UPDATE article SET author_id = 2 WHERE id = 3;
