DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
    id          BIGSERIAL PRIMARY KEY,
    name        VARCHAR(255)      NOT NULL,
    description VARCHAR(500),
    price       NUMERIC(10, 2)    NOT NULL,
    image_url   VARCHAR(512),
    featured    BOOLEAN           NOT NULL DEFAULT FALSE,
    details     TEXT
    category_id BIGINT   -- new info column
);
