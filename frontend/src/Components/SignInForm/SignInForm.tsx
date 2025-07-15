import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

import { useState } from "react";
import { useNavigate } from "react-router";

import { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { signIn } from "@/services/signInService";
import { saveTokenToLocalStorage } from "@/utils/tokenHandler";

const SignInForm = () => {
  const [inputUsername, setUsername] = useState("");
  const [inputPassword, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

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
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={inputUsername}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={inputPassword}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="secondary">
        Sign In
      </Button>
    </form>
  );
};

export { SignInForm };
