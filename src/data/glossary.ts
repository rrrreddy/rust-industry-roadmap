import { GlossaryItem } from './types';

export const GLOSSARY_ITEMS: GlossaryItem[] = [
  {
    term: "Ownership",
    eli5: "The fundamental rule in Rust that every piece of data has exactly one variable that 'owns' it. When that owner finishes its job and disappears, the data is instantly cleaned up.",
    technicalDefinition: "An affine type system invariant enforced statically by the rustc compiler to guarantee memory safety and RAII cleanup without a runtime garbage collector.",
    relatedIndustry: "Universal Rust"
  },
  {
    term: "Borrow Checker",
    eli5: "A strict referee built into the Rust compiler that checks your code before it runs to ensure nobody changes data while someone else is reading it.",
    technicalDefinition: "Static analysis pass inside the rustc compiler that validates lifetime bounds and enforces the aliasing XOR mutability invariant (&T vs &mut T).",
    relatedIndustry: "Universal Rust"
  },
  {
    term: "Zero-Copy",
    eli5: "Processing information directly where it arrived in memory, rather than making duplicate copies. Like inspecting a passport in the passenger's hand instead of photocopying it 10 times.",
    technicalDefinition: "Technique where data is processed directly via references/slices from network DMA or ring buffers without allocating new memory buffers on the heap.",
    relatedIndustry: "FinTech & Cyber Security"
  },
  {
    term: "PDA (Program Derived Address)",
    eli5: "A special digital locker on the Solana blockchain that only a specific smart contract program has the cryptographic key to open and modify.",
    technicalDefinition: "Deterministic public key generated off the ed25519 elliptic curve using seed strings and a program ID, allowing smart contracts to sign CPI calls without a private key.",
    relatedIndustry: "Web3 & Blockchain"
  },
  {
    term: "Anchor Framework",
    eli5: "The 'Ruby on Rails' or 'React' of Solana smart contracts. It writes all the boring security checks and serialization boilerplate for you so you don't make rookie mistakes.",
    technicalDefinition: "High-level Rust DSL framework for writing secure Solana programs, handling account serialization (Borsh), instruction dispatch, and security constraints via procedural macros.",
    relatedIndustry: "Web3 & Blockchain"
  },
  {
    term: "eBPF (Extended Berkeley Packet Filter)",
    eli5: "A sandboxed mini-computer running inside the Linux operating system kernel that lets you safely monitor and filter network packets or security threats without modifying kernel source code.",
    technicalDefinition: "In-kernel virtual machine in Linux that executes bytecode verified for safety, termination, and privilege bounds at high line rates.",
    relatedIndustry: "Cyber Security & Cloud"
  },
  {
    term: "#![no_std] (No Standard Library)",
    eli5: "Telling the Rust compiler: 'Do not assume there is an operating system like Windows or Linux here'. Used for rockets, microcontrollers, and operating system bootloaders.",
    technicalDefinition: "Compiler crate attribute that links only the core library (`core`) instead of the standard library (`std`), stripping OS syscall assumptions and heap allocators.",
    relatedIndustry: "Operating Systems & Aerospace"
  },
  {
    term: "MMIO (Memory-Mapped I/O)",
    eli5: "A trick where hardware devices (like a network card or graphics chip) pretend to be regular memory addresses. Writing to a certain memory address actually turns on a light or sends a radio packet.",
    technicalDefinition: "Hardware architecture interface where peripheral registers are mapped directly into the CPU's physical memory address space.",
    relatedIndustry: "Operating Systems & Robotics"
  },
  {
    term: "Microkernel",
    eli5: "An operating system design where only the absolute minimum code runs in privileged 'God Mode' (Ring 0). If a printer driver or wifi driver crashes, the whole computer doesn't crash.",
    technicalDefinition: "Minimalist kernel architecture that isolates device drivers, filesystems, and network stacks in user-space address spaces with IPC message passing.",
    relatedIndustry: "Operating Systems & Defense"
  },
  {
    term: "Limit Order Book (LOB)",
    eli5: "A high-speed ledger in financial exchanges matching buyers and sellers based on price and time priority in nanoseconds.",
    technicalDefinition: "Data structure storing pending limit buy/sell orders indexed by price levels with FIFO execution at sub-microsecond latency.",
    relatedIndustry: "High-Frequency Trading"
  },
  {
    term: "CAN Bus (Controller Area Network)",
    eli5: "The nervous system of modern cars. A shared wire connecting the steering wheel, brakes, engine, and airbags so they can talk to each other reliably.",
    technicalDefinition: "Robust differential serial bus standard designed for automotive and industrial microcontrollers with message priority arbitration.",
    relatedIndustry: "Robotics & Automotive"
  },
  {
    term: "WASM (WebAssembly)",
    eli5: "A superpower for web browsers that lets code written in Rust run inside Chrome, Firefox, or Safari almost as fast as a desktop video game.",
    technicalDefinition: "Low-level binary code format with a stack-based virtual machine designed as a portable compilation target for high-performance client/server applications.",
    relatedIndustry: "WebAssembly & Edge AI"
  },
  {
    term: "Zero-Knowledge Proof (ZKP)",
    eli5: "A mathematical superpower that lets you prove you know a secret (like your age or password) without ever revealing the secret itself.",
    technicalDefinition: "Cryptographic protocol enabling one party (prover) to prove to another party (verifier) that a statement is true without conveying any information beyond the statement's validity.",
    relatedIndustry: "Web3 & Cryptography"
  }
];
