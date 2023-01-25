import { Link, useMatch, useResolvedPath } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
    return (
        <nav className="nav">
            <Link to="/" className="siteTitle">
                Paste and Share
            </Link>
            <ul>
                <CustomLink to="/createsnippet">Create Snippet</CustomLink>
                <CustomLink to="/about">About</CustomLink>
            </ul>
        </nav>
    );
}

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });
    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}>{children}</Link>
        </li>
    );
}