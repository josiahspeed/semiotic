import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Mock responses for the API playground
// In production, these would be proxied to the actual Agentium API
const MOCK_RESPONSES: Record<string, unknown> = {
  "connect-google-identity": {
    did: "did:agentium:abc123def456ghi789",
    accessToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6YWdlbnRpdW06YWJjMTIzZGVmNDU2Z2hpNzg5IiwiaXNzIjoiZGlkOndlYjphcGkuYWdlbnRpdW0ubmV0d29yayIsImV4cCI6MTczODY3NzYwMCwiaWF0IjoxNzA3MTQxNjAwfQ.mock_signature",
    refreshToken: "rt_mock_refresh_token_abc123",
    expiresIn: 3600,
    isNew: true,
    badge: { status: "verified" }
  },
  "exchange-api-key": {
    accessToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6YWdlbnRpdW06YWJjMTIzZGVmNDU2Z2hpNzg5IiwiaXNzIjoiZGlkOndlYjphcGkuYWdlbnRpdW0ubmV0d29yayIsImV4cCI6MTczODY3NzYwMCwiaWF0IjoxNzA3MTQxNjAwfQ.mock_signature",
    refreshToken: "rt_mock_refresh_token_def456",
    expiresIn: 3600,
    tokenType: "Bearer",
    scope: "read write"
  },
  "refresh-token": {
    accessToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6YWdlbnRpdW06YWJjMTIzZGVmNDU2Z2hpNzg5IiwiaXNzIjoiZGlkOndlYjphcGkuYWdlbnRpdW0ubmV0d29yayIsImV4cCI6MTczODY3NzYwMCwiaWF0IjoxNzA3MTQxNjAwfQ.new_signature",
    refreshToken: "rt_mock_new_refresh_token_ghi789",
    expiresIn: 3600,
    tokenType: "Bearer"
  },
  "fetch-membership-credential": {
    credential: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6YWdlbnRpdW06YWJjMTIzZGVmNDU2Z2hpNzg5IiwidHlwZSI6IkFnZW50aXVtTWVtYmVyc2hpcENyZWRlbnRpYWwiLCJpc3MiOiJkaWQ6d2ViOmFwaS5hZ2VudGl1bS5uZXR3b3JrIiwiZXhwIjoxNzM4Njc3NjAwLCJpYXQiOjE3MDcxNDE2MDB9.credential_signature",
    type: "AgentiumMembershipCredential",
    issuedAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  },
  "verify-credential": {
    valid: true,
    claims: {
      sub: "did:agentium:abc123def456ghi789",
      iss: "did:web:api.agentium.network",
      exp: Math.floor(Date.now() / 1000) + 365 * 24 * 60 * 60,
      iat: Math.floor(Date.now() / 1000),
      type: "AgentiumMembershipCredential"
    },
    error: null
  },
  "validate-caip2": {
    valid: true,
    namespace: "eip155",
    reference: "84532"
  }
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { method, parameters } = await req.json();
    console.log(`API Playground request: method=${method}`, parameters);

    // Validate method exists
    if (!MOCK_RESPONSES[method]) {
      return new Response(
        JSON.stringify({
          error: "Unknown method",
          message: `Method '${method}' is not supported`
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // For the validate-caip2 method, provide dynamic response based on input
    if (method === "validate-caip2" && parameters.chainId) {
      const chainId = parameters.chainId;
      const match = chainId.match(/^([a-z0-9-]+):([a-zA-Z0-9]+)$/);
      
      if (match) {
        return new Response(
          JSON.stringify({
            mock: true,
            statusCode: 200,
            response: {
              valid: true,
              namespace: match[1],
              reference: match[2]
            }
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      } else {
        return new Response(
          JSON.stringify({
            mock: true,
            statusCode: 200,
            response: {
              valid: false,
              error: "Invalid CAIP-2 format. Expected format: namespace:reference"
            }
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
    }

    // For verify-credential, check if input looks like a JWT
    if (method === "verify-credential" && parameters.credentialJwt) {
      const jwt = parameters.credentialJwt;
      const parts = jwt.split(".");
      
      if (parts.length !== 3) {
        return new Response(
          JSON.stringify({
            mock: true,
            statusCode: 200,
            response: {
              valid: false,
              claims: null,
              error: {
                code: "INVALID_JWT_FORMAT",
                message: "JWT must have exactly 3 parts separated by dots"
              }
            }
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" }
          }
        );
      }
    }

    // Return mock response with indicator
    const mockResponse = MOCK_RESPONSES[method];
    
    // Add some simulated latency for realism (50-150ms)
    await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));

    return new Response(
      JSON.stringify({
        mock: true,
        statusCode: 200,
        response: mockResponse
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error("API Playground error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});
