-- Creating database
CREATE DATABASE studentmanagement;

USE studentmanagement;

-- Creating table
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    dateOfBirth DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(100) NOT NULL,
    department VARCHAR(50) NOT NULL,
    status ENUM('Foundation', 'Undergraduate', 'Postgraduate') DEFAULT 'Foundation'
);


-- Inserting some data
INSERT INTO students(firstname, lastname, dateOfBirth, email, phoneNumber, department, status)
VALUES
('James', 'Walker', '1997-06-21', 'james.walker@gmail.com', '(970) 340-1580', 'PAE', 'Postgraduate'),
('Velma', 'Clemons', '2000-08-04', 'velma.clemons@gmail.com', '(603) 835-2772', 'IS', 'Undergraduate' ),
('Kibo', 'Underwood', '1995-01-29', 'kibo.underwood@gmail.com', '(275) 448-2183', 'CE', 'Postgraduate'),
('Louis', 'Mcgee', '2004-02-08', 'louis.mcgee@gmail.com', '(903) 693-1498', 'PAE', 'Foundation'),
('Phyllis', 'Paul', '2003-11-05', 'phyllis.paul@gmail.com', '(980) 564-3740', 'IS', 'Postgraduate'),
('Zenaida', 'Decker', '2003-11-05', 'zenaida.decker@gmail.com', '(798) 675-8018', 'PE', 'Undergraduate'),
('William', 'Jones', '1997-12-16', 'william.jones@gmail.com', '(516) 876-5056', 'CE', 'Postgraduate'),
('Melanie', 'Langdon', '1997-05-28', 'melanie.langdon@gmail.com', '(846) 326-6732', 'PAE', 'Undergraduate'),
('Adrian', 'Butler', '2004-11-09', 'adrian.butler@gmail.com', '(859) 775-1315', 'PE', 'Foundation'),
('Rachel', 'Ince', '2004-04-14', 'rachel.ince@gmail.com', '(529) 571-2349', 'PAE', 'Foundation'),
('Sean', 'Gray', '2004-11-18', 'sean.gray@gmail.com', '(244) 711-4284', 'CE', 'Foundation'),
('Keith', 'Clarkson', '2000-07-09', 'keith.clarkson@gmail.com', '(682) 288-4130', 'IS', 'Undergraduate'),
('Violet', 'Evergarden', '2000-01-13', 'violet.evergarden@gmail.com', '(329) 340-9066', 'PE', 'Postgraduate'),
('James', 'Sutherland', '2002-05-12', 'james.sutherland@gmail.com', '(553) 923-4507', 'CE', 'Foundation'),
('Amelia', 'Rutherford', '1996-04-30', 'amelia.rutherford@gmail.com', '(469) 912-6634', 'PAE', 'Postgraduate');

