import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "AL Solutions AI";
  const subtitle = searchParams.get("subtitle") ?? "AI Chatbots shipped in 30 days";
  const tag = searchParams.get("tag") ?? "alsolutionsai.online";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          background: "linear-gradient(135deg,#080812 0%,#0F0F1A 60%,#1a0a2e 100%)",
        }}
      >
        <div
          style={{
            color: "#A78BFA",
            fontSize: "14px",
            fontWeight: 600,
            marginBottom: "20px",
            textTransform: "uppercase",
          }}
        >
          {tag}
        </div>
        <div
          style={{
            fontSize: title.length > 40 ? "42px" : "52px",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "16px",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: "20px",
            color: "#94A3B8",
            maxWidth: "700px",
            marginBottom: "40px",
          }}
        >
          {subtitle}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div style={{ color: "#FFFFFF", fontSize: "18px", fontWeight: 700 }}>AL Solutions AI</div>
          <div style={{ color: "#00D97E", fontSize: "14px", fontWeight: 600 }}>30 days · 2.3x leads · 12 deployments</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}