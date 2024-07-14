import { match } from "ts-pattern";

// with Union type
// just a set of possible types
type ResultWithUnion = string | number | (() => string);

const resultProcessorWithUnion = (result: ResultWithUnion): string | undefined => {
  if (typeof result === "number") {
    return result.toFixed();
  }

  if (typeof result === "string") {
    return result.toLocaleLowerCase();
  }

  return result();
};

// with Unit type
// Unit type are a subtype of "primitive" types, that contain precisely one primitive value
type ResultWithUnit = true | "error" | 5;

const resultProcessorWithUnit = (result: ResultWithUnit): string => {
  if (result === true) {
    return "true";
  }

  if (result === "error") {
    return result;
  }

  return "five";
};

resultProcessorWithUnit(3); // Error
resultProcessorWithUnit(5); // Ok

// Discriminated unions
// each type in a union has common properties with literal types
type Result =
  | { type: "ok"; value: number } //
  | { type: "error"; message: string };

const resultInterpretor = (result: Result): string => {
  switch (result.type) {
    case "error":
      return result.message;
    case "ok":
      return `${result.value}`;
    default:
      return "never" as never;
  }
};

const betterResultInterpretor = (result: Result): string => {
  return match(result)
    .with({ type: "ok" }, res => `${res.value}`)
    .with({ type: "error" }, err => `${err.message}`)
    .exhaustive();
};
