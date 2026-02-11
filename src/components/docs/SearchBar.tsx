import { useState, useEffect, useRef } from "react";
import { Search, Command, X, ArrowRight, FileText, Code, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResult {
  id: string;
  title: string;
  section: string;
  sectionId: string;
  preview: string;
  type?: "method" | "concept" | "guide";
  keywords?: string[]; // Additional searchable terms
}

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onResultClick?: (result: SearchResult) => void;
  placeholder?: string;
}

// Comprehensive search results covering all documentation topics
const searchableContent: SearchResult[] = [
  // Getting Started
  { id: "1", title: "Getting Started", section: "Overview", sectionId: "getting-started", preview: "TypeScript SDK for the Agentium Network API...", type: "guide", keywords: ["intro", "introduction", "start", "begin", "overview"] },
  { id: "2", title: "What is Agentium SDK?", section: "Overview", sectionId: "getting-started", preview: "Unified interface for identity, credentials, and AI agents", type: "guide", keywords: ["about", "what", "sdk", "agentium"] },
  
  // Core Concepts
  { id: "3", title: "AgentiumClient", section: "Core Concepts", sectionId: "core-concepts", preview: "Main class for interacting with Agentium API...", type: "concept", keywords: ["client", "class", "main", "api"] },
  { id: "4", title: "DID (Decentralized Identifier)", section: "Core Concepts", sectionId: "core-concepts", preview: "Unique cryptographically verifiable identifier for agents", type: "concept", keywords: ["did", "decentralized", "identifier", "identity"] },
  { id: "5", title: "Identity Connection Flow", section: "Core Concepts", sectionId: "core-concepts", preview: "How authentication and identity linking works", type: "concept", keywords: ["flow", "auth", "authentication", "connect"] },
  
  // Installation
  { id: "6", title: "Installation", section: "Setup", sectionId: "installation", preview: "Install the SDK via npm, yarn, pnpm, or pip...", type: "guide", keywords: ["install", "setup", "npm", "yarn", "pnpm", "pip", "package"] },
  { id: "7", title: "TypeScript Installation", section: "Setup", sectionId: "installation", preview: "npm install @semiotic-labs/agentium-sdk", type: "guide", keywords: ["typescript", "ts", "npm", "node", "javascript", "js"] },
  { id: "8", title: "Python Installation", section: "Setup", sectionId: "installation", preview: "pip install agentium-sdk", type: "guide", keywords: ["python", "pip", "pypi", "py"] },
  
  // Quick Start
  { id: "9", title: "Quick Start", section: "Tutorial", sectionId: "quick-start", preview: "Initialize the client and start building in 5 minutes", type: "guide", keywords: ["quick", "start", "tutorial", "begin", "first", "hello"] },
  { id: "10", title: "Connect Google Identity", section: "Quick Start", sectionId: "quick-start", preview: "Connect a Google identity using JWT token", type: "guide", keywords: ["google", "oauth", "jwt", "signin", "login"] },
  { id: "11", title: "Environment Configuration", section: "Quick Start", sectionId: "quick-start", preview: "Set up AGENTIUM_BASE_URL and other environment variables", type: "guide", keywords: ["env", "environment", "config", "configuration", "variables"] },
  
  // API Reference
  { id: "12", title: "connectGoogleIdentity()", section: "API Reference", sectionId: "api-reference", preview: "Connect a Google identity using JWT token...", type: "method", keywords: ["google", "connect", "identity", "jwt", "oauth"] },
  { id: "13", title: "exchangeApiKey()", section: "API Reference", sectionId: "api-reference", preview: "Exchange API key for JWT tokens (M2M auth)...", type: "method", keywords: ["api", "key", "exchange", "m2m", "machine", "token"] },
  { id: "14", title: "connectWalletIdentity()", section: "API Reference", sectionId: "api-reference", preview: "Connect wallet via SIWE (Sign-In with Ethereum)", type: "method", keywords: ["wallet", "siwe", "ethereum", "eth", "connect", "eip4361"] },
  { id: "15", title: "verifyCredential()", section: "API Reference", sectionId: "api-reference", preview: "Verify a W3C Verifiable Credential with Ed25519", type: "method", keywords: ["verify", "credential", "vc", "w3c", "ed25519"] },
  { id: "16", title: "refreshSession()", section: "API Reference", sectionId: "api-reference", preview: "Refresh JWT access tokens before expiry", type: "method", keywords: ["refresh", "session", "token", "jwt", "expiry"] },
  { id: "17", title: "issueCredential()", section: "API Reference", sectionId: "api-reference", preview: "Issue a new Verifiable Credential", type: "method", keywords: ["issue", "credential", "vc", "create", "mint"] },
  
  // Verifiable Credentials
  { id: "18", title: "Verifiable Credentials", section: "Security", sectionId: "verifiable-credentials", preview: "W3C VCs with Ed25519 signatures issued as JWTs", type: "guide", keywords: ["vc", "verifiable", "credentials", "w3c", "jwt", "ed25519"] },
  { id: "19", title: "Ed25519 Signatures", section: "Security", sectionId: "verifiable-credentials", preview: "Native cryptographic signature verification", type: "concept", keywords: ["ed25519", "signature", "crypto", "cryptography", "sign", "verify"] },
  { id: "20", title: "JWT Credentials", section: "Security", sectionId: "verifiable-credentials", preview: "Credentials encoded as JSON Web Tokens", type: "concept", keywords: ["jwt", "json", "web", "token", "credential"] },
  
  // Telemetry
  { id: "21", title: "Telemetry", section: "Observability", sectionId: "telemetry", preview: "Flexible event forwarding from WASM to JavaScript", type: "guide", keywords: ["telemetry", "observability", "logging", "tracing", "events", "wasm"] },
  { id: "22", title: "Event Callbacks", section: "Observability", sectionId: "telemetry", preview: "Subscribe to SDK events with custom handlers", type: "concept", keywords: ["events", "callbacks", "handlers", "subscribe", "listener"] },
  { id: "23", title: "Structured Tracing", section: "Observability", sectionId: "telemetry", preview: "Console and custom output for debugging", type: "concept", keywords: ["tracing", "debug", "console", "log", "output"] },
  
  // Advanced
  { id: "24", title: "Advanced Configuration", section: "Advanced", sectionId: "advanced", preview: "Custom pipelines, environment configs, and more...", type: "concept", keywords: ["advanced", "config", "configuration", "custom", "pipeline"] },
  { id: "25", title: "Custom Base URL", section: "Advanced", sectionId: "advanced", preview: "Configure custom API endpoints", type: "concept", keywords: ["url", "endpoint", "base", "custom", "api"] },
  { id: "26", title: "Error Handling", section: "Advanced", sectionId: "advanced", preview: "Handle API errors and edge cases gracefully", type: "guide", keywords: ["error", "errors", "handling", "exception", "catch", "try"] },
  
  // Languages & Technologies
  { id: "27", title: "TypeScript SDK", section: "Languages", sectionId: "getting-started", preview: "@semiotic-labs/agentium-sdk for TypeScript/JavaScript", type: "guide", keywords: ["typescript", "ts", "javascript", "js", "node", "npm"] },
  { id: "28", title: "Python SDK", section: "Languages", sectionId: "getting-started", preview: "agentium-sdk for Python with Rust-powered cryptography", type: "guide", keywords: ["python", "py", "pip", "rust", "pyo3"] },
  { id: "29", title: "Rust Cryptography", section: "Core", sectionId: "core-concepts", preview: "Native Ed25519 operations via PyO3 bindings", type: "concept", keywords: ["rust", "crypto", "cryptography", "pyo3", "native", "bindings", "wasm", "webassembly"] },
  { id: "30", title: "WASM Runtime", section: "Core", sectionId: "core-concepts", preview: "WebAssembly runtime for browser and Node.js", type: "concept", keywords: ["wasm", "webassembly", "browser", "runtime", "web"] },
  
  // Authentication Methods
  { id: "31", title: "Google OAuth", section: "Authentication", sectionId: "api-reference", preview: "Sign in with Google using OAuth 2.0 JWT tokens", type: "guide", keywords: ["google", "oauth", "signin", "login", "authentication"] },
  { id: "32", title: "SIWE (Sign-In with Ethereum)", section: "Authentication", sectionId: "api-reference", preview: "EIP-4361 authentication with Ethereum wallets", type: "guide", keywords: ["siwe", "ethereum", "wallet", "eip4361", "metamask", "web3"] },
  { id: "33", title: "M2M Authentication", section: "Authentication", sectionId: "api-reference", preview: "Machine-to-machine auth with API keys", type: "guide", keywords: ["m2m", "machine", "api", "key", "server", "backend"] },
  { id: "34", title: "API Keys", section: "Authentication", sectionId: "api-reference", preview: "Generate and exchange API keys for tokens", type: "guide", keywords: ["api", "key", "keys", "token", "generate", "exchange"] },
  
  // Blockchain & Web3
  { id: "35", title: "CAIP-2 Chain Identifiers", section: "Blockchain", sectionId: "core-concepts", preview: "Standard format for identifying blockchain networks", type: "concept", keywords: ["caip", "chain", "blockchain", "network", "identifier"] },
  { id: "36", title: "Wallet Integration", section: "Web3", sectionId: "api-reference", preview: "Connect Ethereum and other EVM wallets", type: "guide", keywords: ["wallet", "ethereum", "evm", "metamask", "connect", "web3"] },
  
  // Async/Sync
  { id: "37", title: "Async/Await Support", section: "API", sectionId: "api-reference", preview: "Full async/await support for non-blocking operations", type: "concept", keywords: ["async", "await", "promise", "asynchronous", "non-blocking"] },
  { id: "38", title: "Sync API", section: "API", sectionId: "api-reference", preview: "Synchronous alternatives for simple use cases", type: "concept", keywords: ["sync", "synchronous", "blocking", "simple"] },
];

