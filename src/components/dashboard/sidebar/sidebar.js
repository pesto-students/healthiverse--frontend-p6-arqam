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
  const selectedClass =
    "flex items-center justify-start w-full p-4 my-2 font-thin text-gray-800 hover:cursor-pointer transition-colors duration-200 border-r-4 border-gray-500 bg-gradient-to-r from-gray-50 to-gray-300";
  const unselectedClass = "flex items-center justify-start w-full p-4 my-2 font-thin hover:cursor-pointer text-gray-500 transition-colors duration-200 dark:text-gray-200 hover:text-gray-800";
    const data = [
      {
        label: "My Profile",
        icon: UserCircleIcon,
        href: "/subscriber/profile",
        value: "profile",
      },
      {
        label: "Memberships",
        icon: CreditCardIcon,
        href: "/subscriber/memberships",
        value: "memberships",
      },
      {
        label: "Chats",
        icon: ChatBubbleLeftRightIcon,
        href: "/subscriber/chats",
        value: "chats",
      },
      {
        label: "Account",
        icon: LockClosedIcon,
        href: "/subscriber/account",
        value: "account",
      },
    ];
  return (

    <div class="hidden w-max h-full my-4 ml-4 rounded-xl shadow-lg  md:block w-80">
      <div class="h-full bg-white dark:bg-gray-700">
        
        <nav class="my-6">
          <div>
            {data.map(item => {
              return (
                <>
                  <div
                    id={item.href}
                    key={item.value}
                    className={
                      item.value === location.pathname.split("/")[2]
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