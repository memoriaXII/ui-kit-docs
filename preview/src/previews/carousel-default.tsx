import { Body1, Carousel, Flex, Title1 } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

const SLIDES = [
  {
    bg: "linear-gradient(135deg, #f4f9f5 0%, #dcf2e3 100%)",
    title: "Skip the Line",
    body: "Pre-book Fast Track security access and breeze through airport checkpoints.",
  },
  {
    bg: "linear-gradient(135deg, #ebf4ff 0%, #d1e7ff 100%)",
    title: "Book in a Few Taps",
    body: "Choose your airport, terminal, and time — we'll check availability instantly.",
  },
  {
    bg: "linear-gradient(135deg, #fff7e0 0%, #ffeec2 100%)",
    title: "Stress-Free Entry",
    body: "Show your QR code at the Fast Track lane and pass security with ease.",
  },
] as const

const Slide = ({
  bg,
  title,
  body,
}: {
  bg: string
  title: string
  body: string
}) => (
  <div
    style={{
      height: 280,
      background: bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      borderRadius: 16,
    }}
  >
    <Flex gap={8} align="center">
      <Title1 weight="bold" style={{ textAlign: "center" }}>
        {title}
      </Title1>
      <Body1 style={{ textAlign: "center", maxWidth: 280 }}>{body}</Body1>
    </Flex>
  </div>
)

export function CarouselDefaultPreview() {
  return (
    <PreviewLayout>
      <Section
        title="Default"
        description="Bakes in no auto-play, no loop, circle indicator outside the slide area — the four flags every onboarding carousel sets."
      >
        <Carousel>
          {SLIDES.map((s) => (
            <Slide key={s.title} {...s} />
          ))}
        </Carousel>
      </Section>
    </PreviewLayout>
  )
}
