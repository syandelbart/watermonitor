"use client";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const SelectComponent = ({
  options,
  isMulti,
  label,
  name,
  onChange,
}: {
  options: { value: string; label: string }[];
  name?: string;
  label?: string;
  isMulti?: boolean;
  onChange?: (event: any) => void;
}) => {
  return (
    <div>
      {label && (
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Select
        options={options}
        isMulti
        name={name}
        aria-label={name}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectComponent;
