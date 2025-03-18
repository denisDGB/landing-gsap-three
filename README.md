# 🚀 Freelancer Landing Page

Una landing page moderna y optimizada para freelancers, construida con **Next.js, Tailwind CSS, Express.js y PostgreSQL**. Diseñada para mostrar portafolios, servicios y facilitar el contacto con clientes.

## 🌟 Características
- 🔥 **Frontend:** Next.js con Tailwind CSS para diseño rápido y responsivo.
- ⚡ **Backend:** Express.js con PostgreSQL y Prisma ORM.
- 🧠 **IA:** OpenAI GPT-4 + Langchain para generar contenido dinámico.
- 📈 **SEO:** Meta tags dinámicas, Open Graph y Google Analytics.
- 📩 **Formulario de contacto:** Almacena mensajes en PostgreSQL.
- 🌍 **Despliegue:** Frontend en Vercel y Backend en Railway.

---

## 📌 Instalación y Configuración

### 1️⃣ Clonar el repositorio
```sh
 git clone https://github.com/tu-usuario/freelancer-landing.git
 cd freelancer-landing
```

### 2️⃣ Configurar el Backend
```sh
 cd backend
 npm install
 cp .env.example .env # Configurar variables de entorno
 npm run dev
```

### 3️⃣ Configurar el Frontend
```sh
 cd ../frontend
 npm install
 cp .env.example .env # Configurar variables de entorno
 npm run dev
```

---

## 📂 Estructura del Proyecto
```
freelancer-landing/
│── backend/          # Servidor Express.js con PostgreSQL y Prisma
│── frontend/         # Aplicación Next.js con Tailwind CSS
│── prisma/           # Esquema y migraciones de base de datos
│── .env.example      # Variables de entorno de ejemplo
│── README.md         # Documentación del proyecto
```

---

## ⚙️ Variables de Entorno
Crea un archivo `.env` en `backend/` y `frontend/` con las siguientes variables:

### Backend (`backend/.env`)
```env
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/freelancer_db
OPENAI_API_KEY=tu_clave_openai
```

### Frontend (`frontend/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## 🚀 Despliegue
### **Backend en Railway**
```sh
 railway up
```

### **Frontend en Vercel**
```sh
 vercel deploy
```

---

## 📬 Contacto
Si tienes dudas, contáctame en [tu-email@correo.com](mailto:tu-email@correo.com) o visita mi portafolio [aquí](https://tuportafolio.com).

---

### 📜 Licencia
MIT License. ¡Úsalo libremente y mejora tu presencia en línea! 🚀
