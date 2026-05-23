import Buttons from "@/components/reuseable-component/buttons";
import React, { useState } from "react";
import AddContextForm from "./AddContextForm";

const Context = () => {
  const [showForm, setShowForm] = useState(true);
  const [showAiChat, setShowAiChat] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <h1>Add Context</h1>
      <p>Tell the AI what to focus on</p>

      <div className="flex flex-row gap-5">
        <Buttons text="Form input" type="button" />
        <Buttons text="Ai chat setup" type="button" />
      </div>

      {showForm && !showAiChat && (
        <div>
          <AddContextForm />
        </div>
      )}
    </div>
  );
};

export default Context;
