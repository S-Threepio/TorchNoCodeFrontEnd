import { CanvasProps } from "../components/creation/types";

export const canvasProps: CanvasProps = {
  layers: [
    {
      layer_type: "Flatten",
      layer_id: "1",
      layer_name: "fl",
      params: {},
    },
    {
      layer_type: "Linear",
      layer_id: "2",
      layer_name: "fc1",
      params: {
        in_features: 784,
        out_features: 100,
        bias: true,
      },
    },
    {
      layer_type: "Linear",
      layer_id: "3",
      layer_name: "fc2",
      params: {
        in_features: 100,
        out_features: 10,
        bias: true,
      },
    },
  ],
  input_size: 784,
  epochs: 1,
  batch_size: 7,
  preloaded_dataset: true,
  learning_rate: 0.001,
  training_split: 0.7,
  dataset: {
    id: "FashionMNIST",
  },
  optimizer: "SGD",
  loss_function: "CrossEntropyLoss",
};
