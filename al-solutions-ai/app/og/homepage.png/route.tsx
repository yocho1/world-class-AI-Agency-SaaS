import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090E",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#6C63FF",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          AL Solutions AI
        </div>
        <div
          style={{
            fontSize: 52,
            fontWeight: 500,
            color: "#F8F8FF",
            lineHeight: 1.1,
            maxWidth: 820,
            marginBottom: 28,
          }}
        >
          AI chatbots & automation that ship in 30 days.
        </div>
        <div
          style={{
            fontSize: 22,
            color: "#9898B0",
            maxWidth: 700,
            lineHeight: 1.5,
          }}
        >
          Real AI products for growth teams across MENA and Europe.
        </div>
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 40,
          }}
        >
          {[
            { val: "30 days", label: "to production" },
            { val: "+2.3x", label: "avg. conversion lift" },
            { val: "12", label: "production deployments" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 32, fontWeight: 500, color: "#6C63FF" }}>{item.val}</span>
              <span style={{ fontSize: 16, color: "#5A5A72", marginTop: 4 }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
