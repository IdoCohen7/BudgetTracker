# Expense Tracker Project

## Tech Stack

### Backend

- **EntityFramework Core:** Modeling relationships between entities and connecting to SQL Server.
- **FluentValidation:** Implementing validation logic for user registration and expense creation.
- **BCrypt.Net:** Secure password hashing for database storage.
- **JwtBearer:** Implementing authentication and authorization mechanisms.
- **Mapster:** Efficient mapping between internal models and Data Transfer Objects (DTOs).

### Frontend

- **React-Bootstrap:** UI library used for building responsive components throughout the application.
- **Axios:** Managing API requests and communication with the server.
- **Recharts:** Visualizing data through interactive charts.
- **React-Router-Dom:** Handling seamless client-side navigation.

---

## Architectural Decisions

### Backend

The system is built around two primary entities: **User** and **Expense**.

- **Relationships:** Established a **One-to-Many** relationship, where each expense belongs to a single user, and a user can manage multiple expenses.
- **Category Management:** The expense category is stored as an **Enum**, ensuring data integrity by restricting input to a predefined set of options.
- **Encapsulation:** Used **DTOs** to prevent exposing the internal database schema and to bundle API request data.
- **Layered Architecture:** Clear separation of concerns was implemented:
  - **DbContext:** Manages the connection to the database.
  - **Service Layer:** Contains the business logic and is injected where needed.
  - **Controllers:** Responsible solely for exposing Endpoints and returning HTTP responses.
- **Data Validation:** Utilized specialized validators to verify the format of incoming data for registration and expense creation POST requests.

### Frontend

- **State Management:** Utilized **Context API** to manage expense data fetched from the server. (An AuthContext would be implemented for broader user-data requirements).
- **Layered Structure:** Separated the **API layer** (Axios configuration) from the **Service layer** (methods matching the backend controllers).
- **Code Reusability:** Repeated logic was extracted into a **Utils** file to prevent code duplication and maintain a clean codebase.

---

## Installation & Setup

### Prerequisites

- .NET 8 SDK
- Node.js (LTS version)
- SQL Server

### Backend Setup

1. Navigate to the `/api` directory.
2. Update the `ConnectionStrings` in `appsettings.json`.
3. Run `dotnet ef database update` to create the database schema.
4. Run `dotnet run` to start the server.

### Frontend Setup

1. Navigate to the `/client` directory.
2. Run `npm install` to install dependencies.
3. Run `npm start` to launch the development server.
4. Make sure that the env file matches your api endpoint url.
