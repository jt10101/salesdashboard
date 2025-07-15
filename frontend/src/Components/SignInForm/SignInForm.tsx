import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { signIn } from "@/services/signInService";
import { saveTokenToLocalStorage } from "@/utils/tokenHandler";

const SignInForm = () => {
  const [inputUsername, setUsername] = useState("");
  const [inputPassword, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
      toast.success(`Welcome back ${user.username}`);
    }
  }, [user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      username: inputUsername,
      password: inputPassword,
    };

    try {
      const { user, token } = await signIn(data);
      if (!token || !user) {
        throw new Error("Invalid credentials");
      }
      saveTokenToLocalStorage(token);
      setUser(user);
      toast.success(`Welcome ${user.username}`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader className="flex flex-col items-center gap-2">
          <img src="" alt="Logo" className="w-16 h-16 rounded-full" />
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={inputUsername}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={inputPassword}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </CardContent>
          <CardFooter className="mt-4">
            <Button className="w-full" type="submit" variant="secondary">
              Sign In
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export { SignInForm };
