CREATE TABLE Passenger (
    passengerID SERIAL PRIMARY KEY,
    fName VARCHAR(20) NOT NULL,
    lName VARCHAR(20) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    hashedPassword VARCHAR(100) NOT NULL,
    phoneNumber VARCHAR(15),
    dateOfBirth DATE NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    address TEXT
);

CREATE TABLE Airline (
    airLineID SERIAL PRIMARY KEY,
    airLineName VARCHAR(100) NOT NULL,
    country VARCHAR(100),
    headQuarters VARCHAR(100),
    IATACode VARCHAR(5) UNIQUE NOT NULL
);

CREATE TABLE Airport (
    airportID SERIAL PRIMARY KEY,
    airportName VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    IATACode VARCHAR(5) UNIQUE NOT NULL
);

CREATE TABLE Class (
    classID SERIAL PRIMARY KEY,
    className VARCHAR(50) NOT NULL,
    classDescription TEXT
);

CREATE TABLE Employee (
    employeeID SERIAL PRIMARY KEY,
    fName VARCHAR(50) NOT NULL,
    lName VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phoneNumber VARCHAR(20),
    position VARCHAR(50) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    hireDate DATE NOT NULL
);



CREATE TABLE Flight (
    flightID SERIAL PRIMARY KEY,
    flightNumber VARCHAR(50) UNIQUE NOT NULL,
    departureTime TIMESTAMP NOT NULL,
    arrivalTime TIMESTAMP NOT NULL,
    airlineID INT NOT NULL REFERENCES Airline(airLineID)  
);


CREATE TABLE Airline_Airport (  
    airlineID INT REFERENCES Airline(airLineID),
    airportID INT REFERENCES Airport(airportID),
    PRIMARY KEY (airlineID, airportID)
);

CREATE TABLE Flight_Airport ( 
    flightID INT REFERENCES Flight(flightID),
    airportID INT REFERENCES Airport(airportID),
    isDeparture BOOLEAN NOT NULL,  
    PRIMARY KEY (flightID, airportID, isDeparture)
);

CREATE TABLE Flight_Class (  
    flightID INT REFERENCES Flight(flightID),
    classID INT REFERENCES Class(classID),
    totalSeats INT NOT NULL,
    availableSeats INT NOT NULL,
    PRIMARY KEY (flightID, classID)
);


CREATE TABLE Ticket (
    ticketID SERIAL PRIMARY KEY,
    flightID INT NOT NULL,
    classID INT NOT NULL,
    userID INT REFERENCES Passenger(passengerID),  
    seatNumber VARCHAR(10),
    bookingDate DATE,
    price DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending',  
    FOREIGN KEY (flightID, classID) REFERENCES Flight_Class(flightID, classID)
);

CREATE TABLE Payment (
    paymentID SERIAL PRIMARY KEY,
    ticketID INT UNIQUE REFERENCES Ticket(ticketID),  
    paymentDate DATE,
    amount DECIMAL(10, 2) NOT NULL,
    paymentMethod VARCHAR(50),
    employeeID INT REFERENCES Employee(employeeID)  
);