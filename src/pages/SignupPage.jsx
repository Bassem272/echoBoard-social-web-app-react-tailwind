import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const status = useSelector((state) => state.auth.status);
  const token = useSelector((state) => state.auth.token);
  const typeOfSession = useSelector((state) => state.auth.typeOfSession);

  const onSubmit = async (data) => {
    try {

      const res = await dispatch(signUp(data));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Your Signup was a great success");
        navigate("/login");
      } else {
           if (signUp.rejected.match(res)) {
                 console.log("rejected in the signup page", res.payload); 
                 toast.error(res.payload);
               }
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <>
          <h1 className="text-center bold text-2xl font-bold my-2 text-info">Sign Up </h1>
      {status === "signupLoading" && (
        <div className="flex justify-center items-center py-2">
          <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          {/* <span className="ml-2 text-blue-500">logging...</span> */}
        </div>
      )}
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto border border-gray-200 p-4"
    >
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend"> Name </legend>
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Username"
          {...register("name", { required: "Username is required" })}
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}
      </fieldset>
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">Email</legend>
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </fieldset>
      <fieldset className="fieldset w-full">
        <legend className="fieldset-legend">Password</legend>
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full"
          {...register("password", {
            required: "Password is required",
            minLength: 6,
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </fieldset>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
      <span className="text-sm text-info cursor-pointer" onClick={() => navigate("/login")}>
        Already have an account?
      </span>
    </form>
          </>
  );
};

export default SignupPage;
