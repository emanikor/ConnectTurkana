 🚀 Mifugo: AI-Powered Livestock Market Intelligence

Mifugo is a localized, AI-driven economic dashboard designed to eliminate pricing asymmetry in Turkana County's open livestock markets. 

By integrating local Large Language Models (LLMs) with a robust microservice architecture, Mifugo allows NGOs and local officials to capture real-time pricing data, generate autonomous market analyses, and protect pastoralists from market exploitation—all designed to operate entirely offline in low-connectivity environments.

## 🏗️ Architecture & Tech Stack

This project is built using a modern, containerized AI-engineering stack:

* **Frontend:** React.js (Clean, user-centric dashboard for market visualization)
* **Backend:** Nodejs/python / FastAPI (High-performance, asynchronous API bridge)
* **Database:** PostgreSQL (Relational data storage, containerized)
* **AI Engine:** Ollama / Llama 3.2:1b (Local LLM inference for offline market analysis)
* **Infrastructure:** Docker & Docker Compose (Fully containerized microservices)

## ✨ Core Features

* **Local AI Inference:** Utilizes Llama 3.2 running locally via Ollama to analyze raw Postgres data and generate 2-sentence actionable business advice without requiring expensive cloud API calls.
* **Data Ingestion API:** Secure REST endpoints built with FastAPI and Pydantic validation to receive and sanitize livestock data from field enumerators.
* **Containerized Microservices:** The entire database, API server, and AI engine are isolated in Docker containers, ensuring the system can be deployed seamlessly to any environment.
* **User-Centric UI:** A dark-themed, high-contrast dashboard designed for quick data scanning and AI insight delivery.

## 📸 System Previews


* **Dashboard View:** `![Mifugo Dashboard](./mifugo-ui.png)`<img width="1600" height="726" alt="mif" src="https://github.com/user-attachments/assets/02f2c014-36f3-4224-86cb-360beafd7139" />

* **AI Terminal Output:** `![FastAPI AI Generation](./terminal-output.png)`<img width="1397" height="812" alt="status g" src="https://github.com/user-attachments/assets/94b88099-a016-4a33-90f6-0ce11033c787" />


## 🚀 How to Run Locally

Because the entire architecture is containerized, deployment is completely reproducible.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/mifugo.git](https://github.com/yourusername/mifugo.git)
    cd mifugo
    ```
2.  **Start the Database and AI Engine:**
    ```bash
    docker-compose up -d
    ```

3.  **Run the FastAPI Backend:**
    ```bash
    py -m uvicorn mifugo_api:app --reload --port 8000
    ```
4.  **Access the Documentation:**
    Navigate to `http://localhost:8000/docs` to view the interactive Swagger UI and test the AI endpoints.
