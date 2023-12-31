import React, { ChangeEvent, FunctionComponent, useState } from "react";
import RadioButtonComponent from "./radioButton";
import { datasets } from "../../data/datasets";
import { models } from "../../data/models";
import { DropdownComponent } from "./dropdown";
import { inputComponents } from "../../data/inputComponents";
import { NumberInputComponent } from "./numberInput";
import { useNavigate } from "react-router-dom";
import { CreationComponentProps } from "../creation/types";
import { LandingPageProps } from "./types";

export const LandingPage: FunctionComponent<LandingPageProps> = ({
  handlePropsData,
}) => {
  const navigate = useNavigate();
  // State variables to hold the selected/entered values
  const [selectedModel, setSelectedModel] = useState<string>(models[0].value); // Set the first model as the default
  const [selectedDataset, setSelectedDataset] = useState<string>(
    datasets[0].value
  ); // Set the first dataset as the default
  const [inputValues, setInputValues] = useState<number[]>([]);

  // Callback functions to update the state variables
  const handleModelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedModel(event.target.value);
  };

  const handleDatasetChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDataset(event.target.value);
  };

  const handleInputChange = (index: number, value: number) => {
    setInputValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[index] = value;
      return updatedValues;
    });
  };

  // Function to handle the button click
  const handleButtonClick = () => {
    // Access the selected/entered values here
    const [dataset, epochs, batch_size, learning_rate] = inputValues;

    const propsData: CreationComponentProps = {
      epochs: epochs,
      batchSize: batch_size,
      preloadedDataset: true,
      learningRate: learning_rate,
      trainingSplit: 0.7,
      selectedDataset: selectedDataset,
      optimizer: "",
      lossFunction: "",
      selectedModel: selectedModel,
      datasetInput: dataset,
    };
    handlePropsData(propsData);
    navigate("/create");
  };

  return (
    <div className="overflow-auto bg-[#1B1D2D] text-white flex flex-col h-full justify-center items-center text-2xl">
      <div className="flex flex-col w-1/2 px-10 py-5 mx-auto shadow-2xl bg-[#23252E]">
        <RadioButtonComponent
          title="Which type of ML model would you like to make?"
          models={models}
          onChange={handleModelChange}
          model={selectedModel}
        />
        <DropdownComponent
          title={"Select a dataset"}
          datasets={datasets}
          onChange={handleDatasetChange}
        />
        {inputComponents.map(({ title, type, pattern }, index) => (
          <NumberInputComponent
            title={title}
            pattern={pattern}
            type={type}
            key={index}
            index={index}
            onChange={(value) => handleInputChange(index, Number(value))}
          />
        ))}

        <button
          className="bg-[#38305c] w-max self-center transition-transform ease-in-out duration-200 font-semibold hover:bg-[#141121] hover:scale-105 text-white py-2 my-4 px-4 rounded"
          onClick={handleButtonClick}
        >
          Start Machine Learning
        </button>
      </div>
    </div>
  );
};
