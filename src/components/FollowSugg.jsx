import FollowSuggEle from "./FollowSuggEle";
import { useState } from "react";

const Sidebar = () => {
  const [contacts, setContacts] = useState(["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Davis", "Emily Wilson", "Frank Miller", "Grace Lee", "Henry Clark", "Isabella Turner"]);
  return (
    <div className="p-4 w-[20rem] text-[1.1rem] flex-col hidden lg:flex">
      <div className="p-2">
        <h6 className="text-gray-600 font-medium">Follow Suggestions</h6>
      </div>
      <ul>
        {contacts.map((contact, index) => (
          <FollowSuggEle key={index} contactName={contact} />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
