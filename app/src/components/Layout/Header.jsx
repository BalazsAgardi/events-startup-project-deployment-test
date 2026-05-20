import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate } from "react-router-dom";
import hyfLogo from "../../assets/hyf.svg";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";
import styles from "./Header.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  const { ticketsCount } = useCart();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <a href="https://www.hackyourfuture.dk/" target="_blank">
          <img
            src={hyfLogo}
            alt="HackYourFuture logo"
            className={styles.logo}
          />
        </a>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/events" className={styles.navLink}>
            Events
          </Link>
        </div>

        <div className={styles.actions}>
          <IconButton onClick={() => navigate("/my-cart")}>
            <Badge badgeContent={ticketsCount} color="primary">
              <ShoppingCartIcon fontSize="medium" className={styles.cartIcon} />
            </Badge>
          </IconButton>
          {user ? (
            <>
              <AccountCircleIcon
                onClick={() => navigate("/my-account")}
                fontSize="medium"
                className={styles.userIcon}
              />
              <button onClick={logout} className={styles.signoutBtn}>
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn}>
                Login
              </Link>
              <Link to="/register" className={styles.registerBtn}>
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
