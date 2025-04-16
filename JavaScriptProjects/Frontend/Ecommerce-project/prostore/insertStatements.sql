-- Airline
INSERT INTO Airline (airLineID, airLineName, country, headQuarters, IATACode) 
VALUES
(1, 'Delta Air Lines', 'USA', 'Atlanta, Georgia', 'DL'),
(2, 'Emirates', 'UAE', 'Garhoud, Dubai', 'EK'),
(3, 'Lufthansa', 'Germany', 'Cologne, Germany', 'LH'),
(4, 'Singapore Airlines', 'Singapore', 'Singapore', 'SQ'),
(5, 'Qantas', 'Australia', 'Sydney, Australia', 'QF');

-- Airport
INSERT INTO Airport (airportID, airportName, location, IATACode) 
VALUES
(1, 'John F. Kennedy International', 'New York, USA', 'JFK'),
(2, 'Heathrow Airport', 'London, UK', 'LHR'),
(3, 'Dubai International Airport', 'Dubai, UAE', 'DXB'),
(4, 'Changi Airport', 'Singapore', 'SIN'),
(5, 'Sydney Kingsford-Smith', 'Sydney, Australia', 'SYD');

-- Passenger
INSERT INTO Passenger (passengerID, fName, lName, email, hashedPassword, phoneNumber, dateOfBirth, nationality, address) 
VALUES
(1, 'John', 'Doe', 'john.doe@email.com', 'hashed123', '+15551234567', '1990-05-15', 'American', '123 Main St, New York, USA'),
(2, 'Emma', 'Smith', 'emma.smith@email.com', 'hashed456', '+442071234567', '1985-08-22', 'British', '45 Park Lane, London, UK'),
(3, 'Liam', 'Chen', 'liam.chen@email.com', 'hashed789', '+8613812345678', '2000-02-10', 'Chinese', '88 Nanjing Road, Shanghai, China'),
(4, 'Sophia', 'Garcia', 'sophia.g@email.com', 'hashed101', '+34911234567', '1995-11-30', 'Spanish', 'Calle Gran Vía 1, Madrid, Spain'),
(5, 'Mohamed', 'Ali', 'm.ali@email.com', 'hashed202', '+201234567890', '1988-07-04', 'Egyptian', '25 Tahrir Square, Cairo, Egypt');

-- Class
INSERT INTO Class (classID, className, classDescription) 
VALUES
(1, 'Economy', 'Standard seating with essential amenities'),
(2, 'Premium Economy', 'Extra legroom and enhanced services'),
(3, 'Business', 'Flat-bed seats and priority services'),
(4, 'First Class', 'Luxury suites and personalized service'),
(5, 'Basic Economy', 'Lowest fare with restrictions');

-- Employee
INSERT INTO Employee (employeeID, fName, lName, email, phoneNumber, position, salary, hireDate) 
VALUES
(1, 'David', 'Wilson', 'd.wilson@airline.com', '+15559876543', 'Pilot', 120000, '2018-03-12'),
(2, 'Sarah', 'Brown', 's.brown@airline.com', '+442078765432', 'Flight Attendant', 45000, '2020-06-20'),
(3, 'Wei', 'Zhang', 'w.zhang@airline.com', '+8613876543210', 'Engineer', 85000, '2015-11-05'),
(4, 'Carlos', 'Martinez', 'c.martinez@airline.com', '+349117654321', 'Customer Service', 38000, '2022-02-15'),
(5, 'Aisha', 'Khan', 'a.khan@airline.com', '+923001234567', 'Manager', 95000, '2019-09-10');

-- Airline_Airport
INSERT INTO Airline_Airport (airlineID, airportID) 
VALUES
(1, 1), (1, 2), 
(2, 3), (2, 4), 
(3, 2), (3, 5), 
(4, 4), (4, 1), 
(5, 5);         

-- Flight_Airport
INSERT INTO Flight_Airport (flightID, airportID, isDeparture) 
VALUES
(1, 1, TRUE), (1, 2, FALSE), 
(2, 3, TRUE), (2, 4, FALSE), 
(3, 2, TRUE), (3, 5, FALSE), 
(4, 4, TRUE), (4, 1, FALSE), 
(5, 5, TRUE), (5, 3, FALSE); 

-- Flight_Class
INSERT INTO Flight_Class (flightID, classID, totalSeats, availableSeats) 
VALUES
(1, 1, 200, 180), (1, 3, 30, 25),   
(2, 2, 150, 140), (2, 4, 10, 8),    
(3, 1, 180, 170), (3, 2, 50, 45),  
(4, 3, 40, 35), (4, 4, 8, 6),      
(5, 5, 220, 210), (5, 1, 200, 190);

-- Ticket
INSERT INTO Ticket (ticketID, flightID, classID, userID, seatNumber, bookingDate, price, status) 
VALUES
(1, 1, 1, 1, '23A', '2023-12-20', 450.00, 'Confirmed'),
(2, 2, 4, 2, '1C', '2023-12-21', 2500.00, 'Confirmed'),
(3, 3, 2, 3, '15B', '2023-12-22', 800.00, 'Pending'),
(4, 4, 3, 4, '7F', '2023-12-23', 1500.00, 'Confirmed'),
(5, 5, 5, 5, '32K', '2023-12-24', 300.00, 'Cancelled');

-- Payment
INSERT INTO Payment (paymentID, ticketID, paymentDate, amount, paymentMethod, employeeID) 
VALUES
(1, 1, '2023-12-20', 450.00, 'Credit Card', 1),
(2, 2, '2023-12-21', 2500.00, 'PayPal', 2),
(3, 3, NULL, 800.00, 'Pending', NULL), 
(4, 4, '2023-12-23', 1500.00, 'Bank Transfer', 4),
(5, 5, '2023-12-24', 300.00, 'Credit Card', 5);
