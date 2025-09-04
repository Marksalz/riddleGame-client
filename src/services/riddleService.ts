import { BASE_URL } from "../utils/URL";

export async function fetchRiddles() {
  try {
    const res = await fetch(`${BASE_URL}/api/riddles/read_all_riddles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!res.ok) {
      console.error("Failed to fetch riddles:", res.status, res.statusText);
      return;
    }
    const riddles = await res.json();
    localStorage.setItem("riddles", JSON.stringify(riddles));
    return riddles;
  } catch (error) {
    console.error("Error fetching riddles:", error);
  }
}

export async function deleteRiddle(id: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/riddles/delete_riddle/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting riddle:", error);
  }
}
