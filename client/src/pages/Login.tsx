import "./pageStyles/grid.css";
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
import { useLoginMutation } from "@/redux/slices/api";
import { handleError } from "@/utils/handleError";
import { useDispatch } from "react-redux";
import { updateCurrentUser, updateIsLoggedIn } from "@/redux/slices/appSlice";

const formSchema = z.object({
  userId: z.string(),
  password: z.string(),
});

export default function Login() {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  });

  async function handleLogin(values: z.infer<typeof formSchema>) {
    try {
      const response = await login(values).unwrap();
      dispatch(updateCurrentUser(response));
      dispatch(updateIsLoggedIn(true));
      navigate("/");
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div className="w-[100%] ">
      <div className="  flex flex-col h-[100dvh] justify-center items-center">
        <div className="border border-slate-200 p-3 rounded-lg">
          <div className="flex flex-col justify-center items-center gap-3">
            <h1 className=" text-4xl font-bold text-left">Login</h1>
            <p className=" text-xs">Welcome back fellow coder 😁</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLogin)}
              className="flex flex-col gap-4 p-4 mt-2 "
            >
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        required
                        disabled={isLoading}
                        placeholder="Username or Email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        required
                        disabled={isLoading}
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button loading={isLoading} className="w-full" type="submit">
                Login
              </Button>
            </form>
          </Form>
        </div>

        <p className="mt-2 text-sm">
          Alreay have an account ?
          <span>
            <Link className="text-blue-500 p-3" to="/signup">
              Signup
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}
