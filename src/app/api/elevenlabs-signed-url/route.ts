import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.ELEVEN_LABS_API_KEY;
  const agentId = process.env.ELEVEN_LABS_AGENT_ID;

  if (!apiKey || !agentId) {
    return NextResponse.json(
      { error: "ElevenLabs credentials not configured" },
      { status: 500 },
    );
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${agentId}`,
      {
        headers: {
          "xi-api-key": apiKey,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const body = await response.json().catch(() => response.text());
      console.error(
        "[ElevenLabs] Signed URL failed:",
        response.status,
        JSON.stringify(body),
      );
      return NextResponse.json(
        {
          error: "Failed to get signed URL from ElevenLabs",
          detail: body,
        },
        { status: response.status },
      );
    }

    const { signed_url } = await response.json();
    return NextResponse.json({ signedUrl: signed_url });
  } catch (err) {
    console.error("[ElevenLabs] Signed URL error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
