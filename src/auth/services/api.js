export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://avs-product-auth-be-4.onrender.com";

export const registerUser = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to register");
  }
  return response.json();
};

export const verifyUser = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify_user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to verify user");
  }
  return response.json();
};

export const loginUser = async (data) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login");
  }
  return response.json();
};

export const logoutUser = async (refreshToken, accessToken) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "authorization": `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to logout");
  }
  return response.json();
};
