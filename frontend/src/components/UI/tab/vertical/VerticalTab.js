import React, { useState, useEffect } from "react";
import TabPanel from "./components/TabPanel";
import SidebarTab from "./components/SidebarTab";
import SidebarItem from "./components/SidebarItem";
import MyProfile from "@/components/auth/user/components/MyProfile";

const VerticalTab = ({user}) => {

  const tabs = [
    {
      id: 1,
      title: "My profile",
    },
    {
      id: 2,
      title: "Address",
    },
    {
      id: 3,
      title: "My Orders",
    },
    {
      id: 4,
      title: "Payment History",
    },
  ];

  const [activeTab, setActiveTab] = useState(1);

  let content = null;

  useEffect(() => {
    
  }, [user])

  

  switch (activeTab) {
    case 1:
      content = <TabPanel>
      <MyProfile user={user}/>
      </TabPanel>;
      break;
      case 2:
        content=<TabPanel>
            <h2>Profile</h2>
        </TabPanel>
        break;
        case 3:
            content=<TabPanel>
                <h2>Settings</h2>
            </TabPanel>
            break;
  }

  return (
    <div className="w-full bg-white flex justify-center items-center p-3">
      <div className="w-11/12 flex justify-center items-center text-black rounded-md gap-3">
        <SidebarTab>
          {tabs &&
            tabs.length > 0 &&
            tabs.map((tab) => {

              const { id, title, icon } = tab;

              return (
                <SidebarItem
                  key={id}
                  title={title}
                  icon={icon}
                  active={activeTab === id}
                  onClick={() => setActiveTab(id)}
                />
              );
            })}
        </SidebarTab>
        {content}
      </div>
    </div>
  );
};

export default VerticalTab;
