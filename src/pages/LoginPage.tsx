import { useState } from "react";
import Header from "../components/Header";
import Button from "../components/Button";
import Form from "../components/Form";

export default function LoginPage() {
  const [showLoginForm, setShowLoginForm] = useState(true);

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
          />
        )}
      </section>
    </div>
  );
}
