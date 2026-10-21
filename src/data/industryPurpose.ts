export interface IndustryCaseStudy {
  id: string;
  industry: string;
  icon: string;
  tagline: string;
  badge: string;
  whatIsBuilt: string[];
  realWorldAdopters: {
    company: string;
    description: string;
    provenImpact: string;
  }[];
}

export interface FuturePurposePillar {
  number: number;
  title: string;
  subtitle: string;
  mandateOrReality: string;
  strategicImpact: string;
}

export interface TechComparisonRow {
  criterion: string;
  cpp: string;
  golang: string;
  java: string;
  rust: string;
}

export const INDUSTRY_CASE_STUDIES: IndustryCaseStudy[] = [
  {
    id: "os-kernel",
    industry: "Operating Systems, Kernels & Hypervisors",
    icon: "Cpu",
    tagline: "Bare-metal kernel modules, driver development, and memory virtualization.",
    badge: "Core Silicon Layer",
    whatIsBuilt: [
      "Linux kernel device drivers (Rust-for-Linux)",
      "Core Windows OS graphics and kernel libraries (win32k.sys)",
      "Android OS hardware abstraction layers (HAL)",
      "Next-generation microkernel architectures (Redox OS)"
    ],
    realWorldAdopters: [
      {
        company: "Linux Kernel",
        description: "Officially merged Rust as its first official second language alongside C in Linux 6.1.",
        provenImpact: "Eliminates memory safety bugs in drivers, which historically accounted for ~70% of all kernel vulnerabilities."
      },
      {
        company: "Microsoft Windows",
        description: "Rewriting core Windows kernel and GDI graphics libraries in Rust.",
        provenImpact: "Eliminates entire classes of remote code execution (RCE) and privilege escalation CVEs."
      },
      {
        company: "Google Android",
        description: "Mandated Rust for all new native components in Android 13/14+.",
        provenImpact: "Android native memory safety vulnerabilities dropped by over 80%."
      }
    ]
  },
  {
    id: "cloud-infra",
    industry: "Cloud Infrastructure, Storage & Virtualization",
    icon: "Cloud",
    tagline: "MicroVM serverless engines, service meshes, and distributed databases.",
    badge: "Hyperscale Backbone",
    whatIsBuilt: [
      "Serverless microVM hypervisors (AWS Firecracker)",
      "High-throughput service mesh proxies (Linkerd2-proxy)",
      "Distributed transactional key-value databases (TiKV)",
      "Observability and log pipelines (Datadog Vector)"
    ],
    realWorldAdopters: [
      {
        company: "Amazon Web Services (AWS)",
        description: "Built Firecracker to power every AWS Lambda invocation and AWS Fargate container worldwide.",
        provenImpact: "Spins up secure Linux microVMs in <5ms with only 5MB memory overhead."
      },
      {
        company: "Linkerd (CNCF)",
        description: "Rewrote its Kubernetes service mesh proxy from Scala/Go into pure Rust.",
        provenImpact: "Slashed RAM consumption by 90% and eliminated p99 garbage collection latency spikes."
      },
      {
        company: "Cloudflare",
        description: "Powers global edge reverse proxies, DDoS mitigation, and DNS resolvers with Rust.",
        provenImpact: "Processes hundreds of millions of requests per second with flat tail latency."
      }
    ]
  },
  {
    id: "web3-crypto",
    industry: "Web3, Blockchain & Cryptography",
    icon: "Coins",
    tagline: "High-throughput smart contracts, consensus clients, and zero-knowledge proofs.",
    badge: "Highest Commercial Demand",
    whatIsBuilt: [
      "Parallel smart contract execution runtimes (Solana Sealevel)",
      "Next-generation Ethereum execution nodes (Paradigm Reth)",
      "Zero-Knowledge (ZK-SNARK) cryptography circuits (Arkworks, Halo2)",
      "Decentralized automated market makers (AMMs) & order books"
    ],
    realWorldAdopters: [
      {
        company: "Solana",
        description: "Compiles smart contracts with the Anchor framework directly to eBPF bytecode.",
        provenImpact: "Processes 50,000+ transactions per second in parallel across GPU/CPU cores."
      },
      {
        company: "Paradigm (Reth)",
        description: "Rewrote the full Ethereum execution client in modular Rust.",
        provenImpact: "Syncs the entire 2TB Ethereum blockchain 5x faster with half the memory footprint."
      },
      {
        company: "Zero-Knowledge Labs",
        description: "Arkworks and Halo2 enable privacy-preserving transactions and rollup scaling.",
        provenImpact: "Enforces mathematical correctness with zero memory leakage of secret witness values."
      }
    ]
  },
  {
    id: "cyber-security",
    industry: "Cyber Security & Exploit Engineering",
    icon: "ShieldAlert",
    tagline: "In-kernel eBPF sensors, binary fuzzing engines, and malware analysis.",
    badge: "Offensive & Defensive Security",
    whatIsBuilt: [
      "Kernel-space security telemetry sensors (Aya eBPF)",
      "Evolutionary coverage-guided binary fuzzers (LibAFL)",
      "Zero-copy network packet sniffers & DPI firewalls (Nom)",
      "Constant-time cryptographic verifiers (Subtle)"
    ],
    realWorldAdopters: [
      {
        company: "CrowdStrike & Mandiant",
        description: "Using Rust and eBPF to monitor process spawning and file modifications from kernel space.",
        provenImpact: "Zero endpoint crashes or kernel panics compared to legacy C drivers."
      },
      {
        company: "Google Project Zero & DARPA",
        description: "Deploying LibAFL to discover zero-day vulnerabilities in C/C++ codebases.",
        provenImpact: "Massive multi-core fuzzing throughput without garbage collector pauses."
      },
      {
        company: "1Password",
        description: "Unified desktop, mobile, and browser extension security core written in Rust.",
        provenImpact: "Guaranteed cryptographic memory zeroization and zero buffer overflow exploits."
      }
    ]
  },
  {
    id: "hft-fintech",
    industry: "High-Frequency Trading & Low-Latency FinTech",
    icon: "TrendingUp",
    tagline: "Sub-microsecond matching engines, kernel bypass, and lock-free order books.",
    badge: "Ultra-Low Latency & High Pay",
    whatIsBuilt: [
      "Price-time priority Limit Order Books (LOB)",
      "NASDAQ ITCH / FIX binary market feed parsers",
      "Lock-free single-producer single-consumer (SPSC) ring buffers",
      "Direct Market Access (DMA) kernel bypass gateways (Solarflare/DPDK)"
    ],
    realWorldAdopters: [
      {
        company: "Citadel Securities & Jane Street",
        description: "Migrating latency-critical execution pathways from C++ to Rust.",
        provenImpact: "Sub-microsecond tick-to-trade turnaround times with zero data races."
      },
      {
        company: "Wintermute & Jump Trading",
        description: "Algorithmic market-making engines and decentralized exchange market feeds.",
        provenImpact: "Eliminates GC stop-the-world latency spikes during extreme volatility."
      }
    ]
  },
  {
    id: "defense-aerospace",
    industry: "Defense, Aerospace & Critical Infrastructure",
    icon: "Rocket",
    tagline: "DO-178C avionics certification, satellite guidance, and space flight software.",
    badge: "Mission-Critical Precision",
    whatIsBuilt: [
      "Satellite guidance, navigation, and control (GNC) loops",
      "DO-178C Level A compliant flight controller state machines",
      "Mathematically verified flight algorithms using Kani model checker",
      "Radiation bit-flip Triple Modular Redundancy (TMR) voting systems"
    ],
    realWorldAdopters: [
      {
        company: "European Space Agency (ESA) & NASA",
        description: "Deploying `#![no_std]` Rust on radiation-hardened space microprocessors.",
        provenImpact: "Zero dynamic memory allocation (`heapless`), eliminating flight crashes."
      },
      {
        company: "Ferrocene (Safety Qualified)",
        description: "Qualified Rust compiler certified for ISO 26262 (ASIL D) and IEC 61508 (SIL 4).",
        provenImpact: "Enables civil aviation and automotive steering-by-wire without legacy C bugs."
      }
    ]
  },
  {
    id: "wasm-edge",
    industry: "WebAssembly, Edge Computing & Modern Web",
    icon: "Globe",
    tagline: "In-browser desktop-class applications and microsecond edge serverless workers.",
    badge: "Portable High Performance",
    whatIsBuilt: [
      "In-browser 60fps image editors and vector geometry engines",
      "Capability-sandboxed serverless worker runtimes (Wasmtime, WASI)",
      "Secure multi-tenant plugin architectures for SaaS platforms",
      "Edge computing micro-functions deployed across global CDNs"
    ],
    realWorldAdopters: [
      {
        company: "Figma & Adobe",
        description: "Running massive vector rendering engines directly inside browser tabs via WASM.",
        provenImpact: "Desktop-class near-native CPU speeds in Chrome, Safari, and Firefox."
      },
      {
        company: "Cloudflare Workers & Fastly",
        description: "Executing serverless edge functions inside isolated WebAssembly instances.",
        provenImpact: "Sub-50-microsecond cold boot times (10,000x faster than Docker containers)."
      }
    ]
  },
  {
    id: "ai-devtools",
    industry: "AI Infrastructure, Compilers & Developer Tooling",
    icon: "Terminal",
    tagline: "High-speed tokenizers, machine learning data loaders, and next-gen developer tools.",
    badge: "Tooling Revolution",
    whatIsBuilt: [
      "Deep learning tokenization engines (Hugging Face Tokenizers)",
      "Pure Rust machine learning frameworks (Burn)",
      "Next-generation JavaScript/Python tooling (uv, Ruff, Turbopack, SWC)",
      "High-throughput vector search databases (Qdrant)"
    ],
    realWorldAdopters: [
      {
        company: "Hugging Face",
        description: "Wrote their core Tokenizers library in pure Rust.",
        provenImpact: "Tokenizes gigabytes of LLM training text 20x faster than Python."
      },
      {
        company: "Astral (uv & Ruff)",
        description: "Rewrote Python package management (`uv`) and linting (`Ruff`) in Rust.",
        provenImpact: "Installs Python packages 10x–100x faster with zero dependency conflicts."
      },
      {
        company: "Qdrant",
        description: "High-performance vector search engine for AI embeddings and RAG pipelines.",
        provenImpact: "Near-instant vector similarity search over millions of embeddings."
      }
    ]
  }
];

