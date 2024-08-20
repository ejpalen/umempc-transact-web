import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapper">
      This is Login
      <button
        onClick={() => navigate("/home")}
        className="px-4 py-1 bg-primary rounded-full"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
