import { useRef, useState } from "react"
import { Body1, Carousel, Flex, type CarouselRef } from "@appboxo/ui-kit"

import { PreviewLayout, Section } from "./_section"

const SLIDES = [
  { bg: "linear-gradient(135deg, #f4f9f5 0%, #dcf2e3 100%)", title: "Slide 1" },
  { bg: "linear-gradient(135deg, #ebf4ff 0%, #d1e7ff 100%)", title: "Slide 2" },
  { bg: "linear-gradient(135deg, #fff7e0 0%, #ffeec2 100%)", title: "Slide 3" },
] as const

export function CarouselNoIndicatorPreview() {
  const carouselRef = useRef<CarouselRef>(null)
  const [index, setIndex] = useState(0)

  return (
    <PreviewLayout>
      <Section
        title="Custom controls"
        description="Pass `showIndicator={false}` to suppress the built-in dots; drive the carousel from any external chrome via a ref. Same pattern pass-freedom /passes/detail uses for its QR-card row."
      >
        <Carousel
          ref={carouselRef}
          showIndicator={false}
          onChange={setIndex}
        >
          {SLIDES.map((s) => (
            <div
              key={s.title}
              style={{
                height: 220,
                background: s.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 16,
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              {s.title}
            </div>
          ))}
        </Carousel>

        <Flex vertical={false} gap={12} justify="center" align="center">
          <button
            onClick={() => carouselRef.current?.changeIndex(Math.max(0, index - 1))}
            disabled={index === 0}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              background: "var(--fill-2)",
              border: 0,
              cursor: index === 0 ? "not-allowed" : "pointer",
              opacity: index === 0 ? 0.5 : 1,
            }}
          >
            Prev
          </button>
          <Body1 weight="semibold" color="text-4">
            {index + 1} / {SLIDES.length}
          </Body1>
          <button
            onClick={() =>
              carouselRef.current?.changeIndex(
                Math.min(SLIDES.length - 1, index + 1),
              )
            }
            disabled={index === SLIDES.length - 1}
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              background: "var(--fill-2)",
              border: 0,
              cursor:
                index === SLIDES.length - 1 ? "not-allowed" : "pointer",
              opacity: index === SLIDES.length - 1 ? 0.5 : 1,
            }}
          >
            Next
          </button>
        </Flex>
      </Section>
    </PreviewLayout>
  )
}
