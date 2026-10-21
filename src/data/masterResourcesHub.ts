export interface CuratedChannel {
  name: string;
  url: string;
  handle: string;
  subscriberTag: string;
  focusArea: string;
  whySubscribe: string;
  highlightedPlaylistsOrVideos: {
    title: string;
    url: string;
  }[];
}

export interface CanonicalBook {
  title: string;
  author: string;
  publisher: string;
  url: string;
  level: 'Beginner' | 'Intermediate' | 'Staff/Principal';
  annotation: string;
  keyTakeaway: string;
}

export interface FlagshipRepo {
  name: string;
  org: string;
  url: string;
  starsEstimate: string;
  industry: string;
  description: string;
}

export interface InteractivePlatform {
  title: string;
  url: string;
  category: string;
  description: string;
}

export const TOP_YOUTUBE_CHANNELS: CuratedChannel[] = [
  {
    name: "Jon Gjengset",
    handle: "@jonhoo",
    url: "https://www.youtube.com/@jonhoo",
    subscriberTag: "180K+ Subscribers • Principal Engineer",
    focusArea: "Advanced Systems Rust, Unsafe Code, Atomics & Microarchitecture",
    whySubscribe: "The gold standard for deep, uncompromising multi-hour live streams exploring language mechanics from the compiler to silicon.",
    highlightedPlaylistsOrVideos: [
      { title: "Crust of Rust: Advanced Language Features Playlist", url: "https://www.youtube.com/playlist?list=PLqbS7AVVErFiWDOAVrPt7aYmnuuOLYvOa" },
      { title: "Decrusting Real-World Crates (ripgrep, bindgen, bumpalo)", url: "https://www.youtube.com/playlist?list=PLqbS7AVVErFhvi68uE0eE_E3p9qE1yVw7" },
      { title: "Crust of Rust: Lifetime Annotations", url: "https://www.youtube.com/watch?v=rAl-9HwD858" },
      { title: "Crust of Rust: Atomics & Memory Ordering", url: "https://www.youtube.com/watch?v=rMGWeSjctlY" }
    ]
  },
  {
    name: "Mara Bos",
    handle: "@marabos",
    url: "https://www.youtube.com/@marabos",
    subscriberTag: "Rust Library Team Lead",
    focusArea: "Concurrency, Hardware Memory Models, Low-Level Mutexes & Atomics",
    whySubscribe: "Team lead of the standard library and author of 'Rust Atomics and Locks'. Demonstrates building concurrency primitives from scratch.",
    highlightedPlaylistsOrVideos: [
      { title: "Rust Atomics and Memory Ordering (RustConf)", url: "https://www.youtube.com/watch?v=r_M5z17_g-Y" },
      { title: "Building Our Own Mutex from Scratch (Rust Nation UK)", url: "https://www.youtube.com/watch?v=jQZ8sHwtkU8" },
      { title: "Hardware Memory Models: x86_64 vs ARM64", url: "https://www.youtube.com/watch?v=DfyC5bO_6pQ" }
    ]
  },
  {
    name: "RustConf Official",
    handle: "@RustVideos",
    url: "https://www.youtube.com/@RustVideos",
    subscriberTag: "Official Rust Project Archive",
    focusArea: "Compiler Architecture, RFC Evolution & State-of-the-Art Production Systems",
    whySubscribe: "Annual flagship keynotes delivered by the language founders, compiler engineers, and infrastructure architects.",
    highlightedPlaylistsOrVideos: [
      { title: "Carl Lerche: Tokio — An Asynchronous Rust Runtime", url: "https://www.youtube.com/watch?v=4Q3G_fP49Hk" },
      { title: "Ralf Jung: Stacked Borrows — Formalizing Unsafe Rust", url: "https://www.youtube.com/watch?v=0cT6r_K4Z1g" },
      { title: "Celina Val: Verifying Rust Code with Kani (AWS)", url: "https://www.youtube.com/watch?v=vVzB3Z2_nLk" }
    ]
  },
  {
    name: "Rust Nation UK & EuroRust",
    handle: "@RustNationUK",
    url: "https://www.youtube.com/@RustNationUK",
    subscriberTag: "Premier European Systems Conferences",
    focusArea: "High-Scale Distributed Systems, Kernel Development & HFT",
    whySubscribe: "The premier enterprise conference featuring talks from Cloudflare, Fastly, Jane Street, and AWS engineers.",
    highlightedPlaylistsOrVideos: [
      { title: "Alice Ryhl: Async Rust in Practice (Google / Tokio)", url: "https://www.youtube.com/watch?v=W7m1w52sYkQ" },
      { title: "Ultra-Low Latency Rust: Lessons from High Frequency Trading", url: "https://www.youtube.com/watch?v=s0q7i_L9Q8A" },
      { title: "Ferrocene: Open Source Qualified Rust Compiler for ASIL D", url: "https://www.youtube.com/watch?v=hB9_8a7d6e5" }
    ]
  },
  {
    name: "Logan Smith",
    handle: "@LoganSmithVideos",
    url: "https://www.youtube.com/@LoganSmithVideos",
    subscriberTag: "Systems Educator",
    focusArea: "Aliasing Rules, Monomorphization, Error Handling & Type Systems",
    whySubscribe: "Crystal-clear conceptual visualizer bridging high-level Rust syntax to low-level assembly execution.",
    highlightedPlaylistsOrVideos: [
      { title: "Aliasing XOR Mutability: Why Rust is Fast and Safe", url: "https://www.youtube.com/watch?v=DfyC5bO_6pQ" },
      { title: "Idiomatic Error Handling with thiserror & anyhow", url: "https://www.youtube.com/watch?v=s5S2EdZ8VnE" },
      { title: "Inspecting Assembly with cargo-show-asm", url: "https://www.youtube.com/watch?v=68_w_z8t8e4" }
    ]
  },
  {
    name: "Let's Get Rusty",
    handle: "@LetsGetRusty",
    url: "https://www.youtube.com/@LetsGetRusty",
    subscriberTag: "220K+ Subscribers",
    focusArea: "Beginner-to-Intermediate Mastery, Crate Guides & Toolchain",
    whySubscribe: "Concise, bite-sized weekly tutorials covering standard library features, ecosystem crates, and best practices.",
    highlightedPlaylistsOrVideos: [
      { title: "Rust Beginner to Advanced Course", url: "https://www.youtube.com/watch?v=zF34dRivLOw" },
      { title: "Calling C from Rust (FFI Tutorial)", url: "https://www.youtube.com/watch?v=8VzV8F4r_nQ" },
      { title: "Writing Custom Derive Macros in Rust", url: "https://www.youtube.com/watch?v=d_k8yV_n7f8" }
    ]
  },
  {
    name: "No Boilerplate",
    handle: "@NoBoilerplate",
    url: "https://www.youtube.com/@NoBoilerplate",
    subscriberTag: "190K+ Subscribers",
    focusArea: "Fast-Paced Rust Philosophy, Memory Safety & Tooling Culture",
    whySubscribe: "Energetic, highly focused 10-minute conceptual videos answering 'Why' Rust was engineered this way.",
    highlightedPlaylistsOrVideos: [
      { title: "Rust's Secret Weapon: The Stack & The Heap", url: "https://www.youtube.com/watch?v=3by0i5gH_jQ" },
      { title: "Fast, Safe, and Pretty Errors in Rust", url: "https://www.youtube.com/watch?v=9_3xV8w9XzQ" },
      { title: "Rust's Cargo is Incredible", url: "https://www.youtube.com/watch?v=5V_l1j8iN_A" }
    ]
  }
];

