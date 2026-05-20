import styles from "./SideBar.module.css";

export default function SideBar({ children }) {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.title}>Filter</h2>
      {children}
    </aside>
  );
}
