import React, { useContext, useEffect, useState } from "react";
import { AuthLayout } from "../../components/AuthLayout.jsx";
import Logo from "../../assets/images/corporate/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useQuery } from "react-query";
import fetchLogin from "../../store/models/auth/fetchLogin.jsx";
import { useAuth } from "../../store/context/AuthContext.jsx";



const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [loginParams, setLoginParams] = useState();

  const {
    data,
    error,
    isLoading,
    refetch
  } = useQuery(["login", loginParams], fetchLogin, { enabled: false });

  useEffect(() => {
    if (data) {
      auth.login(data);
    }
  }
  , [data, auth]);

  useEffect(() => {
    refetch();
  }, [ loginParams]);


  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('User is required'),
      password: Yup.string().required('Password is required'),
    }),

    onSubmit: (values) => {
      // Handle form submission logic here
      setLoginParams(values);
    },
  });

  useEffect(() => {
    if (auth.isAuthenticated()) navigate("/us", { replace: true });
  }, []);

  return (
    <AuthLayout>
      <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0 ">
        <div className="mx-auto w-full max-w-md sm:px-4 md:w-96 md:max-w-sm md:px-0">
          <div className="flex flex-col">
            <Link to={"/"} className="flex justify-center">
              <img src={Logo} className=" h-16 w-auto pt-6" alt="logo" />
            </Link>
            <div className="mt-20"><h2 className="text-lg font-semibold text-gray-900">Sign in to your
              account</h2><p className="mt-2 text-sm text-gray-700">Don’t have an account? <a
              className="font-medium text-blue-600 hover:underline" href="/register">Sign up</a> for a
              free trial.</p></div>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-10 grid grid-cols-1 gap-y-8">
            <div>
              <label htmlFor="user" className="mb-3 block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="username"
                name="username"
                autoComplete="username"
                required
                {...formik.getFieldProps('username')} // Bind input to formik values and handleChange
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
              {formik.errors.username && formik.touched.username && (
                <div className="text-red-500">{formik.errors.username}</div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="mb-3 block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                {...formik.getFieldProps('password')} // Bind input to formik values and handleChange
                className="block w-full appearance-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
              {formik.errors.password && formik.touched.password && (
                <div className="text-red-500">{formik.errors.password}</div>
              )}
            </div>
            <div>
              <button
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600 w-full"
                type="submit"
              >
                <span>Sign in <span aria-hidden="true">→</span></span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
