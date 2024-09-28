# IRCTC Design

## Overview

IRCTC is a web application built to manage train bookings and seat reservations for a railway system. It provides functionalities for users to book seats on trains, view their booking details, and for admins to manage train schedules and seat availability.

## Features

- User Authentication: Users can sign up, log in, and log out securely.
- Train Management: Admins can add, update, and delete train schedules.
- Seat Booking: Users can book seats on available trains.
- Booking History: Users can view their booking history and details.
- Redis Pub/Sub: Implements Redis Pub/Sub for handling seat booking requests asynchronously.

### Handling Race Conditions

To ensure that only one user can successfully book seats when multiple users attempt to book simultaneously, I implemented a concurrency control mechanism.

#### Approach

1. **Atomic Database Operations**: Utilized the transaction feature provided by the database to ensure that all database operations related to booking seats are atomic. This ensures that either all operations within a transaction are completed successfully, or none of them are.

2. **Redis Pub/Sub**: Employed Redis Pub/Sub to manage the booking requests. When a user initiates a booking request, it is published to a Redis channel. Only one instance of the booking service is subscribed to this channel, ensuring that booking requests are processed sequentially.

3. **Concurrency Handling in Code**: In the booking service code, I implemented error handling to detect and handle concurrency issues. If multiple booking requests are received simultaneously, only one request will be successfully processed, and the others will be rejected. This is achieved by using asynchronous functions and proper error handling mechanisms.



#### Benefits

- **Data Integrity**: By using atomic database operations and Redis Pub/Sub, we ensure data integrity and consistency even under high concurrency scenarios.
- **Improved User Experience**: Users experience fewer errors and a smoother booking process, as the system handles simultaneous booking requests effectively.

#### Future Improvements

- **Scaling**: As the application grows, we can further enhance scalability by deploying multiple instances of the booking service and load balancing the incoming requests.
- **Optimistic Concurrency Control**: Implementing optimistic concurrency control mechanisms can provide better performance and scalability by allowing concurrent access to data while maintaining data consistency.

## Technologies Used

- Node.js: Backend runtime environment.
- Express.js: Web framework for Node.js.
- MySQL: Relational database for storing user, train, and booking data.
- Redis: In-memory data structure store used for caching and message queue.
- Docker: Containerization for easier deployment and scalability.
- Docker Compose: Tool for defining and running multi-container Docker applications.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rj416/Ticket_Booking.git
   ```
2. Navigate to the project directory:
   ```bash
   cd IRCTC_Design
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables:

- Create a `.env` file in the root directory.
- Add the required environment variables such as `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `REDIS_HOST`, `REDIS_PORT`, etc.

5. Run the application:

   ```bash
   node server.js
   ```

6. Access the application in your web browser at [http://localhost:3000](http://localhost:3000).




