import { useState } from "react";
import {
  Input,
  TextArea,
  Checkbox,
  Radio,
  SearchBar,
  PickerInput,
  Body1,
  Footnote1,
} from "@appboxo/ui-kit";

import { Section, Subhead } from "./Section";

const countries = [
  { label: "Spain", value: "es" },
  { label: "France", value: "fr" },
  { label: "Germany", value: "de" },
  { label: "Italy", value: "it" },
  { label: "Portugal", value: "pt" },
];

export function InputsSection() {
  const [text, setText] = useState("");
  const [longText, setLongText] = useState("");
  const [search, setSearch] = useState("");
  const [picked, setPicked] = useState<(string | number)[]>([]);
  const [check1, setCheck1] = useState(true);
  const [check2, setCheck2] = useState(false);
  const [radio, setRadio] = useState("a");

  return (
    <Section
      title="Form inputs"
      description="Text inputs, choice controls, picker. Each surface backs onto its own --boxo-input-*, --boxo-search-bar-*, --checkbox-*, --picker-* tokens."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Input" />
          <Input
            placeholder="Default"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Input placeholder="With value" value="Already typed" readOnly />
          <Input placeholder="Error" hasError value="invalid@" />
          <Input placeholder="Disabled" disabled value="locked" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Textarea" />
          <TextArea
            placeholder="Tell us a little about yourself…"
            value={longText}
            onChange={(e) => setLongText(e.target.value)}
            rows={3}
          />
          <TextArea placeholder="Error state" hasError rows={2} value="oops" />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Search bar" />
          <SearchBar
            placeholder="Search countries"
            value={search}
            onInput={(_, val) => setSearch(val)}
            onClear={() => setSearch("")}
            actionButton={null}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Picker input" />
          <PickerInput
            data={[countries]}
            value={picked}
            onOk={(v) => setPicked(v as (string | number)[])}
            title="Pick a country"
            ariaLabel="Country picker"
          />
          <Footnote1>Tap to open the wheel picker.</Footnote1>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Checkbox" />
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Checkbox
              value="default"
              checked={check1}
              onChange={(c) => setCheck1(c)}
            />
            <Body1>Default</Body1>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Checkbox
              value="circle-dot"
              iconType="circle-dot"
              checked={check2}
              onChange={(c) => setCheck2(c)}
            />
            <Body1>circle-dot</Body1>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Checkbox
              value="circle-outline-dot"
              iconType="circle-outline-dot"
              checked
            />
            <Body1>circle-outline-dot</Body1>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Checkbox value="disabled" checked disabled />
            <Body1>Disabled (checked)</Body1>
          </label>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Radio (kit-rendered SVG)" />
          {(["a", "b", "c"] as const).map((value) => (
            <label
              key={value}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
              }}
              onClick={() => setRadio(value)}
            >
              <Radio active={radio === value} />
              <Body1>Option {value.toUpperCase()}</Body1>
            </label>
          ))}
        </div>
      </div>
    </Section>
  );
}
