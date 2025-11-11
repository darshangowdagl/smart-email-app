# 📧 Smart Email Assistant (Spring Boot + AI)

<div align="center" style="display: flex; align-items:center; justify-content:center; height:80px; margin-bottom:2rem">
  <img src="Frontend/public//Images/logo.svg" alt="Email Assistant Logo" width="150">
  <h1 style="font-size: 3rem; color: #d76578">NEUROMAIL</h1>
</div>

Welcome to the **NeuroMail- An AI-Enhanced Email Assistant** — a robust Spring Boot application leveraging the power of AI to streamline your email workflow. This system intelligently fetches and processes emails, offering valuable insights and automated actions through summarization, categorization, and reply suggestions. Built with modularity and scalability in mind, it adheres to several key design principles, including the **Strategy** and **Factory** patterns for its AI services.

---

## ✨ Key Features

* **📬 Smart Email Retrieval:** Effortlessly fetch unread emails from your email provider.
* **🧠 Intelligent AI Analysis:** Harness the power of AI for deep email understanding, including:
    * **📝 Summarization:** Get concise summaries of lengthy emails, saving you valuable time.
    * **🏷️ Categorization:** Automatically sort emails into meaningful categories for better organization.
    * **💬 Reply Suggestions:** Receive intelligent and context-aware suggestions for quick email responses.
* **🏗️ Clean and Scalable Architecture:** Follows the Model-View-Controller (MVC) design pattern for clear separation of concerns.
* **🧩 Pluggable AI Tasks:** The **Strategy Pattern** allows for easy addition and swapping of different AI functionalities without altering core logic.
* **🏭 Centralized AI Service Creation:** The **Factory Pattern** ensures a streamlined and maintainable approach to instantiating AI task strategies.
* **📂 Efficient Email Management:** Store and manage your processed emails effectively within the application.
* **🛡️ Secure Administration:** An admin panel provides comprehensive control over user accounts and email data.

---

## 🛠️ Technology Stack

| Layer           | Technology             |
|-----------------|------------------------|
| **Backend**     | Spring Boot, Java      |
| **AI Services** | Deepseek R1            |
| **Database**    | Atlas MongoDB          |
| **Build Tool**  | Maven, Pip, Npm        |
| **Frontend**    | ReactJS
---

## 🏛️ Architecture Overview

### Design Patterns

This application is designed with several key principles in mind to ensure maintainability, scalability, and flexibility:

* **Strategy Pattern:** Enables dynamic switching between various AI tasks (summarization, categorization, reply suggestion) at runtime. This promotes flexibility and extensibility.
* **Factory Pattern:** Centralizes the creation of different AI task strategy objects, decoupling the client code from the concrete implementations and simplifying the addition of new strategies.

### Design Principles

* **Single Responsibility Principle (SRP):** Each class and module in the application aims to have one specific responsibility. For example:
    * `EmailService` is responsible for email-related business logic (fetching, saving).
    * `UserService` handles user-related operations.
    * Individual `AiTaskStrategy` implementations are solely responsible for their specific AI task (summarization, etc.).
    This principle makes the codebase easier to understand, test, and modify, as changes in one area are less likely to affect others.
* **Open/Closed Principle (OCP):** The system is designed to be open for extension but closed for modification. This is primarily achieved through the **Strategy Pattern**. To add a new AI task, you create a new `AiTaskStrategy` implementation without needing to modify the existing `EmailService` or controller logic that utilizes the strategies. The **Factory Pattern** also supports this by allowing the creation of new strategy instances without altering the factory itself (ideally, with minimal changes).

### 📦 MVC Layers

* **Model:** Represents the application's data entities, such as `User`, `Email`, and `Inbox`.
* **View:** A web-based user interface for interacting with the application.
* **Controller:** Exposes RESTful APIs for handling email operations and triggering AI processing tasks.

---