export const FUTURE_PURPOSE_PILLARS: FuturePurposePillar[] = [
  {
    number: 1,
    title: "The Regulatory & National Security Mandate",
    subtitle: "The Global Deprecation of C and C++",
    mandateOrReality: "The White House Executive Office, CISA, NSA, FBI, and European Union (Cyber Resilience Act) have issued formal directives mandating that critical infrastructure, banking, and government systems transition away from C/C++ to memory-safe languages.",
    strategicImpact: "Memory safety is no longer just a technical preference; it is a legal compliance mandate. Trillions of lines of legacy C/C++ will undergo mandatory migration to Rust over the next 10–20 years."
  },
  {
    number: 2,
    title: "Eradicating the 'Safety vs. Performance' Paradox",
    subtitle: "No More Compulsory Compromise",
    mandateOrReality: "For 50 years, engineering teams had to choose: write in C++ for speed (and risk memory corruption CVEs), or write in Go/Java for safety (and accept garbage collection latency spikes and 10x RAM overhead).",
    strategicImpact: "Rust proves that zero-cost safety is physically possible. Future systems will no longer tolerate runtime garbage collection pauses in latency-sensitive pipelines."
  },
  {
    number: 3,
    title: "Hyperscale Cloud & Green Computing Efficiency",
    subtitle: "80% Reduction in Datacenter Energy and Cloud Costs",
    mandateOrReality: "10,000 microservice containers in Java consume 5,000 GB RAM. The identical services in Rust consume 150 GB RAM. Cloud hyperscalers (AWS, Azure, Google Cloud) spend billions on cooling and electricity.",
    strategicImpact: "Rust delivers a massive reduction in server instances, cloud bills, and carbon footprints, making it the premier language for sustainable cloud infrastructure."
  },
  {
    number: 4,
    title: "Universal Portability via WebAssembly & WASI",
    subtitle: "The Future Beyond Heavy Docker Containers",
    mandateOrReality: "Docker containers carry heavy 100MB Linux operating system images and take 500ms to boot. Rust compiles to compact WebAssembly binaries executing with capability-based security (WASI).",
    strategicImpact: "Software will compile once to Rust WASM and execute instantly in browsers, edge CDNs, automotive chips, and cloud nodes with sub-50µs cold starts."
  },
  {
    number: 5,
    title: "Safety Qualification in Autonomous Physical Systems",
    subtitle: "Mathematical Proof of Software Correctness",
    mandateOrReality: "In autonomous vehicles, surgical robotics, and defense drones, software crashes cause loss of human life. Qualified compilers (Ferrocene) and formal verifiers (Kani) allow mathematical verification.",
    strategicImpact: "Rust is replacing obsolete Ada and dangerous C in aerospace and automotive, setting the new benchmark for safety-critical systems certification."
  }
];

