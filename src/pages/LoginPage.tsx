import { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Form from "../components/Form";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const navigate = useNavigate();
  mockUsers();
  return (
    <div>
      <Header headerText="Login/Register" btnText="Light/Dark mode" />

      <section className="login_register_container">
        <div className="login_form_btn">
          <Button ButtonTxt="Login" onClick={() => setShowLoginForm(true)} />
          <Button
            ButtonTxt="Register"
            onClick={() => setShowLoginForm(false)}
          />
        </div>

        {showLoginForm ? (
          <Form
            formFields={[
              {
                id: "username",
                name: "username",
                type: "text",
                placeholder: "Username",
              },
              {
                id: "password",
                name: "password",
                type: "password",
                placeholder: "Password",
              },
            ]}
            showLogin={showLoginForm}
            onClick={async (formData) => {
              const res = await fetch(
                `http://localhost:3000/api/players/login`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify(formData),
                }
              );
              const data = await res.json();
              if (res.ok) {
                alert(`Welcome back! User info: ${JSON.stringify(data.user)}`);
                navigate("/menu");
              } else {
                alert(data.error || "Login failed failed");
              }
            }}
          />
        ) : (
          <Form
            formFields={[
              {
                id: "username",
                name: "username",
                type: "text",
                placeholder: "Username",
              },
              {
                id: "Email",
                name: "Email",
                type: "email",
                placeholder: "Email",
              },
              {
                id: "password",
                name: "password",
                type: "password",
                placeholder: "Password",
              },
            ]}
            showLogin={showLoginForm}
            onClick={async (formData) => {
              const res = await fetch(
                `http://localhost:3000/api/players/signup`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  credentials: "include",
                  body: JSON.stringify(formData),
                }
              );
              if (res.ok) {
                alert("Registration successful!");
                navigate("/menu");
              } else {
                const data = await res.json();
                alert(data.error || "Registration failed");
              }
            }}
          />
        )}
      </section>
    </div>
  );
}

function mockUsers() {
  // Array of user objects
  const users = [
    { username: "alice", password: "alice123" },
    { username: "bob", password: "bob456" },
    { username: "charlie", password: "charlie789" },
    { username: "david", password: "david321" },
    { username: "emma", password: "emma654" },
  ];

  // Save to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  //   // Retrieve later
  //   const usersString = localStorage.getItem("users");
  //   const storedUsers = usersString ? JSON.parse(usersString) : [];
  //   console.log(storedUsers);
}
