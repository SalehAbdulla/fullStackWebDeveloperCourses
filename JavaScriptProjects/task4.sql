



SELECT SUM(p.amount) AS total_sales
FROM Payment p
WHERE p.employeeID = 1
AND EXTRACT(YEAR FROM p.paymentDate) = 2025;



```

---

#### **2. Available Flights Between Two Airports on '2024-02-01'**
*Assumes airport IATA codes for source/destination (e.g., 'JFK' and 'LAX')*:
```sql
SELECT f.flightID, f.flightNumber, f.departureTime, f.arrivalTime
FROM Flight f
JOIN Flight_Airport fa_source ON f.flightID = fa_source.flightID
JOIN Flight_Airport fa_dest ON f.flightID = fa_dest.flightID
JOIN Airport a_source ON fa_source.airportID = a_source.airportID
JOIN Airport a_dest ON fa_dest.airportID = a_dest.airportID
WHERE a_source.IATACode = 'JFK'  -- Source airport
  AND a_dest.IATACode = 'LAX'    -- Destination airport
  AND fa_source.isDeparture = TRUE
  AND fa_dest.isDeparture = FALSE
  AND DATE(f.departureTime) = '2024-02-01'
  AND EXISTS (
    SELECT 1
    FROM Flight_Class fc
    WHERE fc.flightID = f.flightID
      AND fc.availableSeats > 0
  );
```

---

#### **3. Reservations for Customer (CustomerID=1) with Flight Details**
```sql
SELECT t.ticketID, t.bookingDate, t.status,
       f.flightNumber, f.departureTime, f.arrivalTime,
       c.className
FROM Ticket t
JOIN Flight f ON t.flightID = f.flightID
JOIN Class c ON t.classID = c.classID
WHERE t.userID = 1;
```

---

#### **4. Number of Tickets and Total Price for Flight (FlightID=123)**
```sql
SELECT COUNT(t.ticketID) AS total_tickets, SUM(t.price) AS total_price
FROM Ticket t
WHERE t.flightID = 1;
```

---

#### **5. Flights with >5 Reservations**
```sql
SELECT f.flightID, COUNT(t.ticketID) AS total_reservations
FROM Flight f
JOIN Ticket t ON f.flightID = t.flightID
WHERE t.status = 'Confirmed' 
GROUP BY f.flightID
HAVING COUNT(t.ticketID) > 5;
```

---

#### **6. Total Payments Grouped by Payment Method**
```sql
SELECT paymentMethod, SUM(amount) AS total_amount
FROM Payment
GROUP BY paymentMethod;
```

---

#### **7. Total Revenue per Plane**
*Assumes a `Plane` table exists (add if missing)*:
```sql
-- Add Plane table if not present:
CREATE TABLE Plane (
    planeID SERIAL PRIMARY KEY,
    model VARCHAR(100),
    airlineID INT REFERENCES Airline(airLineID)
);

ALTER TABLE Flight ADD COLUMN planeID INT REFERENCES Plane(planeID);

-- Query:
SELECT p.planeID, SUM(pay.amount) AS total_revenue
FROM Flight f
JOIN Plane p ON f.planeID = p.planeID
JOIN Ticket t ON f.flightID = t.flightID
JOIN Payment pay ON t.ticketID = pay.ticketID
GROUP BY p.planeID;
```

---

#### **8. Add SeatClass to Reservations**
*Since `Reservation` is merged into `Ticket`*:
```sql
ALTER TABLE Ticket
ADD COLUMN SeatClass VARCHAR(50);
```

---

#### **9. Total Payments for Reservations on Ongoing Flights**
```sql
SELECT t.ticketID AS reservationID, SUM(p.amount) AS total_payment
FROM Ticket t
JOIN Payment p ON t.ticketID = p.ticketID
JOIN Flight f ON t.flightID = f.flightID
WHERE f.departureTime > CURRENT_DATE  -- Flights not yet departed
GROUP BY t.ticketID
HAVING SUM(p.amount) > 1000;
```

---

#### **10. Create CustomerFlightDetails View**
```sql
CREATE VIEW CustomerFlightDetails AS
SELECT
    p.passengerID, p.fName, p.lName, p.email,
    f.flightID, f.flightNumber, f.departureTime, f.arrivalTime,
    t.ticketID, t.bookingDate, t.status, t.price,
    c.className AS seatClass
FROM Passenger p
JOIN Ticket t ON p.passengerID = t.userID
JOIN Flight f ON t.flightID = f.flightID
JOIN Class c ON t.classID = c.classID;
```

---
