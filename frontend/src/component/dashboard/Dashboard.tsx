import { Outlet, NavLink } from "react-router-dom";


const menu = [
  { name: "My plants", path: "plants" },
  { name: "Order", path: "order" },
  { name: "Favorites", path: "favorites" },
];

const Dashboard = () => (
  <div className="flex h-screen w-full">
    <div className="w-1/3 bg-gray-100 p-6 shadow-lg rounded-r-2xl">
      <ul className="space-y-4">
        {menu.map((item) => (
          <li key={item.path}>
            <NavLink
              to={`/dashboard/${item.path}`}
              className={({ isActive }) =>
                `text-lg font-semibold cursor-pointer transition-colors ${
                  isActive ? "text-green-600" : "text-gray-700"
                }`
              }
              onClick={() => console.log(item.name)}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
    <div className="flex-1 p-8">
      <Outlet />
    </div>
  </div>
);

export default Dashboard;
