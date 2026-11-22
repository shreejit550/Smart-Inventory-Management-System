# 📦 Smart Inventory — AI-Powered Smart Inventory Management System & Point of Sale (POS)

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-5.1-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agentic_AI-FF6F00?style=for-the-badge&logo=python&logoColor=white)](https://langchain-ai.github.io/langgraph/)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-Vector_Store-FF4500?style=for-the-badge&logo=databricks&logoColor=white)](https://www.trychroma.com/)
[![Ollama](https://img.shields.io/badge/Ollama-Mistral_7B-000000?style=for-the-badge&logo=ollama&logoColor=white)](https://ollama.ai/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Media_CDN-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![AWS EC2](https://img.shields.io/badge/AWS-EC2_CI%2FCD-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white)](https://aws.amazon.com/ec2/)

---

## 📌 Executive Summary

**Smart Inventory Management System (ShopManager)** is an enterprise-grade, full-stack retail operations and agentic business intelligence platform. Engineered to modernize traditional brick-and-mortar storefronts, wholesale distributors, and retail enterprises, it unifies fast-paced **Point of Sale (POS)** transactions with autonomous **Agentic AI** querying and credit ledger ("Khata") bookkeeping.

Powered by a microservice-ready MERN stack and a Python **LangGraph + ChromaDB RAG** engine, the system enables retail merchants to seamlessly scan barcodes via device cameras, process instant checkouts, monitor stockout risks in real time, track customer and supplier dues, view embedded live MongoDB analytics charts, and interrogate their database using natural language queries without writing SQL or Mongo aggregations.

---

## 🚀 Key Highlights & Engineering Capabilities

* **🤖 Autonomous Agentic AI & RAG Query Engine**: A multi-node StateGraph engine built on **LangGraph**, **ChromaDB**, and **Mistral 7B (via Ollama)** that translates natural language inquiries into schema-validated, tenant-isolated MongoDB queries with deterministic fallback routing and zero hallucinations.
* **📷 Hardware-Free Optical Barcode & QR POS Scanner**: Integrated in-browser camera scanning powered by `qr-scanner` that matches physical product barcodes against inventory in real time for frictionless checkout.
* **🛡️ Atomic Stock Depletion & Overselling Guard**: Transactional stock checking safeguards that verify product stock levels on the server before committing invoices, preventing negative inventory states.
* **🧾 Dual Thermal Receipt & Vector PDF Invoicing**: High-fidelity invoice generation with instant client-side printing (`react-to-print`) and vectorized PDF receipt downloads (`jspdf`).
* **👥 Customer & Supplier Khata (Credit Ledger) Tracking**: End-to-end ledger accounting with partial deposit history, payment method audit trails (Cash, Card, Digital), and supplier invoice document storage via **Cloudinary CDN**.
* **📊 Live Embedded Telemetry & MongoDB Charts**: Real-time business intelligence dashboard powered by `@mongodb-js/charts-embed-dom` with auto-refreshing KPI streams (stock vs. reorder thresholds, shelf-life expiration, daily sales).
* **🔐 Multi-Tenant Data Isolation by Design**: Multi-tenant database partitioning where every document is bound to an authenticated `owner` email via JWT and Joi schema validation.
* **🐳 Production-Grade Containerization & CI/CD**: Dockerized multi-stage builds orchestrating Vite, Express, and an Nginx reverse-proxy gateway, deployed automatically to **AWS EC2** via GitHub Actions.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Clients["Presentation Layer (Client SPA)"]
        UI["Storefront & POS Portal\n(React 18 + Vite :5173)"]
        Scanner["Optical Barcode / QR Scanner\n(HTML5 Canvas / WebRTC)"]
        Charts["MongoDB Charts SDK\n(Live Auto-Refreshing Visuals)"]
    end

    subgraph Gateway["Reverse Proxy / Ingress Layer"]
        Nginx["Nginx Reverse Proxy Gateway (:80)\n/ -> Frontend | /myapi/ -> Backend API"]
    end

    subgraph CoreBackend["Application & Business Logic Tier"]
        ExpressAPI["Node.js / Express 5 REST API (:3000)\nAuth | Inventory | Invoicing | Ledger | Profiles"]
        AuthMid["JWT Verification & Joi Schema Validation"]
        CloudinaryMid["Multer + Cloudinary Media Pipeline"]
    end

    subgraph IntelligenceTier["Agentic AI & Knowledge Base Tier"]
        RouterNode["Router Node\n(Keyword & Intent Classifier)"]
        PlannerNode["Planner Node\n(Mistral 7B via Ollama + Pydantic Schema)"]
        MongoExec["MongoExecutor\n(Owner-Scoped Database Queries)"]
        ResponseNode["Response Synthesizer\n(Anti-Hallucination RAG Grounding)"]
        VectorDB[("ChromaDB Vector Store\n(Nomic-Embeddings + Business Rules)")]
    end

    subgraph PersistenceCloud["Data Persistence & CDN Cloud"]
        MongoDB[("MongoDB Atlas Cloud Database\nUsers | Products | Bills | Customers | Suppliers")]
        Cloudinary["Cloudinary CDN\nSupplier Invoices & Receipts"]
    end

    subgraph Infrastructure["DevOps & Cloud Hosting"]
        GitHubActions["GitHub Actions CI/CD Pipeline"]
        AWSEC2["AWS EC2 Linux Host (Docker Compose)"]
    end

    UI -->|HTTP / JSON| Nginx
    Scanner --> UI
    Charts --> MongoDB
    Nginx -->|Proxy Pass /myapi/| AuthMid
    AuthMid --> ExpressAPI
    ExpressAPI --> MongoDB
    ExpressAPI --> CloudinaryMid --> Cloudinary

    UI -.->|Conversational Query| RouterNode
    RouterNode -->|Direct Reply| ResponseNode
    RouterNode -->|DB Action| PlannerNode
    PlannerNode -->|Structured Query Plan| MongoExec
    MongoExec -->|Safe find| MongoDB
    MongoExec --> ResponseNode
    VectorDB -.->|Schema & Domain Context| ResponseNode
    ResponseNode -->|Actionable Answer| UI

    GitHubActions -->|Automated SSH Deployment| AWSEC2
```

---

## 💻 Tech Stack Deep Dive

| Layer | Technologies | Justification & Use Case |
| :--- | :--- | :--- |
| **Frontend SPA** | React 18.3, Vite 6.2, Tailwind CSS 3.4, Ant Design (`antd`), Framer Motion, Lucide Icons | High-performance client with sub-second Hot Module Replacement, modular layout, responsive component transitions, and modern UI primitives. |
| **Hardware & POS** | `qr-scanner`, `react-qr-barcode-scanner`, `jspdf`, `react-to-print`, `react-datepicker` | Zero-hardware in-browser camera scanning, instant invoice thermal printing, vectorized PDF generation, and date-range filtering. |
| **Backend REST API** | Node.js 20.x, Express.js 5.1 (ES Modules), Mongoose 8, JWT, Joi, Bcrypt | Asynchronous event loop, strictly typed validation pipelines, secure password hashing, and stateless token-based authorization. |
| **Agentic AI & LLMs** | Python 3.10+, LangGraph, LangChain, Ollama (Mistral 7B), Pydantic V2 | Multi-node state machine enabling deterministic intent routing, structured MongoDB filter generation, and reliable autonomous planning. |
| **Vector DB & RAG** | ChromaDB, `nomic-embed-text` Embeddings | Persistent localized vector embeddings of shop schema relationships, calculation rules, and business guidelines for grounded generation. |
| **Database & CDN** | MongoDB Atlas, Cloudinary Cloud SDK, Multer | Horizontally scalable cloud document database, multipart image processing, and secure cloud storage for supplier invoices. |
| **Analytics & BI** | `@mongodb-js/charts-embed-dom` SDK | Embedded interactive dashboards displaying real-time financial telemetry, stock levels, and transaction distribution. |
| **DevOps & Ingress** | Docker, Docker Compose, Nginx (Alpine), Linux | Containerized multi-stage builds, reverse-proxy gateway routing `/` and `/myapi/`, caching, and isolated runtime environments. |
| **CI/CD Pipeline** | GitHub Actions (`deploy.yml`), SSH, Rsync, AWS EC2 | Zero-downtime automated deployment to production EC2 instances on every push to the `main` branch. |

---

## 🧠 Machine Learning & Agentic AI Architecture

The inventory intelligence module is engineered as an autonomous **LangGraph** StateGraph rather than an unstructured single-prompt chain. It eliminates hallucinations by decoupling reasoning, planning, and database execution.

```mermaid
sequenceDiagram
    autonumber
    actor Merchant as Store Owner / Operator
    participant UI as React POS / Chat Interface
    participant Router as Router Node
    participant Planner as Planner Node (Mistral 7B)
    participant Executor as MongoExecutor (Tenant Scoped)
    participant Response as Response Synthesizer
    participant VectorDB as ChromaDB (Domain RAG)
    participant Atlas as MongoDB Atlas Cloud

    Merchant->>UI: Natural Language Query (e.g., "Show low stock products and today's sales")
    UI->>Router: Invoke StateGraph(query, owner_id)
    alt Fast-Path Conversational Query (e.g., "Hello", "How do I use this?")
        Router-->>Response: Bypass Planner & Executor (Zero DB Load)
    else Operational / Database Query
        Router->>Planner: Route to Planner Node
        Note over Planner: Pydantic Output Parser constrains JSON intents
        Planner->>Planner: Generate parameter MongoDB filters for Mistral
        Planner-->>Executor: Validated Intents: [{collection, query}]
        Executor->>Atlas: Execute find() with injected {owner: owner_id}
        Atlas-->>Executor: Verified Document Results
        Executor->>Response: Forward DB Document Context
        Response->>VectorDB: Query Semantic Similarity (Business Rules & Relations)
        VectorDB-->>Response: Relevant Markdown Rule Snippets
    end
    Response-->>UI: Concise, Grounded Answer with Real Business Numbers
    UI-->>Merchant: Actionable Inventory Intelligence
```

### LangGraph State Machine Specifications
* **State Schema (`InventoryState`)**: Typed state tracking the incoming `query`, authenticated `owner_id`, dynamically generated `plan`, database payloads `db_results`, vector `rag_context`, and final `response`.
* **Deterministic Router (`router_node`)**: Evaluates keywords (`stock`, `bill`, `customer`, `supplier`, `price`, `expir`) to skip LLM overhead for non-data inquiries.
* **Pydantic Planner (`planner_node`)**: Prompts Mistral to emit structured JSON complying with a strict `Plan` model containing `Intent` arrays (`intent`, `collection`, `query`).
* **Multi-Tenant Injection-Proof Executor (`executor_node`)**: Enforces collection whitelisting (`products`, `bills`, `customers`, `suppliers`, `users`) and programmatically enforces `safe_query["owner"] = owner_id` before executing PyMongo queries.
* **Grounded Synthesizer (`response_node`)**: Applies strict anti-hallucination prompting: only numbers present in `db_results` may be uttered, returning *"No inventory data available"* when records are empty.

---

## 🌟 Core Application Modules

### 1. 🛒 POS & Camera Barcode Billing Terminal
* **In-Browser Barcode & QR Reader**: Scans physical barcodes via webcam or mobile camera to identify SKUs instantaneously.
* **Dynamic Cart Management**: Auto-calculates quantities, line-item totals, and net bill amounts.
* **Inventory Deduction**: Atomically validates stock availability and decrements inventory records upon transaction completion.
* **Print & Export**: Built-in thermal printer styling and vector PDF export for customer receipts.

### 2. 📦 Real-Time Inventory & Stock Lifecycle
* **SKU Intake & Cataloging**: Track product name, category, supplier, purchase cost (`actualPrice`), markup (`sellingPrice`), and shelf-life expiration date.
* **Reorder Level Monitoring**: Automated warning triggers when product count drops beneath configured threshold levels.
* **Instant Filter Search**: Multi-field regex search across product names, categories, and suppliers.

### 3. 👥 Customer Credit ("Khata") & Deposit Ledger
* **Credit Sale Tracking**: Support for deposit down-payments and ongoing customer debit balances.
* **Transaction History**: Audit trail logging payment dates, payment modes (Cash, Card, Digital), and installment history.
* **Customer Directory**: Central customer registry with quick phone lookup and balance summaries.

### 4. 🚚 Supplier Accounting & Cloud Document CDN
* **Supplier Ledger**: Log total purchase commitments, paid installments, and outstanding liabilities per vendor.
* **Cloudinary Receipt Storage**: Direct upload and storage of physical delivery notes and vendor paper invoices via Multer and Cloudinary Cloud CDN.

### 5. 📊 Live Business Intelligence & MongoDB Charts
* **Embedded Analytics SDK**: Live visual analytics rendered directly from MongoDB Atlas Charts.
* **Key Executive Visualizations**:
  * *Stock Levels vs. Reorder Thresholds* (Identifies impending stockouts).
  * *Expiration Date Monitoring* (Minimizes inventory spoilage and waste).
  * *Daily & Monthly Revenue Trajectories* (Tracks financial velocity).
  * *Top-Selling SKUs & Product Volume* (Optimizes purchasing strategy).

---

## 🗄️ Database Architecture & Schemas

```mermaid
erDiagram
    USER ||--o{ PRODUCT : owns
    USER ||--o{ BILL : generates
    USER ||--o{ CUSTOMER : manages
    USER ||--o{ SUPPLIER : tracks
    CUSTOMER ||--o{ BILL : receives
    PRODUCT ||--o{ BILL : "included in"

    USER {
        ObjectId _id PK
        string name
        string email UK
        string password "Bcrypt Hashed (Salt 10)"
        string phoneNumber
        date lastSMSNotificationDate
        date createdAt
        date updatedAt
    }

    PRODUCT {
        ObjectId _id PK
        string owner FK "User Email"
        string name
        string category
        number actualPrice
        number sellingPrice
        number quantity
        number reorderLevel
        string supplier
        date expirationDate
        date dateAdded
        date dateUpdated
    }

    BILL {
        ObjectId _id PK
        string owner FK "User Email"
        string customerName
        string billNumber UK "BILL-Timestamp"
        string customerId FK
        string phoneNumber
        number deposit
        array items "Itemized Products Array"
        number grandTotal
        number netQuantity
        array history "Ledger Payments"
        date date
    }

    CUSTOMER {
        ObjectId _id PK
        string owner FK "User Email"
        string customerName
        string phoneNumber
        date createdAt
        date updatedAt
    }

    SUPPLIER {
        ObjectId _id PK
        string owner FK "User Email"
        string supplierName
        number totalPayment
        number depositAmount
        string imageUrl "Cloudinary CDN URL"
        string Date
        date createdAt
        date updatedAt
    }
```

---

## 📸 Screenshots Showcase

A visual walkthrough of the platform's multi-functional retail interfaces:

| POS Bill Generator & Optical Scanner | Real-Time Sales & Revenue Analytics |
|:---:|:---:|
| ![Bill Generator](Frontend/public/billgen.png) | ![Sales Dashboard](Frontend/public/sales.png) |

| Dynamic Inventory Catalog & Search | Invoice Archive & Date Breakdown |
|:---:|:---:|
| ![Product Catalog](Frontend/public/productlist.png) | ![Show Bill](Frontend/public/showbill.png) |

| Product Stock Intake & Pricing | Store Branding & System Overview |
|:---:|:---:|
| ![Add Product](Frontend/public/addproduct.png) | ![Logo](Frontend/public/logo.gif) |

---

## 🔌 API Reference Guide

### 🔐 Store Owner Authentication (`/api`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/sign-up` | Register new store owner (`name`, `email`, `password`, `phoneNumber`) | Public |
| `POST` | `/api/login` | Authenticate merchant and issue signed JWT bearer token | Public |
| `GET` | `/api/profile` | Retrieve store profile information | Authenticated (JWT) |
| `PUT` | `/api/profile` | Update store contact details and business name | Authenticated (JWT) |

### 📦 Inventory Control (`/api/inventory`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/inventory/add` | Create new SKU with reorder levels and supplier metadata | Authenticated (JWT) |
| `GET` | `/api/inventory/list` | Retrieve product list with optional `?search=` filter | Authenticated (JWT) |
| `PUT` | `/api/inventory/update-product/:id` | Update stock quantity, cost price, and selling price | Authenticated (JWT) |
| `DELETE`| `/api/inventory/delete/:id` | Remove SKU record from catalog | Authenticated (JWT) |

### 🧾 POS & Invoicing (`/api/bill`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/bill/create` | Process cart, atomically decrement stock, issue bill | Authenticated (JWT) |
| `GET` | `/api/bill/getbill` | Fetch historical bills issued by authenticated owner | Authenticated (JWT) |
| `PUT` | `/api/bill/update/:billId` | Record incremental deposit payment against credit invoice | Authenticated (JWT) |
| `GET` | `/api/bill/dashdata` | Compute aggregated KPIs (daily sales, revenue, low stock) | Authenticated (JWT) |

### 👥 Customer Ledger (`/api/customer`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/customer/add` | Onboard customer profile (`customerName`, `phoneNumber`) | Authenticated (JWT) |
| `GET` | `/api/customer/all` | List all registered customers under merchant account | Authenticated (JWT) |

### 🚚 Supplier Management (`/api/supplier`)
| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/supplier/supplier-data` | Log vendor purchase commitment with Cloudinary invoice upload | Authenticated (JWT) |
| `GET` | `/api/supplier/suppliers` | List all suppliers, payment history, and pending dues | Authenticated (JWT) |

### 🤖 Agentic AI Service (LangGraph Microservice)
| Channel | Function / Query | Description | Access |
| :--- | :--- | :--- | :--- |
| `CLI / Socket` | `graph.invoke({"query": "...", "owner_id": "..."})` | StateGraph execution returning grounded business intelligence | Tenant-Scoped |

---

## ⚙️ Local Installation & Development Setup

### 📋 Prerequisites
* **Node.js** v18+ or v20+ (`node -v`)
* **Python** 3.10+ (`python --version`)
* **Git** (`git --version`)
* **MongoDB Atlas** database connection URI
* **Cloudinary** account credentials
* **Ollama** installed with `mistral` and `nomic-embed-text` models

---

### Step 1: Clone the Repository
```bash
git clone https://github.com/shreejit550/Smart-Inventory-Management-System.git
cd Smart-Inventory-Management-System
```

---

### Step 2: Configure Environment Variables

#### 1. Backend (`backend/.env`)
```env
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/inventry
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### 2. Frontend (`Frontend/.env`)
```env
backend_url=http://localhost:3000
```

#### 3. GenAI Agent (`GenAI/.env`)
```env
OLLAMA_URL=http://localhost:11434
LLM_MODEL=mistral
EMBED_MODEL=nomic-embed-text
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/inventry
```

---

### Step 3: Start Services (Multi-Terminal Setup)

Open 3 separate terminal windows in your root directory:

#### 🖥️ Terminal 1 — Backend REST API
```bash
cd backend
npm install
npm run server
# Running on http://localhost:3000
```

#### 🖥️ Terminal 2 — GenAI Agent & RAG Pipeline
```bash
cd GenAI
python -m venv venv

# Windows:
.\venv\Scripts\activate
# macOS/Linux:
# source venv/bin/activate

pip install -r requirements.txt

# Ensure Ollama models are pulled
ollama pull mistral
ollama pull nomic-embed-text

# Build the vector store knowledge base
python rag/build_rag.py

# Launch interactive CLI agent
python main.py
```

#### 🖥️ Terminal 3 — Frontend Storefront & POS Portal
```bash
cd Frontend
npm install
npm run dev
# Running on http://localhost:5173
```

---

## 🐳 Docker Deployment Setup

The repository contains a production-grade multi-stage `dockerfile` and `docker-compose.yml` configuring an Nginx reverse proxy gateway routing traffic seamlessly between frontend and backend.

```bash
# Build and spin up containerized services
docker-compose up --build -d

# Check running container health
docker-compose ps

# Stream live container logs
docker-compose logs -f
```

* **Frontend Web Application:** `http://localhost/`
* **Backend API Gateway Proxy:** `http://localhost/myapi/`

---

## 🚢 CI/CD & Cloud Deployment (AWS EC2)

The application utilizes an automated Continuous Deployment pipeline configured in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that pushes updates live to an **AWS EC2** instance upon every merge to `main`.

```
 [ git push origin main ]
            │
            ▼
 ┌────────────────────────────────────────────────────────┐
 │             GitHub Actions Runner (Ubuntu)             │
 ├────────────────────────────────────────────────────────┤
 │ 1. Checkout repository code                            │
 │ 2. Decrypt & configure SSH private key                 │
 │ 3. Rsync project files to AWS EC2 instance             │
 └──────────────────────────┬─────────────────────────────┘
                            │
                            ▼
 ┌────────────────────────────────────────────────────────┐
 │                      AWS EC2 Host                      │
 ├────────────────────────────────────────────────────────┤
 │ • sudo docker compose down                             │
 │ • sudo docker compose build --no-cache                 │
 │ • sudo docker compose up -d                            │
 │ • sudo docker system prune -af (clean unused layers)   │
 └────────────────────────────────────────────────────────┘
```

---

## 🛡️ Security & Reliability Implementations

* **Multi-Tenant Strict Isolation**: Every database interaction filters explicitly by `owner: req.user.email`. Cross-tenant data leakage is structurally impossible.
* **Sanitized JSON Serialization**: Mongoose user schema transforms strip password hashes before transmitting user objects.
* **Input Schema Validation**: Joi middleware intercepts invalid request payloads prior to controller execution, preventing NoSQL injection.
* **Cryptographic Passwords**: Passwords hashed with `bcrypt` (10 salt rounds).
* **Network Encapsulation**: Docker internal bridge network keeps the Express API unexposed to public ports; external traffic flows exclusively through Nginx.

---

## 🔮 Future Roadmap & Scalability Enhancements

- [ ] **Automated WhatsApp / SMS Invoicing**: Integration with Twilio API to automatically dispatch digital receipts to customer phone numbers.
- [ ] **Predictive Demand Forecasting**: Time-series machine learning models analyzing seasonal trends to forecast required restock quantities.
- [ ] **Multi-Store & Warehouse Mesh**: Multi-branch inventory transfers and role-based staff permission tiers (Cashier, Store Manager, Auditor).
- [ ] **Offline-First PWA Synchronization**: Service Worker and IndexedDB caching enabling offline POS checkout during network disruptions.

---

## 📄 License & Attribution

This project is licensed under the **MIT License**. Developed as an advanced full-stack & Agentic AI retail solution.

---

<p align="center">
  <b>Built with ❤️ for modern retail inventory control & intelligent business automation.</b>
</p>
