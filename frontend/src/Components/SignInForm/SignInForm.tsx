import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { signIn } from "@/services/signInService";
import { toast } from "sonner";
import { useNavigate } from "react-router";

import { saveTokenToLocalStorage } from "@/utils/tokenHandler";

const SignInForm = () => {
  const [inputUsername, setUsername] = useState("");
  const [inputPassword, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      username: inputUsername,
      password: inputPassword,
    };
    try {
      const { user, token } = await signIn(data);
      saveTokenToLocalStorage(token);
      toast(`Welcome ${user.username}`);
      if (token) {
        navigate("/dashboard");
      }
    } catch (err) {
      toast(err);
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
