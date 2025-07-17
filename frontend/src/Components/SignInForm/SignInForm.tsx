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
      toast.success(`Welcome, ${user.firstName}`);
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
      if (!token || !user) throw new Error("Invalid credentials");
      await saveTokenToLocalStorage(token);
      setUser(user);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-xl">
        <CardHeader className="flex flex-col items-center gap-2">
          <img
            src="data:image/png;base64,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"
            alt="Logo"
            className="w-45 h-45 rounded-full"
          />
          {/* <CardTitle className="text-2xl text-center">Sign In</CardTitle> */}
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
          <CardFooter className="mt-4 mb-4">
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
