import React from "react";
import "./UserDetailsCard.css";

const UserDetailsCard = ({ user }) => {
  return (
    <div className="details-content">
      <h3>
        {user.firstName} {user.lastName}
      </h3>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Phone:</strong> {user.phone}
      </p>
      <p>
        <strong>Age:</strong> {user.age}
      </p>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>
      <p>
        <strong>Role:</strong> {user.role}
      </p>
      <p>
        <strong>University:</strong> {user.university}
      </p>
      <p>
        <strong>Company:</strong> {user.company?.name}
      </p>
      <p>
        <strong>Address:</strong> {user.address?.address}, {user.address?.city}
      </p>
    </div>
  );
};

export default UserDetailsCard;
