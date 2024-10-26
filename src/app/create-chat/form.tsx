"use client";
import { useFormState } from "react-dom";

import {
  botPersonalityOptions,
  languageOptions,
  proficiencyOptions,
  responseLengthOptions,
} from "@/utils/createChatOptions";

import { createChat } from "./actions";

import CustomSelect from "@/components/form/custom-select";
import CustomInput from "@/components/form/custom-input";

export default function CreateChatForm() {
  const [state, action] = useFormState(createChat, {
    status: "success",
  });

  const errors = state.status === "error" ? state.errors : null;

  return (
    <form
      action={action}
      className="bg-dark-gray-2 p-6 w-full h-full rounded-lg shadow-lg flex flex-col gap-3 overflow-y-auto"
    >
      <h1 className="text-2xl text-light-gray font-bold">Create New Chat</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-1.5">
        <CustomInput
          label={"Chat Topic"}
          type="text"
          name="topic"
          placeholder="Enter chat topic..."
          error={errors?.topic[0]}
        />

        <CustomInput
          label={"Chat Title"}
          type="text"
          name="title"
          placeholder="Enter chat title..."
          error={errors?.title[0]}
        />

        <CustomSelect
          label="Level of Proficiency"
          name="proficiency"
          options={proficiencyOptions}
          error={errors?.proficiency[0]}
        />

        <CustomSelect
          name="personality"
          label="Bot Personality"
          options={botPersonalityOptions}
          error={errors?.personality[0]}
        />

        <CustomSelect
          name="language"
          label="Language"
          options={languageOptions}
          error={errors?.language[0]}
        />

        <CustomSelect
          label="Response Length"
          options={responseLengthOptions}
          error={errors?.responseLength[0]}
        />
      </div>

      <div className="mb-1.5">
        <label className="block text-light-gray mb-2">
          Background Information
        </label>
        <textarea
          name="background"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-primary bg-dark-gray-4 text-light-gray"
          placeholder="Provide any background info..."
        />

        <p className="text-red-400 text-sm h-1">
          {errors?.background && errors.background[0]}
        </p>
      </div>

      <CustomInput
        label={"Tags"}
        type="text"
        name="tag"
        placeholder="Add tags (e.g. Business, Learning)..."
        error={errors?.tags && errors.tags[0]}
      />

      <button
        type="submit"
        className="w-full p-3 bg-darker-gray mt-auto hover:bg-dark-gray-5 text-white rounded-lg transition-all duration-300"
      >
        Create Chat
      </button>
    </form>
  );
}
