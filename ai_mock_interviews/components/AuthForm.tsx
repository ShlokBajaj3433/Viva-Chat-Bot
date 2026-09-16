"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp, setSessionCookie } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    displayName: type === "sign-up" ? z.string().min(3, "Name must be at least 3 characters") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { displayName, email, password } = data;

        // Create user with Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update user profile
        await userCredential.user.getIdToken();

        // Call server action to save user to Firestore
        const result = await signUp({
          displayName: displayName!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;

        // Sign in with Firebase Auth
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Get ID token
        const idToken = await userCredential.user.getIdToken();

        // Call server action to create session
        const result = await signIn({
          idToken,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
      
      // Handle Firebase auth errors
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please sign in.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak. Use at least 6 characters.");
      } else if (error.code === "auth/user-not-found") {
        toast.error("User not found. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Wrong password.");
      } else {
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/vchatLogo.png" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">VivaChat</h2>
        </div>

        <h3>Practice job interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="displayName"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="font-bold text-user-primary ml-1"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
