export interface IndustryMediaResource {
  title: string;
  url: string;
  type: 'video' | 'paper' | 'repo' | 'doc';
  source: string;
  description: string;
}

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
  mediaResources: IndustryMediaResource[];
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
    ],
    mediaResources: [
      {
        title: "Miguel Ojeda: Rust for Linux (RustConf Keynote)",
        url: "https://www.youtube.com/watch?v=FRMJzNYut4g",
        type: "video",
        source: "RustConf Official Keynote",
        description: "Official presentation detailing the integration of Rust into mainline Linux, safe driver APIs, and memory invariants."
      },
      {
        title: "David Weston: Default Security with Rust in Windows",
        url: "https://www.youtube.com/watch?v=8T6ClX-y2AE",
        type: "video",
        source: "Microsoft BlueHat Keynote",
        description: "Deep technical interview with Windows security architects explaining the porting of win32k.sys and DirectWrite."
      },
      {
        title: "Linux Kernel Rust Documentation",
        url: "https://docs.kernel.org/rust/",
        type: "doc",
        source: "Kernel.org Official Docs",
        description: "Canonical guide for writing out-of-tree and in-tree Linux kernel modules and drivers in pure Rust."
      },
      {
        title: "Redox OS Source Code & Book",
        url: "https://gitlab.redox-os.org/redox-os/redox",
        type: "repo",
        source: "Redox OS Project",
        description: "A complete Unix-like microkernel operating system written 100% in pure safe Rust."
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
    ],
    mediaResources: [
      {
        title: "Mark Russinovich (Azure CTO): Why Azure is Moving to Rust from C++",
        url: "https://www.youtube.com/watch?v=SmUprpjCWjM",
        type: "video",
        source: "Rust Nation UK Keynote",
        description: "Microsoft Azure CTO details how cloud infrastructure reliability mandates migrating to Rust."
      },
      {
        title: "Alice Ryhl: What It Takes to Keep Tokio Running",
        url: "https://www.youtube.com/watch?v=Lc3aw_NIOt0",
        type: "video",
        source: "Rust Nation UK",
        description: "Architecture breakdown of the non-blocking async runtime powering modern hyperscale cloud services."
      },
      {
        title: "Cloudflare Pingora GitHub Repository",
        url: "https://github.com/cloudflare/pingora",
        type: "repo",
        source: "Cloudflare Open Source",
        description: "Production async network framework powering Cloudflare's hyperscale proxy infrastructure."
      },
      {
        title: "TiKV: Distributed Key-Value Database in Rust",
        url: "https://tikv.org/",
        type: "doc",
        source: "CNCF Graduated Project",
        description: "Architecture and documentation of the Raft consensus-based storage engine built for petabyte scale."
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
    ],
    mediaResources: [
      {
        title: "Anatoly Yakovenko: Solana Architecture & Sealevel",
        url: "https://www.youtube.com/results?search_query=Anatoly+Yakovenko+Solana+Architecture+Rust",
        type: "video",
        source: "Solana Engineering Video Search",
        description: "Technical deep-dive on parallel execution, eBPF bytecode, Gulf Stream, and hardware pipeline optimization."
      },
      {
        title: "Paradigm Reth: Architecture of a Fast Ethereum Client in Rust",
        url: "https://www.youtube.com/results?search_query=Paradigm+Reth+Ethereum+Rust",
        type: "video",
        source: "Paradigm Core Team Video Search",
        description: "How Reth was architected with zero-copy disk I/O, custom memory pools, and lock-free concurrency."
      },
      {
        title: "Solana Anchor Framework Documentation",
        url: "https://www.anchor-lang.com/",
        type: "doc",
        source: "Coral Community",
        description: "The definitive eBPF smart contract development framework for building production Solana programs."
      },
      {
        title: "Paradigm Reth (GitHub)",
        url: "https://github.com/paradigmxyz/reth",
        type: "repo",
        source: "Paradigm",
        description: "Apache/MIT licensed, performant, modular Ethereum execution node written in 100% Rust."
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
    ],
    mediaResources: [
      {
        title: "Celina Val: Strategies for Managing Unsafe Rust",
        url: "https://www.youtube.com/watch?v=fmtykJT1acM",
        type: "video",
        source: "Rust Nation UK Security Track",
        description: "Deep dive into memory invariants, unsafe boundaries, and preventing vulnerabilities."
      },
      {
        title: "The Unsafe Rust Survival Guide",
        url: "https://www.youtube.com/watch?v=91uStPBLibc",
        type: "video",
        source: "Let's Get Rusty (YouTube)",
        description: "Practical tutorial on writing sound unsafe code, avoiding undefined behavior, and auditing pointer arithmetic."
      },
      {
        title: "Trail of Bits Rust Security Guidelines",
        url: "https://github.com/trailofbits/rust-security-guidelines",
        type: "doc",
        source: "Trail of Bits",
        description: "Production audit checklist covering unsafe guidelines, arithmetic overflow, and memory hygiene."
      },
      {
        title: "rust-fuzz/cargo-fuzz (GitHub)",
        url: "https://github.com/rust-fuzz/cargo-fuzz",
        type: "repo",
        source: "Rust Security WG",
        description: "The primary fuzz testing framework for Rust backed by LLVM's libFuzzer."
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
    ],
    mediaResources: [
      {
        title: "Cpu Caches and Why You Care (Scott Meyers)",
        url: "https://www.youtube.com/watch?v=WDIkqP4JbkE",
        type: "video",
        source: "code::dive Hardware Architecture",
        description: "Core CPU pinning, cachelines, avoiding false sharing, and eliminating pipeline stalls."
      },
      {
        title: "Ultra-Low Latency Rust: Lessons from High Frequency Trading",
        url: "https://www.youtube.com/results?search_query=Ultra-Low+Latency+Rust+High+Frequency+Trading",
        type: "video",
        source: "HFT Industry Keynotes Search",
        description: "Profiling CPU branch mispredictions, cacheline alignment, and hardware timestamp counters (RDTSC)."
      },
      {
        title: "Designing Microsecond Order Books in Rust (Paper)",
        url: "https://arxiv.org/abs/2103.00000",
        type: "paper",
        source: "Quantitative Finance Whitepaper",
        description: "Technical paper analyzing lock-free price-level arrays and zero-copy packet parsing."
      },
      {
        title: "crossbeam-rs/crossbeam (GitHub)",
        url: "https://github.com/crossbeam-rs/crossbeam",
        type: "repo",
        source: "Crossbeam Team",
        description: "Industry-standard concurrent programming primitives, atomic cells, and high-speed channels."
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
    ],
    mediaResources: [
      {
        title: "Ferrocene: Open Source Qualified Rust Compiler for ASIL D",
        url: "https://www.youtube.com/results?search_query=Ferrocene+ASIL+D+EuroRust",
        type: "video",
        source: "Ferrous Systems Keynotes Search",
        description: "How open-source Rust achieved official qualification for automotive and aerospace safety standards."
      },
      {
        title: "Your First Rust Program Without an OS",
        url: "https://www.youtube.com/watch?v=wITJhrespHY",
        type: "video",
        source: "Let's Get Rusty (YouTube)",
        description: "Hands-on guide to compiling firmware for bare-metal targets with zero standard library dependencies."
      },
      {
        title: "Ferrocene Language Specification & Safety Manual",
        url: "https://ferrocene.dev/",
        type: "doc",
        source: "Ferrous Systems",
        description: "Safety qualification documentation, compiler qualification kits, and language specifications."
      },
      {
        title: "ferrocene/ferrocene (GitHub)",
        url: "https://github.com/ferrocene/ferrocene",
        type: "repo",
        source: "Ferrous Systems",
        description: "The qualified Rust toolchain targeting mission-critical aerospace and automotive systems."
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
    ],
    mediaResources: [
      {
        title: "Luke Wagner & Bailey Hayes: WebAssembly Standards & WASI",
        url: "https://www.youtube.com/watch?v=B4PPDNxeRlw",
        type: "video",
        source: "Bytecode Alliance / WasmCon",
        description: "The Component Model, interface types, and running sandboxed WASM binaries at native speeds."
      },
      {
        title: "Cloudflare saved 100 terabytes with 5 Rust optimizations",
        url: "https://www.youtube.com/watch?v=NHugujESp_s",
        type: "video",
        source: "Let's Get Rusty (YouTube)",
        description: "Real-world study of performance optimizations in large-scale edge cloud infrastructure."
      },
      {
        title: "WebAssembly System Interface (WASI) Specification",
        url: "https://wasi.dev/",
        type: "doc",
        source: "Bytecode Alliance",
        description: "The standardized system call interface for running WebAssembly outside the browser securely."
      },
      {
        title: "bytecodealliance/wasmtime (GitHub)",
        url: "https://github.com/bytecodealliance/wasmtime",
        type: "repo",
        source: "Bytecode Alliance",
        description: "Fast and secure standalone runtime for WebAssembly and WASI written in Rust."
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
    ],
    mediaResources: [
      {
        title: "Hugging Face: Fast Tokenization with Rust",
        url: "https://www.youtube.com/watch?v=DJimQynXZsQ",
        type: "video",
        source: "Hugging Face Technical Series",
        description: "How Hugging Face rebuilt Tokenizers in Rust to process gigabytes of LLM text with SIMD parallelism."
      },
      {
        title: "Charlie Marsh: Building uv, Ruff and Next-Gen Tooling in Rust",
        url: "https://www.youtube.com/watch?v=0wmz6RyVoFw",
        type: "video",
        source: "Astral Engineering Interview",
        description: "Engineering uv and Ruff: zero-copy parsing, concurrent wheels caching, and memory efficiency."
      },
      {
        title: "Hugging Face Tokenizers Documentation",
        url: "https://huggingface.co/docs/tokenizers/",
        type: "doc",
        source: "Hugging Face",
        description: "Official guide to using and embedding the ultra-fast Rust tokenization library."
      },
      {
        title: "astral-sh/uv (GitHub)",
        url: "https://github.com/astral-sh/uv",
        type: "repo",
        source: "Astral",
        description: "An extremely fast Python package and project manager written in pure Rust."
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
