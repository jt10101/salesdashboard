import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

const SignInForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const data = {
      username: username,
      passworld: password,
    };
    console.log(data);
  };
  return (
    <form onClick={handleSubmit}>
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
      <Button variant="secondary">Sign In</Button>
    </form>
  );
};

export { SignInForm };
