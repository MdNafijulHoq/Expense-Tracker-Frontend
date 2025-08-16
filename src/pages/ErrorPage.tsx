import { Button } from "@/components/ui/button";
import Logo from "../../public/logo/Logo";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <main>
      <div className="max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8">
        <div className="max-w-lg mx-auto text-center place-items-center space-y-4">
          <Logo />
          <h3 className="text-4xl font-semibold sm:text-5xl">Page not found</h3>
          <p className=" mt-3">
            Sorry, the page you are looking for could not be found or has been
            removed.
          </p>
          <Link to="/">
            <Button className="cursor-pointer">HomePage</Button>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
