import React from "react";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

function Filters({}) {
  return (
    <Button>
      <span className="flex gap-2 items-center">
        <span>Filters</span>
        <FontAwesomeIcon icon={faFilter} />
      </span>
    </Button>
  );
}

export default Filters;