## ⚙️ Setup Instructions

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-repo/email-assistant.git](https://github.com/your-repo/email-assistant.git)
    cd email-assistant
    ```

2.  **Configure Application Properties:**
    Navigate to the application's configuration file (usually `src/main/resources/application.properties` or `application.yml`) and update the following settings:
    ```properties
    spring.mail.username=your-email@example.com
    spring.mail.password=your-email-password
    ai.provider=openai
    # Add your OpenAI API key if required
    openai.api.key=YOUR_OPENAI_API_KEY
    ```
    **Note:** Ensure you replace the placeholder values with your actual email credentials and OpenAI API key (if applicable).

3.  **Run the Application:**
    Execute the following Maven command from the project's root directory to build and run the Spring Boot application:
    ```bash
    ./mvnw spring-boot:run
    ```
    Alternatively, you can build the JAR file and then run it:
    ```bash
    ./mvnw clean package
    java -jar target/email-assistant-0.0.1-SNAPSHOT.jar # Adjust the JAR name if needed
    ```

---

## 🤖 Supported AI Tasks

| Task                 | Description                                                           |
|----------------------|-----------------------------------------------------------------------|
| **Summarization**    | Generates concise summaries of long and detailed emails.              |
| **Categorization**   | Automatically classifies emails into relevant tags or folders.        |
| **Reply Suggestion** | Provides intelligent and context-aware suggestions for email replies. |

---

## 🛡️ Design Decisions Explained

Based on the class diagram, the following key design decisions have been made:

* **Strategy Pattern:** The diagram clearly employs the Strategy Pattern through the `EmailActionStrategy` interface and its implementations: `SummarizeStrategy`, `ReplySuggestionStrategy`, and `CategorizeStrategy`[cite: 1]. This pattern enables the `AlRecommendation` class to dynamically apply different email analysis actions. The `EmailActionFactory` is responsible for providing the appropriate strategy[cite: 1]. This design promotes flexibility, allowing for the addition of new analysis strategies without modifying the `AlRecommendation` class.

* **Factory Pattern:** The `EmailActionFactory` class serves as a Factory, encapsulating the logic for creating instances of `EmailActionStrategy` implementations[cite: 1]. This pattern decouples the client (`AlRecommendation`) from the concrete strategy classes and centralizes the strategy creation, making it easier to manage and extend the available analysis actions.

* **Single Responsibility Principle (SRP):**
    * Each `Strategy` class (`SummarizeStrategy`, `ReplySuggestionStrategy`, `CategorizeStrategy`) has a single responsibility: performing its specific type of email analysis[cite: 1].
    * The `EmailHandler` is responsible for sending and receiving emails[cite: 1].
    * The `AlRecommendation` class is responsible for analyzing emails using the provided strategies[cite: 1].
    * The `User` and `Admin` classes have distinct responsibilities related to user management and email administration respectively[cite:1].
    This separation of concerns enhances maintainability and reduces the risk of unintended side effects.

* **Open/Closed Principle (OCP):**
    * The Strategy Pattern, in conjunction with the Factory, supports the OCP.  The `AlRecommendation` class is open to being extended with new email analysis capabilities by adding new `EmailActionStrategy` implementations without requiring modification of its own code[cite: 1]. The `EmailActionFactory` facilitates the creation of these new strategies.
    * While not as direct in this diagram, the design allows for potential extension in other areas. For example, if new communication channels were needed,  `EmailHandler` could be extended or alternative handlers created.

* **Data Modeling:**
    * The diagram emphasizes a clear data model with classes like `Person`, `User`, `Email`, `Inbox`, and `Attachment`[cite: 1]. This promotes a structured approach to data management.
    * Relationships between classes, such as "owns," "contains," and "sends," define how data is related and accessed[cite: 1].

These design decisions, as reflected in the class diagram, contribute to a modular, flexible, and maintainable email assistant system.They facilitate the addition of new features and analysis strategies without compromising the system's integrity.

---

## 👨‍💻 Author

> Crafted with ❤️ by [Praneet, Kartik, Aayush, Kousthubh]
>
>

---