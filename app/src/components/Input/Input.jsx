import styles from "./Input.module.css";

export function EmailInput({ name, handleOnChange }) {
  return (
    <input
      type="email"
      id={name}
      name={name}
      placeholder="you@example.com"
      pattern="[a-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
      onChange={handleOnChange}
      required
      className={styles.input}
    />
  );
}

export function PasswordInput({ name, handleOnChange }) {
  return (
    <input
      type="password"
      id={name}
      name={name}
      placeholder="••••••••"
      minLength="8"
      maxLength="64"
      pattern="(?=.*[A-Z])(?=.*[0-9]).{8,}"
      title="At least 8 characters, one uppercase letter, and one number"
      onChange={handleOnChange}
      required
      className={styles.input}
    />
  );
}
