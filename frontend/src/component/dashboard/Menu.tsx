import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const menu = ["plants", "order", "favorites"];
  const navigate = useNavigate();
  return (
    <div className="">
      <ul className="space-y-4">
        {menu.map((item, idx) => (
          <li
            key={idx}
            className="text-lg font-semibold text-gray-700 hover:text-green-600 cursor-pointer transition-colors"
            onClick={() => navigate(`/dashboard/${item}`)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Menu;
