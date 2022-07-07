import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Protected({ children }) {
  const navigate = useNavigate();

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userAuthInfo?.id) {
      navigate("/?page=sign-in", { replace: true });
    }
  }, [navigate, userAuthInfo]);

  return children;
}

export default Protected;
