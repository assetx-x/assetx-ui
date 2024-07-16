import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className={`px-3 py-1.5 border border-gray-200 text-gray-600 rounded-sm font-semibold text-sm hover:bg-gray-100 hover:text-gray-800 transition-colors ${
        props.className ?? ""
      }`}
    >
      {children}
    </button>
  );
}

export function ButtonSelect({
  children,
  value,
  positionH = "left",
  dropdownIcon = null,
  showDropdownIcon = true,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  const [popoverPosition, setPopoverPosition] = React.useState("bottom");
  const popoverRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const contentRef = React.useRef(null);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      onClose && onClose();
    }
  };

  React.useEffect(() => {
    if (buttonRef.current && contentRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const contentHeight = contentRef.current.clientHeight;
      const viewportHeight = window.innerHeight;

      if (buttonRect.bottom > viewportHeight - (contentHeight + 50)) {
        setPopoverPosition("top");
      } else {
        setPopoverPosition("bottom");
      }
    }
  }, [open]);

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        className={`flex gap-2 items-center justify-between px-3 py-1.5 border border-gray-200 text-gray-600 rounded-sm text-sm hover:bg-gray-100 hover:text-gray-800 transition-all ${
          props.className ?? ""
        }`}
        ref={buttonRef}
        onClick={toggleOpen}
      >
        <span className="block text-ellipsis overflow-hidden whitespace-nowrap">
          {value}
        </span>
        {showDropdownIcon &&
          (dropdownIcon ? (
            dropdownIcon
          ) : (
            <FontAwesomeIcon className="-translate-y-1/4" icon={faSortDown} />
          ))}
      </button>
      {open ? (
        <div
          className={`bg-white shadow-lg rounded absolute top-0 ${positionH}-0 z-50${
            popoverPosition === "top" ? " -translate-y-full" : ""
          }`}
          onClick={() => onClose()}
          ref={contentRef}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

export default Button;
