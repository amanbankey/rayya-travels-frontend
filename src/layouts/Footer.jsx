import { Phone, Mail, MapPin } from "lucide-react";
import { BsTwitterX, BsLinkedin, BsFacebook, BsInstagram } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/image/rayyalogo.png";
import { office } from "../data/aboutData";

const footerLinks = {
  Company: [
    { name: "Home", path: "/" },
    { name: "Flights", path: "/flights" },
    { name: "Visa", path: "/visa" },
    { name: "Packages", path: "/packages" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  
};

const linkClass = "text-xs font-medium text-darkBlue transition-colors hover:underline";

const Footer = () => {
  return (
    <div className="w-full flex items-start justify-center mx-auto bg-soft">
      <footer className="mx-auto mt-6 w-full max-w-7xl px-4 pb-6 pt-12 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <NavLink to="/" className="flex items-center gap-2.5">
              <img src={Logo} className="w-20 h-10" alt="Raaya Travels" />
            </NavLink>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-darkBlue">
              Flights, visas, hotels and holiday packages — your trusted travel partner.
            </p>
            <div className="mt-5 flex items-center gap-3">
              {[BsTwitterX, BsLinkedin, BsFacebook, BsInstagram].map((Icon, i) => (
                <button
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-darkBlue transition-colors hover:underline"
                >
                  <Icon size={13} />
                </button>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-darkBlue">{heading}</h4>
              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={typeof link === "string" ? link : link.name}>
                    {typeof link === "string" ? (
                      <a href="#" className={linkClass}>{link}</a>
                    ) : (
                      <Link to={link.path} className={linkClass}>{link.name}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="max-w-[170px] shrink-0 sm:max-w-[200px] md:max-w-[240px]">
            <h4 className="text-sm font-medium uppercase tracking-[0.2em] text-darkBlue">Contact Us</h4>
            <ul className="mt-4 space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-darkBlue" />
                <span className="text-xs leading-relaxed text-darkBlue">
                  <span className="font-semibold">{office.entity}</span>
                  <br />
                  {office.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-darkBlue" />
                <span className="text-xs text-darkBlue">{office.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="shrink-0 text-darkBlue" />
                <span className="break-all text-xs text-darkBlue">{office.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-5 text-[10px] text-darkBlue md:flex-row md:items-center md:justify-between">
          <p>© 2026 Raaya Tour & Travel Pvt. Ltd. All rights reserved.</p>
          <a href="https://technoviaan.com/" target="_blank" rel="noreferrer" className="hover:underline">
            Designed and Developed by Technoviaan Software Solutions
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