export const CANONICAL_BOOKS: CanonicalBook[] = [
  {
    title: "The Rust Programming Language (2nd Edition)",
    author: "Steve Klabnik and Carol Nichols",
    publisher: "No Starch Press / Official Rust Project",
    url: "https://doc.rust-lang.org/book/",
    level: "Beginner",
    annotation: "The canonical official textbook. Must-read from Chapter 1 to Chapter 10 for ownership, borrowing, structs, and traits.",
    keyTakeaway: "Establishes foundational mental models for single ownership and borrow checker rules."
  },
  {
    title: "Programming Rust: Fast, Safe Systems Development (2nd Edition)",
    author: "Jim Blandy, Jason Orendorff, and Leonora Tindall",
    publisher: "O'Reilly Media",
    url: "https://www.oreilly.com/library/view/programming-rust-2nd/9781492052586/",
    level: "Intermediate",
    annotation: "The definitive systems reference book. Covers pointers, memory layouts, operator overloading, and closures in extreme detail.",
    keyTakeaway: "Bridges the gap between application development and low-level computer architecture."
  },
  {
    title: "Rust for Rustaceans: Idiomatic Programming for Experienced Developers",
    author: "Jon Gjengset",
    publisher: "No Starch Press",
    url: "https://nostarch.com/rust-rustaceans",
    level: "Staff/Principal",
    annotation: "Written for engineers who already know Rust basics and want to design robust, ergonomic, and blazingly fast production crates.",
    keyTakeaway: "Mastery of advanced traits, variance, unsafe soundness contracts, and macro metaprogramming."
  },
  {
    title: "Rust Atomics and Locks: Low-Level Concurrency in Practice",
    author: "Mara Bos",
    publisher: "O'Reilly Media",
    url: "https://marabos.nl/atomics/",
    level: "Staff/Principal",
    annotation: "The holy grail of multi-threaded programming in Rust. Covers atomic operations, memory models, cache coherence, and OS futexes.",
    keyTakeaway: "Understand exactly how CPUs order memory writes and how to build lock-free data structures without undefined behavior."
  },
  {
    title: "Zero to Production in Rust: An Introduction through Backend Development",
    author: "Luca Palmieri",
    publisher: "Independently Published",
    url: "https://www.zero2prod.com/",
    level: "Intermediate",
    annotation: "Hands-on guide building a complete, production-grade cloud newsletter API using Actix-web, SQLx, Docker, tracing, and telemetry.",
    keyTakeaway: "Production engineering: database connection pooling, observability, rate limiting, and zero-downtime deployment."
  },
  {
    title: "The Rustonomicon: The Dark Arts of Unsafe Rust",
    author: "The Rust Project Developers",
    publisher: "Official Documentation",
    url: "https://doc.rust-lang.org/nomicon/",
    level: "Staff/Principal",
    annotation: "The official guide to uninitialized memory, pointer provenance, exception safety, and undefined behavior boundaries.",
    keyTakeaway: "Essential knowledge before writing a single line of `unsafe` in production code."
  }
];

