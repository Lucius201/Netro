import styled from "styled-components";

export const StyledNavbar = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: #333;
    align-items: center;

    li {
        margin: 0 15px;
    }

    a {
        text-decoration: none;
        color: white;
        font-size: 16px;
        transition: color 0.3s ease;

        &:hover {
            color: #00bcd4;
        }
    }
`;
