import { JSX } from "react";

interface WelcomeProps {
  name: string;
}

const Welcome = (props: WelcomeProps): JSX.Element => {
  return <h1>Welcome, Hello {props.name}</h1>
}

export default Welcome