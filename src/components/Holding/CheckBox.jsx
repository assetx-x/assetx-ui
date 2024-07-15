import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function CheckBox({ onChange, value, label }) {
  const [checked, setChecked] = React.useState(false);

  const handleChecked = () => {
    const _value = !checked;
    setChecked(_value);
    onChange(_value);
  };

  React.useEffect(() => {
    if (value !== undefined) setChecked(value);
  }, [value]);

  return (
    <div
      className="flex gap-2 items-center cursor-pointer w-full"
      onClick={handleChecked}
    >
      <span
        className={`rounded-sm border-2 flex items-center justify-center w-5 h-5 transition-colors ${
          checked ? "bg-blue-500 border-blue-500 text-white" : "border-gray-400"
        }`}
      >
        <FontAwesomeIcon
          icon={faCheck}
          className={`text-[0.7rem] transition-transform ${
            checked ? "scale-100" : "scale-0"
          }`}
        />
      </span>
      {label && <label className="cursor-pointer">{label}</label>}
    </div>
  );
}
