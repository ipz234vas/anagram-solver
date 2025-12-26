import { cn } from "@shared/lib/cn.js";
import styles from "./AppLayout.module.css";
import {NavLink} from "react-router";

export function NavigationLink({ to, end, className, children }) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                cn(styles.navItem, isActive && styles.navActive, className)
            }
        >
            {children}
        </NavLink>
    );
}