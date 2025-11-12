"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

const registerSchema = z
  .object({
    name: z.string().min(3, "Name must be 3 characters long!"),
    email: z.string().email("Please enter a valid email address!"),
    password: z.string().min(6, "Password must be at least 6 characters long!"),
    confirmpassword: z
      .string()
      .min(6, "Password must be at least 6 characters long!"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

interface RegisterFromPros{
  onSuccess? : () => void
}

export default function Register({onSuccess} : RegisterFromPros) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setIsLoading(true)
    try {
      const {error} = await signUp.email({
        name : values.name,
        email : values.email,
        password : values.password
      })
      if(error){
        toast.error("failed to create account! , please try again");
        return
      }
       toast.error("Your account is created successfully. please sing with email and password");
       if(onSuccess){
        onSuccess()
       }

    } catch (error) {
        console.log(error);
         setIsLoading(false)
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-md mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
                <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
               <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
               <FormMessage/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmpassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your Confirm password"
                  {...field}
                />
              </FormControl>
               <FormMessage/>
            </FormItem>
          )}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          {isLoading ? "Loading..." : "Create Account"}
        </button>
      </form>
    </Form>
  );
}
