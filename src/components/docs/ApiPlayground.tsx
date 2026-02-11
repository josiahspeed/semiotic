import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Loader2, Copy, Check, ChevronDown, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Highlight, themes } from "prism-react-renderer";

// Map common language aliases for syntax highlighting
const getLanguage = (lang: string) => {
  const langMap: Record<string, string> = {
    typescript: "tsx",
    python: "python",
    json: "json",
  };
  return langMap[lang.toLowerCase()] || lang;
};

type Language = "typescript" | "python";

interface ApiMethod {
  id: string;
  name: string;
  description: string;
  category: "identity" | "tokens" | "credentials" | "utilities";
  parameters: ParameterDef[];
  exampleResponse: Record<string, unknown>;
}

interface ParameterDef {
  name: string;
  type: "string" | "boolean" | "object";
  description: string;
  required: boolean;
  defaultValue?: string;
  placeholder?: string;
}

const API_METHODS: ApiMethod[] = [
  {
    id: "connect-google-identity",
    name: "connectGoogleIdentity",
    description: "Connect a Google identity to Agentium. Returns DID and access tokens.",
    category: "identity",
    parameters: [
      {
        name: "googleToken",
        type: "string",
        description: "Google OAuth JWT token",
        required: true,
        placeholder: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
      },
      {
        name: "skipAudienceValidation",
        type: "boolean",
        description: "Skip audience validation (for external OAuth like zkLogin)",
        required: false,
        defaultValue: "false"
      }
    ],
    exampleResponse: {
      did: "did:agentium:abc123...",
      accessToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...",
      refreshToken: "rt_abc123...",
      expiresIn: 3600,
      isNew: true,
      badge: { status: "verified" }
    }
  },
  {
    id: "exchange-api-key",
    name: "exchangeApiKey",
    description: "Exchange an API key for OAuth tokens. Used for M2M authentication.",
    category: "tokens",
    parameters: [
      {
        name: "apiKey",
        type: "string",
        description: "Your Agentium API key",
        required: true,
        placeholder: "ak_..."
      }
    ],
    exampleResponse: {
      accessToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...",
      refreshToken: "rt_abc123...",
      expiresIn: 3600,
      tokenType: "Bearer",
      scope: "read write"
    }
  },
  {
    id: "refresh-token",
    name: "refreshToken",
    description: "Refresh an expired access token using a refresh token.",
    category: "tokens",
    parameters: [
      {
        name: "refreshToken",
        type: "string",
        description: "Refresh token from previous authentication",
        required: true,
        placeholder: "rt_..."
      }
    ],
    exampleResponse: {
      accessToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...",
      refreshToken: "rt_new123...",
      expiresIn: 3600,
      tokenType: "Bearer"
    }
  },
  {
    id: "fetch-membership-credential",
    name: "fetchMembershipCredential",
    description: "Fetch a verifiable membership credential for the authenticated identity.",
    category: "credentials",
    parameters: [
      {
        name: "accessToken",
        type: "string",
        description: "Valid access token",
        required: true,
        placeholder: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
      }
    ],
    exampleResponse: {
      credential: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...",
      type: "AgentiumMembershipCredential",
      issuedAt: "2026-02-04T12:00:00Z",
      expiresAt: "2027-02-04T12:00:00Z"
    }
  },
  {
    id: "verify-credential",
    name: "verifyCredential",
    description: "Verify a W3C Verifiable Credential with Ed25519 signature.",
    category: "credentials",
    parameters: [
      {
        name: "credentialJwt",
        type: "string",
        description: "Credential JWT to verify",
        required: true,
        placeholder: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
      }
    ],
    exampleResponse: {
      valid: true,
      claims: {
        sub: "did:agentium:abc123...",
        iss: "did:web:api.agentium.network",
        exp: 1738677600,
        iat: 1707141600,
        type: "AgentiumMembershipCredential"
      },
      error: null
    }
  },
  {
    id: "validate-caip2",
    name: "validateCaip2",
    description: "Validate a CAIP-2 chain identifier format.",
    category: "utilities",
    parameters: [
      {
        name: "chainId",
        type: "string",
        description: "CAIP-2 chain identifier to validate",
        required: true,
        placeholder: "eip155:84532"
      }
    ],
    exampleResponse: {
      valid: true,
      namespace: "eip155",
      reference: "84532"
    }
  }
];

