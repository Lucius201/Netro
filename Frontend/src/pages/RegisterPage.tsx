import Navbar from "../components/NavBar";
import RegisterField from "../components/RegisterField";
import "../styles/globals.css";

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
          padding: "1rem",
        }}
      >
        <RegisterField />
      </div>
    </>
  );
}