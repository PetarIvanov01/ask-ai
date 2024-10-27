import { CustomChatSchema } from "@/core/entities/models/chat";

const initialState: CustomChatSchema = {
  topic: "",
  title: "",
  proficiency: "beginner",
  personality: "friendly",
  language: "english",
  responseLength: "short",
  background: "",
  tags: "",
};

const proficiencyOptions = [
  { value: "Beginner" },
  { value: "Intermediate" },
  { value: "Advanced" },
];

const botPersonalityOptions = [
  { value: "Friendly" },
  { value: "Professional" },
  { value: "Humorous" },
];

const responseToneOptions = [
  { value: "Formal" },
  { value: "Neutral" },
  { value: "Friendly" },
];

const languageOptions = [{ value: "English" }, { value: "Bulgarian" }];

const responseLengthOptions = [
  { value: "Short" },
  { value: "Medium" },
  { value: "Detailed" },
];

export {
  proficiencyOptions,
  botPersonalityOptions,
  responseLengthOptions,
  languageOptions,
  responseToneOptions,
  initialState,
};
