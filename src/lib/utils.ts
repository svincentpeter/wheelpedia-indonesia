import React from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function renderMarkdown(content: string) {
  if (!content) return null;
  const lines = content.split("\n");
  
  return lines.map((line, lineIdx) => {
    let isHeader = false;
    let headerLevel = 0;
    if (line.startsWith("### ")) {
      isHeader = true;
      headerLevel = 3;
    } else if (line.startsWith("## ")) {
      isHeader = true;
      headerLevel = 2;
    } else if (line.startsWith("# ")) {
      isHeader = true;
      headerLevel = 1;
    }

    let processedText = line;
    if (isHeader) {
      processedText = line.substring(headerLevel + 1);
    }

    // Bold (**text**) and Italic (*text*) parsing
    const parts = processedText.split(/(\*\*.*?\*\*|\*.*?\*)/g);
    const parsedLine = parts.map((part, partIdx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return React.createElement(
          "strong",
          { key: partIdx, className: "font-extrabold text-gray-900 dark:text-white" },
          part.slice(2, -2)
        );
      }
      if (part.startsWith("*") && part.endsWith("*")) {
        return React.createElement(
          "em",
          { key: partIdx, className: "italic text-gray-800 dark:text-gray-250" },
          part.slice(1, -1)
        );
      }
      return part;
    });

    if (isHeader) {
      const headerTag = headerLevel === 1 ? "h1" : headerLevel === 2 ? "h2" : "h3";
      const headerClass = headerLevel === 1 
        ? "text-xl font-black mt-4 mb-2 text-gray-900 dark:text-white"
        : headerLevel === 2
        ? "text-lg font-black mt-3 mb-2 text-gray-900 dark:text-white"
        : "text-base font-extrabold mt-2.5 mb-1.5 text-gray-900 dark:text-white";
      return React.createElement(headerTag, { key: lineIdx, className: headerClass }, parsedLine);
    }

    // Bullet Lists (- )
    if (line.trim().startsWith("- ")) {
      const listContent = line.trim().substring(2);
      const listParts = listContent.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      const parsedListLine = listParts.map((part, partIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return React.createElement("strong", { key: partIdx, className: "font-extrabold text-gray-900 dark:text-white" }, part.slice(2, -2));
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return React.createElement("em", { key: partIdx, className: "italic text-gray-800 dark:text-gray-250" }, part.slice(1, -1));
        }
        return part;
      });
      return React.createElement(
        "li",
        { key: lineIdx, className: "list-disc ml-5 mt-1 text-sm text-gray-700 dark:text-gray-300" },
        parsedListLine
      );
    }

    // Numbered Lists (1. )
    const numListMatch = line.trim().match(/^(\d+)\.\s(.*)/);
    if (numListMatch) {
      const listContent = numListMatch[2];
      const listParts = listContent.split(/(\*\*.*?\*\*|\*.*?\*)/g);
      const parsedListLine = listParts.map((part, partIdx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return React.createElement("strong", { key: partIdx, className: "font-extrabold text-gray-900 dark:text-white" }, part.slice(2, -2));
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return React.createElement("em", { key: partIdx, className: "italic text-gray-800 dark:text-gray-250" }, part.slice(1, -1));
        }
        return part;
      });
      return React.createElement(
        "li",
        { key: lineIdx, className: "list-decimal ml-5 mt-1 text-sm text-gray-700 dark:text-gray-300" },
        parsedListLine
      );
    }

    if (!line.trim()) {
      return React.createElement("div", { key: lineIdx, className: "h-2" });
    }

    return React.createElement(
      "p",
      { key: lineIdx, className: "text-sm text-gray-700 dark:text-gray-300 leading-relaxed" },
      parsedLine
    );
  });
}
