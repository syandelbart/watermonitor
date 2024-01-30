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
  closeMenuOnSelect = true,
  className,
}: {
  options: { value: string; label: string }[];
  name?: string;
  label?: string;
  isMulti?: boolean;
  onChange?: (event: any) => void;
  closeMenuOnSelect?: boolean;
  className?: string;
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <Select
        closeMenuOnSelect={closeMenuOnSelect}
        options={options}
        isMulti={isMulti}
        name={name}
        aria-label={name}
        onChange={onChange}
      />
    </div>
  );
};

export default SelectComponent;
