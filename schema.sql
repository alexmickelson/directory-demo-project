CREATE TABLE directory_user (
  id SERIAL PRIMARY KEY,
  first_name text,
  last_name text,
  phone text,
  email text,
  first_name_status text,
  last_name_status text,
  phone_status text,
  email_status text,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO directory_user (
  first_name, last_name, phone, email, first_name_status, last_name_status, phone_status, email_status
) VALUES
('John', 'Doe', '123-456-7890', 'john.doe@example.com', 'WEB_VISIBLE', 'PRIVATE', 'WEB_VISIBLE', 'WEB_VISIBLE'),
('Jane', 'Smith', '987-654-3210', 'jane.smith@example.com', 'WEB_VISIBLE', 'WEB_VISIBLE', 'PRIVATE', 'PRIVATE'),
('Alice', 'Johnson', '555-123-4567', 'alice.johnson@example.com', 'WEB_VISIBLE', 'WEB_VISIBLE', 'PRIVATE', 'WEB_VISIBLE'),
('Bob', 'Brown', '555-987-6543', 'bob.brown@example.com', 'WEB_VISIBLE', 'WEB_VISIBLE', 'WEB_VISIBLE', 'PRIVATE');