export const FLAGSHIP_REPOSITORIES: FlagshipRepo[] = [
  {
    name: "linux",
    org: "Rust-for-Linux",
    url: "https://github.com/Rust-for-Linux/linux",
    starsEstimate: "6.5k+",
    industry: "Operating Systems",
    description: "Official repository supporting Rust as a first-class systems language inside the mainline Linux kernel."
  },
  {
    name: "pingora",
    org: "cloudflare",
    url: "https://github.com/cloudflare/pingora",
    starsEstimate: "22k+",
    industry: "Cloud Infrastructure",
    description: "A fast, safe, and modular HTTP/network proxy library powering Cloudflare's 1-trillion-requests/day global edge."
  },
  {
    name: "solana",
    org: "solana-labs",
    url: "https://github.com/solana-labs/solana",
    starsEstimate: "14k+",
    industry: "Web3 & Blockchain",
    description: "High-performance blockchain client implementing parallel smart contracts running on a bare-metal eBPF VM."
  },
  {
    name: "wasmtime",
    org: "bytecodealliance",
    url: "https://github.com/bytecodealliance/wasmtime",
    starsEstimate: "16k+",
    industry: "WebAssembly & Edge",
    description: "Standalone, fast, and secure WebAssembly and WASI runtime engine engineered by Mozilla, Fastly, and Intel."
  },
  {
    name: "kani",
    org: "model-checker",
    url: "https://github.com/model-checker/kani",
    starsEstimate: "3k+",
    industry: "Formal Verification",
    description: "AWS bit-precise bounded model checker for mathematically proving absence of panics and UB in Rust code."
  },
  {
    name: "tokio",
    org: "tokio-rs",
    url: "https://github.com/tokio-rs/tokio",
    starsEstimate: "28k+",
    industry: "Async Networking",
    description: "The premier event-driven, non-blocking I/O platform powering modern asynchronous networked services."
  },
  {
    name: "crossbeam",
    org: "crossbeam-rs",
    url: "https://github.com/crossbeam-rs/crossbeam",
    starsEstimate: "8k+",
    industry: "Low-Latency & Concurrency",
    description: "Tools for concurrent programming: lock-free queues, epoch-based memory reclamation, and atomic cells."
  },
  {
    name: "uv",
    org: "astral-sh",
    url: "https://github.com/astral-sh/uv",
    starsEstimate: "45k+",
    industry: "AI & Developer Tooling",
    description: "Extremely fast Python package manager and resolver written in pure Rust by Astral."
  }
];

export const INTERACTIVE_PLATFORMS: InteractivePlatform[] = [
  {
    title: "Rustlings Interactive Course",
    url: "https://github.com/rust-lang/rustlings",
    category: "Interactive CLI",
    description: "Small interactive exercises to read and fix compiler errors, ownership issues, and trait bounds."
  },
  {
    title: "Compiler Explorer (Godbolt)",
    url: "https://godbolt.org/",
    category: "Assembly & Codegen",
    description: "Write Rust functions and inspect the real-time compiled x86_64, ARM64, and LLVM-IR output."
  },
  {
    title: "Writing an OS in Rust (Philipp Oppermann)",
    url: "https://os.phil-opp.com/",
    category: "Bare-Metal Lab",
    description: "Step-by-step hands-on guide building a 64-bit operating system kernel from bootloader to multitasking."
  },
  {
    title: "The Rust Reference",
    url: "https://doc.rust-lang.org/reference/",
    category: "Language Specification",
    description: "The primary reference manual defining grammar, memory layout, visibility, and evaluation rules."
  },
  {
    title: "Tour of Rust",
    url: "https://tourofrust.com/",
    category: "Interactive Web",
    description: "Step-by-step interactive browser-based walkthrough introducing Rust idioms and syntax."
  }
];
