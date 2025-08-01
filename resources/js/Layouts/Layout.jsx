import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
    NavbarToggle,
} from "flowbite-react";
import { route } from "ziggy-js";
import {
    Footer,
    FooterCopyright,
    FooterLink,
    FooterLinkGroup,
} from "flowbite-react";
import { usePage, Link } from "@inertiajs/react";

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user; // ini yang bener

    return (
        <>
            <header>
                <Navbar fluid rounded>
                    <NavbarBrand href={route("landing")}>
                        <img
                            src="https://github.githubassets.com/favicons/favicon.png"
                            className="mr-3 h-6 sm:h-9"
                            alt="Flowbite React Logo"
                        />
                        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                            Flowbite React
                        </span>
                    </NavbarBrand>

                    <div className="flex md:order-2">
                        {user ? (
                            <Link
                                href={route("pengguna.dashboard")}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg "
                            >
                                {user.name || "Dashboard"}
                            </Link>
                        ) : (
                            <Link
                                href={route("register")}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg "
                            >
                                Daftar
                            </Link>
                        )}
                        <NavbarToggle />
                    </div>

                    <NavbarCollapse>
                        <Link
                            href={route("landing")}
                            className={`px-3 py-2 rounded-md text-sm font-medium transition duration-300 ${
                                route().current("landing") ||
                                route().current("pengguna.dashboard")
                                    ? "text-yellow-600 font-semibold"
                                    : "text-gray-800 hover:text-yellow-700"
                            }`}
                        >
                            Home
                        </Link>

                        <Link
                            href="#"
                            className="px-3 py-2 rounded-md text-sm font-medium transition duration-300 text-gray-800 hover:text-yellow-700"
                        >
                            About
                        </Link>
                    </NavbarCollapse>
                </Navbar>
            </header>

            <main>{children}</main>

            <Footer container>
                <FooterCopyright
                    href="https://github.com/lexaiko"
                    by="Lexaiko™"
                    year={new Date().getFullYear()}
                />
                <FooterLinkGroup>
                    <FooterLink href="#">About</FooterLink>
                    <FooterLink href="#">Privacy Policy</FooterLink>
                    <FooterLink href="#">Licensing</FooterLink>
                    <FooterLink href="#">Contact</FooterLink>
                </FooterLinkGroup>
            </Footer>
        </>
    );
}
