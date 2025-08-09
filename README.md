# 📝 BloggedIn  

A modern, responsive **full-stack blog platform** built with **React 19, Vite 7, Tailwind CSS 4, Redux Toolkit, React Router v7, and Appwrite**.  
Features authentication, rich-text post creation, image uploads, protected routes, and a polished UI for a smooth blogging experience.  

## 🚀 Features  
- 🔑 Email/password signup & login (Appwrite Auth)  
- 📝 Create, edit, delete, and view posts (Appwrite Database)  
- 🎨 Rich-text editor with image upload (TinyMCE + Appwrite Storage)  
- 🛡 Protected routes with custom layout  
- ⚡ State management via Redux Toolkit  
- 📱 Fully responsive Tailwind UI  
- ⏳ Loading skeletons & micro-interactions  

## 🛠 Tech Stack  
- **Frontend:** React 19, Vite 7, Tailwind CSS 4  
- **State Management:** Redux Toolkit, React Redux  
- **Routing:** React Router v7  
- **Backend:** Appwrite (Auth, Database, Storage)  
- **Editor:** TinyMCE React

## 🐞 Troubleshooting  
- **401 Errors:** Check Appwrite collection & bucket permissions  
- **CORS Issues:** Add your dev/prod URLs in Appwrite Platforms  
- **Env Not Loading:** Ensure keys have `VITE_` prefix & restart dev server  
- **Empty Home Page:** Make sure posts have `status = "active"`  

## 📦 Deployment  
Compatible with **Vercel**, **Netlify**, **Render**  
- Set `VITE_*` environment variables in hosting platform  
- Add your production domain in Appwrite Platforms (CORS whitelist)  


## 📦 Installation  
```bash
# Clone repo
git clone https://github.com/your-username/bloggedin.git
cd bloggedin

# Install dependencies
npm install

# Run dev server
npm run dev
```
## ⚙️ Environment Setup  
Create `.env` in project root:  

```env
VITE_APPWRITE_URL="https://YOUR-APPWRITE-ENDPOINT"
VITE_APPWRITE_PROJECT_ID="YOUR_PROJECT_ID"
VITE_APPWRITE_DATABASE_ID="YOUR_DATABASE_ID"
VITE_APPWRITE_COLLECTION_ID="YOUR_COLLECTION_ID"
VITE_APPWRITE_BUCKET_ID="YOUR_BUCKET_ID"
```
## 🌐 Live Demo  
[BloggedIn](https://blogged-rho.vercel.app/)







