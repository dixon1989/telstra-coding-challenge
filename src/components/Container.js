import styled from "styled-components";

export const Container = styled.div`
  margin: ${(props) => (props.width > 600 ? "20px" : "0px")};
  width: "100%";
  text-align: center;
  align-content: center;
`;

export const InputContainer = styled.input`
  color: #1f2047;
  width: 50%;
  max-width: 100%;
  padding: 8px 5px;
  margin-top: 5px;
  border: 0.5px solid #abaced;
  border-radius: 8px;
  transition: 0.5s ease;
`;

export const Button = styled.button`
  border: none;
  border-radius: 8px;
  width: 85px;
  height: 25px;
  color: #d1d1f0;
  background-color: #1f2047;
  transition: 1s ease;
`;

export const UlContainer = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;