const CATEGORY_LABELS: Record<string, string> = {
  identity: "Identity",
  tokens: "Tokens",
  credentials: "Credentials",
  utilities: "Utilities"
};

const CATEGORY_COLORS: Record<string, string> = {
  identity: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  tokens: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  credentials: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  utilities: "bg-purple-500/20 text-purple-400 border-purple-500/30"
};

interface ApiPlaygroundProps {
  selectedLanguage: Language;
}

// Helper to get initial parameters with placeholder values
const getInitialParameters = (method: ApiMethod): Record<string, string> => {
  const params: Record<string, string> = {};
  method.parameters.forEach(param => {
    if (param.placeholder) {
      params[param.name] = param.placeholder;
    } else if (param.defaultValue) {
      params[param.name] = param.defaultValue;
    }
  });
  return params;
};

const ApiPlayground = ({ selectedLanguage }: ApiPlaygroundProps) => {
  const [selectedMethod, setSelectedMethod] = useState<ApiMethod>(API_METHODS[0]);
  const [parameters, setParameters] = useState<Record<string, string>>(() => getInitialParameters(API_METHODS[0]));
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<{
    status: "success" | "error" | "mock";
    statusCode?: number;
    data: unknown;
    duration?: number;
  } | null>(null);
  const [copied, setCopied] = useState(false);
  const [isMethodSelectorOpen, setIsMethodSelectorOpen] = useState(false);

  const handleMethodChange = (method: ApiMethod) => {
    setSelectedMethod(method);
    setParameters(getInitialParameters(method));
    setResponse(null);
    setIsMethodSelectorOpen(false);
  };

  const handleParameterChange = (name: string, value: string) => {
    setParameters(prev => ({ ...prev, [name]: value }));
  };

  const generateCodeSnippet = useCallback(() => {
    const params = selectedMethod.parameters
      .filter(p => parameters[p.name] || p.required)
      .map(p => {
        const val = parameters[p.name] || p.defaultValue || "";
        if (p.type === "boolean") {
          return `  ${p.name}: ${val === "true"}`;
        }
        return `  ${p.name}: "${val}"`;
      })
      .join(",\n");

    if (selectedLanguage === "typescript") {
      if (selectedMethod.parameters.length === 1 && selectedMethod.parameters[0].type === "string") {
        const paramValue = parameters[selectedMethod.parameters[0].name] || "...";
        return `const response = await client.${selectedMethod.name}("${paramValue}");
console.log(response);`;
      }
      return `const response = await client.${selectedMethod.name}({
${params}
});
console.log(response);`;
    } else {
      if (selectedMethod.parameters.length === 1 && selectedMethod.parameters[0].type === "string") {
        const paramValue = parameters[selectedMethod.parameters[0].name] || "...";
        return `response = await client.${selectedMethod.name.replace(/([A-Z])/g, '_$1').toLowerCase()}("${paramValue}")
print(response)`;
      }
      const pythonParams = selectedMethod.parameters
        .filter(p => parameters[p.name] || p.required)
        .map(p => {
          const val = parameters[p.name] || p.defaultValue || "";
          const pythonName = p.name.replace(/([A-Z])/g, '_$1').toLowerCase();
          if (p.type === "boolean") {
            return `    ${pythonName}=${val === "true" ? "True" : "False"}`;
          }
          return `    ${pythonName}="${val}"`;
        })
        .join(",\n");
      return `response = await client.${selectedMethod.name.replace(/([A-Z])/g, '_$1').toLowerCase()}(
${pythonParams}
)
print(response)`;
    }
  }, [selectedMethod, parameters, selectedLanguage]);

  const handleExecute = async () => {
    setIsLoading(true);
    setResponse(null);
    const startTime = Date.now();

    try {
      // Check if required parameters are filled
      const missingRequired = selectedMethod.parameters
        .filter(p => p.required && !parameters[p.name])
        .map(p => p.name);

      if (missingRequired.length > 0) {
        setResponse({
          status: "error",
          statusCode: 400,
          data: {
            error: "Missing required parameters",
            missing: missingRequired
          },
          duration: Date.now() - startTime
        });
        setIsLoading(false);
        return;
      }

      // Call the edge function to proxy the API request
      const { data, error } = await supabase.functions.invoke("agentium-api-proxy", {
        body: {
          method: selectedMethod.id,
          parameters
        }
      });

      const duration = Date.now() - startTime;

      if (error) {
        setResponse({
          status: "error",
          statusCode: 500,
          data: { error: error.message },
          duration
        });
      } else {
        setResponse({
          status: data.mock ? "mock" : "success",
          statusCode: data.statusCode || 200,
          data: data.response || data,
          duration
        });
      }
    } catch (err) {
      setResponse({
        status: "error",
        statusCode: 500,
        data: { error: err instanceof Error ? err.message : "Unknown error" },
        duration: Date.now() - startTime
      });
    }

    setIsLoading(false);
  };

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(generateCodeSnippet());
    setCopied(true);
    toast({ title: "Code copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyResponse = async () => {
    if (response) {
      await navigator.clipboard.writeText(JSON.stringify(response.data, null, 2));
      toast({ title: "Response copied to clipboard" });
    }
  };

  return (
    <Card className="overflow-hidden bg-card/50 border-border/50">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-muted/30">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              API Playground
            </Badge>
            <span className="text-sm text-muted-foreground">
              Test API methods in real-time
            </span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border/50">
        {/* Left Panel - Request Builder */}
        <div className="p-5 space-y-5">
          {/* Method Selector */}
          <div className="space-y-2">
            <Label className="text-foreground">Method</Label>
            <div className="relative">
              <button
                onClick={() => setIsMethodSelectorOpen(!isMethodSelectorOpen)}
                className="w-full flex items-center justify-between gap-2 p-3 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/30 transition-colors text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Badge className={CATEGORY_COLORS[selectedMethod.category]}>
                    {CATEGORY_LABELS[selectedMethod.category]}
                  </Badge>
                  <code className="text-sm font-mono text-foreground truncate">
                    {selectedMethod.name}
                  </code>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 ${isMethodSelectorOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isMethodSelectorOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-50 top-full left-0 right-0 mt-2 rounded-xl bg-card border border-border shadow-xl overflow-hidden max-h-80 overflow-y-auto"
                  >
                    {Object.entries(
                      API_METHODS.reduce((acc, method) => {
                        if (!acc[method.category]) acc[method.category] = [];
                        acc[method.category].push(method);
                        return acc;
                      }, {} as Record<string, ApiMethod[]>)
                    ).map(([category, methods]) => (
                      <div key={category}>
                        <div className="px-3 py-2 bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          {CATEGORY_LABELS[category]}
                        </div>
                        {methods.map(method => (
                          <button
                            key={method.id}
                            onClick={() => handleMethodChange(method)}
                            className={`w-full px-3 py-2 text-left hover:bg-muted/50 transition-colors ${selectedMethod.id === method.id ? "bg-primary/10" : ""}`}
                          >
                            <code className="text-sm font-mono text-foreground">{method.name}</code>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{method.description}</p>
                          </button>
                        ))}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <p className="text-xs text-muted-foreground">{selectedMethod.description}</p>
          </div>

          {/* Parameters */}
          <div className="space-y-4">
            <Label className="text-foreground">Parameters</Label>
            {selectedMethod.parameters.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">No parameters required</p>
            ) : (
              <div className="space-y-3">
                {selectedMethod.parameters.map(param => (
                  <div key={param.name} className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <label className="text-sm font-medium text-foreground">
                        {param.name}
                      </label>
                      {param.required && (
                        <span className="text-xs text-destructive">*</span>
                      )}
                      <Badge variant="outline" className="text-xs font-mono">
                        {param.type}
                      </Badge>
                    </div>
                    {param.type === "boolean" ? (
                      <select
                        value={parameters[param.name] || param.defaultValue || "false"}
                        onChange={e => handleParameterChange(param.name, e.target.value)}
                        className="w-full p-2 rounded-lg bg-muted/50 border border-border/50 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                      >
                        <option value="false">false</option>
                        <option value="true">true</option>
                      </select>
                    ) : (
                      <Textarea
                        value={parameters[param.name] || ""}
                        onChange={e => handleParameterChange(param.name, e.target.value)}
                        placeholder={param.placeholder}
                        className="min-h-[60px] text-sm font-mono bg-muted/50 border-border/50 resize-none"
                      />
                    )}
                    <p className="text-xs text-muted-foreground">{param.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Execute Button */}
          <Button
            onClick={handleExecute}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Execute Request
              </>
            )}
          </Button>

          {/* Generated Code */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-foreground">Generated Code</Label>
              <button
                onClick={handleCopyCode}
                className="p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-primary" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </button>
            </div>
            <div className="rounded-xl bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] overflow-hidden">
              <div className="px-3 py-1.5 bg-[hsl(var(--code-header))] border-b border-[hsl(var(--code-border))]">
                <span className="text-xs text-[hsl(var(--code-comment))]">
                  {selectedLanguage === "typescript" ? "TypeScript" : "Python"}
                </span>
              </div>
              <Highlight
                theme={themes.nightOwl}
                code={generateCodeSnippet()}
                language={getLanguage(selectedLanguage)}
              >
                {({ style, tokens, getLineProps, getTokenProps }) => (
                  <pre className="p-3 overflow-x-auto" style={{ ...style, background: "transparent" }}>
                    {tokens.map((line, i) => (
                      <div key={i} {...getLineProps({ line })}>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} className="text-sm font-mono" />
                        ))}
                      </div>
                    ))}
                  </pre>
                )}
              </Highlight>
            </div>
          </div>
        </div>

        {/* Right Panel - Response */}
        <div className="p-5 bg-muted/10">
          <div className="flex items-center justify-between mb-4">
            <Label className="text-foreground">Response</Label>
            {response && (
              <div className="flex items-center gap-2">
                {response.duration && (
                  <span className="text-xs text-muted-foreground">
                    {response.duration}ms
                  </span>
                )}
                <button
                  onClick={handleCopyResponse}
                  className="p-1.5 rounded-lg hover:bg-muted transition-colors"
                >
                  <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </div>
            )}
          </div>

          {response ? (
            <div className="space-y-3">
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                {response.status === "success" ? (
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {response.statusCode} OK
                  </Badge>
                ) : response.status === "mock" ? (
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Mock Response
                  </Badge>
                ) : (
                  <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    {response.statusCode} Error
                  </Badge>
                )}
              </div>

              {/* Response Body */}
              <div className="rounded-xl bg-[hsl(var(--code-bg))] border border-[hsl(var(--code-border))] overflow-hidden">
                <div className="px-3 py-1.5 bg-[hsl(var(--code-header))] border-b border-[hsl(var(--code-border))]">
                  <span className="text-xs text-[hsl(var(--code-comment))]">JSON</span>
                </div>
                <Highlight
                  theme={themes.nightOwl}
                  code={JSON.stringify(response.data, null, 2)}
                  language="json"
                >
                  {({ style, tokens, getLineProps, getTokenProps }) => (
                    <pre className="p-3 overflow-x-auto max-h-96" style={{ ...style, background: "transparent" }}>
                      {tokens.map((line, i) => (
                        <div key={i} {...getLineProps({ line })}>
                          {line.map((token, key) => (
                            <span key={key} {...getTokenProps({ token })} className="text-sm font-mono" />
                          ))}
                        </div>
                      ))}
                    </pre>
                  )}
                </Highlight>
              </div>

              {response.status === "mock" && (
                <p className="text-xs text-muted-foreground italic">
                  This is a simulated response. Connect to the Agentium API to get real data.
                </p>
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center rounded-xl border border-dashed border-border/50 bg-muted/20">
              <div className="text-center">
                <Play className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Execute a request to see the response
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ApiPlayground;
