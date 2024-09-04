import { callAPI } from "./api";

async function UserEmailList() {
    try {
      const response = await callAPI({
        method: 'GET',
        url: '/list/',
      });
      return response;
    } catch (error) {
      console.error("Error fetching user email list:", error);
      throw error; // Re-throw the error after logging it
    }
  }
export default UserEmailList;