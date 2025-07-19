import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const isLocalhost = typeof window !== "undefined" && window.location.hostname === "localhost";

export const Route = createRootRoute({
  component: () => (
    <>
      {isLocalhost && (
        <>
          <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{' '}
            <Link to="/colors" className="[&.active]:font-bold">
              Colors
            </Link>
          </div>
          <hr />
          <TanStackRouterDevtools />
        </>
      )}
      <Outlet />
    </>
  ),
})