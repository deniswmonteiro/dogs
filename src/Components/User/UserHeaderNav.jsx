import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {UserContext} from "../../UserContext";
import {ReactComponent as MyPhotosIcon} from "../../Assets/feed.svg";
import {ReactComponent as StatsIcon} from "../../Assets/estatisticas.svg";
import {ReactComponent as PhotoPostIcon} from "../../Assets/adicionar.svg";
import {ReactComponent as LogoutIcon} from "../../Assets/sair.svg";
import useMedia from "../../Hooks/useMedia";
import styles from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
    const {userLogout} = React.useContext(UserContext);
    const navigate = useNavigate();
    const mobile = useMedia("(max-width: 40rem)");
    const [mobileMenu, setMobileMenu] = React.useState(false);
    const {pathname} = useLocation();

    React.useEffect(() => {
        setMobileMenu(false);
    }, [pathname]);

    /** Log out user and navigate to home page */
    function handleLogout() {
        userLogout();
        navigate("/");
    }

    return (
        <>
            {mobile &&
                <button aria-label="menu"
                    className={`${styles.btnMobile} ${mobileMenu && styles.btnMobileActive}`}
                    onClick={() => setMobileMenu(!mobileMenu)}></button>
            }
            
            <nav className={`${mobile ? styles.navMobile : styles.nav}
                ${mobileMenu ? styles.navMobileActive : ""}`}>
                <NavLink to="/conta" end>
                    <MyPhotosIcon />
                    {mobile && "Minhas Fotos"}
                </NavLink>
                <NavLink to="/conta/estatisticas">
                    <StatsIcon />
                    {mobile && "Estatísticas"}
                </NavLink>
                <NavLink to="/conta/postar">
                    <PhotoPostIcon />
                    {mobile && "Adicionar Foto"}
                </NavLink>
                
                <button onClick={handleLogout}>
                    <LogoutIcon />
                    {mobile && "Sair"}
                </button>
            </nav>
        </>
    )
}

export default UserHeaderNav