import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  ChatBubbleLeftRightIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useLocation, useNavigate } from "react-router-dom";


export default function Example() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const selectedClass =
    "flex items-center justify-start w-full p-4 my-2 font-thin text-gray-800 hover:cursor-pointer transition-colors duration-200 border-r-4 border-gray-500 bg-gradient-to-r from-gray-50 to-gray-300";
  const unselectedClass = "flex items-center justify-start w-full p-4 my-2 font-thin hover:cursor-pointer text-gray-500 transition-colors duration-200 dark:text-gray-200 hover:text-gray-800";
    const data = [
      {
        label: "My Profile",
        icon: UserCircleIcon,
        href: "/subscriber",
        value: "dashboard",
      },
      {
        label: "Memberships",
        icon: CreditCardIcon,
        href: "/subscriber/memberships",
        value: "profile",
      },
      {
        label: "Chats",
        icon: ChatBubbleLeftRightIcon,
        href: "/subscriber/chats",
        value: "settings",
      },
      {
        label: "Account",
        icon: LockClosedIcon,
        href: "/subscriber/account",
        value: "account",
      },
    ];
  return (
    // <Tabs value="dashboard" className="bg-white overflow-visible mt-3 z-0 hidden md:flex">
    //   <TabsHeader className="flex flex-col gap-7 bg-gray-50 shadow-xl">
    //     {data.map(({ label, value, icon, href }) => (
    //       <Tab key={value} value={value} className="flex justify-start"
    //       onClick={()=>navigate(href)}
    //       >
    //         <div className="flex justify-start items-center gap-2">
    //           {React.createElement(icon, { className: "w-5 h-5" })}
    //           {label}
    //         </div>
    //       </Tab>
    //     ))}
    //   </TabsHeader>
    // </Tabs>

    <div class="hidden w-max h-full my-4 ml-4 shadow-lg md:block w-80">
      <div class="h-full bg-white rounded-2xl dark:bg-gray-700">
        
        <nav class="mt-6">
          <div>
            {data.map(item => {
              return (
                <>
                  <div
                    id={item.href}
                    key={item.value}
                    className={
                      item.href === location.pathname
                        ? selectedClass
                        : unselectedClass
                    }
                    onClick={() => navigate(item.href)}
                  >
                    <span class="text-left">
                      {React.createElement(item.icon, { className: "w-5 h-5" })}
                    </span>
                    <span class="mx-4 text-sm font-normal">{item.label}</span>
                  </div>
                </>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}