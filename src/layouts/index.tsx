import { Link, Outlet } from 'umi';

export default function Layout() {
  return (
    <div className="flex flex-col gap-2 min-h-[100vh]">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/docs">Docs</Link>
        </li>
        <li>
          <a href="https://github.com/umijs/umi">Github</a>
        </li>
      </ul>
      <div className="flex flex-grow w-full">
        <Outlet />
      </div>
    </div>
  );
}
