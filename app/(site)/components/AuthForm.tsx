"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "./AuthSocialButton";
import Button from "@/app/components/Button";
import { toast } from "react-hot-toast";
import { Loading, Spacer } from "@nextui-org/react";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/conversations");
    }
  }, [session?.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .catch(() => toast.error("Something went wrong!"))
        .finally(() => setIsLoading(false));
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid credentials!");
        }

        if (callback?.ok) {
          router.push("/conversations");
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-stone-950">
        <Image
          height="48"
          width="48"
          className="mx-auto w-auto"
          src="/images/logo.png"
          alt="Logo"
        />
        <h2
          className="
        mt-6 
        text-center 
        text-3xl 
        font-bold 
        tracking-tight 
        text-slate-100
      "
        >
          Sign in to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md bg-stone-950">
        <div
          className="
          bg-stone-950
          px-4
          py-8
          shadow
          sm:rounded-lg
          sm:px-10
        "
        >
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {variant === "REGISTER" && (
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id="name"
                label="Name"
              />
            )}
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="email"
              label="Email address"
              type="email"
            />
            <Input
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              id="password"
              label="Password"
              type="password"
            />
            <div>
              {isLoading ? (
                <Loading
                  size="lg"
                  className="justify-center place-self-center"
                />
              ) : (
                <Button disabled={isLoading} fullWidth type="submit">
                  {variant === "LOGIN" ? "Sign in" : "Register"}
                </Button>
              )}
            </div>
          </form>
          {isLoading ? (
            ""
          ) : (
            <> 
              <div className="mt-6">
                <div className="relative">
                  <div
                    className="
                absolute 
                inset-0 
                flex 
                items-center
              "
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-stone-950 px-2 text-slate-300">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex gap-2">
                  <AuthSocialButton
                    icon={BsGithub}
                    onClick={() => socialAction("github")}
                  />
                  <AuthSocialButton
                    icon={BsGoogle}
                    onClick={() => socialAction("google")}
                  />
                </div>
              </div>
              <div
                className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-slate-300
          "
              >
                <div>
                  {variant === "LOGIN"
                    ? "New to Messenger?"
                    : "Already have an account?"}
                </div>
                <div
                  onClick={toggleVariant}
                  className="underline cursor-pointer"
                >
                  {variant === "LOGIN" ? "Create an account" : "Login"}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForm;
