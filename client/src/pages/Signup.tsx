import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { handleError } from "@/utils/handleError";
import { useSignupMutation } from "@/redux/slices/api";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";

// Schema
const formSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const handleSignup = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await signup(values).unwrap();
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  };

  const renderField = (
    name: "username" | "email" | "password",
    placeholder: string,
    type: string = "text"
  ) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              {...field}
              type={type}
              placeholder={placeholder}
              disabled={isLoading}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center h-[100dvh]">
        <div className="border border-slate-200 p-10 rounded-lg w-[300px]">
          <div className="text-center mb-4 space-y-2">
            <h1 className=" text-4xl font-bold">Signup</h1>
            <p className=" text-xs mt-1">
              Join the community of expert frontend developers 🧑‍💻
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSignup)}
              className="flex flex-col gap-3"
            >
              {renderField("username", "Username")}
              {renderField("email", "Email", "email")}
              {renderField("password", "Password", "password")}

              <Button type="submit" loading={isLoading} className="w-full">
                Signup
              </Button>
            </form>
          </Form>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link className="text-blue-500 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
