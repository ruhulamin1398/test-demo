import React from "react";
interface Props extends React.ComponentProps<"div"> {}

export const Homepage = ({ ...props }: Props) => {
  return <div {...props}>Homepage</div>;
};
