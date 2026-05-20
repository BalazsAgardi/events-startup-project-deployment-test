import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import FormField from "../FormField/FormField";
import { EmailInput, PasswordInput } from "../Input/Input";
import Footer from "../Layout/Footer";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleOnSubmit(e) {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.loginForm} onSubmit={handleOnSubmit}>
        <h1 className={styles.formTitle}>Login</h1>
        <p className={styles.subtitle}>Welcome back to HackYourFutureEvent</p>
        <hr className={styles.divider} />

        <FormField name="email" label="Email">
          <EmailInput
            name="email"
            handleOnChange={(e) => setEmail(e.target.value)}
          />
        </FormField>

        <FormField name="password" label="Password">
          <PasswordInput
            name="password"
            handleOnChange={(e) => setPassword(e.target.value)}
          />
        </FormField>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <button type="submit" className={styles.loginBtn}>
          Login
        </button>

        <p className={styles.registerLink}>
          Not a member? <a href="/register">Register now</a>
        </p>
      </form>
      <Footer />
    </div>
  );
}
