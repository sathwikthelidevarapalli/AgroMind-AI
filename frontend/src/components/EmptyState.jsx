import React from "react";
import { FaSeedling } from "react-icons/fa";
import Button from "./ui/Button";

export default function EmptyState({ title, body, actionLabel, onAction }) {
  return (
    <div className="card-surface flex flex-col items-center gap-3 px-6 py-8 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <FaSeedling />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">{body}</p>
      {actionLabel && <Button label={actionLabel} onClick={onAction} variant="primary" />}
    </div>
  );
}
