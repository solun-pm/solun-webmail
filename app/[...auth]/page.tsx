"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser, faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

const LoginPage = ({ params }: { params: { auth: string[] } }) => {
  const router = useRouter();

  const tempToken = params.auth[1];
  const decryptToken = params.auth[2];

  if (!tempToken) {
    router.push(process.env.NEXT_PUBLIC_AUTH_DOMAIN + '/login/mail');
    return null;
  }

  const [formData, setFormData] = useState({
    fqe: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fast_login, setFastLogin] = useState(false);

  useEffect(() => {
    const verifyTokenAndLogin = async () => {
      const storedJwt = localStorage.getItem("jwt");
      if (storedJwt) {
        try {
          const response = await fetch("/api/user/jwt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token: storedJwt,
                onlyVerify: true,
            }),
          });

          if (!response.ok) {
            localStorage.removeItem("jwt");
            console.error("Stored JWT is invalid. Removing it.");
            return;
          }

          const data = await response.json();
          if (data.isValid) {
            router.push("/");
            return;
          }

        } catch (error) {
          console.error("Error verifying JWT:", error);
        }
      }
    
      if(tempToken) {
        getFqe();
      }
    };

    verifyTokenAndLogin();
  }, []);

  useEffect(() => {
    if(fast_login) {
      loginWithTokens();
    }
  }, [fast_login])

  const getFqe = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/preAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tempToken }),
      });

      if (!response.ok) {
        console.error(response);
        setIsSubmitting(false);
        router.push(process.env.NEXT_PUBLIC_AUTH_DOMAIN + '/login/mail');
        return;
      }

      const data = await response.json();
      setFastLogin(data.fast_login);

      setFormData({ ...formData, fqe: data.fqe });
      setIsSubmitting(false);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      router.push(process.env.NEXT_PUBLIC_AUTH_DOMAIN + '/login/mail');
    }
  };

  const loginWithTokens = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fqe: formData.fqe, tempToken, decryptToken, fast_login }),
      });
      const data = await response.json();
      localStorage.setItem("jwt", data.token);
      router.push("/");
    } catch (error) {
      setIsSubmitting(false);
      console.error(error);
    }
  };

  const handleChange = (e: any) => {
    const name = e.target.name;
    setFormData({ ...formData, [name]: e.target.value });
  };

  const isValidForm = () => {
    return formData.fqe && formData.password;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (!isValidForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fqe: formData.fqe,
          tempToken,
          password: formData.password,
          fast_login,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error(data);
        return;
      }

    localStorage.setItem("jwt", data.token);
    router.push("/");
    } catch (error) {
        console.error(error);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 px-2 min-h-screen animate-gradient-x">
      <div className="bg-slate-800 text-white p-5 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Welcome to Webmail</h1>
        <p className="mb-5">Please verify your identity to continue.</p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-1 flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-3 text-gray-400" />
            <input
              type="text"
              name="fqe"
              className="bg-slate-950 text-slate-300 w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="E-Mail Address"
              disabled={true}
              value={formData.fqe}
            />
          </div>
          <div className="mb-4 mt-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faLock} className="mr-3 text-gray-400" />
              <input
                type="password"
                name="password"
                onChange={handleChange}
                className="bg-slate-950 text-white w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-3 rounded transition duration-200 flex justify-center items-center"
            disabled={!isValidForm() || isSubmitting}
          >
            {isSubmitting && (
              <FontAwesomeIcon
                icon={faCircleNotch}
                className="animate-spin mr-2"
              />
            )}
            Login
          </button>
        </form>
        <div className="mt-5 text-center">
          <p className="mb-4">
            Don't want to enter your password every time? 
            <br />
            <a href={process.env.NEXT_PUBLIC_AUTH_DOMAIN + '/dashboard/settings'} className="text-blue-500 hover:text-blue-600">
              Activate Fast Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;