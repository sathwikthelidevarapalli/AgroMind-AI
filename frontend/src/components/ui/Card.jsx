import React from "react";
import clsx from "clsx";

export default function Card({ children, className }) {
  return <div className={clsx("card-surface", className)}>{children}</div>;
}
