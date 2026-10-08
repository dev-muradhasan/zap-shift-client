import { Link } from "react-router";
import {
    FaLinkedinIn,
    FaXTwitter,
    FaFacebookF,
    FaYoutube,
} from "react-icons/fa6";
import Logo1 from "../../../components/Logo/Logo1";

const Footer = () => {
    const navLinks = [
        { name: "Services", path: "/services" },
        { name: "Coverage", path: "/coverage" },
        { name: "About Us", path: "/about" },
        { name: "Pricing", path: "/pricing" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <footer className=" py-5 ">
            <div className="rounded-xl md:rounded-2xl bg-[#0b0b0b] px-6 py-12 text-white md:px-12">

                {/* Logo + Description */}
                <div className="text-center">

                    {/* Logo */}
                    <div className="flex justify-center">
                        <Logo1></Logo1>
                    </div>

                    {/* Description */}
                    <p className="mx-auto mt-3 max-w-120 text-[12px] leading-5 text-accent md:text-[13px]">
                        Enjoy fast, reliable parcel delivery with real-time tracking and
                        zero hassle. From personal packages to business shipments — we
                        deliver on time, every time.
                    </p>
                </div>

                {/* Top Divider */}
                <div className="mx-auto mt-5 max-w-208.75 border-t border-dashed border-cyan-950"></div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-x-7 gap-y-3 py-5">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-[12px] text-accent transition hover:text-[#c2f34b]"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Bottom Divider */}
                <div className="mx-auto max-w-208.75 border-t border-dashed border-cyan-950"></div>

                {/* Social Icons */}
                <div className="mt-5 flex justify-center gap-4">

                    {/* LinkedIn */}
                    <a
                        href="#"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0a9bd7] text-black transition hover:scale-110"
                    >
                        <FaLinkedinIn className="text-[13px]" />
                    </a>

                    {/* X */}
                    <a
                        href="#"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-black transition hover:scale-110"
                    >
                        <FaXTwitter className="text-[12px]" />
                    </a>

                    {/* Facebook */}
                    <a
                        href="#"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-[#168cf0] text-white transition hover:scale-110"
                    >
                        <FaFacebookF className="text-[13px]" />
                    </a>

                    {/* YouTube */}
                    <a
                        href="#"
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white transition hover:scale-110"
                    >
                        <FaYoutube className="text-[13px]" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;