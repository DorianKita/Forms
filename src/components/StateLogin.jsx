import { useState } from "react";
import Input from "./Input.jsx";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredValues, setEnteredValues] = useState({
    email: "",
    password: "",
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  // const emailIsInvalid =
  //   enteredValues.email !== "" && !enteredValues.email.includes("@");

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    !isNotEmpty(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  function handleInputChange(identifier, value) {
    setEnteredValues((prevState) => ({
      ...prevState,
      [identifier]: value,
    }));

    setDidEdit((prevState) => ({
      ...prevState,
      [identifier]: false,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(enteredValues);
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevState) => ({
      ...prevState,
      [identifier]: true,
    }));
  }

  // function handleEmailChange(e) {
  //   setEnteredEmail(e.target.value);
  // }

  // function handlePasswordChange(e) {
  //   setEnteredPassword(e.target.value);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          label="Email"
          id="email"
          type="email"
          name="email"
          onBlur={() => handleInputBlur("email")}
          onChange={(e) => handleInputChange("email", e.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && "Enter valid email"}
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          onBlur={() => handleInputBlur("password")}
          onChange={(e) => handleInputChange("password", e.target.value)}
          value={enteredValues.password}
          error={passwordIsInvalid && "Enter valid password"}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
