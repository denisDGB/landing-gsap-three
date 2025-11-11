# 📧 Configuración del Formulario de Contacto por Email

El formulario de contacto ahora envía mensajes directamente a tu correo electrónico usando **Web3Forms**.

---

## 🔧 Pasos para configurar:

### 1️⃣ **Obtener tu Access Key (API Key)**

1. Ve a: **https://web3forms.com/**
2. En la página principal, ingresa tu email: **denis17.hnd@gmail.com**
3. Haz clic en **"Get Started"** o **"Create Access Key"**
4. Revisa tu correo y confirma tu email
5. Copia tu **Access Key** (se verá algo así: `a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890`)

---

### 2️⃣ **Agregar el Access Key al código**

1. Abre el archivo: `frontend/src/components/Contact.js`
2. En la línea **74**, reemplaza `"YOUR_ACCESS_KEY_HERE"` con tu Access Key:

```javascript
// Antes:
const accessKey = "YOUR_ACCESS_KEY_HERE";

// Después:
const accessKey = "a1b2c3d4-e5f6-7890-a1b2-c3d4e5f67890"; // Tu clave aquí
```

---

### 3️⃣ **Probar el formulario**

1. Guarda los cambios
2. Recarga tu página web
3. Llena el formulario de contacto
4. Haz clic en **"Enviar mensaje"**
5. ¡Deberías recibir el email en tu bandeja de entrada!

---

## ✅ **Ventajas de Web3Forms:**

- ✅ **Gratis** hasta 250 mensajes/mes
- ✅ **Sin backend** necesario
- ✅ **Sin dependencias** adicionales
- ✅ **Protección anti-spam** incluida
- ✅ **Respuestas automáticas** opcionales
- ✅ **Compatible con Vercel**

---

## 📩 **Formato del email que recibirás:**

```
De: nombre@ejemplo.com
Asunto: Nuevo mensaje de Juan Pérez desde tu portfolio

Nombre: Juan Pérez
Email: nombre@ejemplo.com

Mensaje:
Hola, me gustaría hablar sobre un proyecto...
```

---

## 🔐 **Seguridad:**

- Tu Access Key es pública (se expone en el frontend)
- Web3Forms valida que solo puedas recibir emails en el correo registrado
- Incluye protección contra spam y bots
- Puedes regenerar tu clave en cualquier momento desde el dashboard

---

## 🆘 **¿Problemas?**

Si no te llegan los emails:

1. Verifica que copiaste bien el Access Key
2. Revisa tu carpeta de SPAM
3. Confirma que verificaste tu email en Web3Forms
4. Revisa la consola del navegador (F12) para ver errores

---

## 📝 **Notas adicionales:**

- Los emails se envían inmediatamente
- Puedes personalizar el asunto en la línea 88 de `Contact.js`
- Puedes agregar más campos (teléfono, empresa, etc.) si lo necesitas
- Web3Forms también soporta archivos adjuntos

---

## 🔄 **Revertir a WhatsApp:**

Si quieres volver a usar WhatsApp, revierte el commit:

```bash
git revert HEAD
```

O restaura el código anterior manualmente.

---

**¡Listo! Ahora recibirás todos los mensajes de contacto directamente en tu email.** 📧✨