const typeIcons = {
  method: Code,
  concept: Zap,
  guide: FileText,
};

const typeColors = {
  method: "text-primary bg-primary/10",
  concept: "text-accent-foreground bg-accent",
  guide: "text-secondary-foreground bg-secondary",
};

const SearchBar = ({ onSearch, onResultClick, placeholder = "Search docs..." }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setIsFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Navigate results with arrow keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        onResultClick?.(results[selectedIndex]);
        handleClear();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, results, selectedIndex, onResultClick]);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
    setSelectedIndex(0);
    
    if (value.length > 0) {
      const searchTerm = value.toLowerCase();
      const filtered = searchableContent.filter((r) => {
        // Search in title
        if (r.title.toLowerCase().includes(searchTerm)) return true;
        // Search in preview
        if (r.preview.toLowerCase().includes(searchTerm)) return true;
        // Search in section
        if (r.section.toLowerCase().includes(searchTerm)) return true;
        // Search in keywords
        if (r.keywords?.some(kw => kw.toLowerCase().includes(searchTerm))) return true;
        return false;
      });
      
      // Sort results: exact title matches first, then keyword matches, then preview matches
      filtered.sort((a, b) => {
        const aTitle = a.title.toLowerCase();
        const bTitle = b.title.toLowerCase();
        const aKeywordMatch = a.keywords?.some(kw => kw.toLowerCase() === searchTerm) ?? false;
        const bKeywordMatch = b.keywords?.some(kw => kw.toLowerCase() === searchTerm) ?? false;
        
        // Exact title match first
        if (aTitle === searchTerm && bTitle !== searchTerm) return -1;
        if (bTitle === searchTerm && aTitle !== searchTerm) return 1;
        
        // Title starts with search term
        if (aTitle.startsWith(searchTerm) && !bTitle.startsWith(searchTerm)) return -1;
        if (bTitle.startsWith(searchTerm) && !aTitle.startsWith(searchTerm)) return 1;
        
        // Exact keyword match
        if (aKeywordMatch && !bKeywordMatch) return -1;
        if (bKeywordMatch && !aKeywordMatch) return 1;
        
        return 0;
      });
      
      setResults(filtered.slice(0, 8)); // Limit to 8 results for better UX
    } else {
      setResults([]);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setSelectedIndex(0);
  };

  return (
    <div className="relative w-full max-w-md" role="search">
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused
            ? "0 0 0 2px hsl(var(--primary) / 0.3), 0 10px 40px -10px hsl(var(--primary) / 0.2)"
            : "none",
        }}
        className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors duration-200 ${
          isFocused
            ? "bg-card border border-primary/40"
            : "bg-muted/50 border border-transparent hover:border-border/50"
        }`}
      >
        <Search className={`w-5 h-5 flex-shrink-0 transition-colors ${isFocused ? "text-primary" : "text-muted-foreground"}`} aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder}
          aria-label="Search documentation"
          aria-expanded={isFocused && results.length > 0}
          aria-controls="search-results"
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm min-w-0"
        />
        {query ? (
          <button 
            onClick={handleClear} 
            className="p-1 rounded-lg hover:bg-muted transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-muted text-muted-foreground text-xs font-medium" aria-hidden="true">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        )}
      </motion.div>

      {/* Results dropdown */}
      <AnimatePresence>
        {isFocused && results.length > 0 && (
          <motion.div
            id="search-results"
            role="listbox"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 right-0 mt-2 py-2 rounded-2xl bg-card/98 backdrop-blur-xl border border-border/50 shadow-2xl z-50 overflow-hidden"
          >
            <div className="px-3 pb-2 mb-2 border-b border-border/50">
              <p className="text-xs text-muted-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""} • Use ↑↓ to navigate
              </p>
            </div>
            {results.map((result, index) => {
              const Icon = typeIcons[result.type || "concept"];
              const colorClass = typeColors[result.type || "concept"];
              
              return (
                <button
                  key={result.id}
                  onClick={() => {
                    onResultClick?.(result);
                    handleClear();
                  }}
                  className={`w-full px-4 py-3 text-left transition-colors flex items-start gap-3 ${
                    selectedIndex === index
                      ? "bg-primary/10"
                      : "hover:bg-muted/50"
                  }`}
                >
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span className="font-medium text-foreground text-sm truncate">{result.title}</span>
                      <span className="text-xs text-muted-foreground flex-shrink-0">{result.section}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{result.preview}</p>
                  </div>
                  {selectedIndex === index && (
                    <ArrowRight className="w-4 h-4 text-primary mt-2 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results */}
      <AnimatePresence>
        {isFocused && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-6 rounded-2xl bg-card/98 backdrop-blur-xl border border-border/50 shadow-2xl z-50 text-center"
          >
            <Search className="w-8 h-8 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium mb-1">No results found</p>
            <p className="text-xs text-muted-foreground">Try searching for "python", "rust", "typescript", or "credentials"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
