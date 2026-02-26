"use client";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useForm } from "@tanstack/react-form";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const loginMutation = useLogin((error) => setErrorMsg(error.message));

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setErrorMsg("");
      loginMutation.mutate(value);
    },
  });

  return (
    <div className="flex w-full flex-1 flex-col lg:w-1/2">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="text-title-sm sm:text-title-md mb-2 font-semibold text-gray-800 dark:text-white/90">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your username and password to sign in!
            </p>
          </div>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <div className="space-y-6">
                <div>
                  <form.Field
                    name="username"
                    validators={{
                      onChange: ({ value }) =>
                        !value ? "Please enter your username" : undefined,
                    }}
                    children={(field) => (
                      <>
                        <Label>
                          Username / Email{" "}
                          <span className="text-error-500">*</span>{" "}
                        </Label>
                        <Input
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter your username or email"
                          type="text"
                          required
                        />
                        {field.state.meta.isTouched &&
                        field.state.meta.errors.length ? (
                          <div className="mt-2 text-sm text-red-500">
                            {field.state.meta.errors.join(",")}
                          </div>
                        ) : null}
                      </>
                    )}
                  />
                </div>
                <div>
                  <form.Field
                    name="password"
                    validators={{
                      onChange: ({ value }) =>
                        !value ? "Please enter your password" : undefined,
                    }}
                    children={(field) => (
                      <>
                        <Label>
                          Password{" "}
                          <span className="text-error-500">*</span>{" "}
                        </Label>
                        <div className="relative">
                          <Input
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            required
                          />
                          <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-4 z-30 -translate-y-1/2 cursor-pointer"
                          >
                            {showPassword ? (
                              <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                            ) : (
                              <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                            )}
                          </span>
                        </div>
                        {field.state.meta.isTouched &&
                        field.state.meta.errors.length ? (
                          <div className="mt-2 text-sm text-red-500">
                            {field.state.meta.errors.join(",")}
                          </div>
                        ) : null}
                      </>
                    )}
                  />
                </div>

                {errorMsg && (
                  <div className="mt-2 text-sm text-red-500">{errorMsg}</div>
                )}

                <div>
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                      <Button
                        className="w-full"
                        size="sm"
                        disabled={loginMutation.isPending || !canSubmit}
                      >
                        {loginMutation.isPending || isSubmitting
                          ? "Signing in..."
                          : "Sign in"}
                      </Button>
                    )}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
