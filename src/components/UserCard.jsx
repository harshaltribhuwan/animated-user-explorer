import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import "./UserCard.css";
import UserDetailsCard from "./UserDetailsCard";

const UserCard = ({ user, flipped }) => {
  const [details, setDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (flipped) {
      fetch(`https://dummyjson.com/users/${user.id}`)
        .then((res) => res.json())
        .then((data) => setDetails(data));
    }
  }, [flipped, user.id]);

  const handleClick = () => {
    navigate(flipped ? "/" : `/user/${user.id}`);
  };

  return (
    <Tilt glareEnable={true} glareMaxOpacity={0.2} glareColor="#ffffff">
      <div className="card" onClick={handleClick}>
        <motion.div
          className="card-inner"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card-front">
            <img src={user.image} alt={user.firstName} />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>{user.email}</p>
          </div>

          <div className="card-back">
            {details ? <UserDetailsCard user={details} /> : <p>Loading...</p>}
          </div>
        </motion.div>
      </div>
    </Tilt>
  );
};

export default UserCard;
