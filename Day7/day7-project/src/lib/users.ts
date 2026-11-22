
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
  company: {
    name: string;
  };
};

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch all users
export async function getUsers(): Promise<User[]> {
  const response = await fetch(API_URL, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  return (await response.json()) as User[];
}

// Fetch one user by ID
export async function getUser(id: string): Promise<User | null> {
  const response = await fetch(`${API_URL}/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch user details.");
  }

  const user = (await response.json()) as User;

  if (!user.id || user.id.toString() !== id) {
    return null;
  }

  return user;
}
