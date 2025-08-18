# omnichat-bot

A cinema expert chatbot powered by Node.js, TypeScript, and a Large Language Model to answer all your movie-related questions.

## Features

- **Interactive Chatbot**: Engage with an AI-powered chatbot to get answers to your movie-related questions.
- **Movie Information Retrieval**: Utilizes the TMDB API to fetch details about movies, including popular movies, movie cast, movie details, similar movies, and movies by genre.
- **Content Moderation**: Includes guardrails to filter inappropriate content and ensure responses are cinema-related.
- **Scalable Architecture**: Built with Node.js and TypeScript, following a clear separation of concerns (controllers, services, middlewares).
- **Docker Support**: Easily deployable using Docker and Docker Compose.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Express.js**: Fast, unopinionated, minimalist web framework for Node.js.
- **LangChain**: Framework for developing applications powered by language models.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **ESLint & Prettier**: For code linting and formatting.
- **Docker & Docker Compose**: For containerization and orchestration.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)
- Docker (optional, for containerized deployment)

### Environment Variables

Create a `.env` file in the root directory of the project based on `.env.example` and fill in your API keys:

```
PORT=3000
TMDB_API_KEY=YOUR_TMDB_API_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
OPENAI_API_KEY=YOUR_OPENAI_API_KEY # Required for content moderation and cinema relation check
```

- `PORT`: The port on which the server will run (default: 3000).
- `TMDB_API_KEY`: Your API key for The Movie Database (TMDB) API.
- `GEMINI_API_KEY`: Your API key for the Gemini API (used by LangChain).
- `OPENAI_API_KEY`: Your API key for OpenAI API (used for content moderation and checking if the LLM response is cinema-related).

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/omnichat-bot.git
    cd omnichat-bot
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

#### Development Mode

To run the application in development mode with hot-reloading:

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or your specified PORT).

#### Production Mode

First, build the TypeScript project:

```bash
npm run build
```

Then, start the compiled application:

```bash
npm start
```

#### Using Docker

Ensure Docker and Docker Compose are installed. From the project root:

```bash
docker-compose up --build
```

This will build the Docker image and start the container. The application will be accessible on `http://localhost:3000`.

## API Endpoints

The chatbot exposes the following API endpoint:

### `POST /api/chatbot`

Sends a query to the chatbot and receives a movie-related response.

-   **Request Body**:
    ```json
    {
        "query": "What are the most popular movies right now?"
    }
    ```
-   **Response**:
    ```json
    {
        "response": "The most popular movies right now are..."
    }
    ```
-   **Error Responses**:
    -   `400 Bad Request`: If the `query` parameter is missing or invalid.
    -   `403 Forbidden`: If the response is flagged by content moderation or is not cinema-related.
    -   `500 Internal Server Error`: For unexpected server errors.

## Code Quality

### Linting

To lint the codebase:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint:fix
```

### Formatting

To format the code using Prettier:

```bash
npm run format
```

## Project Structure

```
omnichat-bot/
├───src/
│   ├───app.ts             # Main application entry point
│   ├───routes.ts          # API route definitions
│   ├───controllers/       # Handles incoming requests and sends responses
│   ├───errors/            # Custom error definitions
│   ├───middlewares/       # Express middleware functions (e.g., error handling, guardrails)
│   ├───prompts/           # Stores LLM prompt templates
│   ├───services/          # Business logic and external API integrations (e.g., TMDB, Chatbot logic)
│   ├───tools/             # LangChain tools for the chatbot
│   └───types/             # TypeScript type definitions
├───.env.example           # Example environment variables
├───docker-compose.yml     # Docker Compose configuration
├───Dockerfile             # Docker build instructions
├───package.json           # Project metadata and dependencies
├───tsconfig.json          # TypeScript configuration
└───...
```

## License

This project is licensed under the ISC License. See the `LICENSE` file for details. (Note: A `LICENSE` file is not included in the provided context, you might want to create one.)