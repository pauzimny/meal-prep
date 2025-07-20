import { Link, type LinkProps, useRouterState } from "@tanstack/react-router";

type RoutePath = "/" | "/profile" | "/auth";

export interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  to: RoutePath;
}

export function NavLink({ to, children, ...rest }: NavLinkProps) {
  const { location } = useRouterState();

  const isActive = location.pathname === to;

  return (
    <Link to={to} className={isActive ? "!font-bold !underline" : ""} {...rest}>
      {children}
    </Link>
  );
}
