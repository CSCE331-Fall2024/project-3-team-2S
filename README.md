# Restaurant POS/Kiosk System

## Project Overview

A full-stack restaurant POS and kiosk management system that allows restaurant staff to manage orders, track sales, and provide an interactive self-ordering experience for customers with built in accessibility features. This system includes a customer-facing kiosk for ordering, a cashier portal for order management, and manager tools for analyzing sales data and restaurant inventory data.

## Problem Statement

Restaurants need efficient and user-friendly systems to manage orders, track inventory, and enhance customer service through self-ordering kiosks. Our solution aims to streamline restaurant operations by automating order processing, reducing human error, and providing real-time sales analytics, ultimately improving both staff efficiency and customer satisfaction.

## Features

- **Customer Kiosk**: Interactive self-ordering kiosk interface with support for Google Authentication, customizing orders, viewing reward promotions, and placing orders.
- **Cashier POS**: Point-of-sale interface for restaurant staff to manage incoming orders, update menu items, and handle payments.
- **Order Management**: Real-time tracking and display of orders for staff.
- **Inventory Management**: System to track stock levels and generate alerts for low inventory items.
- **Sales Statistics**: Reporting tools to analyze sales, track performance metrics, and generate financial reports.
- **Machine Translation**: Utilization of Google Translate for website translation to improve accessibility.
- **Weather API**: Current location weather data sourced from OpenWeatherAPI to estimate customer turnout.
## Technologies Used

### Frontend:
- **React.js**: For building the user interfaces for both the customer kiosk and staff POS.
- **CSS**: Custom styling for the UI components.
- **Vercel**: Hosting platform for the frontend application.

### Backend:
- **Express.js**: RESTful API to handle requests and business logic.
- **Node.js**: Backend runtime environment for API server.
- **PostgreSQL**: Database for storing orders, menu items, user accounts, and inventory.
- **AWS**: Hosting the backend infrastructure and database instance.

### DevOps/Other:
- **Google Sheets**: Agile project management and issue tracking.
- **Git**: Version control and team collaboration.
- **Vercel**: Continuous deployment of the frontend.
- **AWS**: Hosting for the backend services and PostgreSQL database.

## Getting Started

### Prerequisites

- **Node.js** v14.x or higher
- **PostgreSQL** 13.x or higher
- **Git**
  
### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/repository-name.git
   cd repository-name
   ```
   
2. Install dependencies for both backend and frontend:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
   
3. Setup
   ```bash
   DB_HOST=your-db-host
   DB_USER=your-db-username
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   ```
   
4. Start the backend and frontend servers:
   ```bash
   cd server
   npm start
   cd ../client
   npm start
   ```

5. Access the system on localhost:3000 for the frontend.

## Acknowledgments

- **React** for making the UI easy to build and scale.
- **PostgreSQL** for providing a reliable database for handling orders and inventory.
- **AWS** for hosting and supporting the application infrastructure.
- **OpenWeatherAPI** for providing weather data and services.
- **Clerk** for simplifying Google Authentication integration.
- **Google Translate** for powering machine translation on the website.




