CREATE TABLE periodic_elements (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(100),
  name VARCHAR(100),
  atomic_weight DECIMAL,
  atomic_id INTEGER
);

INSERT INTO periodic_elements(id,symbol,name,atomic_weight,atomic_id) VALUES
(1,'Pr','Paraseodymium',140.9076,59),
(2,'O','Oxygen',15.9994,8),
(3,'Cr','Chromium',51.9962,24),
(4,'As','Arsenic',74.92160,33),
(5,'Ti','Titanium',47.867,22),
(6,'Na','Sodium',22.98976,11),
(7,'Ti','Titanium',47.867,22),
(8,'O','Oxygen',15.9994,8),
(9,'N','Nitrogen',14.0067,7);
