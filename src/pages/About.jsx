import { Link, Outlet } from "react-router-dom";

function About() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-2 ">About Page</h1>
      <div className="flex flex-row">
        <div className="space-x-4 mb-4 flex flex-col w-2/12 border-1 border-red-100 ">
          <Link to="/about/people" className="text-blue-600">
            People
          </Link>
          <Link to="/about/company" className="text-blue-600">
            Company
          </Link>
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default About;
