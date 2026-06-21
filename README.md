# Mini CRM

## Project Description

Mini CRM is a Customer Relationship Management (CRM) web application developed using Java, Spring Boot, MySQL, HTML, CSS, and JavaScript.

The application helps businesses manage customer interactions by tracking leads, customers, follow-ups, and reports in a centralized system. It provides an easy-to-use interface for managing sales and customer data efficiently.

---

## Features

### User Authentication

* User Registration
* User Login
* Role-based user management (Admin / Employee)

### Lead Management

* Add new leads
* View all leads
* Delete leads
* Track lead status
* Store lead contact information

### Customer Management

* Add customers
* View customer records
* Delete customers
* Maintain customer contact details

### Follow-Up Management

* Schedule follow-ups
* Track follow-up dates
* Store follow-up notes
* Manage customer communication history

### Reports Dashboard

* Total Leads Count
* Total Customers Count
* Total Follow-Ups Count
* CRM summary statistics
* Business performance overview

---

## Technology Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Java
* Spring Boot
* Spring Data JPA

### Database

* MySQL

### Build Tool

* Maven

### IDE

* Visual Studio Code

## Project Structure

src/main/java/com/crm/minicrm

├── controller
│ ├── AuthController.java
│ ├── LeadController.java
│ ├── CustomerController.java
│ ├── FollowupController.java
│ └── ReportsController.java

├── entity
│ ├── User.java
│ ├── Lead.java
│ ├── Customer.java
│ └── Followup.java

├── repository
│ ├── UserRepository.java
│ ├── LeadRepository.java
│ ├── CustomerRepository.java
│ └── FollowupRepository.java

└── MinicrmApplication.java

---

## Database

Database Name:

minicrm_db

Main Tables:

* users
* leads
* customers
* followups

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Leads

```http
GET    /api/leads
POST   /api/leads
DELETE /api/leads/{id}
```

### Customers

```http
GET    /api/customers
POST   /api/customers
DELETE /api/customers/{id}
```

### Follow-Ups

```http
GET    /api/followups
POST   /api/followups
DELETE /api/followups/{id}
```

### Reports

```http
GET /api/reports
```

---

## Future Enhancements

* Edit / Update Operations
* Spring Security
* JWT Authentication
* Password Encryption
* Lead Conversion Tracking
* Dashboard Charts
* Export Reports to Excel/PDF

---

## Author

Lokesh Yerra

Mini CRM Project – Full Stack Web Development