export const TECH_COMPARISON_MATRIX: TechComparisonRow[] = [
  {
    criterion: "Memory Safety",
    cpp: "❌ Manual (Causes 70% of all CVEs)",
    golang: "✅ Safe (via Garbage Collector)",
    java: "✅ Safe (via JVM GC)",
    rust: "✅ 100% Compile-Time Safe (Zero GC)"
  },
  {
    criterion: "Execution Speed",
    cpp: "⚡ Nanosecond Maximum",
    golang: "⚠️ Medium (GC stalls)",
    java: "⚠️ Medium-Fast (JIT Warmup)",
    rust: "⚡ Nanosecond Maximum (Matches C++)"
  },
  {
    criterion: "Memory Footprint",
    cpp: "📦 Tiny (~2–5 MB)",
    golang: "📦 Medium (~30–80 MB)",
    java: "📦 Heavy (~300–800 MB)",
    rust: "📦 Tiny (~2–10 MB)"
  },
  {
    criterion: "Deterministic Latency",
    cpp: "✅ Flat (No GC)",
    golang: "❌ Tail spikes (p99.9 GC pause)",
    java: "❌ Tail spikes (p99.9 GC pause)",
    rust: "✅ Flat (Zero GC pauses)"
  },
  {
    criterion: "Concurrency Model",
    cpp: "❌ Prone to Data Races",
    golang: "⚠️ Safe Goroutines, but raceable",
    java: "⚠️ Complex thread locks",
    rust: "✅ Fearless (Send & Sync verified)"
  },
  {
    criterion: "Deployment Targets",
    cpp: "💻 Bare-metal to OS",
    golang: "🌐 Cloud backends only",
    java: "☕ JVM environments only",
    rust: "🚀 Microcontrollers → OS → Cloud → WASM"
  }
];
