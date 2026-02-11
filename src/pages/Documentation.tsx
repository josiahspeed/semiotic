import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CodeBlock from "@/components/CodeBlock";
import InteractiveTerm from "@/components/docs/InteractiveTerm";
import InteractiveStep from "@/components/docs/InteractiveStep";
import QuickStartCard from "@/components/docs/QuickStartCard";
import FlowDiagram from "@/components/docs/FlowDiagram";
import AnnotatedCodeBlock from "@/components/docs/AnnotatedCodeBlock";
import SearchBar from "@/components/docs/SearchBar";
import VersionBadge from "@/components/docs/VersionBadge";
import Breadcrumb from "@/components/docs/Breadcrumb";
import MethodCard from "@/components/docs/MethodCard";
import CopyableCode from "@/components/docs/CopyableCode";
import AskAIButton from "@/components/docs/AskAIButton";
import AskAIPanel from "@/components/docs/AskAIPanel";
import ApiPlayground from "@/components/docs/ApiPlayground";
import {
  Book, Code, Settings, Terminal, Package, ExternalLink, Github, ChevronRight, 
  Rocket, Zap, Shield, Key, Server, User, ArrowRight, Sparkles, Clock,
  CheckCircle2, AlertCircle, Database, RefreshCw, Lock, FileKey, Cpu, 
  BookOpen, Lightbulb, ChevronDown, Menu, X
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

const GITHUB_URL = "https://github.com/semiotic-agentium/agentium-sdk";

const TYPESCRIPT_VERSIONS = [
  { version: "0.9.9", releaseDate: "Jan 2026" },
];

const PYTHON_VERSIONS = [
  { version: "0.5.0", releaseDate: "Jan 2026" },
];

type Language = "typescript" | "python";

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState("0.9.9");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("typescript");
  const [isAskAIOpen, setIsAskAIOpen] = useState(false);

  const currentVersions = selectedLanguage === "typescript" ? TYPESCRIPT_VERSIONS : PYTHON_VERSIONS;

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    // Auto-select the newest version for the selected language
    const versions = language === "typescript" ? TYPESCRIPT_VERSIONS : PYTHON_VERSIONS;
    setSelectedVersion(versions[0].version);
  };

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "getting-started", label: "Getting Started", icon: Rocket },
    { id: "core-concepts", label: "Core Concepts", icon: Sparkles },
    { id: "installation", label: "Installation", icon: Package },
    { id: "quick-start", label: "Quick Start", icon: Zap },
    { id: "api-reference", label: "API Reference", icon: Code },
    { id: "verifiable-credentials", label: "Verifiable Credentials", icon: Shield },
    { id: "telemetry", label: "Telemetry", icon: Database },
    { id: "advanced", label: "Advanced", icon: Settings },
  ];

  const toggleStepComplete = (step: number) => {
    setCompletedSteps(prev => 
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
    );
  };


  // Python version content
  const pythonVersionContent: Record<string, { title: string; subtitle: string; body: React.ReactNode }> = {
    "getting-started": {
      title: "agentium-sdk",
      subtitle: "Python SDK for Agentium Network - DID and Verifiable Credentials.",
      body: (
        <div className="space-y-10">
          {/* Hero section with version */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Python 3.10+</Badge>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">Rust-powered</Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">W3C VCs</Badge>
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">MIT License</Badge>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                What is Agentium SDK for Python?
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
                Python SDK for interacting with the <InteractiveTerm term="Agentium Network API" definition="The core REST API that powers identity connection, OAuth token management, and credential verification for the Agentium platform." type="api">Agentium Network API</InteractiveTerm>. 
                Supports <InteractiveTerm term="DID" definition="Decentralized Identifier - a unique, cryptographically verifiable identifier that represents your agent's identity on the Agentium network." type="concept">DID</InteractiveTerm> creation, 
                <InteractiveTerm term="Wallet Sign-In (SIWE)" definition="Sign-In with Ethereum - a standard for authenticating users with their Ethereum wallet using the EIP-4361 specification." type="concept"> Wallet Sign-In (SIWE/EIP-4361)</InteractiveTerm>, and 
                <InteractiveTerm term="Verifiable Credentials" definition="A W3C standard for cryptographically secure, privacy-preserving digital credentials. The SDK supports VCs with Ed25519 signatures issued as JWTs." type="concept"> Verifiable Credentials</InteractiveTerm> with native Rust cryptography.
              </p>
              
              {/* Quick install */}
              <div className="flex flex-wrap items-center gap-4">
                <CopyableCode code="pip install agentium-sdk" language="bash" />
              </div>
            </div>
          </div>

          {/* Quick start cards */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Choose Your Path
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickStartCard
                icon={Rocket}
                title="5-Minute Quickstart"
                description="Connect your first Google identity to Agentium"
                timeEstimate="5 min"
                difficulty="beginner"
                onClick={() => setActiveSection("quick-start")}
              />
              <QuickStartCard
                icon={Shield}
                title="Verifiable Credentials"
                description="Verify W3C VCs with Ed25519 signatures"
                timeEstimate="10 min"
                difficulty="intermediate"
                onClick={() => setActiveSection("verifiable-credentials")}
              />
              <QuickStartCard
                icon={Code}
                title="API Deep Dive"
                description="Explore all methods: identity, tokens, credentials"
                timeEstimate="15 min"
                difficulty="intermediate"
                onClick={() => setActiveSection("api-reference")}
              />
            </div>
          </div>

          {/* Key features */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: User, title: "Google Sign-In", desc: "Connect Google identities with OAuth JWT tokens" },
                { icon: Lock, title: "Wallet Sign-In (SIWE)", desc: "EIP-4361 authentication with local signing" },
                { icon: Shield, title: "Verifiable Credentials", desc: "W3C VCs with Ed25519 signature verification" },
                { icon: Cpu, title: "Rust Cryptography", desc: "Native Ed25519 operations via PyO3 bindings" },
                { icon: Database, title: "Telemetry System", desc: "Structured tracing with custom callbacks" },
                { icon: RefreshCw, title: "Async & Sync APIs", desc: "Full async/await support with sync alternatives" },
              ].map((feature, i) => (
                <Card key={i} className="p-5 bg-card/50 border-border/50 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* TypeScript SDK note */}
          <Card 
            className="p-5 bg-emerald-500/5 border-emerald-500/20 cursor-pointer hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-colors"
            onClick={() => {
              setSelectedLanguage('typescript');
              setActiveSection('getting-started');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">TypeScript SDK Available</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  A TypeScript SDK with equivalent functionality is also available.
                </p>
                <code className="text-sm font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">npm install @semiotic-labs/agentium-sdk</code>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    "core-concepts": {
      title: "Core Concepts",
      subtitle: "Understand the building blocks of Agentium Python SDK.",
      body: (
        <div className="space-y-10">
          {/* Concept explanations */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Key Terms</h3>
            
            <Card className="p-6 bg-card/50 border-border/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                DID (Decentralized Identifier)
              </h4>
              <p className="text-muted-foreground mb-4">
                When you connect a Google or wallet identity, the SDK returns a <InteractiveTerm term="DID" definition="Decentralized Identifier - a unique, cryptographically verifiable identifier that represents your agent's identity on the Agentium network." type="concept" example="did:pkh:eip155:84532:0x...">DID</InteractiveTerm> that 
                uniquely identifies your agent on the Agentium network. This DID follows the <code className="text-xs bg-muted px-1 rounded">did:pkh</code> method for wallet-based identities.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                AgentiumClient
              </h4>
              <p className="text-muted-foreground mb-4">
                The <InteractiveTerm term="AgentiumClient" definition="The main class for interacting with Agentium. It handles API communication, authentication flows, and credential verification." type="method" example="async with AgentiumClient() as client: ...">AgentiumClient</InteractiveTerm> is 
                your gateway to all SDK functionality. It supports async context managers for proper resource cleanup.
              </p>
              <CodeBlock
                code={`from agentium_sdk import AgentiumClient

# Default: connects to https://api.agentium.network
async with AgentiumClient() as client:
    pass

# Custom endpoint
async with AgentiumClient(base_url="https://custom.endpoint") as client:
    pass`}
                language="python"
              />
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Lock className="w-4 h-4 text-primary" />
                CAIP-2 Chain Identifiers
              </h4>
              <p className="text-muted-foreground mb-4">
                The SDK uses <InteractiveTerm term="CAIP-2" definition="Chain Agnostic Improvement Proposal 2 - a standard format for identifying blockchain networks, like 'eip155:84532' for Base Sepolia." type="concept" example="eip155:84532">CAIP-2 chain identifiers</InteractiveTerm> for 
                wallet sign-in. This format ensures compatibility across different blockchain networks.
              </p>
              <CodeBlock
                code={`# Base Sepolia (testnet)
chain_id = "eip155:84532"

# Ethereum Mainnet
chain_id = "eip155:1"

# Validate chain ID format
from agentium_sdk import validate_caip2
if validate_caip2(chain_id):
    print("Valid chain ID")`}
                language="python"
              />
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                Rust Native Functions
              </h4>
              <p className="text-muted-foreground">
                Low-level cryptographic operations are powered by <InteractiveTerm term="Rust via PyO3" definition="The SDK uses Rust with PyO3 bindings for high-performance, secure cryptographic operations including Ed25519 signing and verification." type="concept">native Rust code</InteractiveTerm>. 
                This provides high-performance Ed25519 operations, JWT verification, and key management.
              </p>
            </Card>
          </div>
        </div>
      ),
    },
    "installation": {
      title: "Installation",
      subtitle: "Add Agentium SDK to your Python project.",
      body: (
        <div className="space-y-8">
          <InteractiveStep
            step={1}
            title="Install the package"
            description="Use pip to install the SDK"
            isActive={true}
            details="The SDK is published to PyPI with prebuilt wheels for most platforms."
            codeSnippet="pip install agentium-sdk"
          />
          
          <InteractiveStep
            step={2}
            title="Import and initialize"
            description="Create an AgentiumClient instance"
            details="The client uses async context managers for proper resource management."
            codeSnippet={`from agentium_sdk import AgentiumClient

async with AgentiumClient() as client:
    # Use the client here
    pass`}
          />

          <InteractiveStep
            step={3}
            title="(Optional) Development setup"
            description="For building from source, install Rust and Maturin"
            details="Building from source requires the Rust toolchain (1.70+) and Maturin."
            codeSnippet={`# Install Rust toolchain
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Maturin
pip install maturin

# Build in development mode
maturin develop`}
          />

          {/* Platform Support */}
          <Card className="p-6 bg-card/50 border-border/50 mt-8">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5 text-primary" />
              Platform Support
            </h3>
            <p className="text-muted-foreground mb-4">Prebuilt wheels are available for the following platforms:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Platform</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Architecture</th>
                    <th className="text-left py-2 px-3 text-muted-foreground font-medium">Wheel Available</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 text-foreground">Linux</td>
                    <td className="py-2 px-3 text-foreground">x86_64</td>
                    <td className="py-2 px-3 text-emerald-400">✅</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 text-foreground">Linux</td>
                    <td className="py-2 px-3 text-foreground">aarch64 (ARM64)</td>
                    <td className="py-2 px-3 text-muted-foreground">❌ (build from source)</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 text-foreground">macOS</td>
                    <td className="py-2 px-3 text-foreground">x86_64 (Intel)</td>
                    <td className="py-2 px-3 text-emerald-400">✅</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-3 text-foreground">macOS</td>
                    <td className="py-2 px-3 text-foreground">aarch64 (Apple Silicon)</td>
                    <td className="py-2 px-3 text-emerald-400">✅</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-foreground">Windows</td>
                    <td className="py-2 px-3 text-foreground">x86_64</td>
                    <td className="py-2 px-3 text-emerald-400">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Requirements cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: "Python", value: "≥ 3.10", icon: Terminal },
              { label: "Package Manager", value: "pip / poetry / uv", icon: Package },
              { label: "For Development", value: "Rust 1.70+ & Maturin", icon: Settings },
            ].map((req, i) => (
              <Card key={i} className="p-5 bg-card/50 border-border/50 hover:border-primary/20 transition-colors">
                <req.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{req.label}</p>
                <p className="text-sm font-medium text-foreground">{req.value}</p>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    "quick-start": {
      title: "Quick Start",
      subtitle: "Connect identities in under 5 minutes.",
      body: (
        <div className="space-y-8">
          {/* Google Sign-In */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Google Sign-In
            </h3>
            <AnnotatedCodeBlock
              code={`import agentium_sdk

# Connect with Google Sign-In (async)
wallet_address, did = await agentium_sdk.connect_google(google_id_token)

# Or use the sync version
wallet_address, did = agentium_sdk.connect_google_sync(google_id_token)`}
              language="python"
              annotations={[
                { line: 1, text: "Import the agentium_sdk module", type: "info" },
                { line: 4, text: "Async version for use in async contexts", type: "info" },
                { line: 7, text: "Sync version available for non-async code", type: "tip" },
              ]}
            />
            <Card className="p-5 bg-amber-500/5 border-amber-500/20 mt-4">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Note:</strong> The <code className="text-xs bg-muted px-1 rounded">google_id_token</code> is obtained from Google's OAuth 2.0 authentication flow. 
                    See <a href="https://developers.google.com/identity/gsi/web/guides/overview" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Identity documentation</a> for implementation details.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Wallet Sign-In */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              Wallet Sign-In (SIWE/EIP-4361)
            </h3>
            <AnnotatedCodeBlock
              code={`import agentium_sdk
import os

# Connect with wallet using local signing (async)
# Uses Base mainnet (eip155:8453) by default
wallet_address, did = await agentium_sdk.connect_wallet(
    address="0x742d35Cc6634C0532925a3b844Bc9e7595f1b2b7",
    private_key=os.getenv("WALLET_PRIVATE_KEY"),  # hex string or bytes
)

# Or specify a different chain (e.g., testnet) using Caip2
from agentium_sdk import Caip2

wallet_address, did = await agentium_sdk.connect_wallet(
    address="0x742d35Cc6634C0532925a3b844Bc9e7595f1b2b7",
    private_key=os.getenv("WALLET_PRIVATE_KEY"),
    chain_id=Caip2.BASE_SEPOLIA,  # or "eip155:84532" for testnet
)

# Sync version available
wallet_address, did = agentium_sdk.connect_wallet_sync(address, private_key)`}
              language="python"
              annotations={[
                { line: 2, text: "Use os.getenv for secure key access", type: "info" },
                { line: 5, text: "Uses Base mainnet (eip155:8453) by default", type: "tip" },
                { line: 10, text: "Use Caip2 constants for chain selection", type: "info" },
              ]}
            />
            <Card className="p-5 bg-red-500/5 border-red-500/20 mt-4">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Security Warning:</strong> Never hardcode private keys in your source code. 
                    Always use environment variables, secure key management systems, or hardware wallets in production.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Using AgentiumClient */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              Using AgentiumClient
            </h3>
            <AnnotatedCodeBlock
              code={`from agentium_sdk import AgentiumClient

# Default: connects to https://api.agentium.network
async with AgentiumClient() as client:
    # Connect Google identity
    response = await client.connect_google_identity(google_id_token)
    print(response.did)           # did:pkh:eip155:1:0x...
    print(response.access_token)  # JWT for authenticated calls
    print(response.is_new)        # True if newly created`}
              language="python"
              annotations={[
                { line: 4, text: "Use async context manager for proper cleanup", type: "info" },
                { line: 7, text: "DID follows did:pkh method for wallet identities", type: "tip" },
                { line: 9, text: "is_new indicates if this is a new identity", type: "info" },
              ]}
            />
          </div>
        </div>
      ),
    },
    "api-reference": {
      title: "API Reference",
      subtitle: "Complete documentation for all SDK methods and types.",
      body: (
        <div className="space-y-8">
          {/* API Playground */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Try It Live
            </h3>
            <p className="text-muted-foreground mb-4">
              Test API methods directly in your browser. Edit parameters and see real responses.
            </p>
            <ApiPlayground selectedLanguage={selectedLanguage} />
          </div>

          {/* AgentiumClient Methods */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              AgentiumClient Methods
            </h3>
            <div className="space-y-4">
            <MethodCard
              name="connect_google_identity"
              description="Connect a Google identity to create/retrieve a DID."
              signature="async def connect_google_identity(google_token: str) -> ConnectIdentityResponse"
              isAsync={true}
              parameters={[
                { name: "google_token", type: "str", description: "Google OAuth JWT token", required: true },
              ]}
              returns={{ type: "ConnectIdentityResponse", description: "Contains did, access_token, is_new" }}
              example={`response = await client.connect_google_identity(google_id_token)
print(response.did)           # did:pkh:eip155:1:0x...
print(response.access_token)  # JWT for authenticated calls
print(response.is_new)        # True if newly created`}
            />

            <MethodCard
              name="exchange_api_key"
              description="Exchange an API key for JWT tokens (M2M authentication)."
              signature="async def exchange_api_key(api_key: str) -> OAuthTokenResponse"
              isAsync={true}
              parameters={[
                { name: "api_key", type: "str", description: "API key for machine-to-machine auth", required: true },
              ]}
              returns={{ type: "OAuthTokenResponse", description: "Contains access_token, refresh_token" }}
              example={`response = await client.exchange_api_key(api_key)
print(response.access_token)
print(response.refresh_token)`}
            />

            <MethodCard
              name="refresh_token"
              description="Refresh an expired access token."
              signature="async def refresh_token(refresh_token: str) -> OAuthTokenResponse"
              isAsync={true}
              parameters={[
                { name: "refresh_token", type: "str", description: "Valid refresh token", required: true },
              ]}
              returns={{ type: "OAuthTokenResponse", description: "Contains new access and refresh tokens" }}
              example={`response = await client.refresh_token(old_refresh_token)`}
            />

            <MethodCard
              name="fetch_membership_credential"
              description="Fetch a membership credential JWT."
              signature="async def fetch_membership_credential(token: str) -> str"
              isAsync={true}
              parameters={[
                { name: "token", type: "str", description: "Access token for authentication", required: true },
              ]}
              returns={{ type: "str", description: "JWT string containing the credential" }}
              example={`credential_jwt = await client.fetch_membership_credential(access_token)`}
            />

            <MethodCard
              name="verify_credential"
              description="Verify a credential against the issuer's public key."
              signature="async def verify_credential(jwt: str) -> VerificationResult"
              isAsync={true}
              parameters={[
                { name: "jwt", type: "str", description: "JWT credential to verify", required: true },
              ]}
              returns={{ type: "VerificationResult", description: "Contains valid, claims, error" }}
              example={`result = await client.verify_credential(credential_jwt)
if result.valid:
    print(result.claims)  # dict with JWT claims`}
            />

            <MethodCard
              name="fetch_issuer_did_document"
              description="Fetch the issuer's DID document from /.well-known/did.json."
              signature="async def fetch_issuer_did_document() -> dict[str, Any]"
              isAsync={true}
              returns={{ type: "dict[str, Any]", description: "DID document as a dictionary" }}
              example={`did_document = await client.fetch_issuer_did_document()
print(did_document["id"])  # did:web:api.agentium.network`}
            />

            <MethodCard
              name="request_wallet_challenge"
              description="Request a SIWE challenge message for wallet sign-in."
              signature="async def request_wallet_challenge(address: str, chain_id: Caip2 | str = Caip2.BASE_MAINNET) -> WalletChallengeResponse"
              isAsync={true}
              parameters={[
                { name: "address", type: "str", description: "Wallet address (0x...)", required: true },
                { name: "chain_id", type: "Caip2 | str", description: "CAIP-2 chain ID (default: BASE_MAINNET)", required: false },
              ]}
              returns={{ type: "WalletChallengeResponse", description: "Contains message, nonce" }}
              example={`# Uses Base mainnet by default
challenge = await client.request_wallet_challenge(
    address="0x742d35Cc6634C0532925a3b844Bc9e7595f1b2b7",
)
print(challenge.message)  # SIWE message to sign
print(challenge.nonce)    # Unique nonce for replay protection

# Or specify testnet explicitly
from agentium_sdk import Caip2

challenge = await client.request_wallet_challenge(
    address="0x742d35Cc6634C0532925a3b844Bc9e7595f1b2b7",
    chain_id=Caip2.BASE_SEPOLIA,  # or "eip155:84532" for testnet
)`}
            />

            <MethodCard
              name="verify_wallet_signature"
              description="Verify a signed challenge and obtain JWT tokens."
              signature="async def verify_wallet_signature(message: str, signature: str) -> OAuthTokenResponse"
              isAsync={true}
              parameters={[
                { name: "message", type: "str", description: "SIWE message that was signed", required: true },
                { name: "signature", type: "str", description: "Wallet signature", required: true },
              ]}
              returns={{ type: "OAuthTokenResponse", description: "Contains access_token, refresh_token" }}
              example={`response = await client.verify_wallet_signature(challenge.message, signature)
print(response.access_token)
print(response.refresh_token)`}
            />

            <MethodCard
              name="connect_wallet"
              description="Full wallet sign-in flow with local signing (challenge → sign → verify)."
              signature="async def connect_wallet(address: str, private_key: bytes | str, chain_id: Caip2 | str = Caip2.BASE_MAINNET) -> ConnectIdentityResponse"
              isAsync={true}
              parameters={[
                { name: "address", type: "str", description: "Wallet address", required: true },
                { name: "private_key", type: "bytes | str", description: "Private key (hex or bytes)", required: true },
                { name: "chain_id", type: "Caip2 | str", description: "CAIP-2 chain ID (default: BASE_MAINNET)", required: false },
              ]}
              returns={{ type: "ConnectIdentityResponse", description: "Contains did, access_token, is_new" }}
              example={`import os

# Uses Base mainnet by default
response = await client.connect_wallet(
    address="0x742d35Cc6634C0532925a3b844Bc9e7595f1b2b7",
    private_key=os.getenv("WALLET_PRIVATE_KEY"),
)
print(response.did)           # did:pkh:eip155:8453:0x...
print(response.access_token)  # JWT for authenticated calls
print(response.is_new)        # True if newly created

# Or specify testnet explicitly
from agentium_sdk import Caip2

response = await client.connect_wallet(
    address="0x742d35Cc6634C0532925a3b844Bc9e7595f1b2b7",
    private_key=os.getenv("WALLET_PRIVATE_KEY"),
    chain_id=Caip2.BASE_SEPOLIA,  # for testnet
)`}
            />
            </div>
          </div>

          {/* Native Functions */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              Native Functions (Rust-powered)
            </h3>
            <p className="text-muted-foreground mb-6">
              Low-level cryptographic operations powered by Rust. These are standalone functions, not methods on AgentiumClient.
            </p>
            <div className="space-y-4">
            <MethodCard
              name="verify_jwt"
              description="Verify a JWT signature against a public key."
              signature="def verify_jwt(jwt: str, public_key_jwk: str) -> VerificationResult"
              parameters={[
                { name: "jwt", type: "str", description: "JWT string to verify", required: true },
                { name: "public_key_jwk", type: "str", description: "Public key in JWK format (JSON)", required: true },
              ]}
              returns={{ type: "VerificationResult", description: "Contains valid, claims, error" }}
              example={`from agentium_sdk import verify_jwt

result = verify_jwt(jwt_string, public_key_jwk_json)
if result.valid:
    print(result.claims)           # dict[str, Any]
else:
    print(result.error.code)       # e.g., "JWT_EXPIRED"
    print(result.error.message)`}
            />

            <MethodCard
              name="parse_jwt_header"
              description="Parse JWT header without verification."
              signature="def parse_jwt_header(jwt: str) -> JwtHeader"
              parameters={[
                { name: "jwt", type: "str", description: "JWT string to parse", required: true },
              ]}
              returns={{ type: "JwtHeader", description: "Contains alg, typ, kid" }}
              example={`from agentium_sdk import parse_jwt_header

header = parse_jwt_header(jwt_string)
print(header.alg)  # "EdDSA"
print(header.kid)  # Key ID for DID document lookup`}
            />

            <MethodCard
              name="extract_public_key_jwk"
              description="Extract a public key from a DID document."
              signature="def extract_public_key_jwk(did_document_json: str, kid: str | None) -> str"
              parameters={[
                { name: "did_document_json", type: "str", description: "DID document as JSON string", required: true },
                { name: "kid", type: "str | None", description: "Key ID for lookup (e.g., '#key-1')", required: false },
              ]}
              returns={{ type: "str", description: "Public key in JWK format" }}
              example={`from agentium_sdk import extract_public_key_jwk

public_key_jwk = extract_public_key_jwk(did_doc_json, kid="#key-1")`}
            />

            <MethodCard
              name="generate_keypair"
              description="Generate a new Ed25519 key pair."
              signature="def generate_keypair() -> GeneratedKeyPair"
              returns={{ type: "GeneratedKeyPair", description: "Contains private_key_jwk, public_key_jwk" }}
              example={`from agentium_sdk import generate_keypair

keypair = generate_keypair()
print(keypair.public_key_jwk)   # Safe to share
print(keypair.private_key_jwk)  # Keep secret!`}
            />

            <MethodCard
              name="get_public_key"
              description="Derive public key from a private key."
              signature="def get_public_key(private_key_jwk: str) -> str"
              parameters={[
                { name: "private_key_jwk", type: "str", description: "Private key in JWK format", required: true },
              ]}
              returns={{ type: "str", description: "Public key in JWK format" }}
              example={`from agentium_sdk import get_public_key

public_jwk = get_public_key(private_key_jwk_json)`}
            />

            <MethodCard
              name="sign_challenge"
              description="Sign a wallet authentication challenge message."
              signature="def sign_challenge(message: bytes, chain_id: str, private_key: bytes) -> str"
              parameters={[
                { name: "message", type: "bytes", description: "Challenge message to sign", required: true },
                { name: "chain_id", type: "str", description: "CAIP-2 chain ID", required: true },
                { name: "private_key", type: "bytes", description: "Private key bytes", required: true },
              ]}
              returns={{ type: "str", description: "0x-prefixed hex signature" }}
              example={`from agentium_sdk import sign_challenge
import os

private_key = bytes.fromhex(os.getenv("WALLET_PRIVATE_KEY"))

signature = sign_challenge(
    message=challenge_message.encode("utf-8"),
    chain_id="eip155:84532",
    private_key=private_key,
)
print(signature)  # 0x-prefixed hex signature`}
            />

            <MethodCard
              name="validate_caip2"
              description="Validate a CAIP-2 chain identifier format."
              signature="def validate_caip2(chain_id: str) -> bool"
              parameters={[
                { name: "chain_id", type: "str", description: "Chain ID to validate", required: true },
              ]}
              returns={{ type: "bool", description: "True if valid, False otherwise" }}
              example={`from agentium_sdk import validate_caip2

if validate_caip2("eip155:84532"):
    print("Valid chain ID")`}
            />
            </div>
          </div>

          {/* Types */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Types
            </h3>
            <Card className="p-6 bg-card/50 border-border/50">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 pr-4 font-semibold text-foreground">Type</th>
                      <th className="text-left py-3 font-semibold text-foreground">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {[
                      { type: "ConnectIdentityResponse", desc: "DID, tokens, badge status, is_new flag" },
                      { type: "OAuthTokenResponse", desc: "access_token, refresh_token, expires_in, scope" },
                      { type: "WalletChallengeResponse", desc: "message, nonce for wallet sign-in challenge" },
                      { type: "Caip2", desc: "Parsed CAIP-2 chain identifier with namespace and reference. Constants: Caip2.BASE_SEPOLIA, Caip2.BASE_MAINNET" },
                      { type: "VerificationResult", desc: "valid, claims (dict), error" },
                      { type: "VerificationError", desc: "code, message" },
                      { type: "JwtHeader", desc: "alg, typ, kid" },
                      { type: "GeneratedKeyPair", desc: "private_key_jwk, public_key_jwk" },
                      { type: "Badge", desc: "status" },
                    ].map((item, i) => (
                      <tr key={i}>
                        <td className="py-3 pr-4">
                          <code className="text-primary bg-primary/10 px-2 py-0.5 rounded text-xs">{item.type}</code>
                        </td>
                        <td className="py-3 text-muted-foreground">{item.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      ),
    },
    "verifiable-credentials": {
      title: "Verifiable Credentials",
      subtitle: "Verify W3C VCs with Ed25519 signatures.",
      body: (
        <div className="space-y-8">
          <p className="text-muted-foreground">
            The Python SDK supports <InteractiveTerm term="W3C Verifiable Credentials" definition="A W3C standard for cryptographically secure digital credentials. In Agentium, VCs are issued as JWTs signed with Ed25519 keys." type="concept">W3C Verifiable Credentials</InteractiveTerm> verification 
            using native Rust cryptography for Ed25519 signatures.
          </p>

          {/* Fetch credential */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Fetching Credentials</h3>
            <CodeBlock
              code={`async with AgentiumClient() as client:
    # Fetch a membership credential
    credential_jwt = await client.fetch_membership_credential(access_token)`}
              language="python"
            />
          </Card>

          {/* Verify credential */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Verifying Credentials</h3>
            <p className="text-muted-foreground mb-4">
              The <code className="text-xs bg-muted px-1 rounded">verify_credential</code> method automatically fetches the issuer's DID document and verifies the signature.
            </p>
            <AnnotatedCodeBlock
              code={`result = await client.verify_credential(credential_jwt)

if result.valid:
    print(result.claims)  # dict with JWT claims
else:
    print(result.error.code)       # e.g., "SIGNATURE_INVALID"
    print(result.error.message)`}
              language="python"
              annotations={[
                { line: 1, text: "Fetches issuer's DID document automatically", type: "info" },
                { line: 4, text: "Claims contain subject DID, expiry, etc.", type: "tip" },
                { line: 6, text: "Error codes help diagnose verification failures", type: "warning" },
              ]}
            />
          </Card>

          {/* Fetch issuer DID document */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Fetching Issuer DID Document</h3>
            <p className="text-muted-foreground mb-4">
              You can also fetch the issuer's DID document directly for manual verification:
            </p>
            <CodeBlock
              code={`did_document = await client.fetch_issuer_did_document()
print(did_document["id"])  # did:web:api.agentium.network`}
              language="python"
            />
          </Card>

          {/* Low-level verification */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              Low-level JWT Verification
            </h3>
            <p className="text-muted-foreground mb-4">
              For direct JWT verification with a known public key:
            </p>
            <AnnotatedCodeBlock
              code={`from agentium_sdk import verify_jwt, parse_jwt_header, extract_public_key_jwk

# Parse header to get key ID
header = parse_jwt_header(jwt_string)
print(header.kid)  # Key ID for DID document lookup

# Extract public key from DID document
public_key_jwk = extract_public_key_jwk(did_doc_json, header.kid)

# Verify the JWT
result = verify_jwt(jwt_string, public_key_jwk)
if result.valid:
    print(result.claims)`}
              language="python"
              annotations={[
                { line: 4, text: "Parse without verification to get key ID", type: "info" },
                { line: 8, text: "Extract the matching public key from DID document", type: "tip" },
                { line: 11, text: "Verify signature using native Rust Ed25519", type: "info" },
              ]}
            />
          </Card>
        </div>
      ),
    },
    "telemetry": {
      title: "Telemetry",
      subtitle: "Structured tracing with custom callbacks.",
      body: (
        <div className="space-y-8">
          <p className="text-muted-foreground">
            Enable structured tracing to monitor SDK operations. Events include timestamps, log levels, and structured fields.
          </p>

          {/* Initialization */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Initialization</h3>
            <p className="text-muted-foreground mb-4">
              Initialize telemetry with a custom callback function. This can only be called once per process.
            </p>
            <AnnotatedCodeBlock
              code={`from agentium_sdk import init_tracing

def telemetry_handler(event: dict):
    """Receives events with: kind, level, target, name, fields, ts_ms"""
    print(f"[{event['level']}] {event['target']}: {event['fields']}")

# Initialize once per process
init_tracing(telemetry_handler, "debug")  # filter: "info", "debug", "agentium=trace"`}
              language="python"
              annotations={[
                { line: 3, text: "Handler receives structured event dicts", type: "info" },
                { line: 4, text: "Events include kind, level, target, name, fields, ts_ms", type: "tip" },
                { line: 8, text: "Filter uses tracing-subscriber EnvFilter syntax", type: "info" },
              ]}
            />
          </Card>

          <Card className="p-5 bg-amber-500/5 border-amber-500/20">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> <code className="text-xs bg-muted px-1 rounded">init_tracing</code> can only be called once. 
                  Subsequent calls are ignored.
                </p>
              </div>
            </div>
          </Card>

          {/* Event Structure */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Event Structure</h3>
            <p className="text-muted-foreground mb-4">
              Events passed to your handler have the following structure:
            </p>
            <CodeBlock
              code={`{
    "kind": "event",                    # Event type (currently always "event")
    "level": "info",                    # "error" | "warn" | "info" | "debug" | "trace"
    "target": "agentium_sdk::vc",       # Module path
    "name": "verify_credential",        # Event name (optional)
    "fields": {"jwt_len": 1234},        # Structured fields
    "ts_ms": 1704067200000              # Timestamp in milliseconds
}`}
              language="python"
            />
          </Card>

          {/* Filter examples */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Filter Examples</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                <code className="text-sm font-mono text-primary">"info"</code>
                <p className="text-sm text-muted-foreground mt-1">Show info level and above for all modules</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                <code className="text-sm font-mono text-primary">"debug"</code>
                <p className="text-sm text-muted-foreground mt-1">Show debug level and above for all modules</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                <code className="text-sm font-mono text-primary">"agentium=trace"</code>
                <p className="text-sm text-muted-foreground mt-1">Show trace level for agentium modules only</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                <code className="text-sm font-mono text-primary">"warn,agentium_sdk=debug"</code>
                <p className="text-sm text-muted-foreground mt-1">Warn for all, debug for agentium_sdk</p>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    "advanced": {
      title: "Development",
      subtitle: "Setup and building from source.",
      body: (
        <div className="space-y-8">
          {/* Requirements */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Requirements
            </h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                <p className="font-medium text-foreground">For end users</p>
                <p className="text-sm text-muted-foreground mt-1">No additional dependencies — prebuilt wheels available for most platforms</p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                <p className="font-medium text-foreground">For development/building from source</p>
                <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside space-y-1">
                  <li>Rust toolchain (1.70+) — <a href="https://rustup.rs/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Install Rust</a></li>
                  <li>Maturin build tool: <code className="text-xs bg-muted px-1 rounded">pip install maturin</code></li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Setup */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Development Setup
            </h3>
            <AnnotatedCodeBlock
              code={`# Install Rust toolchain (if not already installed)
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Maturin (build tool for Rust-based Python packages)
pip install maturin

# Build and install in development mode
maturin develop

# Install development dependencies
pip install -e ".[dev]"

# Run tests
pytest`}
              language="bash"
              annotations={[
                { line: 2, text: "Install Rust using rustup", type: "info" },
                { line: 5, text: "Maturin bridges Rust and Python", type: "info" },
                { line: 8, text: "Compiles Rust and installs in current env", type: "tip" },
              ]}
            />
          </Card>

          {/* About Maturin */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              About Maturin
            </h3>
            <p className="text-muted-foreground">
              <a href="https://github.com/PyO3/maturin" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Maturin</a> is 
              the build tool that bridges Rust and Python, compiling the native Rust extensions and packaging them as a Python wheel. 
              The <code className="text-xs bg-muted px-1 rounded">maturin develop</code> command builds the Rust code in debug mode and installs it in your current Python environment.
            </p>
          </Card>

          {/* Exceptions */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Exceptions
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-foreground mb-2">AgentiumApiError</h4>
                <p className="text-muted-foreground mb-3 text-sm">
                  Raised on API failures:
                </p>
                <CodeBlock
                  code={`from agentium_sdk import AgentiumApiError

try:
    await client.connect_google_identity(invalid_token)
except AgentiumApiError as e:
    print(e.message)
    print(e.status_code)  # 401, 403, etc.`}
                  language="python"
                />
              </div>
              <div>
                <h4 className="font-medium text-foreground mb-2">Caip2Error</h4>
                <p className="text-muted-foreground mb-3 text-sm">
                  Raised when CAIP-2 chain identifier parsing fails:
                </p>
                <CodeBlock
                  code={`from agentium_sdk import Caip2, Caip2Error

try:
    caip2 = Caip2.parse("invalid-chain-id")
except Caip2Error as e:
    print(e)  # CAIP-2 identifier must contain a colon separator`}
                  language="python"
                />
              </div>
            </div>
          </Card>

          {/* Building docs */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Building Documentation
            </h3>
            <p className="text-muted-foreground mb-4">
              For SDK contributors who want to build and preview the documentation locally:
            </p>
            <CodeBlock
              code={`# Install documentation dependencies
pip install -e ".[docs]"

# Build the SDK first (required - mkdocstrings needs to import the package)
maturin develop

# Serve docs locally with hot-reload at http://127.0.0.1:8000
mkdocs serve

# Or build static site to site/ directory
mkdocs build`}
              language="bash"
            />
            <p className="text-sm text-muted-foreground mt-4">
              The documentation uses <a href="https://www.mkdocs.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">MkDocs</a> with 
              the <a href="https://mkdocstrings.github.io/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">mkdocstrings</a> plugin 
              to auto-generate API docs from Python docstrings and type hints.
            </p>
          </Card>
        </div>
      ),
    },
  };

  const content: Record<string, { title: string; subtitle: string; body: React.ReactNode }> = {
    "getting-started": {
      title: "@semiotic-labs/agentium-sdk",
      subtitle: "TypeScript SDK for the Agentium Network API.",
      body: (
        <div className="space-y-10">
          {/* Hero section with version */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">TypeScript</Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Ed25519</Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">W3C VCs</Badge>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">MIT License</Badge>
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                What is Agentium SDK?
              </h2>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mb-6">
                TypeScript SDK for interacting with the <InteractiveTerm term="Agentium Network API" definition="The core REST API that powers identity connection, OAuth token management, and credential verification for the Agentium platform." type="api">Agentium Network API</InteractiveTerm>. 
                Supports <InteractiveTerm term="identity connection" definition="The process of linking external identities (like Google accounts) to Agentium DIDs (Decentralized Identifiers) for verified agent authentication." type="concept">identity connection</InteractiveTerm>, 
                <InteractiveTerm term="OAuth token management" definition="Handling of access tokens, refresh tokens, and API keys for secure machine-to-machine (M2M) authentication." type="concept"> OAuth token management</InteractiveTerm>, and 
                <InteractiveTerm term="W3C Verifiable Credentials" definition="A W3C standard for cryptographically secure, privacy-preserving digital credentials. The SDK supports VCs with Ed25519 signatures issued as JWTs." type="concept" example="JWT-VC with Ed25519 signature"> W3C Verifiable Credentials (VCs)</InteractiveTerm> with Ed25519 signatures.
              </p>
              
              {/* Quick install */}
              <div className="flex flex-wrap items-center gap-4">
                <CopyableCode code="npm install @semiotic-labs/agentium-sdk" language="bash" />
              </div>
            </div>
          </div>

          {/* Quick start cards */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Choose Your Path
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <QuickStartCard
                icon={Rocket}
                title="5-Minute Quickstart"
                description="Connect your first Google identity to Agentium"
                timeEstimate="5 min"
                difficulty="beginner"
                onClick={() => setActiveSection("quick-start")}
              />
              <QuickStartCard
                icon={Shield}
                title="Verifiable Credentials"
                description="Issue and verify W3C VCs with Ed25519 signatures"
                timeEstimate="10 min"
                difficulty="intermediate"
                onClick={() => setActiveSection("verifiable-credentials")}
              />
              <QuickStartCard
                icon={Code}
                title="API Deep Dive"
                description="Explore all methods: identity, tokens, credentials"
                timeEstimate="15 min"
                difficulty="intermediate"
                onClick={() => setActiveSection("api-reference")}
              />
            </div>
          </div>

          {/* Key features */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              Key Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: User, title: "Identity Connection", desc: "Connect Google identities with OAuth JWT tokens" },
                { icon: RefreshCw, title: "Token Management", desc: "API key exchange and token refresh for M2M auth" },
                { icon: Shield, title: "Verifiable Credentials", desc: "W3C VCs with Ed25519 signatures and storage" },
                { icon: Cpu, title: "WASM Cryptography", desc: "Low-level Ed25519 operations via WebAssembly" },
                { icon: Database, title: "Telemetry System", desc: "Flexible event forwarding with composable sinks" },
                { icon: AlertCircle, title: "Error Handling", desc: "AgentiumApiError with status codes and messages" },
              ].map((feature, i) => (
                <Card key={i} className="p-5 bg-card/50 border-border/50 hover:border-primary/30 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Python SDK note */}
          <Card 
            className="p-5 bg-purple-500/5 border-purple-500/20 cursor-pointer hover:bg-purple-500/10 hover:border-purple-500/30 transition-colors"
            onClick={() => {
              setSelectedLanguage('python');
              setActiveSection('getting-started');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Terminal className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Python SDK Available</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  A Python SDK with equivalent functionality is also available.
                </p>
                <code className="text-sm font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded">pip install agentium</code>
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    "core-concepts": {
      title: "Core Concepts",
      subtitle: "Understand the building blocks of Agentium SDK.",
      body: (
        <div className="space-y-10">
          {/* Concept explanations */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Key Terms</h3>
            
            <Card className="p-6 bg-card/50 border-border/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <User className="w-4 h-4 text-primary" />
                DID (Decentralized Identifier)
              </h4>
              <p className="text-muted-foreground mb-4">
                When you connect a Google identity, the SDK returns a <InteractiveTerm term="DID" definition="Decentralized Identifier - a unique, cryptographically verifiable identifier that represents your agent's identity on the Agentium network." type="concept" example="did:agentium:abc123...">DID</InteractiveTerm> that 
                uniquely identifies your agent on the Agentium network. This DID is linked to your Google account and can be used for all subsequent authenticated actions.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Server className="w-4 h-4 text-primary" />
                AgentiumClient
              </h4>
              <p className="text-muted-foreground mb-4">
                The <InteractiveTerm term="AgentiumClient" definition="The main class for interacting with Agentium. It handles API communication, WASM initialization for cryptographic operations, and credential storage." type="method" example="new AgentiumClient({ baseURL: '...' })">AgentiumClient</InteractiveTerm> is 
                your gateway to all SDK functionality. It manages WASM initialization, API calls, and optional credential storage.
              </p>
              <AnnotatedCodeBlock
                code={`import { AgentiumClient } from '@semiotic-labs/agentium-sdk';

// Default: https://api.agentium.network
const client = new AgentiumClient();

// Custom endpoint (for local/staging)
const client = new AgentiumClient({ baseURL: 'http://localhost:8080' });

// For bundlers like Vite that require explicit WASM URL
import wasmUrl from '@semiotic-labs/agentium-sdk/wasm?url';
const client = new AgentiumClient({ wasmUrl });`}
                language="typescript"
                annotations={[
                  { line: 3, text: "Uses the production API endpoint by default", type: "info" },
                  { line: 6, text: "Override for local development or staging environments", type: "tip" },
                  { line: 9, text: "Required for bundlers like Vite that need explicit WASM URL resolution", type: "warning" },
                ]}
              />
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-primary" />
                Verifiable Credentials (VCs)
              </h4>
              <p className="text-muted-foreground">
                The SDK supports <InteractiveTerm term="W3C Verifiable Credentials" definition="A W3C standard for cryptographically secure digital credentials. In Agentium, VCs are issued as JWTs signed with Ed25519 keys." type="concept">W3C Verifiable Credentials</InteractiveTerm> issued 
                as JWTs with Ed25519 signatures. VCs can be fetched, verified, and stored locally using browser localStorage or in-memory storage.
              </p>
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-primary" />
                WASM Cryptography
              </h4>
              <p className="text-muted-foreground">
                Low-level cryptographic operations for Ed25519 are powered by <InteractiveTerm term="WebAssembly" definition="A binary instruction format that enables high-performance code execution in web browsers. The SDK uses WASM for secure, efficient cryptographic operations." type="concept">WebAssembly</InteractiveTerm>. 
                WASM is automatically initialized on first use — no manual setup required.
              </p>
            </Card>
          </div>
        </div>
      ),
    },
    "installation": {
      title: "Installation",
      subtitle: "Add Agentium SDK to your project in seconds.",
      body: (
        <div className="space-y-8">
          <InteractiveStep
            step={1}
            title="Install the package"
            description="Use npm to install the SDK"
            isActive={true}
            details="The SDK is published to npm under the @semiotic-labs organization."
            codeSnippet="npm install @semiotic-labs/agentium-sdk"
          />
          
          <InteractiveStep
            step={2}
            title="Import and initialize"
            description="Create an AgentiumClient instance"
            details="The client handles all API communication and WASM initialization automatically."
            codeSnippet={`import { AgentiumClient } from '@semiotic-labs/agentium-sdk';

const client = new AgentiumClient();`}
          />

          <InteractiveStep
            step={3}
            title="(Vite/Bundler) Configure WASM URL"
            description="For bundlers that require explicit WASM URL resolution"
            details="Vite and similar bundlers need explicit WASM URL handling. Pass the wasmUrl option to the client constructor."
            codeSnippet={`import { AgentiumClient } from '@semiotic-labs/agentium-sdk';
import wasmUrl from '@semiotic-labs/agentium-sdk/wasm?url';

const client = new AgentiumClient({ wasmUrl });`}
          />

          {/* Requirements cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {[
              { label: "Node.js", value: "≥ 16.0.0", icon: Terminal },
              { label: "Package Manager", value: "npm / yarn / pnpm", icon: Package },
              { label: "TypeScript", value: "Full type support", icon: Code },
            ].map((req, i) => (
              <Card key={i} className="p-5 bg-card/50 border-border/50 hover:border-primary/20 transition-colors">
                <req.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{req.label}</p>
                <p className="text-sm font-medium text-foreground">{req.value}</p>
              </Card>
            ))}
          </div>
        </div>
      ),
    },
    "quick-start": {
      title: "Quick Start",
      subtitle: "Connect a Google identity in under 5 minutes.",
      body: (
        <div className="space-y-8">
          {/* Progress tracker */}
          <Card className="p-5 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Your Progress</span>
              <span className="text-sm text-muted-foreground">{completedSteps.length}/4 steps</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(completedSteps.length / 4) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </Card>

          <InteractiveStep
            step={1}
            title="Install the SDK"
            description="Add @semiotic-labs/agentium-sdk to your project"
            isCompleted={completedSteps.includes(1)}
            isActive={!completedSteps.includes(1)}
            onClick={() => toggleStepComplete(1)}
            codeSnippet="npm install @semiotic-labs/agentium-sdk"
          />

          <InteractiveStep
            step={2}
            title="Initialize the client"
            description="Create an AgentiumClient instance"
            isCompleted={completedSteps.includes(2)}
            isActive={completedSteps.includes(1) && !completedSteps.includes(2)}
            onClick={() => toggleStepComplete(2)}
            details="The client uses https://api.agentium.network by default."
            codeSnippet={`import { AgentiumClient } from '@semiotic-labs/agentium-sdk';

const client = new AgentiumClient();`}
          />

          <InteractiveStep
            step={3}
            title="Obtain a Google JWT"
            description="Get an authentication token from Google OAuth"
            isCompleted={completedSteps.includes(3)}
            isActive={completedSteps.includes(2) && !completedSteps.includes(3)}
            onClick={() => toggleStepComplete(3)}
            details="Use Google Sign-In to obtain a valid JWT. This token verifies the identity you want to connect to Agentium."
          />

          <InteractiveStep
            step={4}
            title="Connect the identity"
            description="Call connectGoogleIdentity with your token"
            isCompleted={completedSteps.includes(4)}
            isActive={completedSteps.includes(3) && !completedSteps.includes(4)}
            onClick={() => toggleStepComplete(4)}
            codeSnippet={`const response = await client.connectGoogleIdentity(googleJwtToken);
console.log('User DID:', response.did);
console.log('Access Token:', response.accessToken);`}
          />

          {/* Complete example */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              Complete Example
            </h3>
            <AnnotatedCodeBlock
              code={`import { AgentiumClient } from '@semiotic-labs/agentium-sdk';

const client = new AgentiumClient();

// Connect with Google identity
const response = await client.connectGoogleIdentity(googleJwtToken);
console.log('User DID:', response.did);
console.log('Access Token:', response.accessToken);`}
              language="typescript"
              annotations={[
                { line: 1, text: "Import the AgentiumClient from the SDK package", type: "info" },
                { line: 3, text: "Create client with default settings (production API)", type: "info" },
                { line: 6, text: "Pass your Google OAuth JWT token to connect the identity", type: "info" },
                { line: 7, text: "The response includes the user's DID (Decentralized Identifier)", type: "tip" },
                { line: 8, text: "Use the accessToken for subsequent authenticated API calls", type: "tip" },
              ]}
            />
          </div>

          {/* External OAuth note */}
          <Card className="p-5 bg-amber-500/5 border-amber-500/20">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">External OAuth (zkLogin)</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  For external OAuth flows like zkLogin, skip audience validation:
                </p>
                <CodeBlock
                  code={`const response = await client.connectGoogleIdentity(googleJwtToken, {
  skipAudienceValidation: true,
});`}
                  language="typescript"
                />
              </div>
            </div>
          </Card>
        </div>
      ),
    },
    "api-reference": {
      title: "API Reference",
      subtitle: "Complete documentation for all SDK methods and types.",
      body: (
        <div className="space-y-8">
          {/* API Playground */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Try It Live
            </h3>
            <p className="text-muted-foreground mb-4">
              Test API methods directly in your browser. Edit parameters and see real responses.
            </p>
            <ApiPlayground selectedLanguage={selectedLanguage} />
          </div>

          {/* Identity Connection */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Identity Connection
            </h3>
            
            <Card className="p-6 bg-card/50 border-border/50 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">method</Badge>
                <code className="text-lg font-mono font-semibold text-foreground">connectGoogleIdentity(googleToken, options?)</code>
              </div>
              <p className="text-muted-foreground mb-4">
                Connects a Google identity to an Agentium identity.
              </p>
              
              <AnnotatedCodeBlock
                code={`// Standard Google Sign-In
const response = await client.connectGoogleIdentity(googleJwtToken);

// External OAuth (e.g., zkLogin) - skip audience validation
const response = await client.connectGoogleIdentity(googleJwtToken, {
  skipAudienceValidation: true,
});`}
                language="typescript"
                annotations={[
                  { line: 2, text: "Standard flow for Google Sign-In integration", type: "info" },
                  { line: 5, text: "Use skipAudienceValidation for external OAuth providers like zkLogin", type: "tip" },
                ]}
              />

              <div className="mt-4 p-4 rounded-xl bg-muted/50 border border-border/50">
                <p className="text-sm font-medium text-foreground mb-2">Returns: <code className="text-primary">ConnectIdentityResponse</code></p>
                <code className="text-xs font-mono text-muted-foreground">
                  {`{ did, accessToken, refreshToken, expiresIn, isNew, badge }`}
                </code>
              </div>
            </Card>
          </div>

          {/* Token Management */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              Token Management
            </h3>
            
            <Card className="p-6 bg-card/50 border-border/50 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">method</Badge>
                <code className="text-lg font-mono font-semibold text-foreground">exchangeApiKey(apiKey)</code>
              </div>
              <p className="text-muted-foreground mb-4">
                Exchanges an API key for JWT tokens (M2M authentication).
              </p>
              <CodeBlock
                code={`const tokens = await client.exchangeApiKey('ak_your_api_key');`}
                language="typescript"
              />
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">method</Badge>
                <code className="text-lg font-mono font-semibold text-foreground">refreshToken(refreshTokenValue)</code>
              </div>
              <p className="text-muted-foreground mb-4">
                Refreshes an access token using a refresh token.
              </p>
              <CodeBlock
                code={`const newTokens = await client.refreshToken(currentRefreshToken);`}
                language="typescript"
              />
            </Card>
          </div>

          {/* Error Handling */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Error Handling
            </h3>
            
            <Card className="p-6 bg-card/50 border-border/50">
              <p className="text-muted-foreground mb-4">
                All API methods throw <InteractiveTerm term="AgentiumApiError" definition="A custom error class thrown when API calls fail. Contains statusCode and message properties for debugging." type="method">AgentiumApiError</InteractiveTerm> on failure:
              </p>
              <AnnotatedCodeBlock
                code={`import { AgentiumApiError } from '@semiotic-labs/agentium-sdk';

try {
  await client.connectGoogleIdentity(token);
} catch (error) {
  if (error instanceof AgentiumApiError) {
    console.error(\`API Error (\${error.statusCode}): \${error.message}\`);
  }
}`}
                language="typescript"
                annotations={[
                  { line: 1, text: "Import the error class for type-safe error handling", type: "info" },
                  { line: 6, text: "Check if the error is an AgentiumApiError for API-specific errors", type: "tip" },
                  { line: 7, text: "statusCode contains the HTTP status, message has the error details", type: "info" },
                ]}
              />
            </Card>
          </div>
        </div>
      ),
    },
    "verifiable-credentials": {
      title: "Verifiable Credentials",
      subtitle: "W3C Verifiable Credentials with Ed25519 signatures.",
      body: (
        <div className="space-y-8">
          <p className="text-muted-foreground">
            The SDK supports <InteractiveTerm term="W3C Verifiable Credentials" definition="A W3C standard for cryptographically secure digital credentials that can be verified without contacting the issuer." type="concept">W3C Verifiable Credentials</InteractiveTerm> issued 
            as JWTs with Ed25519 signatures. VCs can be fetched, verified, and stored locally.
          </p>

          {/* Storage Setup */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-primary" />
              Storage Setup
            </h3>
            <AnnotatedCodeBlock
              code={`import { createBrowserStorage, createMemoryStorage } from '@semiotic-labs/agentium-sdk';

// Browser environment (uses localStorage)
client.setVcStorage(createBrowserStorage());

// Node.js or testing (in-memory)
client.setVcStorage(createMemoryStorage());`}
              language="typescript"
              annotations={[
                { line: 3, text: "Use browser storage for persistent credential storage in web apps", type: "info" },
                { line: 6, text: "Use memory storage for server-side or testing environments", type: "tip" },
              ]}
            />
          </Card>

          {/* Methods */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Credential Methods</h3>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">method</Badge>
                <code className="font-mono font-semibold text-foreground">fetchMembershipCredential(token)</code>
              </div>
              <p className="text-muted-foreground mb-4">
                Fetches a membership credential from the backend.
              </p>
              <CodeBlock
                code={`const vcJwt = await client.fetchMembershipCredential(authToken);`}
                language="typescript"
              />
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">method</Badge>
                <code className="font-mono font-semibold text-foreground">verifyCredential(jwt)</code>
              </div>
              <p className="text-muted-foreground mb-4">
                Verifies a JWT-VC against the issuer's public key.
              </p>
              <AnnotatedCodeBlock
                code={`const result = await client.verifyCredential(vcJwt);

if (result.valid) {
  console.log('Subject DID:', result.claims?.sub);
} else {
  console.error('Error:', result.error?.code, result.error?.message);
}`}
                language="typescript"
                annotations={[
                  { line: 1, text: "Verifies the JWT signature using the issuer's Ed25519 public key", type: "info" },
                  { line: 4, text: "Access the credential claims if verification succeeds", type: "tip" },
                  { line: 6, text: "Handle verification errors with detailed error information", type: "warning" },
                ]}
              />
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">method</Badge>
                <code className="font-mono font-semibold text-foreground">connectAndStoreMembership(token)</code>
              </div>
              <p className="text-muted-foreground mb-4">
                Full flow: fetch, verify, and store a membership credential.
              </p>
              <CodeBlock
                code={`const result = await client.connectAndStoreMembership(authToken);`}
                language="typescript"
              />
            </Card>

            <Card className="p-6 bg-card/50 border-border/50">
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">method</Badge>
                <code className="font-mono font-semibold text-foreground">getStoredCredential()</code>
              </div>
              <p className="text-muted-foreground mb-4">
                Retrieves the stored VC JWT from storage.
              </p>
              <CodeBlock
                code={`const storedVc = client.getStoredCredential();`}
                language="typescript"
              />
            </Card>
          </div>

          {/* WASM Utilities */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-primary" />
              WASM Utilities
            </h3>
            <p className="text-muted-foreground mb-4">
              Low-level cryptographic operations for Ed25519. WASM is automatically initialized on first use.
            </p>
            <AnnotatedCodeBlock
              code={`import { verifyJwt, generateKeypair, getPublicKey } from '@semiotic-labs/agentium-sdk';

// Generate key pair
const { privateKey, publicKey } = await generateKeypair();

// Verify JWT directly
const result = await verifyJwt(jwtString, publicKeyJwk);`}
              language="typescript"
              annotations={[
                { line: 1, text: "Import low-level WASM utilities for direct cryptographic operations", type: "info" },
                { line: 4, text: "Generate Ed25519 key pairs for signing and verification", type: "tip" },
                { line: 7, text: "Verify JWTs directly using a public key in JWK format", type: "info" },
              ]}
            />
          </Card>
        </div>
      ),
    },
    "telemetry": {
      title: "Telemetry",
      subtitle: "Flexible event forwarding from WASM to JavaScript.",
      body: (
        <div className="space-y-8">
          <p className="text-muted-foreground">
            The SDK provides a flexible telemetry system that forwards tracing events from the WASM layer to JavaScript. 
            Consumers can define custom sinks to handle events (logging, analytics, monitoring services, etc.).
          </p>

          <Card className="p-5 bg-blue-500/5 border-blue-500/20 mb-6">
            <p className="text-sm text-blue-400">
              <strong>Note:</strong> The WASM layer currently emits events only — spans are not yet supported.
            </p>
          </Card>

          {/* Initialization */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Initialization</h3>
            <p className="text-muted-foreground mb-4">
              Telemetry must be initialized after WASM is ready and can only be called once. If not initialized, no telemetry is emitted (silent by default).
            </p>
            <CodeBlock
              code={`import { ensureWasmReady, initTelemetry, consoleSink } from '@semiotic-labs/agentium-sdk';

await ensureWasmReady();
initTelemetry({ sink: consoleSink });`}
              language="typescript"
            />
          </Card>

          {/* Built-in Sinks */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Built-in Sinks</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                <code className="text-sm font-mono text-primary">consoleSink</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Logs events to the browser/Node console using the appropriate method (console.error, console.warn, etc.)
                </p>
              </div>
              <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                <code className="text-sm font-mono text-primary">nullSink</code>
                <p className="text-sm text-muted-foreground mt-1">
                  Discards all events (useful for explicitly disabling telemetry)
                </p>
              </div>
            </div>
          </Card>

          {/* Filtering Events */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Filtering Events</h3>
            <p className="text-muted-foreground mb-4">
              Filter events by level or target module:
            </p>
            <AnnotatedCodeBlock
              code={`import { withLevelFilter, withTargetFilter, consoleSink } from '@semiotic-labs/agentium-sdk';

// Only log errors and warnings
const errorSink = withLevelFilter(['error', 'warn'], consoleSink);

// Only log events from agentium modules
const agentiumSink = withTargetFilter(['agentium_sdk'], consoleSink);`}
              language="typescript"
              annotations={[
                { line: 3, text: "Filter by log level: error, warn, info, debug, trace", type: "info" },
                { line: 6, text: "Filter by target module path for focused debugging", type: "tip" },
              ]}
            />
          </Card>

          {/* Composing Sinks */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Composing Sinks</h3>
            <p className="text-muted-foreground mb-4">
              Combine multiple sinks to forward events to different destinations:
            </p>
            <AnnotatedCodeBlock
              code={`import { composeSinks, withLevelFilter, consoleSink, initTelemetry } from '@semiotic-labs/agentium-sdk';

const myAnalyticsSink = (event) => {
  // Send to your analytics service
  analytics.track('sdk_event', event);
};

initTelemetry({
  sink: composeSinks(
    withLevelFilter(['error', 'warn', 'info'], consoleSink),
    myAnalyticsSink
  ),
  filter: 'agentium_sdk=debug' // tracing-subscriber EnvFilter syntax
});`}
              language="typescript"
              annotations={[
                { line: 3, text: "Create custom sinks to forward events to analytics, monitoring, etc.", type: "info" },
                { line: 9, text: "Compose multiple sinks to handle events in different ways", type: "tip" },
                { line: 12, text: "Optional filter using tracing-subscriber EnvFilter syntax", type: "info" },
              ]}
            />
          </Card>

          {/* Event Structure */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4">Event Structure</h3>
            <p className="text-muted-foreground mb-4">
              Events passed to sinks have the following shape:
            </p>
            <CodeBlock
              code={`interface TelemetryEvent {
  kind: 'event';                    // Event type (currently always "event")
  level: 'error' | 'warn' | 'info' | 'debug' | 'trace';
  target: string;                   // Module path (e.g., "agentium_sdk_wasm::vc")
  name?: string;                    // Event name
  fields: Record<string, unknown>;  // Structured fields from the event
  ts_ms: number;                    // Timestamp in milliseconds
}`}
              language="typescript"
            />
          </Card>
        </div>
      ),
    },
    "advanced": {
      title: "Development",
      subtitle: "Setup, scripts, and compliance for SDK development.",
      body: (
        <div className="space-y-8">
          {/* Setup */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" />
              Development Setup
            </h3>
            <CodeBlock
              code={`git clone https://github.com/semiotic-agentium/agentium-sdk.git
cd agentium-sdk
npm install`}
              language="bash"
            />
          </Card>

          {/* Scripts */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-foreground">Available Scripts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "Run Tests", command: "npm test", desc: "Execute the test suite" },
                { title: "Build Project", command: "npm run build", desc: "Build WASM + TypeScript" },
                { title: "Generate Docs", command: "npm run docs", desc: "Generate API documentation" },
                { title: "Lint Code", command: "npm run lint", desc: "Run ESLint on the codebase" },
                { title: "Check All", command: "npm run check", desc: "Lint + format check" },
              ].map((item, i) => (
                <Card key={i} className="p-5 bg-card/50 border-border/50 hover:border-primary/20 transition-colors">
                  <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{item.desc}</p>
                  <code className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded">{item.command}</code>
                </Card>
              ))}
            </div>
          </div>

          {/* REUSE Compliance */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <FileKey className="w-5 h-5 text-primary" />
              REUSE Compliance
            </h3>
            <p className="text-muted-foreground mb-4">
              This project follows the <a href="https://reuse.software/spec/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">REUSE Specification</a>.
            </p>
            <CodeBlock
              code={`pip install reuse          # Install REUSE tool
npm run reuse:check        # Verify compliance
npm run reuse:write        # Apply SPDX headers`}
              language="bash"
            />
          </Card>

          {/* Bundler Configuration */}
          <Card className="p-6 bg-card/50 border-border/50">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Bundler Configuration (Vite, etc.)
            </h3>
            <p className="text-muted-foreground mb-4">
              For bundlers like Vite that require explicit WASM URL resolution, pass <code className="text-primary">wasmUrl</code> to the client constructor.
            </p>
            <AnnotatedCodeBlock
              code={`// If using low-level WASM utilities directly (without AgentiumClient)
import { ensureWasmReady } from '@semiotic-labs/agentium-sdk';
import wasmUrl from '@semiotic-labs/agentium-sdk/wasm?url';

await ensureWasmReady(wasmUrl);`}
              language="typescript"
              annotations={[
                { line: 2, text: "Import ensureWasmReady for manual WASM initialization", type: "info" },
                { line: 3, text: "Vite's ?url suffix provides the resolved WASM file URL", type: "tip" },
                { line: 5, text: "Call once before using low-level WASM utilities", type: "info" },
              ]}
            />
          </Card>
        </div>
      ),
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollProgress / 100 }}
      />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header with breadcrumb and Ask AI */}
          <div className="mb-8 flex items-center gap-4">
            <Breadcrumb items={[
              { label: "Docs", href: "/documentation" },
              { label: sections.find(s => s.id === activeSection)?.label || "" }
            ]} />
            <AskAIButton onClick={() => setIsAskAIOpen(true)} />
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar header area - aligned with sidebar */}
            <div className="hidden lg:block w-72 flex-shrink-0">
              {/* Search Bar - aligned with sidebar */}
              <div className="mb-4">
                <SearchBar
                  onResultClick={(result) => {
                    if (result.sectionId) {
                      setActiveSection(result.sectionId);
                      setMobileNavOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">@semiotic-labs/agentium-sdk</span>
              </div>
            </div>

            {/* Main header content */}
            <div className="flex-1 max-w-4xl">
              {/* Mobile only package name */}
              <div className="lg:hidden flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">@semiotic-labs/agentium-sdk</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4 min-w-0">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground whitespace-nowrap">
                    Developer Docs
                  </h1>
                  <VersionBadge
                    version={selectedVersion}
                    changelogUrl={`${GITHUB_URL}/releases`}
                    availableVersions={currentVersions}
                    onVersionChange={setSelectedVersion}
                    selectedLanguage={selectedLanguage}
                    onLanguageChange={handleLanguageChange}
                  />
                </div>
              </div>
              
              {/* Mobile Search Bar */}
              <div className="lg:hidden mt-4">
                <SearchBar
                  onResultClick={(result) => {
                    if (result.sectionId) {
                      setActiveSection(result.sectionId);
                      setMobileNavOpen(false);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile nav toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 border border-border/50 w-full"
              >
                {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <span className="text-sm font-medium">
                  {sections.find(s => s.id === activeSection)?.label || "Navigation"}
                </span>
                <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${mobileNavOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {mobileNavOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <nav className="py-2 space-y-1">
                      {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                          <button
                            key={section.id}
                            onClick={() => {
                              setActiveSection(section.id);
                              setMobileNavOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                              activeSection === section.id
                                ? "bg-primary text-primary-foreground"
                                : "hover:bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{section.label}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0" aria-label="Documentation navigation">
              <div className="lg:sticky lg:top-28 space-y-6">
                <nav className="space-y-1" aria-label="Documentation sections">
                  {sections.map((section, index) => {
                    const Icon = section.icon;
                    return (
                      <motion.button
                        key={section.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${
                          activeSection === section.id
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-sm font-medium">{section.label}</span>
                        {activeSection === section.id && (
                          <ChevronRight className="w-4 h-4 ml-auto" />
                        )}
                      </motion.button>
                    );
                  })}
                </nav>
                
                {/* Quick links */}
                <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
                  <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-primary" aria-hidden="true" />
                    Quick Links
                  </h4>
                  <nav className="space-y-2" aria-label="Quick links">
                    <a 
                      href={`${GITHUB_URL}/tree/main/examples`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                      Examples
                    </a>
                    <a 
                      href={`${GITHUB_URL}/blob/main/src/types.ts`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Code className="w-3.5 h-3.5" aria-hidden="true" />
                      API Types
                    </a>
                  </nav>
                </div>
                
                {/* GitHub CTA */}
                <a 
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-muted/50 border border-border/50 hover:bg-muted hover:border-primary/20 transition-all group"
                >
                  <Github className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">View on GitHub</p>
                    <p className="text-xs text-muted-foreground truncate">semiotic-agentium/agentium-sdk</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </div>
            </aside>

            {/* Content */}
            <main className="flex-1 min-w-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSection}-${selectedVersion}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-4xl"
                >
                  <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                      {(selectedLanguage === "python" 
                        ? pythonVersionContent 
                        : content)[activeSection]?.title}
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      {(selectedLanguage === "python" 
                        ? pythonVersionContent 
                        : content)[activeSection]?.subtitle}
                    </p>
                  </div>
                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    {(selectedLanguage === "python" 
                      ? pythonVersionContent 
                      : content)[activeSection]?.body}
                  </div>
                  
                  {/* Section navigation */}
                  <div className="mt-16 pt-8 border-t border-border/50">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      {sections.findIndex(s => s.id === activeSection) > 0 && (
                        <button
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === activeSection);
                            if (currentIndex > 0) {
                              setActiveSection(sections[currentIndex - 1].id);
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-left group"
                        >
                          <ChevronRight className="w-4 h-4 rotate-180 text-muted-foreground group-hover:text-foreground" />
                          <div>
                            <p className="text-xs text-muted-foreground">Previous</p>
                            <p className="text-sm font-medium text-foreground">
                              {sections[sections.findIndex(s => s.id === activeSection) - 1]?.label}
                            </p>
                          </div>
                        </button>
                      )}
                      {sections.findIndex(s => s.id === activeSection) < sections.length - 1 && (
                        <button
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === activeSection);
                            if (currentIndex < sections.length - 1) {
                              setActiveSection(sections[currentIndex + 1].id);
                            }
                          }}
                          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-right group ml-auto"
                        >
                          <div>
                            <p className="text-xs text-muted-foreground">Next</p>
                            <p className="text-sm font-medium text-foreground">
                              {sections[sections.findIndex(s => s.id === activeSection) + 1]?.label}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </main>
          </div>
        </div>
      </div>

      <Footer />
      
      <AskAIPanel isOpen={isAskAIOpen} onClose={() => setIsAskAIOpen(false)} />
    </div>
  );
};

export default Documentation;
