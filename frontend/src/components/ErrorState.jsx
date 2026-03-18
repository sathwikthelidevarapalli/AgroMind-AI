import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function ErrorState({ message, onRetry }) {
  return (
    <Card className="flex flex-col items-start gap-3 p-5">
      <div className="flex items-center gap-2 text-danger">
        <FaExclamationTriangle />
        <span className="text-sm font-semibold uppercase tracking-wide">Something went wrong</span>
      </div>
      <p className="text-sm text-slate-700 dark:text-slate-200">{message}</p>
      {onRetry && <Button label="Retry" onClick={onRetry} variant="primary" size="sm" />}
    </Card>
  );
}
