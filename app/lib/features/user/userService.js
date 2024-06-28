import { baseUrl } from "../../../utils/config";
const registerUser = async (userData) => {
  try {
    const response = await fetch(`${baseUrl}user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any additional headers if needed, e.g., authorization headers
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    // Handle the error as needed
    throw error;
  }
};

export const authService = {
  registerUser,
};
