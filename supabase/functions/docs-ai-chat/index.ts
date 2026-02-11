import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const DOCUMENTATION_CONTEXT = `You are an AI assistant for the Agentium SDK documentation. You help developers understand and use the Agentium SDK effectively.

Key information about Agentium SDK:
- Agentium is an SDK for building AI agents with verifiable credentials and telemetry
- Available for TypeScript (npm: @semiotic-labs/agentium-sdk) and Python (pip: agentium-sdk)
- Core concepts include: AgentiumClient, VerifiableCredentials, Telemetry, and Agent Identity

TypeScript Installation:
\`\`\`bash
npm install @semiotic-labs/agentium-sdk
# or
yarn add @semiotic-labs/agentium-sdk
\`\`\`

Python Installation:
\`\`\`bash
pip install agentium-sdk
\`\`\`

Key Features:
1. Verifiable Credentials - Cryptographic proofs for agent identity
2. Telemetry - Track agent behavior and performance
3. Agent Identity - Unique identifiers for AI agents
4. Interoperability - Works with major AI frameworks

Quick Start TypeScript:
\`\`\`typescript
import { AgentiumClient } from '@semiotic-labs/agentium-sdk';

const client = new AgentiumClient({
  apiKey: process.env.AGENTIUM_API_KEY
});

const credential = await client.createCredential({
  subject: 'my-agent',
  claims: { role: 'assistant' }
});
\`\`\`

Quick Start Python:
\`\`\`python
from agentium_sdk import AgentiumClient

client = AgentiumClient(api_key=os.environ["AGENTIUM_API_KEY"])

credential = client.create_credential(
    subject="my-agent",
    claims={"role": "assistant"}
)
\`\`\`

API Reference Key Methods:
- AgentiumClient.createCredential() - Create a new verifiable credential
- AgentiumClient.verifyCredential() - Verify an existing credential
- AgentiumClient.trackEvent() - Log telemetry events
- AgentiumClient.getIdentity() - Get agent identity information

Always provide helpful, accurate answers about the SDK. If you don't know something specific, suggest checking the official documentation or GitHub repository.`;

// Simple in-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_MAX = 20; // Max requests per window
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }
  
  record.count++;
  return false;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting based on client IP
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    if (isRateLimited(clientIP)) {
      console.warn(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      return new Response(JSON.stringify({ error: "Service temporarily unavailable" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: DOCUMENTATION_CONTEXT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Unable to process your request. Please try again later." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("docs-ai-chat error:", error);
    // Return generic error to client - detailed error logged server-side
    return new Response(JSON.stringify({ error: "Unable to process your request. Please try again later." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
