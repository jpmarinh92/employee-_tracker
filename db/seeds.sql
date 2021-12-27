INSERT INTO departments
  (name)
VALUES
  ('billing'),
  ('sales');

INSERT INTO roles
  (title, salary, department_id)
VALUES
  ('clerk', '75000', 1),
  ('seller', '50000', 2);

INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, NULL),
  ('Virginia', 'Woolf', 2, NULL),
  ('Charles', 'LeRoi', 2, 1);