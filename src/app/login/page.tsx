"use client";

import React, { useState } from "react";
import { login, signup } from "./actions";
import { useFormState } from "react-dom";
import SignButton from "./button";

export default function SignPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const action = isSignUp ? signup : login;
  const [state, formAction] = useFormState(action, {});

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-darker-gray p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-100">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h2>

        {state.form && (
          <p className="text-red-400 h-3 text-sm text-center">{state.form}</p>
        )}
        <form action={formAction} className="flex flex-col gap-4 mt-2 relative">
          {isSignUp && (
            <div>
              <label
                className="block text-gray-400 text-sm mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter your username"
                required={isSignUp}
              />

              {state.username && <Error message={state.username} />}
            </div>
          )}

          <div>
            <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              required
            />

            {state.email && <Error message={state.email} />}
          </div>

          <div>
            <label
              className="block text-gray-400 text-sm mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
              required
            />
            {state.password && <Error message={state.password} />}
          </div>
          <SignButton isSignUp={isSignUp} />
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-indigo-500 font-semibold ml-1 hover:underline"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

const Error = ({ message }: { message: string | undefined }) => (
  <p className="text-red-400 text-xs absolute">{message}</p>
);
