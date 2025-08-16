import { Link } from "react-router";
import Logo from "../../../public/logo/Logo";

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-14">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center sm:justify-start">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <p className="mt-4 text-center text-sm lg:mt-0 lg:text-right">
            Copyright &copy; {new Date().getFullYear()} . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
