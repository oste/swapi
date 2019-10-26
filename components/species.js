import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { faAndroid } from "@fortawesome/free-brands-svg-icons";

import { loadSpecies } from "../actions/speciesActions";

const Species = ({ species }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (species.id) {
      dispatch(loadSpecies(species));
    }
  }, []);

  const speciesIcon = species => {
    if (!species) {
      return;
    }
    switch (species) {
      case "Human":
        return <FontAwesomeIcon icon={faUser} />;
      case "Droid":
        return <FontAwesomeIcon icon={faAndroid} />;
      default:
        return <FontAwesomeIcon icon={faQuestion} />;
    }
  };

  return <div>{speciesIcon(species.name)}</div>;
};

export default Species;
