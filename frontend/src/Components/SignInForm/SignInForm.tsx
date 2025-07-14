import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { signIn } from "@/services/services";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    // console.log(data);
    const resData = await signIn(data);
    console.log(resData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        name="username"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" variant="secondary">
        Sign In
      </Button>
    </form>
  );
};

export { SignInForm };
