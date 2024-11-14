import React, { useEffect, useState } from "react";
import { UserTable } from "./user-table";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://dummyjson.com/users?delay=1000&select=firstName,lastName,email,image,phone"
        );
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        const result = await response.json();

        setUsers(result.users);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!users || !users?.length) {
    return <div>No users found</div>;
  }

  const userData = users.map((u) => {
    const {firstName, lastName, ...userData} = u;
    return { name: `${firstName} ${lastName}`, ...userData}
  })

  return (
    <div>
      <h1>Users Table</h1>
      <UserTable data={userData} columns={[ "image", "name", "email", "phone"]} />
    </div>
  );
};
