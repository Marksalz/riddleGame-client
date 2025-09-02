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
                value: "",
                placeholder: "Username",
              },
              {
                id: "password",
                name: "password",
                type: "password",
                value: "",
                placeholder: "Password",
              },
            ]}
            showLogin={showLoginForm}
            onClick={(formData) => {
              const usersString = localStorage.getItem("users");
              const users = usersString ? JSON.parse(usersString) : [];
              const userExists = users.some(
                (u: { username: string; password: string }) =>
                  u.username === formData.username &&
                  u.password === formData.password
              );
              if (userExists) {
                navigate("/menu");
              } else {
                alert("Invalid username or password");
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
                value: "",
                placeholder: "Username",
              },
              {
                id: "Email",
                name: "Email",
                type: "email",
                value: "",
                placeholder: "Email",
              },
              {
                id: "password",
                name: "password",
                type: "password",
                value: "",
                placeholder: "Password",
              },
            ]}
            showLogin={showLoginForm}
            onClick={(formData) => {
              const usersString = localStorage.getItem("users");
              const users = usersString ? JSON.parse(usersString) : [];
              users.push(formData);
              localStorage.setItem("users", JSON.stringify(users));
              alert("Registration successful!");
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

  // Retrieve later
  const usersString = localStorage.getItem("users");
  const storedUsers = usersString ? JSON.parse(usersString) : [];
  console.log(storedUsers);
}
