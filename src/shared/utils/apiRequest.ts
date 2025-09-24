// src/shared/apiRequest.ts
export const apiRequest = async (url: string, options: RequestInit = {}) => {
  // Get token from localStorage
  const token = localStorage.getItem("accessToken");

  // Inject Authorization header if token exists
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(url, options);

    // Auto logout if token expired (401)
    if (response.status === 401) {
      localStorage.removeItem("accessToken");
      alert("Sessiyanız bitib, zəhmət olmasa yenidən daxil olun.");
      window.location.href = "/signin";
      throw new Error("Unauthorized – token expired");
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Request failed");
    }

    // Return JSON if possible
    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return response.json();
    }
    return null;
  } catch (err) {
    console.error("API request error:", err);
    throw err;
  }
};
