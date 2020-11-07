import React from "react";
import Styled from "styled-components";

const UserContainer = Styled.div`
    display: flex;
    justify-content: space-between;`;

const UserInfo = Styled.div`
width: 24%;`;

const Users = (props) => {
  const { name, email, selectColor } = props.data;

  return (
    <UserContainer>
      <UserInfo>
        <h3>{name}</h3>
        <p>Email: {email}</p>
        <p>Favorite Color: {selectColor}</p>
      </UserInfo>
    </UserContainer>
  );
};
