import { Link } from "react-router-dom";
import Navbar from "../components/NavBar";
import RegisterField from "../components/RegisterField";

export default function RegisterPage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f5f5f5",
          padding: "1rem",
        }}
      >
        <RegisterField />
      </div>
    </>
  );
}