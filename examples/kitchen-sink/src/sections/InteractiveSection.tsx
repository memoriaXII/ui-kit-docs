import { useState } from "react";
import {
  PrimaryButton,
  SecondaryButton,
  TertiaryButton,
  Drawer,
  PopupSwiper,
  DialCodeSelector,
  DatePicker,
  TimePicker,
  Toast,
  Body1,
  Body2,
  Footnote1,
} from "@appboxo/ui-kit";

import { Section, Subhead } from "./Section";

export function InteractiveSection() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [dialOpen, setDialOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  const [dialPick, setDialPick] = useState("");
  const [datePick, setDatePick] = useState<number | undefined>();
  const [timePick, setTimePick] = useState<number | undefined>();

  return (
    <Section
      title="Interactive overlays"
      description="Components that mount portals / popups. Each is summoned by a button so you can both see the trigger surface and the resulting overlay under the active brand."
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Toast" />
          <PrimaryButton
            text="Info toast"
            onClick={() => Toast.info("Plan activated")}
          />
          <SecondaryButton
            text="Info toast"
            onClick={() => Toast.info("Saving your changes…")}
          />
          <TertiaryButton
            text="Error toast"
            onClick={() => Toast.error("Something went wrong")}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="Drawer" />
          <Footnote1>Bottom-anchored swipeable drawer.</Footnote1>
          <PrimaryButton text="Open drawer" onClick={() => setDrawerOpen(true)} />
          <Drawer close={() => setDrawerOpen(false)} visible={drawerOpen}>
            <div
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <Body1 weight="semibold">Drawer title</Body1>
              <Body2>
                Drawer content goes here. Swipe down or tap the backdrop to close.
              </Body2>
              <PrimaryButton
                text="Close"
                onClick={() => setDrawerOpen(false)}
              />
            </div>
          </Drawer>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="PopupSwiper" />
          <Footnote1>The full swipeable popup primitive.</Footnote1>
          <PrimaryButton text="Open popup" onClick={() => setPopupOpen(true)} />
          <PopupSwiper
            close={() => setPopupOpen(false)}
            visible={popupOpen}
            direction="bottom"
            allowSwipeDirections={["bottom"]}
          >
            <div
              style={{
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <Body1 weight="semibold">Popup title</Body1>
              <Body2>
                Lower-level than Drawer; you control the chrome.
              </Body2>
              <PrimaryButton
                text="Close"
                onClick={() => setPopupOpen(false)}
              />
            </div>
          </PopupSwiper>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="DialCodeSelector" />
          <Footnote1>
            Country code picker with built-in search. Selected:{" "}
            <strong>{dialPick || "(none)"}</strong>
          </Footnote1>
          <PrimaryButton
            text="Pick a country"
            onClick={() => setDialOpen(true)}
          />
          <DialCodeSelector
            visible={dialOpen}
            onClose={() => setDialOpen(false)}
            onSelect={(c) => setDialPick(`${c.flag} ${c.name} (+${c.callingCode})`)}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="DatePicker" />
          <Footnote1>
            Selected:{" "}
            <strong>
              {datePick ? new Date(datePick).toDateString() : "(none)"}
            </strong>
          </Footnote1>
          <PrimaryButton text="Pick date" onClick={() => setDateOpen(true)} />
          <DatePicker
            visible={dateOpen}
            onHide={() => setDateOpen(false)}
            onOk={(ts) => {
              setDatePick(ts);
              setDateOpen(false);
            }}
            value={datePick}
            minDateTime={Date.now()}
            maxDateTime={Date.now() + 1000 * 60 * 60 * 24 * 60}
            title="Pick a date"
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Subhead label="TimePicker" />
          <Footnote1>
            Selected:{" "}
            <strong>
              {timePick ? new Date(timePick).toLocaleTimeString() : "(none)"}
            </strong>
          </Footnote1>
          <PrimaryButton text="Pick time" onClick={() => setTimeOpen(true)} />
          <TimePicker
            visible={timeOpen}
            onHide={() => setTimeOpen(false)}
            onOk={(ts) => {
              setTimePick(ts);
              setTimeOpen(false);
            }}
            value={timePick}
            title="Pick a time"
            hourFormat="24h"
          />
        </div>
      </div>
    </Section>
  );
}
