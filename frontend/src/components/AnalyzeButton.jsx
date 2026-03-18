import React from "react";
import { FaMagic } from "react-icons/fa";
import Button from "./ui/Button";

export default function AnalyzeButton({ onClick, loading, disabled }) {
  return (
    <Button
      label={loading ? "Analyzing..." : "Analyze with AI"}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      variant="primary"
      size="lg"
      icon={<FaMagic />}
    />
  );
}
