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
      { title: "Crust of Rust: Full Advanced Language Features Playlist", url: "https://www.youtube.com/playlist?list=PLqbS7AVVErFiWDOAVrPt7aYmnuuOLYvOa" },
      { title: "Crust of Rust: Lifetime Annotations", url: "https://www.youtube.com/watch?v=rAl-9HwD858" },
      { title: "Crust of Rust: Atomics & Memory Ordering", url: "https://www.youtube.com/watch?v=rMGWeSjctlY" },
      { title: "Crust of Rust: Dispatch & Fat Pointers", url: "https://www.youtube.com/watch?v=xcygqF5LVmM" }
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
      { title: "Rust Atomics and Locks (Canonical Book Site)", url: "https://marabos.nl/atomics/" },
      { title: "Cpu Caches and Why You Care (Scott Meyers Hardware Lecture)", url: "https://www.youtube.com/watch?v=WDIkqP4JbkE" }
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
      { title: "Miguel Ojeda (Rust for Linux): KEYNOTE | RustConf 2024", url: "https://www.youtube.com/watch?v=FRMJzNYut4g" },
      { title: "Kani: A Model Checker for Rust", url: "https://www.youtube.com/watch?v=heUOajK6d8g" }
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
      { title: "Mark Russinovich (Azure CTO): Why Azure is Moving to Rust from C++", url: "https://www.youtube.com/watch?v=SmUprpjCWjM" },
      { title: "Alice Ryhl: What It Takes to Keep Tokio Running", url: "https://www.youtube.com/watch?v=Lc3aw_NIOt0" },
      { title: "Alice Ryhl: Stabilizing Rust in the Linux Kernel", url: "https://www.youtube.com/watch?v=J2M3EGUgq0c" },
      { title: "Demystifying LLVM: Writing Your First Compiler - Lyle Dean", url: "https://www.youtube.com/watch?v=hdxkt5mEnYE" }
    ]
  },
  {
    name: "Logan Smith",
    handle: "@_noisecode",
    url: "https://www.youtube.com/@_noisecode",
    subscriberTag: "Systems Educator",
    focusArea: "Aliasing Rules, Monomorphization, Error Handling & Type Systems",
    whySubscribe: "Crystal-clear conceptual visualizer bridging high-level Rust syntax to low-level assembly execution.",
    highlightedPlaylistsOrVideos: [
      { title: "Moves Are Broken (Why Move Semantics Exist)", url: "https://www.youtube.com/watch?v=Klq-sNxuP2g" },
      { title: "Comprehending Proc Macros", url: "https://www.youtube.com/watch?v=SMCRQj9Hbx8" },
      { title: "Two Ways To Do Dynamic Dispatch", url: "https://www.youtube.com/watch?v=wU8hQvU8aKM" },
      { title: "A Simpler Way to See Results (Error Handling)", url: "https://www.youtube.com/watch?v=s5S2Ed5T-dc" }
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
      { title: "Rust Crash Course | Rustlang", url: "https://www.youtube.com/watch?v=zF34dRivLOw" },
      { title: "Making Rust Structs as Small as Humanly Possible", url: "https://www.youtube.com/watch?v=3G6heF_Hxk0" },
      { title: "The Unsafe Rust Survival Guide", url: "https://www.youtube.com/watch?v=91uStPBLibc" },
      { title: "Your First Rust Program Without an OS", url: "https://www.youtube.com/watch?v=wITJhrespHY" }
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
      { title: "Rust for the Impatient", url: "https://www.youtube.com/watch?v=br3GIIQeefY" },
      { title: "Rust: Don't Panic", url: "https://www.youtube.com/watch?v=usRlRCNIOG0" },
      { title: "Async Isn't Real & Cannot Hurt You", url: "https://www.youtube.com/watch?v=AiSl4vf40WU" },
      { title: "Rust is the New C", url: "https://www.youtube.com/watch?v=3e-nauaCkgo" }
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
