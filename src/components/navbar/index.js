import React from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
} from "@material-tailwind/react";

import {
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
    CreditCardIcon,
    ChatBubbleLeftRightIcon,
    LockClosedIcon,
    GlobeAsiaAustraliaIcon,
    HomeIcon,
    BookOpenIcon,
    ArrowLeftOnRectangleIcon,
    UserPlusIcon
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// profile menu component
const profileMenuItems = [
    {
        label: "My Profile",
        icon: UserCircleIcon,
    },
    {
        label: "Memberships",
        icon: CreditCardIcon,
    },
    {
        label: "Chats",
        icon: ChatBubbleLeftRightIcon,
    },
    {
        label: "Account",
        icon: LockClosedIcon,
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    },
];

function ProfileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 md:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="candice wu"
                        className="border border-blue-500 p-0.5"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map(({ label, icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                                }`}
                        >
                            {React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                strokeWidth: 2,
                            })}
                            <Typography
                                as="span"
                                variant="small"
                                className="font-normal"
                                color={isLastItem ? "red" : "inherit"}
                            >
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </MenuList>
        </Menu>
    );
}


// nav list component
const navListItems = [
    {
        label: "Home",
        icon: HomeIcon,
        href: "home",
    },
    {
        label: "Discover",
        icon: GlobeAsiaAustraliaIcon,
        href: "discover",
    },
    {
        label: "Blog",
        icon: BookOpenIcon,
        href: "blog",
    },
];

const navListItems2 = [
    {
        label: "Login",
        icon: ArrowLeftOnRectangleIcon,
        href: "login",
    },
    {
        label: "Sign Up",
        icon: UserPlusIcon,
        href: "signup",
    },
];

function NavList() {
    const navigate = useNavigate();
    return (
        <ul className="m-auto flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center">

            {navListItems.map(({ label, icon, href }, key) => (
                <Typography
                    key={label}
                    as="a"
                    onClick={() => navigate(href)}
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <MenuItem className="flex items-center gap-2 md:rounded-full">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        {label}
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}

function NavList2() {
    const navigate = useNavigate();
    return (
        <ul className="m-auto flex flex-col gap-2 md:mb-0 md:mt-0 md:flex-row md:items-center">

            {navListItems2.map(({ label, icon, href }, key) => (
                <Typography
                    key={label}
                    as="a"
                    onClick={() => navigate(href)}
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                >
                    <MenuItem className="flex items-center gap-2 md:rounded-full">
                        {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
                        {label}
                    </MenuItem>
                </Typography>
            ))}
        </ul>
    );
}


export default function ComplexNavbar() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    const { user: currentUser } = useSelector((state) => state.auth);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);

    return (
        <Navbar className="sticky inset-0 z-10 w-full max-w-full rounded-none p-2 md:pl-6">
            <div className="relative mx-auto flex justify-between items-center text-blue-gray-900">
                <Typography
                    as="a"
                    href="#"
                    className="mr-4 ml-2 cursor-pointer py-1.5 text-xl font-bold"
                >
                    HealthiVerse
                </Typography>
                <div className="hidden md:block">
                    <NavList />
                </div>
                <div className="hidden md:block">
                    <NavList2 />
                </div>
                <IconButton
                    size="sm"
                    color="blue-gray"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-auto mr-2 md:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>

                {currentUser && <ProfileMenu />}
            </div>
            <MobileNav open={isNavOpen} className="overflow-scroll">
                <NavList />
                <NavList2 />
            </MobileNav>
        </Navbar>
    );
}