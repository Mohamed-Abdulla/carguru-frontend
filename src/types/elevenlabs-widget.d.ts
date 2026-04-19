// Type declaration for the ElevenLabs convai web component
// https://elevenlabs.io/docs/eleven-agents/customization/widget

import type { DetailedHTMLProps, HTMLAttributes } from "react";

type ElevenLabsConvaiProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement> & {
    "agent-id"?: string;
    "signed-url"?: string;
    variant?: "compact" | "expanded";
    dismissible?: "true" | "false";
    "server-location"?: string;
    "action-text"?: string;
    "start-call-text"?: string;
    "end-call-text"?: string;
    "expand-text"?: string;
    "listening-text"?: string;
    "speaking-text"?: string;
    "avatar-image-url"?: string;
    "avatar-orb-color-1"?: string;
    "avatar-orb-color-2"?: string;
    "dynamic-variables"?: string;
    "override-language"?: string;
    "override-prompt"?: string;
    "override-first-message"?: string;
    "override-voice-id"?: string;
  },
  HTMLElement
>;

// Augment React's JSX namespace (required for Next.js new JSX transform)
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": ElevenLabsConvaiProps;
    }
  }
}
