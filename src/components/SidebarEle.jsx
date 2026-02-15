const SidebarEle = ({ children }) => {
  return (
    <li className="flex items-center mb-4 mt-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
      {children}
    </li>
  );
};

export default SidebarEle;
