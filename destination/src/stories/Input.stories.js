import React from "react";
import Input from "../utils/input.component";

export default {
  title: "Destination/Input",
  component: Input,
};

export const Small = () => <Input size="small" placeholder="Small Size" />;
export const Medium = () => <Input size="medium" placeholder="Medium Size" />;
export const Large = () => <Input size="large" placeholder="Large Size" />;
