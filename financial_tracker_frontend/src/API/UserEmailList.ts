import api from "./api";

async function UserEmailList() {
    try {
      const response = await api.get("/list/");
      return response.data;
    } catch (error) {
      console.error("Error fetching user email list:", error);
      throw error; // Re-throw the error after logging it
    }
  }
export default UserEmailList;