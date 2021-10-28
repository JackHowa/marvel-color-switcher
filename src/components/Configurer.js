/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import getCSSVariables from '../utils/getCSSVariables';
import LowerFooter from '../styles/LowerFooter';

/*
    0: (2) ["--colors-primary", "deeppink"]
    1: (2) ["--colors-background", "tan"]

  */
 
const Configurer = () => {
  // todo: 
  // on change of super hero theme
  //  update the set property values or even re-run 
  const cssCustomPropIndex = getCSSVariables();
  const [targetPropertyIndex, setPropertyIndex] = React.useState(0);
  const targetProperty = cssCustomPropIndex[targetPropertyIndex][0];
  const [targetPropertyValue, setTargetValue] = React.useState(cssCustomPropIndex[targetPropertyIndex][1]);

  function handleSetPropertyValue(event) {
    const { value: pickedPropertyValue } = event.target;
    document.documentElement.style.setProperty(
      targetProperty,
      pickedPropertyValue,
    );
    setTargetValue(pickedPropertyValue);
  }

  function handleSetProperty(event) {
    const { value: pickedPropertyIndex } = event.target;
    setPropertyIndex(parseInt(pickedPropertyIndex, 10));
  }

  // todo:
  // figure out which type of input needed
  // if variable name includes color, use color
  // or if variable value starts with # then use color?

  return (
    <LowerFooter>
      <label>
        Pick Target CSS Variable
        <select
          onChange={handleSetProperty}
          value={targetPropertyIndex}
        >
          {
          cssCustomPropIndex.map((customPropArray, index) => {
            const [propertyName] = customPropArray;
            return (
              <option value={index}>{propertyName}</option>
            );
          })
        }
        </select>
      </label>

      <label>
        Pick Color
        <input
          type="color"
          value={targetPropertyValue}
          onChange={handleSetPropertyValue}
        />
      </label>
    </LowerFooter>
  );
};

export default Configurer;
