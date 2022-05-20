CREATE TABLE list(
	"id" SERIAL PRIMARY KEY,
	"task" varchar(256),
	"completed" boolean DEFAULT false
);

INSERT INTO list( task ) VALUES ( 'Wash the car' );
SELECT * FROM list;
UPDATE list SET completed=true WHERE id=1;
DELETE FROM list WHERE id=1;