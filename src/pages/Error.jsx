import { useNavigate, useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";
import { documentTitle } from "../Helpers";

function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  documentTitle(`Cash Compass | Error`);

  return (
    <div className="error">
      <h1>Uh oh! Looks like we have a problem :(</h1>
      <p>{error.message || error.statusText}</p>

      <div className="flex-md">
        <button className="btn btn--dark" onClick={() => navigate(-1)}>
          <span>Go Back</span>
          <ArrowUturnLeftIcon width={20} />
        </button>
        <Link to={"/"} className="btn btn--dark">
          <span>Go Home</span>
          <HomeIcon width={20} />
        </Link>
      </div>
    </div>
  );
}

export default Error;
