import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";

const FIELD_CONFIG = {
  base: [
    { key: "subject", label: "When a receipt", type: "dropdown", options: ["is found in", "is missing in"] },
  ],
  "is found in": [
    { key: "source", label: "Source", type: "dropdown", options: ["Email", "SMS"] }
  ],
  "is missing in": [
    { key: "source", label: "Source", type: "dropdown", options: ["Email", "SMS"] },
  ],
  Email: [
    {
      key: "identifier",
      label: "Select Email Address",
      type: "dropdown",
      options: ["email1@gmail.com", "email2@gmail.com"],
    },
    {
      key: "logic",
      label: "Logic",
      type: "dropdown",
      options: ["And", "Or", "End"],
    },
  ],
  SMS: [
    {
      key: "identifier",
      label: "Select SMS Sender",
      type: "dropdown",
      options: ["SMS1", "SMS2", "SMS3"],
    },
    {
      key: "logic",
      label: "Logic",
      type: "dropdown",
      options: ["And", "Or", "End"],
    },
  ],
  And: [
    { key: "field", label: "Field", type: "dropdown", options: ["value", "date", "merchant"] }
  ],
  Or: [
    { key: "field", label: "Field", type: "dropdown", options: ["value", "date", "merchant"] }
  ],
  value: [
    { key: "operator", label: "Operator", type: "dropdown", options: [">", "<", "="] },
    { key: "amount", label: "Amount", type: "number" },
    { key: "logic", label: "Logic", type: "dropdown", options: ["And", "Or", "End"] }
  ],
  date: [
    { key: "dateValue", label: "Enter Date", type: "text" },
    { key: "logic", label: "Logic", type: "dropdown", options: ["And", "Or", "End"] }
  ],
  merchant: [
    { key: "merchantValue", label: "Enter Merchant", type: "text" },
    { key: "logic", label: "Logic", type: "dropdown", options: ["And", "Or", "End"] }
  ]
};

const Field = ({ field, value, onChange }) => {
  if (field.type === "dropdown") {
    return (
      <View style={{ borderWidth: 1, borderColor: "#ccc", width: 150, marginRight: 10, marginBottom: 10, height: 40, justifyContent: "center" }}>
        {/* <Text>{field.label}</Text> */}
        <Picker
          selectedValue={value || ""}
          onValueChange={(val) => onChange(val)}
        >
          <Picker.Item label="Select..." value="" />
          {field.options.map((opt) => (
            <Picker.Item key={opt} label={opt} value={opt} />
          ))}
        </Picker>
      </View>
    );
  }

  if (field.type === "number" || field.type === "text") {
    return (
      <View style={{ width: 150, marginRight: 10, marginBottom: 10 }}>
        {/* <Text>{field.label}</Text> */}
        <TextInput
          style={{ borderWidth: 1, borderColor: "#ccc", padding: 4, height: 40 }}
          keyboardType={field.type === "number" ? "numeric" : "default"}
          value={value || ""}
          onChangeText={(text) => onChange(text)}
        />
      </View>
    );
  }

  return null;
};

const ConditionNode = ({ node, onUpdate }) => {
  const handleFieldChange = (key, val) => {
    const updatedNode = {
      ...node,
      values: { ...node.values, [key]: val },
    };

    if (FIELD_CONFIG[val]) {
      updatedNode.children = [
        {
          id: Date.now() + Math.random(),
          key: val,
          values: {},
          children: [],
        },
      ];
    } else if (key === "logic" && val === "End") {
      updatedNode.children = [];
    }

    onUpdate(updatedNode);
  };

  const fields = FIELD_CONFIG[node.key] || [];

  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
      {fields.map((field) => (
        <Field
          key={field.key}
          field={field}
          value={node.values[field.key]}
          onChange={(val) => handleFieldChange(field.key, val)}
        />
      ))}
      {node.children.map((child) => (
        <ConditionNode
          key={child.id}
          node={child}
          onUpdate={(updatedChild) => {
            const updatedNode = {
              ...node,
              children: node.children.map((c) =>
                c.id === updatedChild.id ? updatedChild : c
              ),
            };
            onUpdate(updatedNode);
          }}
        />
      ))}
    </View>
  );
};

export default function ConditionalRules() {
  const [condition, setCondition] = useState({
    id: 1,
    key: "base",
    values: {},
    children: [],
  });

  return (
    <View style={{ paddingHorizontal: 20, marginTop: 80 }}>
      <Text style={{ marginBottom: 10 }}>When a receipt</Text>
      <ConditionNode node={condition} onUpdate={setCondition} />

      {/* <Button title="Print Conditions" onPress={() => console.log(condition)} /> */}
    </View>
  );
}

