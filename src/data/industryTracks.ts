import { IndustryTrack } from './types';

export const INDUSTRY_TRACKS: IndustryTrack[] = [
  {
    id: "web3-crypto",
    title: "Web3, Blockchain & Cryptography",
    tagline: "High-throughput smart contracts, decentralized finance, and zero-knowledge cryptography.",
    icon: "Coins",
    color: "from-amber-500 via-orange-600 to-yellow-700",
    accentColor: "text-amber-400",
    eli5Introduction: "Imagine a giant digital notebook shared by millions of computers worldwide where nobody can erase or fake a page. Rust is the #1 chosen language for modern blockchains (like Solana and Polkadot) because when millions of dollars move in seconds, a single software bug could bankrupt a project. Rust's strict safety rules ensure money cannot be duplicated or stolen by software glitches.",
    whatYouWillBuild: [
      "Solana smart contracts with the Anchor framework",
      "DeFi automated market maker (AMM) token swap protocols",
      "Cryptographic signature verifiers and wallet generators",
      "Decentralized Oracle price feeds and mempool listening bots",
      "Zero-Knowledge (ZK) proof circuits for confidential transactions"
    ],
    averageSalaryOrDemand: "$140,000 – $260,000+ USD • Extreme global remote demand",
    prerequisites: ["Basic Rust syntax (Variables, Structs, Enums)", "Basic understanding of public/private key cryptography"],
    firstProjectGuide: {
      title: "Build Your First Solana Token Vault in 4 Steps",
      description: "Create a decentralized program that allows users to deposit and withdraw tokens securely using Program Derived Addresses (PDAs).",
      steps: [
        "Install the Solana CLI and Anchor framework (`avm install latest && avm use latest`).",
        "Run `anchor init my_vault` to scaffold a modern Rust smart contract project.",
        "Define an Account struct with `#[account]` macro holding `owner: Pubkey` and `balance: u64`.",
        "Implement deposit and withdraw functions with overflow checks using safe math, and test it locally with `anchor test`."
      ]
    },
    useCases: [
      {
        title: "High-Speed Layer 1 Blockchains (Solana)",
        eli5Summary: "A blockchain capable of processing 50,000 transactions per second for fractions of a cent, running entirely on Rust.",
        theOldWay: "Older blockchains like Ethereum process only ~15 transactions per second because of sequential single-threaded virtual machines (EVM) and high gas fees.",
        theRustWay: "Solana uses Rust compiled to eBPF bytecode and executes transactions in parallel across multi-core GPUs/CPUs using the Sealevel runtime.",
        realWorldProjects: ["Solana", "Polkadot / Substrate", "Near Protocol", "Sui Move & Aptos"],
        keyCrates: [
          { name: "anchor-lang", purpose: "The de-facto Solana smart contract framework", url: "https://crates.io/crates/anchor-lang" },
          { name: "solana-sdk", purpose: "Core Solana primitives, keypairs, and RPC clients", url: "https://crates.io/crates/solana-sdk" },
          { name: "ed25519-dalek", purpose: "Fast, constant-time cryptographic signatures", url: "https://crates.io/crates/ed25519-dalek" },
          { name: "arkworks-rs", purpose: "Zero-knowledge proof cryptography ecosystem", url: "https://github.com/arkworks-rs" }
        ]
      },
      {
        title: "Ethereum Next-Gen Rust Clients (Reth)",
        eli5Summary: "Rewriting Ethereum node infrastructure in Rust so it syncs in hours instead of days and runs with half the memory.",
        theOldWay: "Legacy node clients written in Go or Java suffered from heavy garbage collector pauses and high RAM consumption.",
        theRustWay: "Paradigm's Reth node achieves unprecedented sync speeds and memory efficiency using modular Rust traits.",
        realWorldProjects: ["Paradigm Reth", "Arbitrum Nitro (L2 Rollup)", "Helios Light Client"],
        keyCrates: [
          { name: "ethers-rs", purpose: "Interact with Ethereum RPCs and smart contracts", url: "https://crates.io/crates/ethers" },
          { name: "alloy", purpose: "State-of-the-art Ethereum libraries in Rust", url: "https://github.com/alloy-rs" }
        ]
      }
    ],
    roadmapSteps: [
      {
        id: "w3-1",
        level: "Beginner",
        title: "Stage 1: Cryptographic Foundations & Web3 Primitives",
        eli5: "Learn how digital signatures, public/private keys, and wallet addresses work under the hood without magic.",
        whyItMatters: "Every blockchain action is a signed cryptographic message. Before writing smart contracts, you must understand how wallets sign transactions and how hashes verify data.",
        estimatedHours: "15–20 hours",
        conceptsToMaster: [
          "Hashing algorithms (SHA-256, Keccak-256, BLAKE3)",
          "Asymmetric cryptography & Keypairs (Ed25519, Secp256k1)",
          "Base58 & Hex encoding for blockchain addresses",
          "Connecting to a public RPC node to read balances"
        ],
        codeExample: {
          title: "Generate a Crypto Keypair & Sign a Transaction",
          description: "Generates an Ed25519 cryptographic keypair and verifies a digital signature.",
          code: `use ed25519_dalek::{Signer, Verifier, SigningKey, Signature};
use rand::rngs::OsRng;

fn main() {
    // 1. Generate secure random private key
    let mut csprng = OsRng;
    let signing_key = SigningKey::generate(&mut csprng);
    let verifying_key = signing_key.verifying_key();

    // 2. Message representing a financial transfer
    let transaction_data = b"Transfer 50 SOL from Alice to Bob";

    // 3. Sign the transaction
    let signature: Signature = signing_key.sign(transaction_data);
    println!("Signature valid: {}", verifying_key.verify(transaction_data, &signature).is_ok());
}`
        },
        exercise: {
          task: "Create a CLI tool that generates a new Solana wallet keypair, prints the public address in Base58, and queries devnet for its balance.",
          hint: "Use `solana-sdk` crate with `RpcClient::new(\"https://api.devnet.solana.com\")`."
        }
      },
      {
        id: "w3-2",
        level: "Intermediate",
        title: "Stage 2: Solana Smart Contracts with Anchor",
        eli5: "Write automated programs that live on the blockchain and manage users' money safely.",
        whyItMatters: "Anchor is the standard framework used by 90% of Solana protocols. You'll master accounts, constraints, and Program Derived Addresses (PDAs).",
        estimatedHours: "30–40 hours",
        conceptsToMaster: [
          "The Solana Account Model (Data + Lamports + Owner)",
          "Anchor Macros (#[program], #[account], #[derive(Accounts)])",
          "Program Derived Addresses (PDAs) for trustless escrow",
          "Preventing Integer Overflow/Underflow vulnerabilities",
          "Cross-Program Invocations (CPI) to transfer tokens"
        ],
        codeExample: {
          title: "A Basic Anchor Counter Smart Contract",
          description: "A complete decentralized counter program on Solana.",
          code: `use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod decentralized_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter_account;
        counter.count = 0;
        counter.authority = ctx.accounts.user.key();
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter_account;
        counter.count = counter.count.checked_add(1).unwrap();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8 + 32)]
    pub counter_account: Account<'info, CounterData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, has_one = authority)]
    pub counter_account: Account<'info, CounterData>,
    pub authority: Signer<'info>,
}

#[account]
pub struct CounterData {
    pub count: u64,
    pub authority: Pubkey,
}`
        },
        exercise: {
          task: "Build an Escrow smart contract where Alice deposits tokens, specifies a price, and Bob can swap tokens atomically without counterparty risk.",
          hint: "Store Alice's deposited tokens inside a PDA account and use `anchor_spl::token::transfer`."
        }
      },
      {
        id: "w3-3",
        level: "Advanced",
        title: "Stage 3: DeFi Math, MEV Bots & Mempool Infrastructure",
        eli5: "Build high-speed automated trading algorithms and decentralized exchange math.",
        whyItMatters: "DeFi protocols move billions in volume. You must master fixed-point arithmetic, slippage protection, and sub-second transaction routing.",
        estimatedHours: "40–50 hours",
        conceptsToMaster: [
          "Constant Product Automated Market Maker Math (x * y = k)",
          "Fixed-point decimal arithmetic without rounding loss",
          "WebSocket streaming of on-chain account updates",
          "MEV (Maximal Extractable Value) searcher architecture",
          "Jito bundle submission and flash loan mechanics"
        ],
        codeExample: {
          title: "Constant-Product Swap Math in Pure Rust",
          description: "Calculates exact token output amount with fees for a decentralized exchange.",
          code: `pub fn calculate_swap_output(
    input_amount: u128,
    reserve_in: u128,
    reserve_out: u128,
    fee_basis_points: u128, // e.g. 30 = 0.3%
) -> Option<u128> {
    // 1. Deduct exchange fee
    let input_with_fee = input_amount.checked_mul(10_000 - fee_basis_points)?;
    
    // 2. Constant product formula: dx * y / (x + dx)
    let numerator = input_with_fee.checked_mul(reserve_out)?;
    let denominator = reserve_in.checked_mul(10_000)?.checked_add(input_with_fee)?;
    
    Some(numerator / denominator)
}`
        },
        exercise: {
          task: "Write a high-performance bot that listens to DEX liquidity pools over WebSockets, calculates price discrepancies across two pools, and logs profitable arbitrage paths.",
          hint: "Use `tokio::select!` and `futures_util::StreamExt` to stream transactions with minimal latency."
        }
      },
      {
        id: "w3-4",
        level: "Master",
        title: "Stage 4: Zero-Knowledge Proofs & Custom L2 Rollups",
        eli5: "Create private transactions where you prove you have enough money without showing your balance.",
        whyItMatters: "Zero-Knowledge cryptography is the cutting-edge frontier of Web3 scaling and privacy. Arkworks and Halo2 are written in Rust.",
        estimatedHours: "60+ hours",
        conceptsToMaster: [
          "ZK-SNARK arithmetic circuits with Arkworks / Circom",
          "Finite fields, elliptic curve pairings (BLS12-381)",
          "Building custom optimistic and ZK rollup sequencers",
          "State transition verification and fraud proof generation"
        ],
        codeExample: {
          title: "Generating a Groth16 ZK-Proof with Arkworks",
          description: "High-level concept of compiling and verifying mathematical zero-knowledge constraints.",
          code: `// With arkworks, computations are expressed as R1CS constraints
// Prover generates proof pi without revealing witness values:
// verify(vk, public_inputs, proof) -> bool`
        },
        exercise: {
          task: "Implement a privacy-preserving token mixer where a user deposits tokens into an accumulator and withdraws using a zero-knowledge Merkle tree proof.",
          hint: "Explore `ark-groth16` and `ark-r1cs-std` to express hash verification inside a circuit."
        }
      }
    ]
  },
  {
    id: "operating-systems",
    title: "Operating Systems & Kernels",
    tagline: "Bare-metal bootloaders, memory paging, interrupt handlers, and Linux kernel modules.",
    icon: "Cpu",
    color: "from-blue-600 via-indigo-700 to-slate-900",
    accentColor: "text-blue-400",
    eli5Introduction: "Think of an Operating System as the chief hotel manager and traffic police of your computer. It decides which application gets CPU attention, assigns memory rooms, and talks directly to keyboards, screens, and hard drives. Traditionally written in C, operating systems suffered from memory bugs that caused crashes and security exploits. Rust allows us to build operating systems that physically cannot corrupt memory.",
    whatYouWillBuild: [
      "A bootable x86_64 or ARM bare-metal operating system kernel",
      "VGA / Framebuffer graphics drivers and text consoles",
      "Virtual memory paging tables and physical page frame allocators",
      "Preemptive multi-tasking thread schedulers",
      "Production Linux kernel drivers via Rust-for-Linux"
    ],
    averageSalaryOrDemand: "$150,000 – $240,000 USD • Essential role at Apple, Google, Microsoft & Red Hat",
    prerequisites: ["Understanding of binary/hexadecimal numbers", "Basic computer architecture (RAM, CPU registers)"],
    firstProjectGuide: {
      title: "Boot Your First Rust Kernel in QEMU in 4 Steps",
      description: "Build a minimal `#![no_std]` binary that boots directly on virtual PC hardware without any OS.",
      steps: [
        "Install the bootimage tool: `cargo install bootimage` and add `rust-src` component.",
        "Configure `.cargo/config.toml` for target `x86_64-unknown-none`.",
        "Add `#![no_std]` and `#![no_main]` to `src/main.rs` with a custom `#[panic_handler]`.",
        "Write raw ASCII bytes directly to the VGA video memory address `0xb8000` to display colored text."
      ]
    },
    useCases: [
      {
        title: "Rust in the Linux Kernel (Rust-for-Linux)",
        eli5Summary: "Writing drivers for the world's most popular operating system in safe Rust instead of crash-prone C.",
        theOldWay: "Over 70% of high-severity CVE vulnerabilities in the Linux kernel over the past 20 years were memory management bugs in C drivers.",
        theRustWay: "The Linux kernel officially adopted Rust as its first official second language alongside C, guaranteeing driver memory safety.",
        realWorldProjects: ["Rust for Linux (mainline Linux)", "Redox OS (pure Rust microkernel)", "Theseus OS"],
        keyCrates: [
          { name: "x86_64", purpose: "x86_64 CPU instructions, page tables, and registers", url: "https://crates.io/crates/x86_64" },
          { name: "bootloader", purpose: "Creates bootable disk images for UEFI/BIOS", url: "https://crates.io/crates/bootloader" },
          { name: "volatile", purpose: "Safe read/write wrappers for Memory-Mapped I/O", url: "https://crates.io/crates/volatile" },
          { name: "spinning_top", purpose: "Interrupt-safe spinlocks for multi-core synchronization", url: "https://crates.io/crates/spinning_top" }
        ]
      }
    ],
    roadmapSteps: [
      {
        id: "os-1",
        level: "Beginner",
        title: "Stage 1: Bare Metal Compilation (#![no_std]) & VGA Display",
        eli5: "Learn how to turn off the operating system training wheels and write code that runs directly on computer silicon.",
        whyItMatters: "To write an operating system, you cannot use files or network sockets because you haven't built them yet! `#![no_std]` strips out OS assumptions.",
        estimatedHours: "20–25 hours",
        conceptsToMaster: [
          "Disabling standard library with `#![no_std]` and `#![no_main]`",
          "Writing a custom panic handler with infinite halt loop",
          "VGA text buffer memory layout at physical address `0xb8000`",
          "Emulating hardware boot using QEMU virtual machine"
        ],
        codeExample: {
          title: "Minimal Bare-Metal VGA Writer",
          description: "Writes colored characters directly to video memory without an OS.",
          code: `#![no_std]
#![no_main]

use core::panic::PanicInfo;

// Physical memory address of VGA text buffer
const VGA_BUFFER: *mut u8 = 0xb8000 as *mut u8;

#[no_mangle]
pub extern "C" fn _start() -> ! {
    let message = b"Rust Kernel Booted Successfully!";
    
    for (i, &byte) in message.iter().enumerate() {
        unsafe {
            // Write character byte
            VGA_BUFFER.add(i * 2).write_volatile(byte);
            // Write color attribute (0x0F = white on black)
            VGA_BUFFER.add(i * 2 + 1).write_volatile(0x0F);
        }
    }

    loop {} // Keep CPU alive
}

#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}`
        },
        exercise: {
          task: "Create a safe VGA Writer struct that implements Rust's `core::fmt::Write` trait so you can use the `write!` macro with color formatting.",
          hint: "Wrap the buffer pointer in a safe struct and implement `write_str(&mut self, s: &str)`."
        }
      },
      {
        id: "os-2",
        level: "Intermediate",
        title: "Stage 2: Interrupts, Exceptions & Hardware Timers",
        eli5: "Teach the computer how to react when a user presses a keyboard key or when a clock ticks.",
        whyItMatters: "Without interrupts, a CPU cannot multitask. You'll program the Interrupt Descriptor Table (IDT) and Programmable Interrupt Controller (PIC).",
        estimatedHours: "30–35 hours",
        conceptsToMaster: [
          "CPU Exception handling (Divide by zero, Page faults, Double faults)",
          "Setting up the Interrupt Descriptor Table (IDT)",
          "8259 PIC initialization and remapping IRQs",
          "Handling keyboard scan codes and system timer ticks"
        ],
        codeExample: {
          title: "Interrupt Descriptor Table (IDT) with x86_64",
          description: "Catches hardware timer and keyboard interrupts safely.",
          code: `use x86_64::structures::idt::{InterruptDescriptorTable, InterruptStackFrame};

static mut IDT: InterruptDescriptorTable = InterruptDescriptorTable::new();

pub fn init_idt() {
    unsafe {
        IDT.breakpoint.set_handler_fn(breakpoint_handler);
        IDT.double_fault.set_handler_fn(double_fault_handler);
        IDT.load();
    }
}

extern "x86-interrupt" fn breakpoint_handler(stack_frame: InterruptStackFrame) {
    // Safely log CPU state when breakpoint is triggered
}`
        },
        exercise: {
          task: "Handle PS/2 keyboard interrupts so that keystrokes are decoded from raw scan codes into ASCII characters and printed to the screen.",
          hint: "Read port `0x60` inside the keyboard interrupt handler using `x86_64::instructions::port::Port`."
        }
      },
      {
        id: "os-3",
        level: "Advanced",
        title: "Stage 3: Virtual Memory Paging & Heap Allocators",
        eli5: "Give each program its own private memory illusion so one buggy app cannot spy on another.",
        whyItMatters: "This unlocks dynamic memory allocation (`Vec`, `String`, `Box`) inside your kernel by building a custom buddy or slab allocator.",
        estimatedHours: "40–50 hours",
        conceptsToMaster: [
          "4-level x86_64 paging and page tables (PML4, PDPT, PD, PT)",
          "Translating virtual addresses to physical frames",
          "Implementing `core::alloc::GlobalAlloc` for a custom heap",
          "Writing a Bump, Linked-List, or Buddy Allocator"
        ],
        codeExample: {
          title: "Custom Kernel Global Allocator Interface",
          description: "Enables `alloc::vec::Vec` in `#![no_std]` environments.",
          code: `use core::alloc::{GlobalAlloc, Layout};

pub struct KernelBumpAllocator {
    heap_start: usize,
    heap_end: usize,
    next: core::sync::atomic::AtomicUsize,
}

unsafe impl GlobalAlloc for KernelBumpAllocator {
    unsafe fn alloc(&self, layout: Layout) -> *mut u8 {
        // Reserve memory slice safely
        core::ptr::null_mut()
    }
    unsafe fn dealloc(&self, _ptr: *mut u8, _layout: Layout) {
        // Bump allocators do not reclaim individual allocations
    }
}`
        },
        exercise: {
          task: "Build a physical page frame allocator that reads memory maps passed by the bootloader and distributes 4096-byte pages.",
          hint: "Use a bitmap or linked-list tracker to mark which physical pages are free vs occupied."
        }
      },
      {
        id: "os-4",
        level: "Master",
        title: "Stage 4: Preemptive Multi-Tasking & Syscalls",
        eli5: "Build the scheduler that lets 100 apps run smoothly at the same time on a multi-core CPU.",
        whyItMatters: "You'll implement context switching in assembly, saving register states, and switching page tables between user-space and kernel-space.",
        estimatedHours: "60+ hours",
        conceptsToMaster: [
          "Assembly context switching (saving RSP, RIP, general registers)",
          "Round-robin and priority task scheduling",
          "Ring 3 (User Space) vs Ring 0 (Kernel Space) privilege transitions",
          "Implementing POSIX syscalls (`sys_write`, `sys_fork`, `sys_exit`)"
        ],
        codeExample: {
          title: "Context Switching Routine (Conceptual)",
          description: "Swaps active CPU registers to transition execution between threads.",
          code: `// core::arch::asm!
// Push old task registers to stack, update stack pointer,
// pop new task registers from stack, and execute ret.`
        },
        exercise: {
          task: "Implement a cooperative async task executor in your kernel that runs futures driven by timer interrupts.",
          hint: "Implement `core::task::Waker` that wakes the sleeping kernel task."
        }
      }
    ]
  },
  {
    id: "cyber-security",
    title: "Cyber Security & Exploit Engineering",
    tagline: "High-speed packet inspection, eBPF threat detection, memory-safe reverse engineering, and fuzzing.",
    icon: "ShieldAlert",
    color: "from-red-600 via-rose-700 to-slate-900",
    accentColor: "text-red-400",
    eli5Introduction: "Security software monitors networks and endpoints for hackers. Ironically, traditional antivirus software written in C had memory vulnerabilities that hackers could exploit to take over entire computers! With Rust, cybersecurity engineers build defensive agents, packet sniffers, and automated vulnerability scanners (fuzzers) that are mathematically immune to memory corruption attacks.",
    whatYouWillBuild: [
      "eBPF Linux security telemetry monitors with the Aya framework",
      "Line-rate zero-copy network packet sniffers & DPI firewalls",
      "Automated fuzzing engines to uncover zero-day flaws with LibAFL",
      "Malware analysis sandboxes and YARA-style binary scanners",
      "Constant-time cryptographic protocols resistant to timing attacks"
    ],
    averageSalaryOrDemand: "$145,000 – $230,000 USD • Surging demand across defense contractors & tech firms",
    prerequisites: ["Basic networking (IP, TCP/UDP headers)", "Basic Linux command line knowledge"],
    firstProjectGuide: {
      title: "Build a Zero-Copy TCP Packet Sniffer in 4 Steps",
      description: "Capture raw network packets from your wifi/ethernet card and parse headers in nanoseconds without allocating memory.",
      steps: [
        "Create a new binary project: `cargo new packet_sniffer`.",
        "Add dependencies `pnet` (for raw socket access) and `nom` (for parser combinators).",
        "Open a raw network interface in promiscuous mode with `pnet::datalink`.",
        "Parse Ethernet, IPv4, and TCP headers using zero-copy byte slices and print source/destination IPs in real time."
      ]
    },
    useCases: [
      {
        title: "Kernel-Level Threat Detection with eBPF (Aya)",
        eli5Summary: "Spy on what hackers are doing inside a Linux server without slowing down the server or crashing the kernel.",
        theOldWay: "Traditional security tools loaded custom Linux kernel modules (.ko), which frequently crashed servers with kernel panics.",
        theRustWay: "Pure Rust eBPF programs run in a safe sandbox inside the kernel, monitored by an async Rust user-space daemon.",
        realWorldProjects: ["Aya eBPF", "Suricata IDS (partially rewritten in Rust)", "1Password agent"],
        keyCrates: [
          { name: "aya", purpose: "Pure Rust eBPF library with zero C/LLVM dependencies", url: "https://aya-rs.dev" },
          { name: "nom", purpose: "Blazing fast zero-copy byte parser combinators", url: "https://crates.io/crates/nom" },
          { name: "libafl", purpose: "Modular, state-of-the-art coverage-guided fuzzer", url: "https://github.com/AFLplusplus/LibAFL" },
          { name: "ring", purpose: "Constant-time, safe cryptographic primitives", url: "https://crates.io/crates/ring" }
        ]
      }
    ],
    roadmapSteps: [
      {
        id: "cs-1",
        level: "Beginner",
        title: "Stage 1: Raw Packet Parsing & Network Protocol Forensics",
        eli5: "Learn how to read raw binary network data flying across cables without crashing on malformed packets.",
        whyItMatters: "Hackers intentionally send malformed packets to crash parsers. Rust's bounds-checked slices and zero-copy parsers make parser exploits impossible.",
        estimatedHours: "15–20 hours",
        conceptsToMaster: [
          "Promiscuous mode raw network socket sniffing",
          "Parsing binary headers using `nom` parser combinators",
          "Endianness conversion (Network Byte Order to Host Byte Order)",
          "Extracting DNS queries and HTTP/TLS SNI hostnames"
        ],
        codeExample: {
          title: "Zero-Copy IPv4 Header Parsing with Nom",
          description: "Parses binary network packets safely with zero heap allocations.",
          code: `use nom::{IResult, number::complete::{be_u8, be_u16, be_u32}};

#[derive(Debug)]
pub struct Ipv4Header {
    pub ttl: u8,
    pub protocol: u8,
    pub src_ip: u32,
    pub dst_ip: u32,
}

pub fn parse_ipv4(input: &[u8]) -> IResult<&[u8], Ipv4Header> {
    let (input, _version_ihl) = be_u8(input)?;
    let (input, _dscp_ecn) = be_u8(input)?;
    let (input, _total_length) = be_u16(input)?;
    let (input, _identification) = be_u16(input)?;
    let (input, _flags_fragment) = be_u16(input)?;
    let (input, ttl) = be_u8(input)?;
    let (input, protocol) = be_u8(input)?;
    let (input, _checksum) = be_u16(input)?;
    let (input, src_ip) = be_u32(input)?;
    let (input, dst_ip) = be_u32(input)?;

    Ok((input, Ipv4Header { ttl, protocol, src_ip, dst_ip }))
}`
        },
        exercise: {
          task: "Write a command-line tool that parses a `.pcap` capture file, extracts all DNS requests, and alerts if an anomalous domain appears.",
          hint: "Use `pcap-parser` or `nom` to parse the PCAP global header and individual packet records."
        }
      },
      {
        id: "cs-2",
        level: "Intermediate",
        title: "Stage 2: Linux Kernel Observability with eBPF (Aya)",
        eli5: "Write programs that hook into the Linux kernel to detect unauthorized processes and file accesses in real time.",
        whyItMatters: "eBPF is the modern foundation of endpoint security (EDR). Aya allows writing both kernel probes and user-space daemons 100% in Rust.",
        estimatedHours: "25–30 hours",
        conceptsToMaster: [
          "eBPF execution model and bytecode verification rules",
          "Hooking `kprobes`, `tracepoints`, and `socket_filter`",
          "eBPF Ring Buffers for streaming events to user-space",
          "Detecting suspicious `execve` (process spawning) events"
        ],
        codeExample: {
          title: "eBPF Tracepoint Hook (Conceptual with Aya)",
          description: "Intercepts process execution events directly inside the kernel.",
          code: `// Kernel eBPF program:
// #[tracepoint(name = "sys_enter_execve")]
// pub fn trace_execve(ctx: TracePointContext) -> u32 {
//     // Read process name and send to user-space ring buffer
//     0
// }`
        },
        exercise: {
          task: "Build an eBPF agent using Aya that monitors when any program attempts to open `/etc/shadow` and logs the offender's PID and executable path.",
          hint: "Attach a tracepoint to `sys_enter_openat` and read the pathname pointer using `bpf_probe_read_user_str`."
        }
      },
      {
        id: "cs-3",
        level: "Advanced",
        title: "Stage 3: Coverage-Guided Fuzzing with LibAFL",
        eli5: "Build automated testing robots that throw millions of mutated inputs at software to discover hidden bugs before hackers do.",
        whyItMatters: "Fuzzing is responsible for finding >80% of security zero-day bugs in production software. LibAFL is the state-of-the-art modular fuzzer written in Rust.",
        estimatedHours: "35–45 hours",
        conceptsToMaster: [
          "Coverage instrumentation (LLVM SanitizerCoverage)",
          "Mutators (bit flips, byte swaps, dictionary insertions)",
          "Crash deduplication and ASan (AddressSanitizer) integration",
          "In-process fuzzing vs fork-server architectures"
        ],
        codeExample: {
          title: "A Minimal LibAFL Fuzz Target",
          description: "Exposes a function to continuous randomized stress testing.",
          code: `// libafl test harness:
// Takes raw bytes from fuzzer mutator, passes to target function,
// and catches unexpected crashes or panics.`
        },
        exercise: {
          task: "Write a fuzzer using `cargo-fuzz` that tests a custom image or protocol parser and finds edge cases that cause panics.",
          hint: "Run `cargo install cargo-fuzz` and define a `fuzz_target!(|data: &[u8]| { ... });` harness."
        }
      },
      {
        id: "cs-4",
        level: "Master",
        title: "Stage 4: Constant-Time Cryptography & Malware Sandboxing",
        eli5: "Write cryptographic code that executes in the exact same fraction of a microsecond so hackers cannot guess passwords via timing.",
        whyItMatters: "Side-channel timing attacks can leak secret keys even without memory corruption. You'll master constant-time programming and secure execution.",
        estimatedHours: "50+ hours",
        conceptsToMaster: [
          "Constant-time arithmetic with the `subtle` crate",
          "Eliminating branch predictor and CPU cache side-channels",
          "Process memory dumping and YARA-style pattern matching",
          "Building microVM-isolated malware sandboxes"
        ],
        codeExample: {
          title: "Constant-Time Comparison with Subtle",
          description: "Prevents timing side-channel attacks when comparing secret tokens.",
          code: `use subtle::ConstantTimeEq;

pub fn verify_api_token(user_token: &[u8], secret_token: &[u8]) -> bool {
    // Standard == returns immediately on first mismatched byte (timing leak!)
    // ct_eq compares EVERY byte regardless of mismatch, taking constant time:
    user_token.ct_eq(secret_token).into()
}`
        },
        exercise: {
          task: "Implement a secure password hashing and verification module using Argon2 and constant-time token comparison.",
          hint: "Use `argon2` crate with constant-time equality checks on the final hash digest."
        }
      }
    ]
  },
  {
    id: "defense-aerospace",
    title: "Defense, Avionics & Critical Infrastructure",
    tagline: "DO-178C avionics certification, satellite guidance, mission-critical controllers, and formal verification.",
    icon: "Rocket",
    color: "from-yellow-600 via-amber-700 to-stone-900",
    accentColor: "text-yellow-400",
    eli5Introduction: "In an aircraft or space satellite, a software crash isn't just an annoying error message—it could mean a rocket veers off course or an airplane loses flight control. Traditionally, defense and aerospace code required millions of dollars in manual audits. Rust, especially with the safety-qualified Ferrocene compiler, allows aerospace engineers to mathematically prove their code cannot crash or leak memory before the rocket ever leaves the launchpad.",
    whatYouWillBuild: [
      "Satellite guidance, navigation, and control (GNC) loops",
      "DO-178C Level A compliant flight software",
      "Mathematically verified state machines with the Kani model checker",
      "Zero-allocation telemetry loggers for radiation-tolerant chips",
      "Drone autopilot PID stabilization controllers"
    ],
    averageSalaryOrDemand: "$150,000 – $250,000 USD • Strong security clearance opportunities",
    prerequisites: ["Strong focus on precision and detail", "Basic physics/math (vectors, coordinate systems)"],
    firstProjectGuide: {
      title: "Build a Panic-Free Flight Sequencer in 4 Steps",
      description: "Design a rocket staging controller using Rust's type-state pattern where invalid actions cannot even compile.",
      steps: [
        "Create a new `#![no_std]` project: `cargo new rocket_controller`.",
        "Add `heapless` crate for fixed-capacity memory structures that never allocate from heap.",
        "Define type-state structs: `struct Idle; struct Armed; struct InFlight;`.",
        "Implement transition methods that consume ownership: `fn launch(self: Rocket<Armed>) -> Rocket<InFlight>`."
      ]
    },
    useCases: [
      {
        title: "Certified Civil & Military Avionics (Ferrocene)",
        eli5Summary: "Using the world's first safety-qualified Rust compiler to replace legacy Ada and C in aircraft cockpits.",
        theOldWay: "Legacy C code required thousands of pages of manual checklist verification to satisfy DO-178C avionics standards.",
        theRustWay: "Ferrocene qualifies Rust for ISO 26262 (ASIL D) and IEC 61508 (SIL 4) safety-critical certifications.",
        realWorldProjects: ["Ferrous Systems Ferrocene", "European Space Agency (ESA) Satellite Pilot", "NASA Jet Propulsion Lab experiments"],
        keyCrates: [
          { name: "kani", purpose: "Automated mathematical model checker for Rust", url: "https://model-checking.github.io/kani/" },
          { name: "heapless", purpose: "Static data structures with zero heap allocation", url: "https://crates.io/crates/heapless" },
          { name: "embedded-hal", purpose: "Hardware abstraction layer for microcontrollers", url: "https://crates.io/crates/embedded-hal" },
          { name: "defmt", purpose: "Highly efficient logging for constrained space chips", url: "https://crates.io/crates/defmt" }
        ]
      }
    ],
    roadmapSteps: [
      {
        id: "da-1",
        level: "Beginner",
        title: "Stage 1: Zero Dynamic Allocation with Heapless",
        eli5: "Learn how to write programs that never use the heap, guaranteeing memory can never run out during flight.",
        whyItMatters: "On a spacecraft or missile computer with only 128KB of RAM, dynamic allocation (`malloc`) causes memory fragmentation and unpredictable delays.",
        estimatedHours: "15–20 hours",
        conceptsToMaster: [
          "Fixed-capacity data structures (`heapless::Vec`, `heapless::String`)",
          "Compile-time buffer bounds checking",
          "Handling fixed-capacity full conditions gracefully",
          "Deterministic execution time (WCET: Worst-Case Execution Time)"
        ],
        codeExample: {
          title: "Fixed-Capacity Telemetry Buffer",
          description: "Stores telemetry samples without touching the heap.",
          code: `use heapless::Vec;

#[derive(Debug, Clone, Copy)]
pub struct FlightTelemetry {
    pub altitude_m: f32,
    pub velocity_ms: f32,
    pub timestamp_ms: u32,
}

pub struct BlackBoxRecorder {
    // Fixed buffer of at most 64 samples stored inline on stack:
    records: Vec<FlightTelemetry, 64>,
}

impl BlackBoxRecorder {
    pub fn new() -> Self {
        Self { records: Vec::new() }
    }

    pub fn record(&mut self, sample: FlightTelemetry) -> Result<(), &'static str> {
        self.records.push(sample).map_err(|_| "Blackbox buffer full!")
    }
}`
        },
        exercise: {
          task: "Create a fixed-capacity ring buffer using `heapless` that stores the latest 10 GPS coordinates and overwrites the oldest sample when full.",
          hint: "Track an insertion index with modulo arithmetic (`index = (index + 1) % CAPACITY`)."
        }
      },
      {
        id: "da-2",
        level: "Intermediate",
        title: "Stage 2: Type-State Pattern for Mission Sequences",
        eli5: "Use the Rust compiler to physically prevent operators from activating thrusters before the rocket is armed.",
        whyItMatters: "Human and software errors happen in high-stress launches. By encoding operational stages in the type system, illegal operations fail to compile.",
        estimatedHours: "20–25 hours",
        conceptsToMaster: [
          "Zero-Sized Types (ZSTs) as state markers",
          "Consuming ownership (`self`) to enforce one-way state transitions",
          "Eliminating runtime boolean flags (`if is_armed && !is_jettisoned`)",
          "Static proof tokens for hardware operations"
        ],
        codeExample: {
          title: "Compile-Time Enforced Rocket Staging",
          description: "Illegal state transitions trigger compile errors, not flight disasters.",
          code: `// State markers
pub struct OnPad;
pub struct BoostPhase;
pub struct Orbit;

pub struct SatelliteLauncher<State> {
    fuel_kg: u32,
    _state: core::marker::PhantomData<State>,
}

impl SatelliteLauncher<OnPad> {
    pub fn new() -> Self {
        Self { fuel_kg: 50_000, _state: core::marker::PhantomData }
    }

    // Consumes OnPad launcher and returns BoostPhase launcher
    pub fn ignite_first_stage(self) -> SatelliteLauncher<BoostPhase> {
        println!("Stage 1 Ignition!");
        SatelliteLauncher { fuel_kg: self.fuel_kg - 20_000, _state: core::marker::PhantomData }
    }
}

impl SatelliteLauncher<BoostPhase> {
    pub fn deploy_satellite(self) -> SatelliteLauncher<Orbit> {
        println!("Satellite deployed in orbit!");
        SatelliteLauncher { fuel_kg: self.fuel_kg, _state: core::marker::PhantomData }
    }
}

fn main() {
    let launcher = SatelliteLauncher::new();
    let booster = launcher.ignite_first_stage();
    let _in_orbit = booster.deploy_satellite();
    // launcher.deploy_satellite(); // COMPILE ERROR: method does not exist on OnPad state!
}`
        },
        exercise: {
          task: "Model a commercial drone camera gimbal with states `Stowed`, `Calibrating`, `Active`, and prove that `take_photo()` can only be called in `Active`.",
          hint: "Use `PhantomData` and implement `take_photo()` only for `Gimbal<Active>`."
        }
      },
      {
        id: "da-3",
        level: "Advanced",
        title: "Stage 3: Formal Verification with Kani",
        eli5: "Use mathematical proof software to prove your code contains zero bugs for every possible input.",
        whyItMatters: "Standard unit tests only check 5 or 10 test cases. Kani checks ALL 4 billion possible inputs to prove code cannot panic, divide by zero, or overflow.",
        estimatedHours: "30–40 hours",
        conceptsToMaster: [
          "Bounded model checking with the Kani verifier",
          "`kani::any()` symbolic input generation",
          "Proving loop termination and array boundary invariants",
          "Satisfying DO-178C Level A formal verification objectives"
        ],
        codeExample: {
          title: "Proving Panic-Freedom with Kani",
          description: "Mathematically verifies that altitude calculation never panics.",
          code: `// kani proof harness
#[cfg(kani)]
#[kani::proof]
fn verify_safe_altitude_division() {
    let raw_sensor_val: u16 = kani::any();
    // Prove that calculate_altitude never panics regardless of sensor noise:
    let _ = calculate_altitude(raw_sensor_val);
}

fn calculate_altitude(raw: u16) -> u32 {
    let safe_divisor = (raw as u32) + 1; // cannot be zero
    100_000 / safe_divisor
}`
        },
        exercise: {
          task: "Write a PID controller calculation function and verify with Kani that it never produces NaN or integer overflow for any valid sensor input.",
          hint: "Add `#[kani::proof]` and constrain inputs within physical sensor limits with `kani::assume`."
        }
      },
      {
        id: "da-4",
        level: "Master",
        title: "Stage 4: Spacecraft Bus Protocols & Radiation Hardening",
        eli5: "Connect satellite sensors over space-grade wires and protect software from cosmic radiation bit flips.",
        whyItMatters: "Space is filled with high-energy cosmic rays that randomly flip 0s to 1s in memory chips. Space flight software uses voting redundancy.",
        estimatedHours: "50+ hours",
        conceptsToMaster: [
          "Triple Modular Redundancy (TMR) algorithmic voting",
          "MIL-STD-1553, CAN, and SpaceWire bus protocols",
          "Deterministic cyclic executive schedulers",
          "Fail-safe emergency parachute/thruster abort systems"
        ],
        codeExample: {
          title: "Triple Modular Redundancy (TMR) Voting in Rust",
          description: "Recovers correct sensor values even if radiation flips a bit in memory.",
          code: `pub fn tmr_vote<T: PartialEq + Copy>(val_a: T, val_b: T, val_c: T) -> Result<T, &'static str> {
    if val_a == val_b || val_a == val_c {
        Ok(val_a)
    } else if val_b == val_c {
        Ok(val_b)
    } else {
        Err("Critical TMR disagreement: All 3 sensors divergent!")
    }
}`
        },
        exercise: {
          task: "Build an attitude control loop that samples 3 gyroscopes, applies TMR voting, and outputs pulse commands to reaction wheels at a deterministic 100Hz rate.",
          hint: "Use a hardware timer interrupt and `embedded-hal` timer traits."
        }
      }
    ]
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure & Distributed Systems",
    tagline: "MicroVM hypervisors, service meshes, cloud storage engines, and consensus algorithms.",
    icon: "Cloud",
    color: "from-cyan-600 via-blue-700 to-slate-900",
    accentColor: "text-cyan-400",
    eli5Introduction: "When you use apps like Netflix or AWS, thousands of servers work together behind the scenes. Traditionally, cloud services written in Java or Go would suddenly pause for 200 milliseconds to clean up memory (garbage collection), causing annoying video buffering or slow page loads. Rust uses tiny amounts of memory and never pauses, enabling companies like Amazon to boot micro-servers in 5 milliseconds instead of 5 seconds.",
    whatYouWillBuild: [
      "Lightweight microVM hypervisors with KVM (AWS Firecracker style)",
      "High-throughput gRPC microservices and reverse proxies",
      "Distributed consensus clusters using the Raft protocol",
      "LSM-Tree key-value storage engines (like RocksDB or TiKV)",
      "Kernel-bypass network drivers with Linux io_uring"
    ],
    averageSalaryOrDemand: "$150,000 – $240,000 USD • Major employers: AWS, Microsoft Azure, Cloudflare, Datadog",
    prerequisites: ["Understanding of client-server architecture", "Basic knowledge of HTTP and JSON"],
    firstProjectGuide: {
      title: "Build a Blazing-Fast HTTP/2 Reverse Proxy in 4 Steps",
      description: "Create an asynchronous reverse proxy that distributes traffic across backend servers with health checks.",
      steps: [
        "Create project: `cargo new mini_proxy` and add `tokio`, `hyper`, and `tower`.",
        "Set up an asynchronous TCP listener with Tokio on port 8080.",
        "Forward incoming requests to a round-robin pool of backend servers.",
        "Add Prometheus metrics tracking request counts and response latency."
      ]
    },
    useCases: [
      {
        title: "AWS Firecracker MicroVMs",
        eli5Summary: "The secret technology powering every AWS Lambda serverless function in the world.",
        theOldWay: "Traditional virtual machines took 10+ seconds to boot and consumed 100MB of RAM just sitting idle.",
        theRustWay: "Firecracker spins up a secure Linux microVM in <5 milliseconds with only 5MB memory overhead, written in Rust.",
        realWorldProjects: ["AWS Firecracker", "Linkerd2 (Service Mesh)", "TiKV (Distributed Database)", "Vector (Datadog Datastream)"],
        keyCrates: [
          { name: "tokio", purpose: "The foundational multi-threaded asynchronous runtime", url: "https://tokio.rs" },
          { name: "hyper", purpose: "Ultra-fast, correct HTTP/1.1 and HTTP/2 client/server", url: "https://hyper.rs" },
          { name: "tonic", purpose: "High-performance gRPC framework built on Prost", url: "https://crates.io/crates/tonic" },
          { name: "io-uring", purpose: "Zero-copy Linux kernel asynchronous I/O interface", url: "https://crates.io/crates/io-uring" }
        ]
      }
    ],
    roadmapSteps: [
      {
        id: "cl-1",
        level: "Beginner",
        title: "Stage 1: Multi-Threaded Tokio Async & Network Servers",
        eli5: "Learn how to build servers that handle thousands of simultaneous users without running out of threads.",
        whyItMatters: "Traditional thread-per-client servers crash after a few thousand connections. Tokio multiplexes 100,000+ connections onto a small pool of CPU cores.",
        estimatedHours: "20–25 hours",
        conceptsToMaster: [
          "Tokio multi-threaded scheduler architecture",
          "Spawning tasks with `tokio::spawn` and passing data across channels",
          "Building async TCP echo servers with `tokio::net::TcpListener`",
          "Graceful shutdown handling on SIGINT/SIGTERM"
        ],
        codeExample: {
          title: "Asynchronous TCP Echo Server in 30 Lines",
          description: "Handles concurrent TCP client connections concurrently.",
          code: `use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    println!("Listening on 127.0.0.1:8080...");

    loop {
        let (mut socket, addr) = listener.accept().await?;
        println!("New client connected: {}", addr);

        tokio::spawn(async move {
            let mut buf = [0u8; 1024];
            loop {
                let n = match socket.read(&mut buf).await {
                    Ok(0) => return, // Connection closed
                    Ok(n) => n,
                    Err(_) => return,
                };
                if socket.write_all(&buf[..n]).await.is_err() {
                    return;
                }
            }
        });
    }
}`
        },
        exercise: {
          task: "Build an asynchronous Chat Server where messages typed by any connected telnet client are broadcast to all other active clients.",
          hint: "Use `tokio::sync::broadcast` channel so each client task receives copies of global messages."
        }
      },
      {
        id: "cl-2",
        level: "Intermediate",
        title: "Stage 2: High-Performance gRPC Services with Tonic",
        eli5: "Connect microservices using fast binary protocol buffers instead of slow JSON text.",
        whyItMatters: "Large cloud architectures like Uber or Google communicate internally via gRPC. Tonic generates fast, type-safe RPC clients and servers in Rust.",
        estimatedHours: "25–30 hours",
        conceptsToMaster: [
          "Protocol Buffers (.proto) definitions and schema evolution",
          "Generating Rust structs with `prost` and `tonic-build`",
          "Bidirectional streaming RPCs for real-time telemetry",
          "Tower middleware for timeouts, retries, and rate limiting"
        ],
        codeExample: {
          title: "Tonic gRPC Service Implementation",
          description: "Type-safe distributed RPC endpoint handling incoming requests.",
          code: `// Defined in proto: rpc GetUser(UserRequest) returns (UserResponse)
// Tonic implements the trait automatically:
// async fn get_user(&self, request: Request<UserRequest>) -> Result<Response<UserResponse>, Status>`
        },
        exercise: {
          task: "Create a gRPC service for an image resizing cluster where clients stream raw image bytes and receive compressed webp bytes.",
          hint: "Use client and server streaming RPC methods in your `.proto` file."
        }
      },
      {
        id: "cl-3",
        level: "Advanced",
        title: "Stage 3: LSM-Tree Storage Engines & Write-Ahead Logs",
        eli5: "Build your own mini-database that stores data safely on disk even if the power cable is pulled.",
        whyItMatters: "Databases like Cassandra, RocksDB, and TiKV rely on LSM-trees (Log-Structured Merge Trees) for fast writes and sequential disk access.",
        estimatedHours: "35–45 hours",
        conceptsToMaster: [
          "Write-Ahead Logging (WAL) for durability and crash recovery",
          "In-memory MemTable using SkipLists or BTrees",
          "SSTables (Sorted String Tables) and Bloom filter lookups",
          "Background compaction threads to merge deleted/updated keys"
        ],
        codeExample: {
          title: "Append-Only Write Ahead Log (WAL)",
          description: "Ensures transactions survive unexpected server crashes.",
          code: `use std::fs::{OpenOptions, File};
use std::io::{Write, Result};

pub struct WriteAheadLog {
    file: File,
}

impl WriteAheadLog {
    pub fn open(path: &str) -> Result<Self> {
        let file = OpenOptions::new().create(true).append(true).open(path)?;
        Ok(Self { file })
    }

    pub fn append_record(&mut self, key: &[u8], val: &[u8]) -> Result<()> {
        self.file.write_all(&(key.len() as u32).to_le_bytes())?;
        self.file.write_all(key)?;
        self.file.write_all(&(val.len() as u32).to_le_bytes())?;
        self.file.write_all(val)?;
        self.file.sync_data()?; // Force flush to physical platter/SSD
        Ok(())
    }
}`
        },
        exercise: {
          task: "Build an in-memory key-value store with an append-only disk log that replays transactions on startup to restore state after a reboot.",
          hint: "Read binary length-prefixed records from the file in a loop until reaching EOF."
        }
      },
      {
        id: "cl-4",
        level: "Master",
        title: "Stage 4: Distributed Raft Consensus & Linux io_uring",
        eli5: "Make 5 servers agree on the exact same data even when network wires get cut or servers crash.",
        whyItMatters: "The Raft consensus algorithm is what keeps Kubernetes, etcd, and CockroachDB in sync. Combined with Linux io_uring, it delivers maximum IOPS.",
        estimatedHours: "55+ hours",
        conceptsToMaster: [
          "Raft leader election, heartbeat timers, and term numbers",
          "Log replication and handling network partitions (split-brain prevention)",
          "True asynchronous zero-copy disk I/O with Linux `io_uring`",
          "Building microVMs with KVM ioctls (`/dev/kvm`)"
        ],
        codeExample: {
          title: "Raft State Machine Enum",
          description: "States of a distributed consensus cluster node.",
          code: `pub enum RaftRole {
    Follower { current_leader: Option<u64> },
    Candidate { votes_received: usize },
    Leader { next_index: std::collections::HashMap<u64, usize> },
}`
        },
        exercise: {
          task: "Implement a 3-node Raft cluster in Rust that automatically elects a new leader when the current leader is disconnected.",
          hint: "Use Tokio randomized election timers (150ms–300ms) to prevent vote split ties."
        }
      }
    ]
  },
  {
    id: "fintech-hft",
    title: "High-Frequency Trading & Low-Latency FinTech",
    tagline: "Sub-microsecond order execution, kernel bypass networking, lock-free ring buffers, and matching engines.",
    icon: "TrendingUp",
    color: "from-emerald-600 via-teal-700 to-slate-900",
    accentColor: "text-emerald-400",
    eli5Introduction: "In the world of high-frequency trading, financial firms trade stocks in billionths of a second. If your program takes even 1 microsecond longer than a competitor's, you lose millions of dollars. Traditionally, this world was 100% C++. But C++ bugs caused catastrophic multi-million dollar trading losses. Rust delivers the exact same nanosecond speed as C++ while making memory errors impossible.",
    whatYouWillBuild: [
      "Sub-microsecond Price-Time Priority Limit Order Books (LOB)",
      "Zero-allocation FIX protocol and NASDAQ ITCH market feed parsers",
      "Lock-free Single-Producer Single-Consumer (SPSC) circular queues",
      "Kernel bypass packet capture using DPDK / Solarflare",
      "Nanosecond latency benchmark suites using hardware RDTSC timers"
    ],
    averageSalaryOrDemand: "$175,000 – $400,000+ USD (Base + Bonus) • Citadel, Jane Street, Jump Trading, DRW",
    prerequisites: ["Strong grasp of CPU hardware caches (L1/L2/L3)", "Basic knowledge of financial markets (bids, asks)"],
    firstProjectGuide: {
      title: "Build a Microsecond Limit Order Book in 4 Steps",
      description: "Build an order matching engine that matches buy and sell orders based on price-time priority without allocating heap memory on the hot path.",
      steps: [
        "Create project: `cargo new order_book` and configure release profile with LTO.",
        "Define fixed-size order structs with `#[repr(C)]` for predictable memory layout.",
        "Maintain bid and ask price levels using contiguous arrays or flat indexed slots.",
        "Implement matching logic that executes resting orders and emit trade events."
      ]
    },
    useCases: [
      {
        title: "Direct Market Access (DMA) & Exchange Matching",
        eli5Summary: "Matching millions of buyer and seller orders in nanoseconds with zero GC pauses.",
        theOldWay: "Java implementations suffered from Stop-The-World garbage collection pauses that caused devastating trading latency spikes.",
        theRustWay: "Rust provides predictable, flat p99.99 latency curves with zero background garbage collection.",
        realWorldProjects: ["Wintermute algorithmic trading", "Paradigm / Jump Trading infra", "Solana DEXs (Phoenix, OpenBook)"],
        keyCrates: [
          { name: "crossbeam", purpose: "Lock-free synchronization primitives and atomic queues", url: "https://crates.io/crates/crossbeam" },
          { name: "criterion", purpose: "Statistics-driven nanosecond microbenchmarking", url: "https://bheisler.github.io/criterion.rs/book/" },
          { name: "rust_decimal", purpose: "Fast fixed-point decimal financial calculations", url: "https://crates.io/crates/rust_decimal" },
          { name: "raw-cpuid", purpose: "Query CPU topology, cache lines, and feature flags", url: "https://crates.io/crates/raw-cpuid" }
        ]
      }
    ],
    roadmapSteps: [
      {
        id: "ft-1",
        level: "Beginner",
        title: "Stage 1: Financial Types & Binary Protocol Parsing",
        eli5: "Learn why floating-point numbers like `0.1 + 0.2` break in banking, and parse stock market feeds safely.",
        whyItMatters: "In finance, floating point math produces rounding errors (`0.1 + 0.2 = 0.30000000000000004`). You must use fixed-point decimal arithmetic.",
        estimatedHours: "15–20 hours",
        conceptsToMaster: [
          "Fixed-point decimal representation vs IEEE-754 floats",
          "Parsing NASDAQ ITCH 5.0 binary order messages",
          "Representing financial prices in micro-cents (`u64`)",
          "Zero-allocation string handling for ticker symbols (`[u8; 4]`)"
        ],
        codeExample: {
          title: "Fixed-Point Currency Representation",
          description: "Eliminates floating-point rounding errors in financial transactions.",
          code: `#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub struct UsdCents(u64);

impl UsdCents {
    pub fn from_dollars_and_cents(dollars: u64, cents: u8) -> Self {
        Self(dollars * 100 + (cents as u64))
    }

    pub fn format_display(&self) -> String {
        format!("${}.{:02}", self.0 / 100, self.0 % 100)
    }
}`
        },
        exercise: {
          task: "Parse a stream of mock NASDAQ ITCH 'Add Order' binary packets and print the ticker symbol, price, and share quantity.",
          hint: "Use `bytemuck` or slice indexing to parse `[u8; 8]` into stock ticker names."
        }
      },
      {
        id: "ft-2",
        level: "Intermediate",
        title: "Stage 2: Lock-Free Concurrency & Memory Ordering",
        eli5: "Pass millions of messages between CPU cores without using slow locks that force threads to sleep.",
        whyItMatters: "Acquiring a standard `Mutex` causes the operating system to put your thread to sleep if contended, burning thousands of nanoseconds. Lock-free queues use CPU atomics.",
        estimatedHours: "25–30 hours",
        conceptsToMaster: [
          "Atomic operations (`AtomicUsize`, `AtomicBool`)",
          "Memory orderings (`Ordering::Relaxed`, `Acquire`, `Release`)",
          "Building a Single-Producer Single-Consumer (SPSC) ring buffer",
          "Avoiding CPU false sharing with `#[repr(align(64))]`"
        ],
        codeExample: {
          title: "Cache-Line Aligned Atomic Counter",
          description: "Aligns data to 64-byte L1 cache lines to prevent core cache invalidation.",
          code: `use std::sync::atomic::{AtomicUsize, Ordering};

// Align struct to 64 bytes (typical L1 cacheline size)
#[repr(align(64))]
pub struct CacheAlignedCounter {
    pub value: AtomicUsize,
}

impl CacheAlignedCounter {
    pub fn increment(&self) {
        // Relaxed ordering is fastest when synchronization is not required:
        self.value.fetch_add(1, Ordering::Relaxed);
    }
}`
        },
        exercise: {
          task: "Implement a circular ring buffer that allows a producer thread to push price ticks and a consumer thread to read ticks without locking.",
          hint: "Use head and tail atomic indices with `Ordering::Acquire` on read and `Ordering::Release` on write."
        }
      },
      {
        id: "ft-3",
        level: "Advanced",
        title: "Stage 3: Nanosecond Limit Order Book Matching Core",
        eli5: "Match buyers and sellers in under 500 nanoseconds using cache-friendly contiguous arrays.",
        whyItMatters: "The order book is the core of every exchange. Pre-allocating contiguous memory arrays avoids CPU cache misses and heap allocations.",
        estimatedHours: "35–45 hours",
        conceptsToMaster: [
          "Price-Time Priority (FIFO) matching algorithms",
          "Pre-allocated memory arenas to eliminate `malloc` on hot paths",
          "Measuring latency with hardware RDTSC (Read Time-Stamp Counter)",
          "Profiling CPU cache misses with Linux `perf`"
        ],
        codeExample: {
          title: "Zero-Allocation Order Book Matching Loop",
          description: "Processes buy and sell executions in place.",
          code: `pub struct Order {
    pub id: u64,
    pub price_cents: u64,
    pub shares: u32,
}

// In-place matching without heap allocations:
pub fn match_orders(bid: &mut Order, ask: &mut Order) -> Option<u32> {
    if bid.price_cents >= ask.price_cents {
        let trade_qty = bid.shares.min(ask.shares);
        bid.shares -= trade_qty;
        ask.shares -= trade_qty;
        Some(trade_qty)
    } else {
        None
    }
}`
        },
        exercise: {
          task: "Benchmark your matching engine using `criterion` and verify that the average order match latency is under 300 nanoseconds.",
          hint: "Add `criterion = \"0.5\"` under `[dev-dependencies]` and run `cargo bench`."
        }
      },
      {
        id: "ft-4",
        level: "Master",
        title: "Stage 4: Kernel Bypass (DPDK) & Core Pinning",
        eli5: "Bypass the operating system network stack to grab packets straight off the fiber-optic card in nanoseconds.",
        whyItMatters: "Standard Linux network drivers add 5–15 microseconds of overhead. Kernel bypass tools like DPDK and Solarflare OpenOnload achieve direct user-space networking.",
        estimatedHours: "50+ hours",
        conceptsToMaster: [
          "Kernel bypass concepts and polling mode drivers (PMD)",
          "Pinning threads to dedicated isolated CPU cores (`core_affinity`)",
          "Solarflare EF_VI and DPDK Rust bindings",
          "FPGA co-processor communication and DMA interfaces"
        ],
        codeExample: {
          title: "CPU Core Pinning in Rust",
          description: "Pins a trading execution thread to an isolated CPU core.",
          code: `// Pin current thread to CPU Core #2 to prevent OS task switching:
// core_affinity::set_for_current(CoreId { id: 2 });`
        },
        exercise: {
          task: "Write a high-speed tick ingest pipeline that pins the network receiver thread to core 1 and the strategy thread to core 2 with an SPSC queue in between.",
          hint: "Use `core_affinity` crate and verify 0% context switching with `perf stat`."
        }
      }
    ]
  },
  {
    id: "robotics-automotive",
    title: "Robotics & Autonomous Vehicles",
    tagline: "ROS2 robotics nodes, sensor fusion (LiDAR/IMU), automotive CAN bus, and real-time motion control.",
    icon: "Bot",
    color: "from-purple-600 via-violet-700 to-slate-900",
    accentColor: "text-purple-400",
    eli5Introduction: "Self-driving cars and warehouse robots rely on cameras, lasers, and motors to navigate around humans. If the software lags by even 10 milliseconds or crashes with a blue screen, a car could miss an obstacle. Traditionally written in C++, robotics nodes frequently crashed from null pointer bugs. Rust provides hard real-time guarantees, ensuring autonomous robots never crash mid-stride.",
    whatYouWillBuild: [
      "Native ROS2 robotics nodes with the `rclrs` framework",
      "Automotive CAN bus decoders for steering and brake actuators",
      "Sensor fusion pipelines combining noisy IMU and GPS signals",
      "Hard real-time motor control loops running at 20,000 Hz",
      "LiDAR 3D point cloud filtering using hardware SIMD acceleration"
    ],
    averageSalaryOrDemand: "$140,000 – $230,000 USD • High demand at Tesla, Waymo, Boston Dynamics, Amazon Robotics",
    prerequisites: ["Basic trigonometry and physics", "Basic knowledge of serial ports or microcontrollers"],
    firstProjectGuide: {
      title: "Build a Linux CAN Bus Vehicle Telemetry Reader in 4 Steps",
      description: "Read real-time automotive messages from a simulated car's CAN network interface and decode vehicle speed.",
      steps: [
        "Set up a virtual CAN interface in Linux: `sudo ip link add dev vcan0 type vcan && sudo ip link set up vcan0`.",
        "Create project: `cargo new can_monitor` and add `socketcan` crate.",
        "Open the `vcan0` socket interface and stream incoming CAN frames.",
        "Decode raw hexadecimal message IDs into real-world RPM and speed values and display in terminal."
      ]
    },
    useCases: [
      {
        title: "Autonomous Vehicle Stacks (Waymo & Tier-1 Suppliers)",
        eli5Summary: "Powering self-driving perception and brake actuation without memory crashes.",
        theOldWay: "ROS1 C++ nodes frequently suffered from silent memory leaks and unhandled pointer errors that froze vehicles in testing.",
        theRustWay: "ROS2 Rust client libraries enforce thread safety across sensor publishers and subscribers.",
        realWorldProjects: ["ROS2 Rust (`rclrs`)", "Apex.AI automotive operating systems", "Drone flight autonomy controllers"],
        keyCrates: [
          { name: "nalgebra", purpose: "Linear algebra, matrix math, and 3D transformations", url: "https://nalgebra.org" },
          { name: "socketcan", purpose: "Linux SocketCAN interface for automotive networking", url: "https://crates.io/crates/socketcan" },
          { name: "heapless", purpose: "Fixed-size data structures for memory-constrained robots", url: "https://crates.io/crates/heapless" },
          { name: "embedded-hal", purpose: "Hardware abstraction layer for motor controllers & PWM", url: "https://crates.io/crates/embedded-hal" }
        ]
      }
    ],
    roadmapSteps: [
      {
        id: "rb-1",
        level: "Beginner",
        title: "Stage 1: 3D Math & Matrix Transforms with Nalgebra",
        eli5: "Learn how robots understand their position in 3D space using coordinates, vectors, and rotations.",
        whyItMatters: "To move an arm or steer a car, you must translate sensor coordinates into real-world coordinates using matrix math. `nalgebra` provides SIMD-accelerated math.",
        estimatedHours: "15–20 hours",
        conceptsToMaster: [
          "Vectors, matrices, and homogeneous coordinates",
          "Quaternion rotations for drone flight without gimbal lock",
          "Coordinate frame transformations (World -> Robot -> Camera)",
          "SIMD vector acceleration in Rust"
        ],
        codeExample: {
          title: "3D Coordinate Transformation with Nalgebra",
          description: "Translates an obstacle coordinate relative to a moving robot.",
          code: `use nalgebra::{Point3, Vector3, Isometry3};

fn main() {
    // Robot position at (5.0, 2.0, 0.0) rotated 90 degrees around Z axis:
    let robot_pose = Isometry3::new(
        Vector3::new(5.0, 2.0, 0.0),
        Vector3::new(0.0, 0.0, std::f32::consts::FRAC_PI_2),
    );

    // Obstacle detected 2 meters in front of robot camera:
    let obstacle_local = Point3::new(2.0, 0.0, 0.0);
    let obstacle_world = robot_pose.transform_point(&obstacle_local);

    println!("Obstacle global world position: {:?}", obstacle_world);
}`
        },
        exercise: {
          task: "Write a function that accepts a drone's pitch, roll, and yaw angles and converts a sensor distance reading into global XYZ coordinates.",
          hint: "Use `UnitQuaternion::from_euler_angles` from the `nalgebra` crate."
        }
      },
      {
        id: "rb-2",
        level: "Intermediate",
        title: "Stage 2: Automotive CAN Bus & Embedded Sensor Drivers",
        eli5: "Connect to the real-world wires inside an automobile that control brakes, steering, and engine diagnostics.",
        whyItMatters: "Every modern vehicle and industrial robot communicates over the CAN (Controller Area Network) bus. Rust communicates directly via Linux SocketCAN.",
        estimatedHours: "25–30 hours",
        conceptsToMaster: [
          "CAN frame structure (11-bit/29-bit IDs, 8-byte payload)",
          "SocketCAN Linux interface and raw socket filters",
          "Decoding DBC files (CAN signal definitions)",
          "Embedded I2C and SPI sensor drivers with `embedded-hal`"
        ],
        codeExample: {
          title: "Reading Automotive CAN Bus Frames",
          description: "Receives raw vehicle telemetry frames over Linux SocketCAN.",
          code: `use socketcan::{CanSocket, Socket, CanFrame};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let socket = CanSocket::open("vcan0")?;
    println!("Listening for automotive CAN frames on vcan0...");

    loop {
        let frame: CanFrame = socket.read_frame()?;
        println!("CAN ID: 0x{:X} | Data: {:?}", frame.raw_id(), frame.data());
    }
}`
        },
        exercise: {
          task: "Simulate an automotive accelerator pedal that sends CAN frames with ID `0x120` containing pedal depression percentage (0–100%).",
          hint: "Use `CanFrame::new` and write to the socket using `socket.write_frame(&frame)`."
        }
      },
      {
        id: "rb-3",
        level: "Advanced",
        title: "Stage 3: Sensor Fusion & Kalman Filters",
        eli5: "Combine noisy GPS and bouncy accelerometer readings to calculate the exact true position of your robot.",
        whyItMatters: "Individual sensors are noisy and drift over time. Kalman filters mathematically fuse multiple noisy inputs into a single accurate estimate.",
        estimatedHours: "35–45 hours",
        conceptsToMaster: [
          "Extended Kalman Filter (EKF) state estimation math",
          "Sensor noise covariance matrices",
          "Fusing IMU (accelerometer/gyro) with wheel odometry and GPS",
          "ROS2 node architecture with `rclrs`"
        ],
        codeExample: {
          title: "1D Kalman Filter Implementation",
          description: "Cleans up noisy sensor telemetry mathematically.",
          code: `pub struct Kalman1D {
    estimate: f32,
    error_estimate: f32,
    process_noise: f32,
    measurement_noise: f32,
}

impl Kalman1D {
    pub fn update(&mut self, measurement: f32) -> f32 {
        let kalman_gain = self.error_estimate / (self.error_estimate + self.measurement_noise);
        self.estimate += kalman_gain * (measurement - self.estimate);
        self.error_estimate = (1.0 - kalman_gain) * self.error_estimate + self.process_noise;
        self.estimate
    }
}`
        },
        exercise: {
          task: "Simulate a robot moving along a straight line with noisy simulated distance measurements, and show how the Kalman filter smooths the output.",
          hint: "Generate synthetic readings with `rand::random` noise added to a constant velocity formula."
        }
      },
      {
        id: "rb-4",
        level: "Master",
        title: "Stage 4: Hard Real-Time Motor Control (#![no_std])",
        eli5: "Run a 20,000 times-per-second control loop directly on a motor chip that never misses a microsecond deadline.",
        whyItMatters: "Electric vehicle inverters and drone motors require Field Oriented Control (FOC) loops that must execute within 50 microseconds without jitter.",
        estimatedHours: "50+ hours",
        conceptsToMaster: [
          "Bare-metal ARM Cortex-M microcontrollers (#![no_std])",
          "Field Oriented Control (FOC) for brushless DC (BLDC) motors",
          "Hardware Pulse Width Modulation (PWM) and ADC synchronization",
          "Setting Linux real-time scheduling priority (`SCHED_FIFO`)"
        ],
        codeExample: {
          title: "Real-Time Loop with Linux SCHED_FIFO",
          description: "Locks memory pages and sets real-time thread priority.",
          code: `// Sets thread policy to SCHED_FIFO with max priority:
// nix::sched::sched_setscheduler(...)`
        },
        exercise: {
          task: "Write a `#![no_std]` program for an STM32 or RP2040 microcontroller that reads an analog potentiometer and adjusts motor PWM speed.",
          hint: "Use `cortex-m-rt` and the device-specific peripheral access crate (PAC)."
        }
      }
    ]
  },
  {
    id: "webassembly-edge",
    title: "WebAssembly, Edge Computing & Modern Web",
    tagline: "Ultra-portable sandboxed execution, browser high-performance engines, and edge serverless runtimes.",
    icon: "Globe",
    color: "from-teal-600 via-emerald-700 to-slate-900",
    accentColor: "text-teal-400",
    eli5Introduction: "Have you ever used Figma or Adobe Photoshop directly inside your web browser and wondered how it's so fast? That's WebAssembly! WebAssembly lets code written in Rust run inside Chrome, Firefox, or Safari almost as fast as a desktop video game. Furthermore, companies like Cloudflare and Fastly use Rust WebAssembly to run serverless apps near users in under 50 microseconds.",
    whatYouWillBuild: [
      "In-browser 60fps image filters and vector rendering engines",
      "Sandboxed serverless worker runtimes with Wasmtime and WASI",
      "Secure multi-tenant plugin architectures for desktop and SaaS apps",
      "Client-side zero-knowledge proof generators and crypto signers",
      "Cloudflare Workers and Fastly Compute@Edge microservices"
    ],
    averageSalaryOrDemand: "$135,000 – $220,000 USD • Rapidly growing sector in SaaS, DevTools & Web platforms",
    prerequisites: ["Basic web familiarity (HTML/JavaScript)", "Basic Rust concepts"],
    firstProjectGuide: {
      title: "Run Rust Inside Your Web Browser in 4 Steps",
      description: "Compile a Rust function into a WebAssembly (.wasm) file and call it directly from JavaScript.",
      steps: [
        "Install the wasm-pack tool: `cargo install wasm-pack`.",
        "Create project: `cargo new --lib rust_wasm` and configure `crate-type = [\"cdylib\"]` in `Cargo.toml`.",
        "Export a function with `#[wasm_bindgen]`: `pub fn add(a: i32, b: i32) -> i32 { a + b }`.",
        "Build with `wasm-pack build --target web` and import the generated `.js` file into your HTML page."
      ]
    },
    useCases: [
      {
        title: "Browser High-Performance Engines (Figma & 1Password)",
        eli5Summary: "Running desktop-quality software inside web browser tabs without downloading heavy installers.",
        theOldWay: "JavaScript is too slow for complex vector geometry, video decoding, audio synthesizers, or cryptography.",
        theRustWay: "Rust compiles to compact WebAssembly binaries that execute at near-native CPU speeds inside browser sandboxes.",
        realWorldProjects: ["Figma rendering engine", "1Password web extension", "Cloudflare Workers", "Shopify Functions"],
        keyCrates: [
          { name: "wasm-bindgen", purpose: "Bridges Rust and JavaScript with automatic type bindings", url: "https://rustwasm.github.io/wasm-bindgen/" },
          { name: "wasmtime", purpose: "Fast and secure standalone runtime for WebAssembly & WASI", url: "https://wasmtime.dev" },
          { name: "web-sys", purpose: "Raw Rust bindings to all Web APIs (DOM, Canvas, WebGL)", url: "https://crates.io/crates/web-sys" },
          { name: "wasi-common", purpose: "Implements WASI system call interface for standalone runtimes", url: "https://crates.io/crates/wasi-common" }
        ]
      }
    ],
    roadmapSteps: [
      {
        id: "wa-1",
        level: "Beginner",
        title: "Stage 1: Compiling Rust to WASM with wasm-bindgen",
        eli5: "Learn how to export Rust functions and call them from JavaScript in any browser.",
        whyItMatters: "`wasm-bindgen` is the universal glue between Rust and the web. It automatically generates TypeScript definitions and JavaScript wrappers.",
        estimatedHours: "15–20 hours",
        conceptsToMaster: [
          "Compiling to `wasm32-unknown-unknown` target",
          "The `#[wasm_bindgen]` attribute macro",
          "Passing numbers, strings, and byte arrays between JS and Rust",
          "Manipulating the HTML Canvas from Rust via `web-sys`"
        ],
        codeExample: {
          title: "Exporting a Rust Function to JavaScript",
          description: "Callable from browser JavaScript just like any normal JS function.",
          code: `use wasm_bindgen::prelude::*;

// Export this function to JavaScript:
#[wasm_bindgen]
pub fn fast_fibonacci(n: u32) -> u64 {
    let mut a = 0;
    let mut b = 1;
    for _ in 0..n {
        let temp = a + b;
        a = b;
        b = temp;
    }
    a
}`
        },
        exercise: {
          task: "Create a WebAssembly module that takes a string, reverses it, and returns it to JavaScript, then display the result on an HTML page.",
          hint: "Use `wasm-pack build --target web` and serve the directory with a simple local HTTP server."
        }
      },
      {
        id: "wa-2",
        level: "Intermediate",
        title: "Stage 2: Zero-Copy Pixel Processing on HTML5 Canvas",
        eli5: "Manipulate millions of image pixels in a browser tab at 60 frames per second without copying memory.",
        whyItMatters: "Copying 4K image buffers between JavaScript and WASM wastes CPU. Sharing raw memory pointers directly enables real-time filters and video editing.",
        estimatedHours: "20–25 hours",
        conceptsToMaster: [
          "WebAssembly linear memory architecture",
          "Accessing `wasm.memory.buffer` from JavaScript `Uint8ClampedArray`",
          "In-place image filters (grayscale, brightness, edge detection)",
          "Profiling WASM binary size with `twiggy`"
        ],
        codeExample: {
          title: "In-Place Grayscale Image Filter in WASM",
          description: "Mutates raw pixel buffers directly in linear memory.",
          code: `use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn apply_grayscale(pixels: &mut [u8]) {
    // Pixels are ordered RGBA in linear memory
    for chunk in pixels.chunks_exact_mut(4) {
        let r = chunk[0] as f32;
        let g = chunk[1] as f32;
        let b = chunk[2] as f32;
        let gray = (0.299 * r + 0.587 * g + 0.114 * b) as u8;
        chunk[0] = gray;
        chunk[1] = gray;
        chunk[2] = gray;
    }
}`
        },
        exercise: {
          task: "Build an interactive web app with an image upload button where a slider dynamically adjusts brightness via Rust WebAssembly in real time.",
          hint: "Pass the `ImageData.data` buffer into your WebAssembly export."
        }
      },
      {
        id: "wa-3",
        level: "Advanced",
        title: "Stage 3: Embedding Wasmtime for Secure App Plugins",
        eli5: "Let third-party users write custom plugins for your server without risking them hacking your files or infinite-looping.",
        whyItMatters: "Platforms like Shopify, Figma, and Cloudflare use Wasmtime to run untrusted third-party user code in a strictly isolated sandbox.",
        estimatedHours: "30–35 hours",
        conceptsToMaster: [
          "Wasmtime host runtime embedding in Rust server apps",
          "Fuel consumption metering to kill infinite loops",
          "WASI (WebAssembly System Interface) capability-based filesystem security",
          "Inter-module communication and memory limits"
        ],
        codeExample: {
          title: "Executing Untrusted WASM with Fuel Limits in Wasmtime",
          description: "Runs untrusted code with strict instruction execution caps.",
          code: `use wasmtime::*;

fn execute_plugin(wasm_bytes: &[u8]) -> Result<(), Box<dyn std::error::Error>> {
    let mut config = Config::new();
    config.consume_fuel(true); // Limit CPU instructions
    
    let engine = Engine::new(&config)?;
    let module = Module::new(&engine, wasm_bytes)?;
    let mut store = Store::new(&engine, ());
    store.set_fuel(100_000)?; // Allow max 100k instructions

    let instance = Instance::new(&mut store, &module, &[])?;
    // Call exported plugin function safely...
    Ok(())
}`
        },
        exercise: {
          task: "Build a CLI in Rust that executes user-submitted WASM scripts and aborts execution if the script exceeds 1,000,000 instructions or attempts to access unauthorized files.",
          hint: "Use `store.set_fuel` and handle `Trap::OutOfFuel`."
        }
      },
      {
        id: "wa-4",
        level: "Master",
        title: "Stage 4: Edge Serverless MicroVMs & WebGPU AI Inference",
        eli5: "Run AI models and serverless workers at 300 CDN edge data centers around the world with 50-microsecond boot times.",
        whyItMatters: "Docker containers take 500ms to start. WASI modules boot in 50 microseconds, enabling instant edge AI and serverless computing globally.",
        estimatedHours: "45+ hours",
        conceptsToMaster: [
          "WASI 0.2 Component Model and WIT (Wasm Interface Type) definitions",
          "Cloudflare Workers and Fastly Compute@Edge runtime architecture",
          "WebGPU client-side shader programming and tensor math",
          "Running quantized small language models (LLMs) via WASM in the browser"
        ],
        codeExample: {
          title: "Edge Worker Request Handler (Conceptual)",
          description: "Instantaneous edge serverless HTTP routing.",
          code: `// Compiled to wasm32-wasi for Cloudflare Workers / Fastly:
// Handles HTTP request in <50 microseconds at nearest edge POP`
        },
        exercise: {
          task: "Deploy a serverless API function to Cloudflare Workers or Fastly written in Rust that validates JWT tokens and routes requests.",
          hint: "Use `worker` crate or `fastly` crate with `wrangler deploy`."
        }
      }
    ]
  }
];
