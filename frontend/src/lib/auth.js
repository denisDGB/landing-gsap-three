// ✅ src/lib/auth.js
export function getToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  } 
  
  export function logout() {
    localStorage.removeItem("token");
  }
  
  export function isLoggedIn() {
    return !!getToken();
  }  