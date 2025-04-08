import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import UserCard from "./UserCard";
import { motion } from "framer-motion";
import "./UserList.css";
import debounce from "lodash.debounce";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=1000")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setFilteredUsers(data.users);
      });
  }, []);

  const handleSearch = (text) => {
    const lower = text.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lower) ||
        user.lastName.toLowerCase().includes(lower) ||
        user.email.toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
  };

  const debouncedSearch = useMemo(() => debounce(handleSearch, 300), [users]);

  const onInputChange = (e) => {
    const text = e.target.value;
    setQuery(text);
    debouncedSearch(text);
  };

  return (
    <div className="user-list-wrapper">
      <input
        className="search-input"
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={onInputChange}
      />

      <motion.div
        className="card-grid"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {filteredUsers.map((user) => (
          <motion.div
            key={user.id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <UserCard user={user} flipped={String(id) === String(user.id)} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default UserList;
