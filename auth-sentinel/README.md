# 🛡️ Sentinel Auth Service

Um microsserviço de autenticação e emissão de credenciais leve, modular e focado em alta escalabilidade, com suporte a JWT (Access + Refresh tokens rotativos) e integração Redis.

![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![Docker](https://img.shields.io/badge/Docker-Supported-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Funcionalidades

- **Autenticação Stateless**: Assinatura e verificação via JWT.
- **Refresh Token Rotation**: Prevenção de reaproveitamento indevido de credenciais.
- **Validação de Payload**: Schemas estruturados e tipados via Zod.
- **Container Ready**: Dockerfile multi-stage e Docker Compose inclusos.

---

## 📦 Como Rodar Localmente

```bash
# Copie o arquivo de ambiente
cp .env.example .env

# Suba a stack inteira via Docker
docker compose up -d
```

Ou execute diretamente via Node:

```bash
npm install
npm run build
npm start
```

---

## 📡 Endpoints Principais

| Método | Rota | Descrição | Requer Auth |
| :--- | :--- | :--- | :---: |
| `GET`  | `/health` | Checagem de disponibilidade do serviço | ❌ |
| `POST` | `/api/v1/auth/login` | Emite access token e refresh token | ❌ |
| `GET`  | `/api/v1/auth/verify` | Validação de token em trânsito para Gateways | ✅ |
