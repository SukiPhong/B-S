import React from "react";
import { Link } from "react-router-dom";
import { menuAdmin } from "../admin/menuAdmin";
// Import file vừa tách

const AdminSlideBar=() => {
  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold" >Estate Real Admin</h1>
      </div>
      <nav className="mt-4 space-y-4">
        <ul>
          {menuAdmin.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className="flex items-center px-4 py-2 gap-3 text-gray-700 hover:bg-gray-100"
              >
                {item.icons}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
export default AdminSlideBar;