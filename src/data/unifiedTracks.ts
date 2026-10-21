import { UnifiedIndustryTrack } from './unifiedTypes';

export const UNIFIED_INDUSTRY_TRACKS: UnifiedIndustryTrack[] = [
  // =========================================================================
  // 1. WEB3, BLOCKCHAIN & CRYPTOGRAPHY
  // =========================================================================
  {
    id: "web3-crypto",
    title: "Web3, Blockchain & Cryptography",
    tagline: "High-throughput smart contracts, decentralized finance protocols, and zero-knowledge proofs.",
    icon: "Coins",
    badge: "Most Lucrative & Fast-Paced",
    color: "from-amber-500 via-orange-600 to-yellow-600",
    accentColor: "text-amber-400",
    eli5Overview: "Imagine a global digital notebook where millions of computers record financial transactions. Nobody owns the central server, and nobody can fake or delete entries. Rust is the undisputed #1 language for modern high-speed blockchains (like Solana, Polkadot, and Near) because when billions of dollars move across the internet every second, a single memory or arithmetic bug could wipe out users' life savings. Rust guarantees memory safety and mathematical precision before the program ever runs.",
    whyRustDominates: "Blockchains like Solana compile Rust directly to high-speed eBPF bytecode. Transactions run in parallel across all CPU cores simultaneously without garbage collection pauses, achieving 50,000+ transactions per second for less than $0.001 per transfer.",
    legacyFlawsVsRust: {
      legacyFlaw: "Older networks (like Ethereum/Solidity) process transactions one-by-one sequentially, leading to network congestion, $50 gas fees, and recurring re-entrancy smart contract hacks.",
      rustFix: "Rust enforces strict compile-time borrow checking and parallel execution (Sealevel). Impossible states and re-entrancy are prevented by ownership rules.",
      measuredImpact: "1,000x faster transaction throughput and sub-second settlement with zero garbage collection jitter."
    },
    whatYouWillBuild: [
      "Solana smart contracts with the Anchor framework",
      "Decentralized automated market makers (AMMs) & token vaults",
      "Cryptographic keypair generators & transaction signers",
      "High-speed mempool monitoring & automated arbitrage bots",
      "Zero-Knowledge (ZK) arithmetic circuits for confidential transactions"
    ],
    salaryAndDemand: "$140,000 – $260,000+ USD • Extreme global remote opportunities",
    beginnerZeroPrerequisites: [
      "Zero prior blockchain knowledge needed — we start from 'What is a Hash?'",
      "Basic programming curiosity (variables, loops, and math)"
    ],
    capstoneProject: {
      title: "Decentralized Token Vault & Escrow on Solana",
      level: "Portfolio-Grade Production Project",
      description: "Build a complete, trustless token escrow smart contract using Anchor where two users can swap tokens atomically without trusting each other or any middleman.",
      stepByStepGuide: [
        "Install the Solana CLI and Anchor: `avm install latest && avm use latest`.",
        "Scaffold your project with `anchor init solana_escrow`.",
        "Create an escrow state account using Program Derived Addresses (PDA) that locks User A's deposit.",
        "Implement the `initialize_escrow` and `exchange` instructions with safe math (`checked_add`, `checked_mul`).",
        "Write integration tests in TypeScript/Rust simulating swaps on a local Solana test validator (`anchor test`)."
      ]
    },
    mustKnowCrates: [
      { name: "anchor-lang", purpose: "The de-facto framework for writing safe Solana smart contracts", link: "https://crates.io/crates/anchor-lang" },
      { name: "solana-sdk", purpose: "Official Solana client library for keys, RPC, and transactions", link: "https://crates.io/crates/solana-sdk" },
      { name: "ed25519-dalek", purpose: "Blazing fast digital signature generation and verification", link: "https://crates.io/crates/ed25519-dalek" },
      { name: "arkworks-rs", purpose: "The leading ecosystem for Zero-Knowledge Proofs in Rust", link: "https://github.com/arkworks-rs" }
    ],
    interviewPrep: [
      {
        question: "What is a Program Derived Address (PDA) in Solana, and why is it crucial for smart contract security?",
        expectedAnswer: "A PDA is a deterministic public key generated off the Ed25519 elliptic curve using a seed string and a program ID. Because it has no private key, only the owning program can sign transactions on its behalf using CPI, allowing safe autonomous vaults."
      },
      {
        question: "How do you prevent integer overflow in Rust smart contracts, and what happens if you don't?",
        expectedAnswer: "In release mode, normal integers wrap around silently. In smart contracts, this could allow an attacker to subtract 10 from 0 and receive 18 quintillion tokens. Rust developers must use `checked_add`, `checked_sub`, or `saturating_*` methods."
      }
    ],
    phases: [
      {
        phaseTitle: "Phase 1: Beginner Foundations",
        phaseDescription: "Start from absolute zero. Learn what a blockchain actually is, master Rust variables and ownership, and generate your first crypto keypair.",
        skills: [
          {
            id: "w3-p1-1",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.1 What is a Blockchain & Cryptographic Hashing?",
            eli5: "A blockchain is like a shared digital notebook where pages are chained together using digital fingerprints called 'hashes'. Change one letter on an old page, and the whole chain breaks, making tampering instantly obvious.",
            whyInThisIndustry: "Everything in Web3—from account IDs to transaction verification—is calculated using cryptographic hashes (like SHA-256 and Keccak).",
            conceptsToMaster: [
              "One-way hash functions (SHA-256, BLAKE3)",
              "Immutability & Merkle Trees",
              "Rust variables, mutability (`let` vs `let mut`), and data types"
            ],
            codeExample: {
              title: "Calculating a Cryptographic Hash in Rust",
              description: "Computes a SHA-256 hash fingerprint of a financial message.",
              code: `use sha2::{Sha256, Digest};

fn main() {
    let transaction = "Alice pays Bob 10 SOL";
    
    // Create a SHA-256 hasher
    let mut hasher = Sha256::new();
    hasher.update(transaction.as_bytes());
    let hash_result = hasher.finalize();

    println!("Transaction: {}", transaction);
    println!("Digital Fingerprint (Hash): {:x}", hash_result);
}`
            },
            exercise: {
              task: "Create a program that hashes a secret password and checks if the hash matches a stored hexadecimal fingerprint.",
              hint: "Use the `sha2` crate and compare results with `==`."
            },
            estimatedTime: "5–8 hours"
          },
          {
            id: "w3-p1-2",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.2 Public/Private Keys & Digital Signatures",
            eli5: "Your private key is like your secret handwritten signature stamp. Your public key is like your bank account number. Anyone can verify your signature, but nobody can forge it without your private stamp.",
            whyInThisIndustry: "Wallets don't store coins; they store keypairs. Every single Web3 transaction is a digitally signed message.",
            conceptsToMaster: [
              "Asymmetric cryptography (Ed25519 & Secp256k1)",
              "Generating secure random keys with `rand`",
              "Rust structs and methods (`impl` blocks)"
            ],
            codeExample: {
              title: "Generating a Crypto Wallet Keypair & Signing",
              description: "Signs a transaction message and verifies it cryptographically.",
              code: `use ed25519_dalek::{SigningKey, Signer, Verifier};
use rand::rngs::OsRng;

fn main() {
    // 1. Generate a random private key
    let mut csprng = OsRng;
    let private_key = SigningKey::generate(&mut csprng);
    let public_key = private_key.verifying_key();

    // 2. Message to sign
    let transfer_payload = b"Transfer 50 SOL from Vault Alpha";

    // 3. Sign the message
    let signature = private_key.sign(transfer_payload);

    // 4. Anyone can verify the signature using only the public key
    let is_valid = public_key.verify(transfer_payload, &signature).is_ok();
    println!("Is digital signature authentic? {}", is_valid);
}`
            },
            exercise: {
              task: "Write a command-line tool that generates 5 random wallet keypairs and prints their public keys.",
              hint: "Loop 5 times and format keys using Base58 encoding with the `bs58` crate."
            },
            estimatedTime: "8–10 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 2: Intermediate Practitioner",
        phaseDescription: "Move into smart contract development. Learn the Solana account model, write your first contract with Anchor, and handle funds safely.",
        skills: [
          {
            id: "w3-p2-1",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.1 The Solana Account Model & Anchor Basics",
            eli5: "In Ethereum, code and data live together. In Solana, smart contracts are stateless programs, and all data lives in separate 'Accounts' that pay tiny rent to exist.",
            whyInThisIndustry: "Anchor is the standard tool used by virtually every Solana company. It generates safety checks automatically so you don't write buggy contracts.",
            conceptsToMaster: [
              "Solana Accounts (Lamports, Data byte buffers, Owner program)",
              "Anchor procedural macros (`#[program]`, `#[account]`, `#[derive(Accounts)]`)",
              "Enforcing caller permissions with `Signer<'info>`"
            ],
            codeExample: {
              title: "A Complete Anchor Smart Contract in 30 Lines",
              description: "Initializes a decentralized counter and increments it safely.",
              code: `use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod token_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        counter.authority = ctx.accounts.user.key();
        Ok(())
    }

    pub fn increment(ctx: Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = counter.count.checked_add(1).unwrap();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 8 + 8 + 32)]
    pub counter: Account<'info, CounterData>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut, has_one = authority)]
    pub counter: Account<'info, CounterData>,
    pub authority: Signer<'info>,
}

#[account]
pub struct CounterData {
    pub count: u64,
    pub authority: Pubkey,
}`
            },
            exercise: {
              task: "Add a `decrement` instruction to the counter contract that returns an error if count is already zero.",
              hint: "Use `require!(counter.count > 0, CustomError::Underflow);`."
            },
            estimatedTime: "15–20 hours"
          },
          {
            id: "w3-p2-2",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.2 Program Derived Addresses (PDAs) & Token Vaults",
            eli5: "A PDA is a digital safe on the blockchain where only the smart contract itself has the key. No human or hacker can steal funds from it without the contract's rules.",
            whyInThisIndustry: "PDAs are how decentralized exchanges, escrow contracts, and token staking pools hold users' money securely without private keys.",
            conceptsToMaster: [
              "Deterministic address derivation using seeds and bump seeds",
              "Cross-Program Invocations (CPI) with `invoke_signed`",
              "SPL Token program transfers"
            ],
            codeExample: {
              title: "Deriving a PDA Account Address",
              description: "Computes a deterministic address owned exclusively by the program.",
              code: `use solana_sdk::pubkey::Pubkey;

fn main() {
    let program_id = Pubkey::new_unique();
    let user_wallet = Pubkey::new_unique();

    // Derive a PDA using user's wallet as seed
    let (vault_pda, bump_seed) = Pubkey::find_program_address(
        &[b"vault", user_wallet.as_ref()],
        &program_id
    );

    println!("Vault PDA Address: {}", vault_pda);
    println!("Canonical Bump Seed: {}", bump_seed);
}`
            },
            exercise: {
              task: "Create an Anchor account definition that uses `seeds = [b\"vault\", user.key().as_ref()], bump` to ensure each user gets their own private vault.",
              hint: "Add seeds constraints inside `#[account(...)]`."
            },
            estimatedTime: "20–25 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 3: Advanced Architectures",
        phaseDescription: "Master DeFi automated market makers, fixed-point math, mempool listening bots, and high-frequency on-chain arbitration.",
        skills: [
          {
            id: "w3-p3-1",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.1 DeFi Math: Constant Product AMM (Uniswap/Raydium)",
            eli5: "Decentralized exchanges don't have order books; they use mathematical curves (`x * y = k`). Learn how to calculate token swaps with exact fees without losing money to rounding errors.",
            whyInThisIndustry: "Floating-point numbers (`f32`/`f64`) produce tiny rounding errors that hackers can exploit to drain liquidity pools. You must use integer and fixed-point math.",
            conceptsToMaster: [
              "The Constant Product Formula (`x * y = k`)",
              "Fixed-point decimal math (e.g. U64F64 or 128-bit scaling)",
              "Slippage tolerance and fee calculation in basis points (1 bp = 0.01%)"
            ],
            codeExample: {
              title: "Safe Constant-Product Swap Math in Rust",
              description: "Calculates output tokens for an automated token exchange.",
              code: `pub fn calculate_swap(
    amount_in: u128,
    reserve_in: u128,
    reserve_out: u128,
    fee_bps: u128, // 30 = 0.3% fee
) -> Result<u128, &'static str> {
    // 1. Deduct fee: amount_in * (10000 - 30)
    let amount_in_with_fee = amount_in
        .checked_mul(10_000 - fee_bps)
        .ok_or("Math overflow")?;

    // 2. Formula: (dx * y) / (x + dx)
    let numerator = amount_in_with_fee
        .checked_mul(reserve_out)
        .ok_or("Math overflow")?;
    let denominator = reserve_in
        .checked_mul(10_000)
        .ok_or("Math overflow")?
        .checked_add(amount_in_with_fee)
        .ok_or("Math overflow")?;

    Ok(numerator / denominator)
}`
            },
            exercise: {
              task: "Write a function that calculates the price impact percentage of a trade given current pool reserves.",
              hint: "Compare effective execution price `amount_out / amount_in` against spot price `reserve_out / reserve_in`."
            },
            estimatedTime: "25–30 hours"
          },
          {
            id: "w3-p3-2",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.2 Real-Time Mempool Bots & WebSocket Streaming",
            eli5: "Build automated robots that listen to live blockchain transactions as they fly across the internet and react within 50 milliseconds.",
            whyInThisIndustry: "MEV (Maximal Extractable Value) searchers and market makers earn millions by executing arbitrage trades across decentralized exchanges.",
            conceptsToMaster: [
              "WebSocket streaming with Tokio and `futures-util`",
              "Geyser RPC streaming on Solana",
              "Constructing and signing raw transactions asynchronously in under 5ms"
            ],
            codeExample: {
              title: "Streaming On-Chain Account Updates with Tokio",
              description: "Listens for real-time liquidity changes without polling.",
              code: `// Stream on-chain accounts over WebSocket
// tokio::select! enables handling multiple DEX streams concurrently`
            },
            exercise: {
              task: "Connect to a public Solana devnet WebSocket and log every new slot and block produced in real time.",
              hint: "Use `solana_client::pubsub_client::PubsubClient::slot_subscribe`."
            },
            estimatedTime: "30–35 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 4: Staff/Principal Master",
        phaseDescription: "The absolute pinnacle: Zero-Knowledge proofs, custom Layer-2 rollups, and building custom high-performance blockchain node clients.",
        skills: [
          {
            id: "w3-p4-1",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.1 Zero-Knowledge Proofs (ZK-SNARKs) with Arkworks",
            eli5: "Prove that you know a secret password or have enough money in your wallet without ever revealing your password or balance to anyone.",
            whyInThisIndustry: "Zero-Knowledge cryptography is the cutting-edge future of privacy (Tornado Cash, Zcash) and scaling (ZK-Rollups like Starknet, zkSync). Arkworks is written entirely in Rust.",
            conceptsToMaster: [
              "R1CS (Rank-1 Constraint Systems) arithmetic circuits",
              "Finite field mathematics & Elliptic curve pairings (BLS12-381)",
              "Prover and Verifier key generation with Groth16 / Plonk"
            ],
            codeExample: {
              title: "Conceptual ZK Circuit in Rust (Arkworks)",
              description: "Proves knowledge of two secret factors x and y that multiply to public number z.",
              code: `// With Arkworks R1CS:
// Enforce constraint: x * y == z
// Prover generates proof pi; Verifier verifies in 2ms without learning x or y`
            },
            exercise: {
              task: "Build a ZK proof circuit where a user proves their age is >= 18 without disclosing their date of birth.",
              hint: "Use `ark-r1cs-std` and create boolean constraints on binary bit representations."
            },
            estimatedTime: "40–50 hours"
          },
          {
            id: "w3-p4-2",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.2 Custom L2 Rollup Sequencers & Node Clients (Reth)",
            eli5: "Build the server infrastructure that runs the blockchain itself. Process thousands of transactions off-chain and compress them into cryptographic proofs.",
            whyInThisIndustry: "Staff blockchain engineers architect Ethereum execution clients like Reth and custom Layer-2 rollup sequencers for institutional finance.",
            conceptsToMaster: [
              "MDBX / RocksDB high-performance state storage",
              "State transition functions and fraud proof generation",
              "EVM execution in Rust using `revm`"
            ],
            codeExample: {
              title: "Running EVM Bytecode inside Rust with revm",
              description: "Executes Ethereum smart contracts in pure, blazing-fast Rust.",
              code: `// revm executes EVM opcodes directly in Rust memory with zero virtualization overhead`
            },
            exercise: {
              task: "Create a simple state machine that reads transactions from an in-memory queue, updates account balances, and calculates the root state hash.",
              hint: "Implement a sparse Merkle tree in Rust."
            },
            estimatedTime: "50+ hours"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. OPERATING SYSTEMS & KERNEL DEVELOPMENT
  // =========================================================================
  {
    id: "operating-systems",
    title: "Operating Systems & Kernels",
    tagline: "Bare-metal bootloaders, memory paging, interrupt handlers, and Linux kernel drivers.",
    icon: "Cpu",
    badge: "Core Systems Foundation",
    color: "from-blue-600 via-indigo-700 to-slate-900",
    accentColor: "text-blue-400",
    eli5Overview: "An Operating System is the master traffic controller of your computer. When you open an app, the OS decides which CPU core runs it, assigns it memory, and handles the screen, keyboard, and disks. For 50 years, operating systems were written in C, causing endless blue screens and 70% of all security vulnerabilities. Rust is revolutionizing operating systems because it lets us write bare-metal code that physically cannot corrupt memory.",
    whyRustDominates: "In 2022, the Linux kernel officially adopted Rust as its first official second language alongside C (Rust-for-Linux). Operating systems like Redox prove that an entire modern microkernel can run safely in 100% pure Rust.",
    legacyFlawsVsRust: {
      legacyFlaw: "In C, a single missing null-check or dangling pointer in a device driver crashes the entire computer with a blue screen or kernel panic.",
      rustFix: "Rust provides compile-time ownership, automatic RAII lock unlocking, and safe abstractions over raw hardware registers.",
      measuredImpact: "Zero use-after-free bugs and 40% reduction in debugging complex multi-core concurrency deadlocks."
    },
    whatYouWillBuild: [
      "A bootable x86_64 bare-metal kernel booted via QEMU",
      "VGA text buffer drivers and serial debugging output",
      "Interrupt Service Routines (IDT) and hardware timer drivers",
      "4-Level virtual memory paging and a physical page frame allocator",
      "Preemptive round-robin multi-tasking thread scheduler"
    ],
    salaryAndDemand: "$150,000 – $240,000 USD • High demand at Google (Android/Fuchsia), Apple, Microsoft, Red Hat",
    beginnerZeroPrerequisites: [
      "No OS experience needed — we teach bare-metal concepts from the ground up",
      "Familiarity with numbers in binary and hexadecimal (0x00 - 0xFF)"
    ],
    capstoneProject: {
      title: "Preemptive Multi-Tasking x86_64 Kernel",
      level: "Principal Systems Builder",
      description: "Build an operating system from scratch that boots on bare metal or QEMU, configures memory paging, handles keyboard interrupts, and switches between multiple running tasks concurrently.",
      stepByStepGuide: [
        "Create a `#![no_std]` binary with a custom panic handler and entry point `_start`.",
        "Implement a VGA driver writing directly to physical address `0xb8000`.",
        "Set up the Interrupt Descriptor Table (IDT) to catch timer ticks and keyboard keystrokes.",
        "Initialize 4-level paging and build a custom Bump or Buddy heap allocator.",
        "Write a context-switching routine in assembly to switch CPU execution between two background tasks."
      ]
    },
    mustKnowCrates: [
      { name: "x86_64", purpose: "Safe Rust wrappers for x86_64 CPU instructions and page tables", link: "https://crates.io/crates/x86_64" },
      { name: "bootloader", purpose: "Turns your compiled Rust kernel into a bootable UEFI/BIOS disk image", link: "https://crates.io/crates/bootloader" },
      { name: "volatile", purpose: "Safe read/write wrappers for Memory-Mapped I/O registers", link: "https://crates.io/crates/volatile" },
      { name: "spinning_top", purpose: "Interrupt-safe spinlocks for multi-core synchronization", link: "https://crates.io/crates/spinning_top" }
    ],
    interviewPrep: [
      {
        question: "Why can't you use std::sync::Mutex inside an Interrupt Service Routine (ISR)?",
        expectedAnswer: "An ISR runs outside normal thread context and cannot sleep. If an ISR attempts to acquire a Mutex held by the interrupted thread, the system deadlocks forever. You must use interrupt-disabling spinlocks."
      },
      {
        question: "What is Memory-Mapped I/O (MMIO), and why must reads/writes be marked 'volatile'?",
        expectedAnswer: "MMIO maps hardware device registers into regular memory addresses. Without volatile, the compiler's optimizer might assume the memory never changes and eliminate 'redundant' reads, failing to receive hardware signals."
      }
    ],
    phases: [
      {
        phaseTitle: "Phase 1: Beginner Foundations",
        phaseDescription: "Turn off the standard library (`#![no_std]`), understand raw hardware addresses, and write text to the screen without an operating system.",
        skills: [
          {
            id: "os-p1-1",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.1 Bare-Metal Rust & Disabling the Standard Library",
            eli5: "Normally, your Rust code relies on Windows, Mac, or Linux to print to the screen or open files. In bare-metal programming, there is NO operating system yet! You write code that runs directly on computer chips.",
            whyInThisIndustry: "A kernel cannot use standard `println!` or `Vec` because those require an operating system to exist first. `#![no_std]` strips out those assumptions.",
            conceptsToMaster: [
              "Compiler attributes: `#![no_std]` and `#![no_main]`",
              "Writing a custom panic handler with an infinite halt loop",
              "Cross-compilation targets (`x86_64-unknown-none`)"
            ],
            codeExample: {
              title: "The Minimal Bare-Metal Rust Binary",
              description: "The simplest possible Rust program that boots without an OS.",
              code: `#![no_std] // Don't link the Rust standard library
#![no_main] // Disable normal main function entry point

use core::panic::PanicInfo;

// Entry point called by the bootloader
#[no_mangle]
pub extern "C" fn _start() -> ! {
    // Hardware initialization will happen here
    loop {} // Keep the CPU alive in an infinite loop
}

// Function called when code panics
#[panic_handler]
fn panic(_info: &PanicInfo) -> ! {
    loop {}
}`
            },
            exercise: {
              task: "Configure `.cargo/config.toml` to build for target `x86_64-unknown-none` and compile with `cargo build`.",
              hint: "Set `build.target = \"x86_64-unknown-none\"` in your cargo config."
            },
            estimatedTime: "6–10 hours"
          },
          {
            id: "os-p1-2",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.2 Printing Colored Text to VGA Hardware Memory",
            eli5: "PC hardware reserves a magic address in memory (`0xb8000`). If you write letter bytes directly into that memory address, the computer monitor instantly lights up with colored text!",
            whyInThisIndustry: "Before you have graphics drivers or serial ports, writing directly to the VGA text buffer is how kernel engineers see debugging logs.",
            conceptsToMaster: [
              "Physical Memory-Mapped I/O at address `0xb8000`",
              "Volatile memory writes with `core::ptr::write_volatile`",
              "Implementing Rust's `core::fmt::Write` trait for custom formatting"
            ],
            codeExample: {
              title: "Writing Directly to the VGA Text Buffer",
              description: "Outputs formatted text directly onto the computer monitor.",
              code: `const VGA_BUFFER: *mut u8 = 0xb8000 as *mut u8;

pub fn print_kernel_greeting() {
    let message = b"Rust Kernel Online!";
    for (i, &byte) in message.iter().enumerate() {
        unsafe {
            // Write character ASCII byte
            VGA_BUFFER.add(i * 2).write_volatile(byte);
            // Write color attribute (0x0A = Light Green on Black)
            VGA_BUFFER.add(i * 2 + 1).write_volatile(0x0A);
        }
    }
}`
            },
            exercise: {
              task: "Create a safe VGA Writer struct that tracks current row and column, and supports newlines (`\\n`) and automatic scrolling.",
              hint: "Keep an 80x25 array buffer in your struct."
            },
            estimatedTime: "10–14 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 2: Intermediate Practitioner",
        phaseDescription: "Program the CPU interrupt table, catch keyboard strokes, and handle hardware clock timer ticks.",
        skills: [
          {
            id: "os-p2-1",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.1 CPU Interrupt Descriptor Table (IDT) & Exceptions",
            eli5: "An interrupt is like a fire alarm in your CPU. When someone taps a key on the keyboard, the CPU pauses what it was doing, jumps to an interrupt handler function, and returns.",
            whyInThisIndustry: "Without interrupts, your operating system cannot respond to user input or timer ticks. You must initialize the Interrupt Descriptor Table (IDT).",
            conceptsToMaster: [
              "CPU Exceptions (Divide by zero, Page faults, Double faults)",
              "Setting up the IDT with the `x86_64` crate",
              "Calling conventions for interrupt handlers (`extern \"x86-interrupt\"`)"
            ],
            codeExample: {
              title: "Handling CPU Interrupts with x86_64",
              description: "Catches hardware exceptions safely without crashing the machine.",
              code: `use x86_64::structures::idt::{InterruptDescriptorTable, InterruptStackFrame};

static mut IDT: InterruptDescriptorTable = InterruptDescriptorTable::new();

pub fn init_interrupts() {
    unsafe {
        IDT.breakpoint.set_handler_fn(breakpoint_handler);
        IDT.load();
    }
}

extern "x86-interrupt" fn breakpoint_handler(stack_frame: InterruptStackFrame) {
    // Print stack frame information for debugging
}`
            },
            exercise: {
              task: "Set up a double-fault handler on a separate Interrupt Stack Table (IST) so that stack overflows don't cause triple-fault reboot loops.",
              hint: "Configure the TSS (Task State Segment) with a dedicated emergency stack."
            },
            estimatedTime: "15–20 hours"
          },
          {
            id: "os-p2-2",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.2 Hardware Timer & Keyboard Input Driver",
            eli5: "Teach your kernel to read keystrokes from a physical keyboard and update a clock on screen every millisecond.",
            whyInThisIndustry: "The programmable interval timer (PIT) provides the heartbeat of the operating system's scheduler.",
            conceptsToMaster: [
              "8259 PIC (Programmable Interrupt Controller) remapping",
              "Reading I/O ports (`inb`/`outb` instructions) using `x86_64::instructions::port`",
              "Decoding PS/2 keyboard scan codes into letters"
            ],
            codeExample: {
              title: "Reading Keyboard Port 0x60 on Interrupt",
              description: "Reads raw keycodes sent from the keyboard controller.",
              code: `use x86_64::instructions::port::Port;

pub fn read_keyboard_scancode() -> u8 {
    let mut port = Port::new(0x60);
    unsafe { port.read() }
}`
            },
            exercise: {
              task: "Build a PS/2 keyboard driver that decodes scan codes and echoes letters to the VGA text buffer in real time.",
              hint: "Use the `pc-keyboard` crate to handle Shift and CapsLock state."
            },
            estimatedTime: "20–25 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 3: Advanced Architectures",
        phaseDescription: "Build virtual memory paging, custom heap allocators, and enable dynamic memory (`Vec`, `String`, `Box`) inside your kernel.",
        skills: [
          {
            id: "os-p3-1",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.1 4-Level Virtual Memory Paging & Frame Allocation",
            eli5: "Virtual memory gives every program the illusion that it has all the RAM in the world to itself. Behind the scenes, the operating system translates virtual addresses to physical chips.",
            whyInThisIndustry: "Paging prevents one buggy program from overwriting the memory of another program or hacking the kernel.",
            conceptsToMaster: [
              "4-Level page table structures (PML4, PDPT, PD, PT)",
              "Page faults and on-demand memory mapping",
              "Writing a physical page frame allocator from BIOS memory maps"
            ],
            codeExample: {
              title: "Translating Virtual Addresses to Physical Addresses",
              description: "Navigates 4-level x86_64 page tables.",
              code: `use x86_64::structures::paging::OffsetPageTable;
use x86_64::VirtAddr;

pub fn translate_address(page_table: &OffsetPageTable, virt: VirtAddr) {
    // Translates virtual address to physical frame via hardware CR3 register
}`
            },
            exercise: {
              task: "Write a page frame allocator that reads memory maps passed by the bootloader and distributes 4096-byte pages.",
              hint: "Use a bitmap tracker to mark free vs allocated frames."
            },
            estimatedTime: "25–35 hours"
          },
          {
            id: "os-p3-2",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.2 Writing a Custom Kernel Heap Allocator",
            eli5: "Now that we have memory pages, we need to distribute small chunks (like 32 bytes for a struct). This unlocks `alloc::vec::Vec` and `String` inside `#![no_std]`!",
            whyInThisIndustry: "Without an allocator, you cannot have dynamic data structures. You will implement `core::alloc::GlobalAlloc`.",
            conceptsToMaster: [
              "Implementing `GlobalAlloc` (`alloc` and `dealloc` methods)",
              "Bump allocators vs Linked-List allocators vs Buddy allocators",
              "Memory fragmentation and alignment requirements"
            ],
            codeExample: {
              title: "Implementing GlobalAlloc for `#![no_std]`",
              description: "Registers a custom memory allocator for the kernel.",
              code: `use core::alloc::{GlobalAlloc, Layout};

pub struct KernelBumpAllocator;

unsafe impl GlobalAlloc for KernelBumpAllocator {
    unsafe fn alloc(&self, _layout: Layout) -> *mut u8 {
        // Return pointer to free memory block
        core::ptr::null_mut()
    }
    unsafe fn dealloc(&self, _ptr: *mut u8, _layout: Layout) {
        // Free memory block
    }
}

#[global_allocator]
static ALLOCATOR: KernelBumpAllocator = KernelBumpAllocator;`
            },
            exercise: {
              task: "Implement a Fixed-Size Block (Slab) allocator for fast 64-byte, 128-byte, and 256-byte allocations.",
              hint: "Maintain linked lists of free blocks for each size category."
            },
            estimatedTime: "30–40 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 4: Staff/Principal Master",
        phaseDescription: "Preemptive multitasking, assembly context switching, user-space privilege separation (Ring 3), and Linux Kernel drivers.",
        skills: [
          {
            id: "os-p4-1",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.1 Preemptive Multitasking & Assembly Context Switching",
            eli5: "Every 10 milliseconds, the timer interrupt pauses Task A, saves its registers, and swaps the CPU over to Task B so both appear to run simultaneously.",
            whyInThisIndustry: "Context switching is the defining characteristic of modern operating systems. You'll write bare-metal assembly routines.",
            conceptsToMaster: [
              "Thread Control Blocks (TCBs) and saved register state",
              "Assembly context switching with `core::arch::asm!`",
              "Round-robin preemptive scheduler loops"
            ],
            codeExample: {
              title: "Context Switching Routine (Assembly Concept)",
              description: "Swaps active CPU register sets between two tasks.",
              code: `// core::arch::asm!
// Push RAX, RBX, RCX, RDX, RSI, RDI, RBP to Task A stack;
// Switch RSP to Task B stack;
// Pop registers and execute ret.`
            },
            exercise: {
              task: "Create two infinite loop tasks that print alternating letters ('A' and 'B') on screen, preempted smoothly by timer ticks.",
              hint: "Switch stacks inside the timer interrupt handler."
            },
            estimatedTime: "40–50 hours"
          },
          {
            id: "os-p4-2",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.2 Rust for Linux: Kernel Driver Development",
            eli5: "Write official kernel modules and device drivers for the Linux operating system using safe Rust instead of crash-prone C.",
            whyInThisIndustry: "Rust-for-Linux is the highest-profile systems initiative in tech. Major drivers (like Apple Silicon Asahi GPU) are now written in Rust.",
            conceptsToMaster: [
              "Linux kernel Rust abstractions (`kernel` crate)",
              "Safe pinning (`pin-init`) for kernel data structures",
              "Character device drivers and POSIX `ioctl` interfaces"
            ],
            codeExample: {
              title: "A Minimal Linux Kernel Module in Rust",
              description: "Loads directly into the running Linux kernel.",
              code: `// In Linux kernel source tree:
// use kernel::prelude::*;
// module! { type: MyDriver, name: "my_rust_driver", license: "GPL" }`
            },
            exercise: {
              task: "Compile and load a custom Rust kernel module onto a Linux virtual machine and verify it appears in `/dev/`.",
              hint: "Clone the Rust-for-Linux tree and configure `CONFIG_RUST=y`."
            },
            estimatedTime: "40+ hours"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. CYBER SECURITY & EXPLOIT ENGINEERING
  // =========================================================================
  {
    id: "cyber-security",
    title: "Cyber Security & Exploit Engineering",
    tagline: "Network packet inspection, eBPF threat detection, coverage-guided fuzzing, and binary analysis.",
    icon: "ShieldAlert",
    badge: "Offensive & Defensive Security",
    color: "from-red-600 via-rose-700 to-slate-900",
    accentColor: "text-red-400",
    eli5Overview: "Cybersecurity is the art of defending computer systems against hackers. Ironically, traditional antivirus software written in C had memory vulnerabilities that hackers could exploit to hijack the entire machine! With Rust, security software is mathematically immune to buffer overflows and memory corruption, making it the top choice for modern security agents, packet analyzers, and automated vulnerability scanners.",
    whyRustDominates: "Security agents must inspect untrusted, hostile data arriving from the internet at 40 Gigabits per second. Rust's zero-cost safe parsers and eBPF integration (Aya) allow line-rate threat detection without crashing the operating system.",
    legacyFlawsVsRust: {
      legacyFlaw: "Security agents written in C/C++ introduced new zero-day vulnerabilities onto customer laptops, while Go/Python agents consumed too much RAM.",
      rustFix: "Rust produces tiny native binaries with zero garbage collection overhead and compile-time bounds checking on all byte buffers.",
      measuredImpact: "10x lower memory footprint than Go agents and zero protocol parser CVE vulnerabilities."
    },
    whatYouWillBuild: [
      "Raw socket network packet sniffers & DNS query analyzers",
      "eBPF process threat monitoring agents with Aya",
      "Automated coverage-guided fuzzers with LibAFL",
      "Constant-time cryptographic verifiers resistant to timing attacks",
      "YARA-style memory scanners for malware detection"
    ],
    salaryAndDemand: "$145,000 – $230,000 USD • Major employers: CrowdStrike, Mandiant, Cloudflare, Apple Security",
    beginnerZeroPrerequisites: [
      "No security experience required — we explain packets, ports, and protocols from scratch",
      "Basic Linux terminal command line familiarity"
    ],
    capstoneProject: {
      title: "eBPF-Powered Host Telemetry & Ransomware Interceptor",
      level: "Staff Security Architect",
      description: "Build an endpoint security daemon in Rust that loads eBPF bytecode into the Linux kernel, intercepts file write and execution syscalls, and alerts in real-time when anomalous process trees spawn.",
      stepByStepGuide: [
        "Initialize an Aya project: `cargo generate --name my_edr https://github.com/aya-rs/aya-template`.",
        "Write a kernel-space tracepoint hook attached to `sys_enter_execve`.",
        "Capture process PID, UID, and executable binary paths into an eBPF Ring Buffer.",
        "Consume events in the user-space Rust daemon and check against known malicious MITRE ATT&CK patterns.",
        "Add a safe kill switch to terminate suspicious processes using Linux `nix::sys::signal`."
      ]
    },
    mustKnowCrates: [
      { name: "aya", purpose: "Pure Rust eBPF library that runs inside the Linux kernel", link: "https://aya-rs.dev" },
      { name: "nom", purpose: "Blazing fast zero-copy parser combinators for byte streams", link: "https://crates.io/crates/nom" },
      { name: "libafl", purpose: "State-of-the-art modular fuzzer for finding security zero-days", link: "https://github.com/AFLplusplus/LibAFL" },
      { name: "ring", purpose: "Constant-time, safe cryptographic primitives", link: "https://crates.io/crates/ring" }
    ],
    interviewPrep: [
      {
        question: "How do you guarantee constant-time execution in cryptographic routines to prevent timing attacks?",
        expectedAnswer: "Standard equality operators return early on the first mismatched byte, leaking secrets via timing. Rust developers use the `subtle` crate (`ConstantTimeEq`) so every byte is checked regardless of mismatch, taking constant CPU cycles."
      },
      {
        question: "Why is Nom considered a safer way to parse hostile network protocols than manual pointer arithmetic?",
        expectedAnswer: "Nom uses parser combinators that enforce strict slice boundary checks without copying bytes. It returns `IResult<&[u8], Output>`, mathematically guaranteeing that out-of-bounds reads cannot occur."
      }
    ],
    phases: [
      {
        phaseTitle: "Phase 1: Beginner Foundations",
        phaseDescription: "Understand raw network packets, parse IP and TCP headers, and build your first network traffic sniffer.",
        skills: [
          {
            id: "cs-p1-1",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.1 Raw Sockets & Promiscuous Mode Sniffing",
            eli5: "Your computer's network card normally ignores packets not addressed to it. Promiscuous mode tells the card: 'Give me every single packet flying across the wifi network so I can inspect it.'",
            whyInThisIndustry: "Network security monitoring begins with capturing raw Ethernet, IP, and TCP packets from physical wires.",
            conceptsToMaster: [
              "Raw socket interfaces with the `pnet` crate",
              "MAC addresses, IPv4 vs IPv6, and TCP/UDP ports",
              "Slices and byte borrowing in Rust (`&[u8]`)"
            ],
            codeExample: {
              title: "Listening to Raw Network Traffic in Rust",
              description: "Captures live network packets from an active network interface.",
              code: `use pnet::datalink::{self, Channel::Ethernet};

fn main() {
    let interfaces = datalink::interfaces();
    let interface = interfaces.into_iter().next().expect("No network card found");
    
    let (_, mut rx) = match datalink::channel(&interface, Default::default()) {
        Ok(Ethernet(tx, rx)) => (tx, rx),
        _ => panic!("Unhandled channel type"),
    };

    println!("Sniffing live traffic on: {}", interface.name);
    loop {
        let packet = rx.next().unwrap();
        println!("Captured packet: {} bytes", packet.len());
    }
}`
            },
            exercise: {
              task: "Filter captured packets to print only incoming TCP packets directed at port 80 or 443 (web traffic).",
              hint: "Check byte offsets 12..14 for EtherType and byte 23 for protocol == 6 (TCP)."
            },
            estimatedTime: "6–10 hours"
          },
          {
            id: "cs-p1-2",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.2 Safe Zero-Copy Packet Parsing with Nom",
            eli5: "When parsing network traffic from unknown sources, hackers often send malformed data designed to crash parsers. Nom safely cuts binary slices without copying them into memory.",
            whyInThisIndustry: "Nom parser combinators guarantee that your security tool itself will never crash or get hacked by hostile network traffic.",
            conceptsToMaster: [
              "Parser combinators and the `IResult` type",
              "Endianness: converting Network Byte Order (Big Endian) to CPU integers",
              "Zero-heap allocations during parsing"
            ],
            codeExample: {
              title: "Parsing an IPv4 Header with Nom",
              description: "Decodes binary packet headers safely in nanoseconds.",
              code: `use nom::{IResult, number::complete::{be_u8, be_u16, be_u32}};

#[derive(Debug)]
pub struct Ipv4Header {
    pub ttl: u8,
    pub protocol: u8,
    pub src_ip: u32,
    pub dst_ip: u32,
}

pub fn parse_ipv4(input: &[u8]) -> IResult<&[u8], Ipv4Header> {
    let (input, _ihl) = be_u8(input)?;
    let (input, _dscp) = be_u8(input)?;
    let (input, _len) = be_u16(input)?;
    let (input, _id) = be_u16(input)?;
    let (input, _flags) = be_u16(input)?;
    let (input, ttl) = be_u8(input)?;
    let (input, protocol) = be_u8(input)?;
    let (input, _csum) = be_u16(input)?;
    let (input, src_ip) = be_u32(input)?;
    let (input, dst_ip) = be_u32(input)?;

    Ok((input, Ipv4Header { ttl, protocol, src_ip, dst_ip }))
}`
            },
            exercise: {
              task: "Extend the parser to decode TCP headers (source port, destination port, sequence number, flags).",
              hint: "Use `be_u16` for ports and `be_u32` for sequence numbers."
            },
            estimatedTime: "10–15 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 2: Intermediate Practitioner",
        phaseDescription: "Write in-kernel security monitors using eBPF with Aya, intercept syscalls, and stream events to user-space.",
        skills: [
          {
            id: "cs-p2-1",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.1 Linux In-Kernel Monitoring with eBPF (Aya)",
            eli5: "eBPF is like a tiny secure virtual machine running directly inside the Linux kernel. It lets you monitor every file opened, process launched, and network socket connected in real time.",
            whyInThisIndustry: "Modern Endpoint Detection & Response (EDR) agents (like CrowdStrike or Datadog) use eBPF. Aya lets you write both kernel and user code in 100% pure Rust.",
            conceptsToMaster: [
              "eBPF bytecode verifier rules (bounded loops, memory access limits)",
              "Kernel tracepoints (`sys_enter_execve`, `sys_enter_openat`)",
              "Streaming kernel events with eBPF Ring Buffers"
            ],
            codeExample: {
              title: "Aya Tracepoint Handler (Kernel Concept)",
              description: "Hooks process creation events directly inside the kernel.",
              code: `// Compiled for bpfel-unknown-none target with Aya:
// #[tracepoint(name = "sys_enter_execve")]
// pub fn hook_process_launch(ctx: TracePointContext) -> u32 {
//     // Read process name and push to ring buffer
//     0
// }`
            },
            exercise: {
              task: "Create an Aya project that prints a notification in your terminal whenever any program executes `sudo`.",
              hint: "Inspect the filename argument passed into `execve`."
            },
            estimatedTime: "20–25 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 3: Advanced Architectures",
        phaseDescription: "Automated vulnerability hunting with coverage-guided fuzzers (LibAFL) and constant-time cryptography.",
        skills: [
          {
            id: "cs-p3-1",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.1 Coverage-Guided Binary Fuzzing with LibAFL",
            eli5: "Fuzzing is like an automated robot tester that generates millions of mutated inputs every second to find hidden crashes, panics, and security flaws in software.",
            whyInThisIndustry: "Google, Microsoft, and defense contractors use fuzzers to find zero-day vulnerabilities. LibAFL is the state-of-the-art modular fuzzer in Rust.",
            conceptsToMaster: [
              "Coverage feedback (LLVM SanitizerCoverage)",
              "Mutation strategies (bit flips, byte swaps, dictionary insertions)",
              "Corpus management and crash deduplication"
            ],
            codeExample: {
              title: "A Fuzzing Harness with cargo-fuzz",
              description: "Tests a function against endless randomized stress mutations.",
              code: `// libfuzzer / cargo-fuzz harness:
// fuzz_target!(|data: &[u8]| {
//     // Pass hostile randomized byte data to parser:
//     let _ = parse_untrusted_input(data);
// });`
            },
            exercise: {
              task: "Write a fuzzer that targets a custom image decoder and verify that it handles unexpected EOF and malformed headers without panicking.",
              hint: "Use `cargo fuzz init` and `cargo fuzz run target1`."
            },
            estimatedTime: "25–35 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 4: Staff/Principal Master",
        phaseDescription: "Constant-time side-channel defense, memory injection analysis, and microVM malware sandboxing.",
        skills: [
          {
            id: "cs-p4-1",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.1 Side-Channel Attacks & Constant-Time Cryptography",
            eli5: "Hackers can measure the exact nanoseconds a server takes to verify a password to guess secret characters one by one. Constant-time code prevents this by taking the exact same time every run.",
            whyInThisIndustry: "Mission-critical security software must prevent timing leaks. You will master the `subtle` crate and compiler assembly inspection.",
            conceptsToMaster: [
              "CPU branch predictor and cacheline timing side-channels",
              "Constant-time conditional selection (`ConditionallySelectable`)",
              "Verifying generated assembly with `cargo-show-asm`"
            ],
            codeExample: {
              title: "Constant-Time Token Comparison with Subtle",
              description: "Prevents timing attacks when comparing secret tokens.",
              code: `use subtle::ConstantTimeEq;

pub fn verify_token(provided: &[u8], expected: &[u8]) -> bool {
    // Standard == returns early on first wrong byte (timing leak!)
    // ct_eq always inspects EVERY byte in constant time:
    provided.ct_eq(expected).into()
}`
            },
            exercise: {
              task: "Implement HMAC-SHA256 signature verification using constant-time comparison.",
              hint: "Never use `==` on hash digests in authentication code."
            },
            estimatedTime: "30–40 hours"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. DEFENSE, AVIONICS & CRITICAL INFRASTRUCTURE
  // =========================================================================
  {
    id: "defense-aerospace",
    title: "Defense, Avionics & Critical Infrastructure",
    tagline: "DO-178C avionics certification, satellite guidance, missile controllers, and formal verification.",
    icon: "Rocket",
    badge: "Mission-Critical Precision",
    color: "from-yellow-600 via-amber-700 to-stone-900",
    accentColor: "text-yellow-400",
    eli5Overview: "In a fighter jet, space satellite, or missile guidance system, a software crash isn't just an inconvenience—it can cause a rocket to veer off course or an aircraft to lose flight control. Historically, aviation code required millions of dollars in manual audits. Rust, combined with the qualified Ferrocene compiler, allows aerospace engineers to mathematically prove their code cannot crash or leak memory before the rocket ever leaves the launchpad.",
    whyRustDominates: "The Ferrocene compiler is the world's first safety-qualified Rust compiler, certified for ISO 26262 (ASIL D automotive) and IEC 61508 (SIL 4 industrial). Rust provides mathematical certainty without the slowness of legacy Ada.",
    legacyFlawsVsRust: {
      legacyFlaw: "C and C++ required thousands of pages of manual code reviews to verify MISRA compliance, yet memory bugs still slipped into flight firmware.",
      rustFix: "Rust eliminates pointer arithmetic hazards at compile time, and formal tools like Kani prove that loops terminate and functions never panic.",
      measuredImpact: "100% prevention of memory corruption faults and 50% faster certification cycles for DO-178C Level A avionics."
    },
    whatYouWillBuild: [
      "Satellite guidance, navigation, and control (GNC) loops",
      "DO-178C Level A compliant flight controller state machines",
      "Mathematically verified algorithms using the Kani model checker",
      "Static zero-allocation telemetry loggers with Heapless",
      "Spacecraft bus communication drivers (MIL-STD-1553 and CAN)"
    ],
    salaryAndDemand: "$150,000 – $250,000 USD • Major employers: NASA JPL, ESA, Lockheed Martin, SpaceX, Anduril",
    beginnerZeroPrerequisites: [
      "No aerospace background required — we explain state machines and telemetry from scratch",
      "Appreciation for precision and mathematical correctness"
    ],
    capstoneProject: {
      title: "DO-178C Level A Spacecraft Staging & Telemetry Flight Computer",
      level: "Avionics Principal Engineer",
      description: "Build a flight software sequencer using the type-state pattern that enforces stage separation rules, logs sensor telemetry without dynamic heap allocation, and is mathematically proven panic-free with Kani.",
      stepByStepGuide: [
        "Create a `#![no_std]` project using `heapless::Vec` for fixed-capacity memory.",
        "Model flight stages (`PreLaunch`, `BoostPhase`, `Separation`, `Orbit`) using zero-sized types (ZSTs).",
        "Implement state transitions that consume ownership: `fn ignite(self: Rocket<PreLaunch>) -> Rocket<BoostPhase>`.",
        "Write a Kani model proof verifying that trajectory calculations never divide by zero.",
        "Simulate hardware-in-the-loop (HIL) telemetry streaming over a virtual serial bus."
      ]
    },
    mustKnowCrates: [
      { name: "kani", purpose: "Automated mathematical model checker to prove panic-freedom", link: "https://model-checking.github.io/kani/" },
      { name: "heapless", purpose: "Static data structures that never allocate heap memory", link: "https://crates.io/crates/heapless" },
      { name: "embedded-hal", purpose: "Hardware abstraction layer for microcontrollers", link: "https://crates.io/crates/embedded-hal" },
      { name: "defmt", purpose: "Ultra-compact binary logging for resource-constrained aerospace chips", link: "https://crates.io/crates/defmt" }
    ],
    interviewPrep: [
      {
        question: "How do you guarantee that flight software will never panic or run out of memory during a rocket launch?",
        expectedAnswer: "Eliminate dynamic heap allocation using `heapless` static buffers; replace array index lookups with checked iterators or Kani proofs; and set `panic = abort` so no panicking code paths exist."
      },
      {
        question: "What is Ferrocene, and why is qualification crucial for defense and aerospace?",
        expectedAnswer: "Standard rustc updates too quickly for aerospace regulators. Ferrocene is a qualified compiler snapshot with traceable test artifacts certified to ISO 26262 ASIL D and IEC 61508 SIL 4."
      }
    ],
    phases: [
      {
        phaseTitle: "Phase 1: Beginner Foundations",
        phaseDescription: "Learn to write code with ZERO dynamic memory allocation, ensuring flight memory can never be exhausted.",
        skills: [
          {
            id: "da-p1-1",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.1 Zero Heap Allocation with the Heapless Crate",
            eli5: "In space, computers have tiny RAM chips (often just 128 Kilobytes). If your code asks for memory dynamically, it might run out and crash the rocket. Heapless gives you arrays and lists with fixed sizes stored entirely on the stack.",
            whyInThisIndustry: "Avionics coding standards (like MISRA and DO-178C) strictly ban dynamic heap allocation (`malloc`) during mission flight phases.",
            conceptsToMaster: [
              "Fixed-capacity data structures (`heapless::Vec`, `heapless::String`)",
              "Compile-time capacity bounds (`Vec<T, 32>`)",
              "Graceful error handling when fixed buffers are full"
            ],
            codeExample: {
              title: "Fixed-Capacity Flight Telemetry Recorder",
              description: "Records telemetry samples with zero heap allocation.",
              code: `use heapless::Vec;

#[derive(Debug, Clone, Copy)]
pub struct FlightSample {
    pub altitude_meters: f32,
    pub timestamp_ms: u32,
}

pub struct BlackBox {
    // Holds at most 16 samples inline on the stack:
    samples: Vec<FlightSample, 16>,
}

impl BlackBox {
    pub fn new() -> Self {
        Self { samples: Vec::new() }
    }

    pub fn record(&mut self, sample: FlightSample) -> Result<(), &'static str> {
        self.samples.push(sample).map_err(|_| "Blackbox buffer full!")
    }
}`
            },
            exercise: {
              task: "Create a fixed-capacity ring buffer that stores the 8 most recent altitude readings and overwrites the oldest reading when full.",
              hint: "Use an insertion index with modulo arithmetic (`idx = (idx + 1) % 8`)."
            },
            estimatedTime: "6–10 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 2: Intermediate Practitioner",
        phaseDescription: "Use Rust's type system to physically prevent illegal state transitions in flight hardware.",
        skills: [
          {
            id: "da-p2-1",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.1 The Type-State Pattern for Mission Hardware",
            eli5: "Imagine a physical safety interlock where it is physically impossible to turn the ignition key until the safety pin is pulled. In Rust, we use types so that calling `launch()` on an unarmed rocket fails to compile!",
            whyInThisIndustry: "Accidental operator or software sequence errors cause catastrophic launch failures. Type-states catch sequence errors during compilation.",
            conceptsToMaster: [
              "Zero-Sized Types (ZSTs) as compile-time state tags",
              "Consuming ownership (`self`) so previous states cannot be reused",
              "Eliminating runtime boolean flags (`if is_armed && is_ready`)"
            ],
            codeExample: {
              title: "Compile-Time Enforced Missile Interlock",
              description: "Illegal operational transitions fail to compile.",
              code: `// State markers
pub struct Safe;
pub struct Armed;

pub struct Missile<State> {
    serial_no: u32,
    _state: core::marker::PhantomData<State>,
}

impl Missile<Safe> {
    pub fn new(serial_no: u32) -> Self {
        Self { serial_no, _state: core::marker::PhantomData }
    }

    // Consumes Safe missile, returns Armed missile
    pub fn arm(self, pin_code: u32) -> Missile<Armed> {
        Missile { serial_no: self.serial_no, _state: core::marker::PhantomData }
    }
}

impl Missile<Armed> {
    pub fn launch(self) {
        println!("Missile {} ignited!", self.serial_no);
    }
}

fn main() {
    let missile = Missile::new(101);
    let armed = missile.arm(1234);
    armed.launch();
    // missile.launch(); // COMPILE ERROR: launch() does not exist on Safe missile!
}`
            },
            exercise: {
              task: "Model a satellite solar panel deployment sequence: `Stowed -> Deploying -> LockedInPlace`.",
              hint: "Implement `charge_batteries()` only when panels are `LockedInPlace`."
            },
            estimatedTime: "12–16 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 3: Advanced Architectures",
        phaseDescription: "Mathematically verify software correctness and panic-freedom using the Kani model checker.",
        skills: [
          {
            id: "da-p3-1",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.1 Formal Verification with the Kani Model Checker",
            eli5: "Standard tests only test 5 or 10 specific inputs. Kani uses formal mathematics to test ALL 4 billion possible numbers simultaneously to prove your flight code can never crash or divide by zero.",
            whyInThisIndustry: "DO-178C Level A certification requires rigorous formal verification for software whose failure would cause loss of life.",
            conceptsToMaster: [
              "Bounded model checking with the Kani verifier",
              "Symbolic input generation with `kani::any()`",
              "Proving loop invariants and panic-freedom"
            ],
            codeExample: {
              title: "Mathematically Proving Altitude Math Never Panics",
              description: "Verifies safe division for all possible 16-bit sensor inputs.",
              code: `#[cfg(kani)]
#[kani::proof]
fn verify_safe_altitude_calculation() {
    let sensor_reading: u16 = kani::any();
    // Prove that calculate_altitude never panics for any sensor value:
    let _ = calculate_altitude(sensor_reading);
}

fn calculate_altitude(raw: u16) -> u32 {
    let divisor = (raw as u32) + 1; // can never be 0
    100_000 / divisor
}`
            },
            exercise: {
              task: "Write a PID speed controller and verify with Kani that it never overflows 32-bit integer limits.",
              hint: "Use `kani::assume` to constrain inputs to physical sensor ranges."
            },
            estimatedTime: "20–25 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 4: Staff/Principal Master",
        phaseDescription: "Triple Modular Redundancy (TMR) against radiation bit-flips and space bus protocols.",
        skills: [
          {
            id: "da-p4-1",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.1 Radiation Bit-Flip Defense & TMR Voting",
            eli5: "Space is filled with cosmic radiation that randomly flips 0s to 1s in memory chips. Spacecraft run 3 identical calculations on separate chips and take a majority vote to ensure accuracy.",
            whyInThisIndustry: "Satellites outside Earth's atmosphere cannot be physically repaired. Software must survive radiation Single Event Upsets (SEUs).",
            conceptsToMaster: [
              "Triple Modular Redundancy (TMR) algorithmic voting",
              "CRC32 error-detecting polynomial checksums",
              "MIL-STD-1553 and CAN bus serial communication"
            ],
            codeExample: {
              title: "Triple Modular Redundancy Voting in Rust",
              description: "Ensures correct sensor output even if radiation flips a memory bit.",
              code: `pub fn tmr_vote<T: PartialEq + Copy>(a: T, b: T, c: T) -> Result<T, &'static str> {
    if a == b || a == c {
        Ok(a)
    } else if b == c {
        Ok(b)
    } else {
        Err("Radiation anomaly: All 3 sensors divergent!")
    }
}`
            },
            exercise: {
              task: "Build a flight loop that samples 3 gyroscopes, applies TMR voting, and outputs commands at a deterministic 100Hz rate.",
              hint: "Use hardware timer interrupts without dynamic allocation."
            },
            estimatedTime: "30+ hours"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. CLOUD INFRASTRUCTURE & DISTRIBUTED SYSTEMS
  // =========================================================================
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure & Distributed Systems",
    tagline: "MicroVM hypervisors, service meshes, cloud storage engines, and consensus algorithms.",
    icon: "Cloud",
    badge: "Modern Backend Scale",
    color: "from-cyan-600 via-blue-700 to-slate-900",
    accentColor: "text-cyan-400",
    eli5Overview: "When you stream a movie or order food, thousands of servers work together behind the scenes. In traditional cloud services written in Java or Go, servers periodically freeze for 200 milliseconds to clean up memory (garbage collection), causing sudden lag spikes. Rust uses almost zero RAM and never freezes, enabling companies like Amazon to boot micro-servers in 5 milliseconds instead of 5 seconds.",
    whyRustDominates: "Amazon built AWS Firecracker (powering AWS Lambda) in Rust. Linkerd replaced its Scala/Go proxy with Rust, cutting memory usage by 90% and eliminating tail latency spikes.",
    legacyFlawsVsRust: {
      legacyFlaw: "Java and Go have unpredictable garbage collection pauses (p99 tail latency) and consume 500MB of RAM per microservice.",
      rustFix: "No Garbage Collector: Flat sub-millisecond latency curves and tiny 15MB memory footprints.",
      measuredImpact: "5ms serverless cold boots and 80% cloud server cost reduction."
    },
    whatYouWillBuild: [
      "Ultra-fast asynchronous reverse proxies and HTTP/2 gateways",
      "High-throughput gRPC microservices using Tonic",
      "LSM-Tree persistent storage engines (RocksDB style)",
      "Distributed consensus clusters using the Raft protocol",
      "Lightweight microVM hypervisors utilizing Linux KVM"
    ],
    salaryAndDemand: "$150,000 – $240,000 USD • Major employers: AWS, Microsoft Azure, Cloudflare, Datadog",
    beginnerZeroPrerequisites: [
      "No cloud experience needed — we teach client-server networking from the ground up",
      "Basic understanding of IP addresses and HTTP requests"
    ],
    capstoneProject: {
      title: "Distributed Raft Consensus Key-Value Cluster",
      level: "Staff Distributed Systems Architect",
      description: "Build a 3-node distributed fault-tolerant database cluster using the Raft consensus algorithm that automatically elects a new leader when one crashes and replicates transactions consistently.",
      stepByStepGuide: [
        "Create an asynchronous networking service with Tokio and Tonic (gRPC).",
        "Implement Raft leader election with randomized heartbeat timers.",
        "Replicate an append-only transaction log across all follower nodes.",
        "Build a state machine that applies committed transactions to an in-memory key-value store.",
        "Add chaos-testing scripts simulating network drops to verify zero data loss."
      ]
    },
    mustKnowCrates: [
      { name: "tokio", purpose: "The de-facto multi-threaded asynchronous runtime for scalable servers", link: "https://tokio.rs" },
      { name: "tonic", purpose: "Blazing fast gRPC client and server framework built on Prost", link: "https://crates.io/crates/tonic" },
      { name: "hyper", purpose: "Ultra-fast, correct HTTP/1.1 and HTTP/2 implementation", link: "https://hyper.rs" },
      { name: "io-uring", purpose: "Zero-copy Linux kernel asynchronous I/O interface", link: "https://crates.io/crates/io-uring" }
    ],
    interviewPrep: [
      {
        question: "What happens if you run a CPU-bound blocking computation inside an async Tokio task?",
        expectedAnswer: "It starves the Tokio worker thread, blocking all other asynchronous tasks multiplexed onto that thread. The solution is `tokio::task::spawn_blocking` or a dedicated Rayon threadpool."
      },
      {
        question: "How does Linux io_uring differ from traditional epoll in high-throughput network engines?",
        expectedAnswer: "epoll is readiness-based and requires subsequent syscalls to read/write. io_uring is completion-based using submission and completion ring buffers shared directly with the kernel, avoiding syscall overhead."
      }
    ],
    phases: [
      {
        phaseTitle: "Phase 1: Beginner Foundations",
        phaseDescription: "Master asynchronous Rust with Tokio, handle concurrent TCP sockets, and build a non-blocking network server.",
        skills: [
          {
            id: "cl-p1-1",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.1 Async Rust & The Tokio Multi-Threaded Runtime",
            eli5: "Synchronous code is like a chef who puts soup on the stove and stands frozen for 30 minutes staring at it. Asynchronous code is a chef who puts the soup on, sets a timer, chops onions, and checks the soup only when notified.",
            whyInThisIndustry: "To handle 100,000 simultaneous users on a single server, you cannot create 100,000 OS threads. Tokio multiplexes all tasks cooperatively onto a few CPU cores.",
            conceptsToMaster: [
              "Async functions (`async fn`) and `.await` syntax",
              "The `#[tokio::main]` macro and worker thread pool",
              "Non-blocking TCP sockets with `tokio::net::TcpListener`"
            ],
            codeExample: {
              title: "Asynchronous TCP Echo Server in 25 Lines",
              description: "Handles thousands of concurrent clients without thread exhaustion.",
              code: `use tokio::net::TcpListener;
use tokio::io::{AsyncReadExt, AsyncWriteExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let listener = TcpListener::bind("127.0.0.1:8080").await?;
    println!("Server running on 127.0.0.1:8080");

    loop {
        let (mut socket, _) = listener.accept().await?;
        tokio::spawn(async move {
            let mut buf = [0u8; 1024];
            while let Ok(n) = socket.read(&mut buf).await {
                if n == 0 { break; }
                if socket.write_all(&buf[..n]).await.is_err() { break; }
            }
        });
    }
}`
            },
            exercise: {
              task: "Build an async Chat Room server where messages sent by any connected client are broadcast to all other connected clients.",
              hint: "Use `tokio::sync::broadcast` channel."
            },
            estimatedTime: "8–12 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 2: Intermediate Practitioner",
        phaseDescription: "Connect microservices using high-speed binary gRPC and Protocol Buffers with Tonic.",
        skills: [
          {
            id: "cl-p2-1",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.1 High-Performance gRPC Microservices with Tonic",
            eli5: "Instead of sending heavy JSON text back and forth, microservices talk using compact binary Protocol Buffers. Tonic generates fast, type-safe RPC endpoints automatically.",
            whyInThisIndustry: "Modern cloud platforms (Google, Netflix, Uber) communicate internally via gRPC for maximum speed and low CPU overhead.",
            conceptsToMaster: [
              "Protocol Buffers (.proto) schema definitions",
              "Compiling protos with `prost` and `tonic-build`",
              "Bidirectional streaming RPCs"
            ],
            codeExample: {
              title: "Tonic gRPC Service Implementation",
              description: "High-performance distributed remote procedure call handler.",
              code: `// Defined in user.proto: service UserService { rpc GetUser (UserRequest) returns (UserResponse); }
// Tonic generates trait UserService:
// async fn get_user(&self, req: Request<UserRequest>) -> Result<Response<UserResponse>, Status>`
            },
            exercise: {
              task: "Create a gRPC service for a file compression worker where clients stream raw bytes and receive compressed zstd bytes.",
              hint: "Use client-streaming and server-streaming RPC methods."
            },
            estimatedTime: "15–20 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 3: Advanced Architectures",
        phaseDescription: "Build persistent storage engines using Write-Ahead Logging (WAL) and Log-Structured Merge (LSM) trees.",
        skills: [
          {
            id: "cl-p3-1",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.1 LSM-Tree Database Engines & Write-Ahead Logs",
            eli5: "Databases cannot afford to lose data if someone trips on the power cord. An append-only log writes incoming data straight to disk sequentially, and background threads compact it.",
            whyInThisIndustry: "Modern distributed databases (TiKV, CockroachDB, RocksDB) rely on LSM-trees for lightning-fast write performance.",
            conceptsToMaster: [
              "Write-Ahead Logging (WAL) for crash resilience",
              "In-memory MemTable using BTrees or SkipLists",
              "SSTables (Sorted String Tables) and Bloom filter lookups"
            ],
            codeExample: {
              title: "Append-Only Write Ahead Log (WAL)",
              description: "Ensures transactions survive power failure.",
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

    pub fn append(&mut self, key: &[u8], val: &[u8]) -> Result<()> {
        self.file.write_all(&(key.len() as u32).to_le_bytes())?;
        self.file.write_all(key)?;
        self.file.write_all(&(val.len() as u32).to_le_bytes())?;
        self.file.write_all(val)?;
        self.file.sync_data()?; // Force flush to physical SSD
        Ok(())
    }
}`
            },
            exercise: {
              task: "Implement a crash-recovery routine that replays the WAL on startup to restore the in-memory database state.",
              hint: "Read binary length-prefixed records until EOF."
            },
            estimatedTime: "25–30 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 4: Staff/Principal Master",
        phaseDescription: "Distributed Raft consensus, KVM hypervisors (AWS Firecracker style), and Linux io_uring.",
        skills: [
          {
            id: "cl-p4-1",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.1 Distributed Raft Consensus & MicroVM Hypervisors",
            eli5: "Make 5 independent servers agree on the exact same data even when internet connections drop. Then boot secure Linux microVMs in 5 milliseconds using KVM.",
            whyInThisIndustry: "Staff cloud architects design distributed consensus protocols and serverless virtualization platforms.",
            conceptsToMaster: [
              "Raft leader election and log replication algorithms",
              "Linux KVM ioctls (`/dev/kvm`) for hardware virtualization",
              "Zero-copy asynchronous disk I/O with Linux `io_uring`"
            ],
            codeExample: {
              title: "Raft Consensus Node Roles",
              description: "State machine governing distributed cluster agreements.",
              code: `pub enum RaftRole {
    Follower { current_leader: Option<u64> },
    Candidate { votes_received: usize },
    Leader { heartbeats_sent: u64 },
}`
            },
            exercise: {
              task: "Implement a 3-node Raft election cluster that triggers elections when heartbeats time out.",
              hint: "Use randomized election timeouts (150ms–300ms) to avoid vote splits."
            },
            estimatedTime: "35+ hours"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. HIGH-FREQUENCY TRADING & LOW-LATENCY FINTECH
  // =========================================================================
  {
    id: "fintech-hft",
    title: "High-Frequency Trading & Low-Latency FinTech",
    tagline: "Sub-microsecond order execution, kernel bypass networking, lock-free ring buffers, and matching engines.",
    icon: "TrendingUp",
    badge: "Ultra-Low Latency & High Pay",
    color: "from-emerald-600 via-teal-700 to-slate-900",
    accentColor: "text-emerald-400",
    eli5Overview: "In high-frequency trading, financial firms buy and sell stocks in billionths of a second. If your algorithm takes 1 microsecond longer than a rival's, you lose millions of dollars. For decades, this industry was 100% C++. But C++ pointer bugs caused catastrophic trading disasters. Rust matches C++ nanosecond execution speeds with absolute compile-time memory safety, making it the fastest-growing language in quantitative trading.",
    whyRustDominates: "Rust has no garbage collector, supports cache-line aligned memory layouts (`#[repr(align(64))]`), and enables lock-free atomic concurrency that executes directly on bare silicon with zero jitter.",
    legacyFlawsVsRust: {
      legacyFlaw: "Java implementations suffered from Stop-The-World garbage collection pauses during high market volatility, costing millions. C++ code suffered from catastrophic data races.",
      rustFix: "Deterministic memory layout, zero GC pauses, and compile-time Send/Sync concurrency proofs.",
      measuredImpact: "Flat sub-microsecond tick-to-trade turnaround times and zero GC latency spikes."
    },
    whatYouWillBuild: [
      "Sub-microsecond Price-Time Priority Limit Order Books (LOB)",
      "Zero-allocation NASDAQ ITCH 5.0 binary feed parsers",
      "Lock-free Single-Producer Single-Consumer (SPSC) circular queues",
      "Nanosecond benchmarking suites using hardware RDTSC timers",
      "Kernel bypass networking integrations with Solarflare and DPDK"
    ],
    salaryAndDemand: "$175,000 – $400,000+ USD (Base + Bonus) • Citadel, Jane Street, Jump Trading, DRW",
    beginnerZeroPrerequisites: [
      "No finance background required — we explain stock bids, asks, and order books from scratch",
      "Curiosity about CPU hardware caches (L1, L2, L3) and nanosecond performance"
    ],
    capstoneProject: {
      title: "Sub-Microsecond Limit Order Book Matching Core",
      level: "Quant Systems Architect",
      description: "Build a complete price-time priority stock matching engine that processes incoming limit and market orders in under 300 nanoseconds with zero dynamic heap allocations on the hot path.",
      stepByStepGuide: [
        "Pre-allocate contiguous flat arrays for bid and ask price levels.",
        "Parse incoming binary ITCH order messages with zero memory copies.",
        "Execute resting orders using price-time (FIFO) priority matching.",
        "Align critical shared structs to 64-byte L1 cache boundaries to eliminate false sharing.",
        "Benchmark performance with Criterion and profile CPU cache misses using Linux `perf`."
      ]
    },
    mustKnowCrates: [
      { name: "crossbeam", purpose: "Lock-free synchronization primitives and atomic memory ordering", link: "https://crates.io/crates/crossbeam" },
      { name: "criterion", purpose: "Statistics-driven nanosecond microbenchmarking framework", link: "https://bheisler.github.io/criterion.rs/book/" },
      { name: "rust_decimal", purpose: "Fixed-point decimal math for exact financial accounting", link: "https://crates.io/crates/rust_decimal" },
      { name: "raw-cpuid", purpose: "Query CPU topology, cache lines, and hardware capabilities", link: "https://crates.io/crates/raw-cpuid" }
    ],
    interviewPrep: [
      {
        question: "Why is std::sync::atomic::Ordering::SeqCst avoided in the hot path of high-frequency trading?",
        expectedAnswer: "Sequential consistency forces CPU memory bus locking instructions that flush pipeline queues. Quant developers use Acquire/Release or Relaxed orderings to achieve thread synchronization with minimal hardware penalty."
      },
      {
        question: "What is false sharing, and how do you eliminate it in Rust?",
        expectedAnswer: "False sharing happens when two threads update separate atomic variables that happen to share the same 64-byte CPU cache line, triggering cache coherency invalidations. It is eliminated with `#[repr(align(64))]`."
      }
    ],
    phases: [
      {
        phaseTitle: "Phase 1: Beginner Foundations",
        phaseDescription: "Understand fixed-point finance math, parse binary market data feeds, and avoid floating point bugs.",
        skills: [
          {
            id: "ft-p1-1",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.1 Fixed-Point Currency & Binary ITCH Feed Parsing",
            eli5: "In standard coding, `0.1 + 0.2` equals `0.30000000000000004` due to floating-point rounding. In banking and trading, that will get you audited! You must represent money in exact integers (like micro-cents).",
            whyInThisIndustry: "Stock exchanges like NASDAQ send binary messages over fiber lines. You must decode ticker symbols, shares, and prices in nanoseconds.",
            conceptsToMaster: [
              "Fixed-point integer representation (e.g. cents as `u64`)",
              "Decoding NASDAQ ITCH 5.0 binary order messages",
              "Zero-allocation byte slice transmutations with `bytemuck`"
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
        format!("\\\${}.{:02}", self.0 / 100, self.0 % 100)
    }
}`
            },
            exercise: {
              task: "Parse a mock binary stream of ITCH 'Add Order' packets and print ticker, share volume, and price in micro-cents.",
              hint: "Read binary slices using `u64::from_be_bytes`."
            },
            estimatedTime: "6–10 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 2: Intermediate Practitioner",
        phaseDescription: "Master lock-free concurrency, atomic memory orderings, and build Single-Producer Single-Consumer (SPSC) circular queues.",
        skills: [
          {
            id: "ft-p2-1",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.1 Lock-Free Circular Queues & Memory Ordering",
            eli5: "A normal Mutex is like a single bathroom with a key; if someone is inside, you must wait outside doing nothing. Lock-free queues use atomic hardware pointers so producer and consumer threads never stop.",
            whyInThisIndustry: "Mutexes put threads to sleep in the OS kernel, burning 5,000 nanoseconds. Lock-free queues execute in under 15 nanoseconds.",
            conceptsToMaster: [
              "Atomics: `AtomicUsize` and memory orderings (`Acquire`, `Release`, `Relaxed`)",
              "Building an SPSC (Single-Producer Single-Consumer) ring buffer",
              "Preventing CPU false sharing with `#[repr(align(64))]`"
            ],
            codeExample: {
              title: "Cache-Line Aligned Atomic Counter",
              description: "Aligns data to 64-byte L1 cache boundaries to prevent core cache invalidation.",
              code: `use std::sync::atomic::{AtomicUsize, Ordering};

#[repr(align(64))] // Align to 64-byte L1 CPU cacheline
pub struct CacheAlignedCounter {
    pub count: AtomicUsize,
}

impl CacheAlignedCounter {
    pub fn increment(&self) {
        self.count.fetch_add(1, Ordering::Relaxed);
    }
}`
            },
            exercise: {
              task: "Implement a circular queue where a network thread pushes tick updates and an evaluation thread pops ticks with zero mutex locks.",
              hint: "Use head and tail atomic indices with `Ordering::Acquire` on reads and `Ordering::Release` on writes."
            },
            estimatedTime: "15–20 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 3: Advanced Architectures",
        phaseDescription: "Build sub-500ns limit order books with pre-allocated memory arenas and nanosecond microbenchmarks.",
        skills: [
          {
            id: "ft-p3-1",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.1 Zero-Allocation Limit Order Book Matching Core",
            eli5: "Match buyers and sellers in under 500 nanoseconds using cache-friendly contiguous arrays instead of dynamic heap allocations.",
            whyInThisIndustry: "Calling `malloc` on the hot path causes CPU cache eviction. Pre-allocated memory arenas keep order data resident in CPU L1/L2 caches.",
            conceptsToMaster: [
              "Price-Time Priority (FIFO) matching logic",
              "Pre-allocated memory arenas to eliminate `malloc` on hot paths",
              "Nanosecond microbenchmarking with Criterion"
            ],
            codeExample: {
              title: "In-Place Order Matching Logic",
              description: "Matches orders in place without heap allocations.",
              code: `pub struct Order {
    pub id: u64,
    pub price_cents: u64,
    pub shares: u32,
}

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
              task: "Benchmark your matching engine using Criterion and verify that average order execution takes under 300 nanoseconds.",
              hint: "Run `cargo bench`."
            },
            estimatedTime: "25–30 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 4: Staff/Principal Master",
        phaseDescription: "Kernel bypass networking with DPDK, CPU core pinning, and hardware timestamp counters (RDTSC).",
        skills: [
          {
            id: "ft-p4-1",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.1 Kernel Bypass Networking (DPDK) & Core Pinning",
            eli5: "Bypass the operating system completely and read network packets straight off the fiber-optic network card in nanoseconds.",
            whyInThisIndustry: "Standard Linux network stacks add 5–15 microseconds of delay. Kernel bypass networking allows receiving market data in under 500 nanoseconds.",
            conceptsToMaster: [
              "Kernel bypass drivers (DPDK, Solarflare OpenOnload)",
              "Pinning threads to isolated CPU cores with `core_affinity`",
              "Reading hardware CPU cycle counters (`_rdtsc`)"
            ],
            codeExample: {
              title: "Pinning Trading Threads to Isolated CPU Cores",
              description: "Prevents operating system task switching on critical trading cores.",
              code: `// Pin execution thread to CPU core 2:
// core_affinity::set_for_current(CoreId { id: 2 });`
            },
            exercise: {
              task: "Measure the exact CPU cycle cost of an order match using `core::arch::x86_64::_rdtsc`.",
              hint: "Subtract start cycle count from end cycle count."
            },
            estimatedTime: "30+ hours"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 7. ROBOTICS & AUTONOMOUS VEHICLES
  // =========================================================================
  {
    id: "robotics-automotive",
    title: "Robotics & Autonomous Vehicles",
    tagline: "ROS2 robotics nodes, sensor fusion (LiDAR/IMU), automotive CAN bus, and real-time motion control.",
    icon: "Bot",
    badge: "Hardware & Physical Autonomy",
    color: "from-purple-600 via-violet-700 to-slate-900",
    accentColor: "text-purple-400",
    eli5Overview: "Self-driving cars and warehouse robots rely on cameras, lasers, and motors to navigate around people. If the software freezes for even 10 milliseconds, a car could miss an obstacle. In traditional C++ robotics, nodes frequently crashed from null pointer bugs. Rust provides hard real-time guarantees, ensuring autonomous robots never crash or freeze mid-motion.",
    whyRustDominates: "ROS2 Rust client libraries (`rclrs`) provide thread-safe message passing across perception and navigation nodes. Rust runs on automotive ECUs compliant with ISO 26262 ASIL D.",
    legacyFlawsVsRust: {
      legacyFlaw: "ROS1 C++ nodes suffered from silent memory leaks and race conditions that caused autonomous vehicles to freeze intermittently during road tests.",
      rustFix: "Type-safe publisher/subscriber channels, zero segmentation faults, and native SIMD vector acceleration.",
      measuredImpact: "Zero perception crashes and 60% faster sensor fusion throughput."
    },
    whatYouWillBuild: [
      "Native ROS2 robotics nodes with the `rclrs` framework",
      "Automotive CAN bus telemetry decoders for steering and brakes",
      "Extended Kalman Filters fusing noisy IMU, GPS, and wheel odometry",
      "Hard real-time motor control loops running at 20,000 Hz",
      "SIMD-accelerated 3D LiDAR point cloud coordinate filters"
    ],
    salaryAndDemand: "$140,000 – $230,000 USD • Major employers: Tesla, Waymo, Boston Dynamics, Amazon Robotics",
    beginnerZeroPrerequisites: [
      "No robotics experience required — we explain coordinate systems and motors simply",
      "Basic trigonometry (X, Y, Z axes and angles)"
    ],
    capstoneProject: {
      title: "Autonomous Robot Sensor Fusion & Motion Controller",
      level: "Autonomous Systems Architect",
      description: "Build an autonomous robot controller that ingests simulated LiDAR point clouds and noisy IMU telemetry, fuses them with a Kalman filter to estimate position, and broadcasts drive commands over a CAN bus interface.",
      stepByStepGuide: [
        "Create a 3D coordinate transformation pipeline with `nalgebra`.",
        "Implement a 1D/2D Kalman filter to smooth noisy sensor readings.",
        "Connect to a Linux SocketCAN interface to broadcast motor control frames.",
        "Set real-time thread scheduling using `SCHED_FIFO` to prevent timing jitter.",
        "Package as a native ROS2 node publishing telemetry to standard visualization tools."
      ]
    },
    mustKnowCrates: [
      { name: "nalgebra", purpose: "Linear algebra, matrix math, and 3D coordinate transformations", link: "https://nalgebra.org" },
      { name: "socketcan", purpose: "Linux SocketCAN interface for automotive networking", link: "https://crates.io/crates/socketcan" },
      { name: "heapless", purpose: "Static data structures for memory-constrained robotics controllers", link: "https://crates.io/crates/heapless" },
      { name: "embedded-hal", purpose: "Hardware abstraction layer for motor controllers, PWM, and I2C/SPI", link: "https://crates.io/crates/embedded-hal" }
    ],
    interviewPrep: [
      {
        question: "How do you ensure a Rust control loop meets hard real-time deadlines without unexpected jitter?",
        expectedAnswer: "Eliminate dynamic allocation in the hot loop, lock memory pages with `mlockall` to prevent paging out, set thread priority with `SCHED_FIFO`, and avoid synchronization primitives that trigger thread yields."
      },
      {
        question: "Why are Quaternions preferred over Euler angles (pitch, roll, yaw) in robotics orientation?",
        expectedAnswer: "Euler angles suffer from 'gimbal lock', where two axes align and lose a degree of freedom. Quaternions provide smooth interpolation without singularities."
      }
    ],
    phases: [
      {
        phaseTitle: "Phase 1: Beginner Foundations",
        phaseDescription: "Understand 3D coordinate geometry, matrix transforms with Nalgebra, and robot poses.",
        skills: [
          {
            id: "rb-p1-1",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.1 3D Coordinate Math & Matrix Transforms with Nalgebra",
            eli5: "A robot camera detects an obstacle 2 meters ahead. Where is that obstacle relative to the room? You translate coordinates using matrix math so the robot doesn't bump into walls.",
            whyInThisIndustry: "Perception, localization, and motor trajectory planning depend on 3D linear algebra.",
            conceptsToMaster: [
              "Vectors, points, and coordinate frames with `nalgebra`",
              "Translating local camera coordinates to global map coordinates",
              "SIMD hardware vector acceleration"
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
              hint: "Use `UnitQuaternion::from_euler_angles` from `nalgebra`."
            },
            estimatedTime: "8–12 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 2: Intermediate Practitioner",
        phaseDescription: "Automotive CAN bus communication, decoding DBC signals, and sensor drivers.",
        skills: [
          {
            id: "rb-p2-1",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.1 Automotive CAN Bus & Embedded Drivers",
            eli5: "The CAN bus is the nervous system of modern cars. A shared wire connects the steering wheel, brakes, and engine so they can talk reliably.",
            whyInThisIndustry: "Autonomous vehicle drive-by-wire systems send brake and throttle commands over CAN.",
            conceptsToMaster: [
              "CAN frame structure (11-bit/29-bit IDs, 8-byte payload)",
              "Linux SocketCAN interface with the `socketcan` crate",
              "Decoding DBC signal files (converting raw hex to RPM/Speed)"
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
              task: "Simulate a throttle pedal sending CAN frames with ID `0x120` containing pedal percentage (0–100%).",
              hint: "Write to the socket with `socket.write_frame(&frame)`."
            },
            estimatedTime: "15–20 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 3: Advanced Architectures",
        phaseDescription: "Sensor fusion with Kalman filters and native ROS2 robotics nodes.",
        skills: [
          {
            id: "rb-p3-1",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.1 Sensor Fusion & Kalman Filters",
            eli5: "GPS is accurate over time but bouncy. Accelerometers are smooth but drift. A Kalman filter mathematically combines both to determine your exact true position.",
            whyInThisIndustry: "Real-world sensors are noisy. Kalman filtering is how self-driving cars know exactly where they are on the road.",
            conceptsToMaster: [
              "Extended Kalman Filter (EKF) state estimation math",
              "Noise covariance matrices",
              "ROS2 node architecture with `rclrs`"
            ],
            codeExample: {
              title: "1D Kalman Filter Implementation",
              description: "Mathematically filters out sensor noise.",
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
              task: "Simulate a robot moving with noisy sensor readings and show how the Kalman filter smooths the trajectory.",
              hint: "Generate synthetic readings with `rand::random` noise."
            },
            estimatedTime: "20–25 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 4: Staff/Principal Master",
        phaseDescription: "Hard real-time motor control loops (#![no_std]) running at 20,000 Hz with zero timing jitter.",
        skills: [
          {
            id: "rb-p4-1",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.1 Hard Real-Time Motor Control (#![no_std])",
            eli5: "Run a 20,000-times-per-second control loop directly on a motor chip that never misses a microsecond deadline.",
            whyInThisIndustry: "Electric vehicle inverters and drone motors require Field Oriented Control (FOC) loops executing within 50 microseconds without jitter.",
            conceptsToMaster: [
              "Bare-metal ARM Cortex-M microcontrollers (#![no_std])",
              "Field Oriented Control (FOC) for brushless DC motors",
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
              hint: "Use `cortex-m-rt` and the device peripheral access crate."
            },
            estimatedTime: "30+ hours"
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 8. WEBASSEMBLY, EDGE COMPUTING & MODERN WEB
  // =========================================================================
  {
    id: "webassembly-edge",
    title: "WebAssembly, Edge Computing & Modern Web",
    tagline: "Ultra-portable sandboxed execution, browser high-performance engines, and edge serverless workers.",
    icon: "Globe",
    badge: "Portable High Performance",
    color: "from-teal-600 via-emerald-700 to-slate-900",
    accentColor: "text-teal-400",
    eli5Overview: "Have you ever used Figma or Adobe Photoshop directly inside your web browser and wondered how it runs so fast? That's WebAssembly! WebAssembly lets code written in Rust run inside Chrome, Firefox, or Safari almost as fast as a desktop video game. Furthermore, companies like Cloudflare and Fastly use Rust WebAssembly to run serverless apps near users in under 50 microseconds.",
    whyRustDominates: "Rust has first-class WebAssembly target support built right into the official compiler. The `wasm-bindgen` tool automatically creates TypeScript bindings, allowing seamless JavaScript interoperability.",
    legacyFlawsVsRust: {
      legacyFlaw: "JavaScript is too slow for heavy graphics, audio DSP, video editing, and cryptography. Docker containers take 500ms to boot at the edge.",
      rustFix: "Compiles to compact WebAssembly binaries that boot in 50 microseconds and execute at near-native CPU speeds.",
      measuredImpact: "50-microsecond serverless cold starts and desktop-class 60fps rendering in browser tabs."
    },
    whatYouWillBuild: [
      "In-browser 60fps image filters and vector rendering engines",
      "Sandboxed serverless worker runtimes with Wasmtime and WASI",
      "Secure multi-tenant plugin architectures for desktop and SaaS apps",
      "Client-side cryptographic signers and zero-knowledge proof verifiers",
      "Cloudflare Workers and Fastly Compute@Edge microservices"
    ],
    salaryAndDemand: "$135,000 – $220,000 USD • Rapidly growing sector in SaaS, DevTools & Web platforms",
    beginnerZeroPrerequisites: [
      "Basic familiarity with web pages (HTML and JavaScript)",
      "Curiosity about running fast code inside browser tabs"
    ],
    capstoneProject: {
      title: "Real-Time In-Browser Image Filter & WASM Plugin Engine",
      level: "WebAssembly Platform Architect",
      description: "Build a high-performance WebAssembly image processing engine that shares memory directly with HTML5 Canvas, plus a server-side Wasmtime plugin sandbox that executes third-party scripts safely with instruction fuel limits.",
      stepByStepGuide: [
        "Create a Rust library with `crate-type = [\"cdylib\"]`.",
        "Implement pixel manipulation algorithms (grayscale, blur, contrast) with `wasm-bindgen`.",
        "Share linear memory directly with JavaScript `ImageData` buffers for zero-copy 60fps updates.",
        "Build a server CLI using Wasmtime to run untrusted plugins with strict fuel metering.",
        "Deploy to Cloudflare Workers or GitHub Pages for instant public access."
      ]
    },
    mustKnowCrates: [
      { name: "wasm-bindgen", purpose: "Bridges Rust and JavaScript with automatic type bindings", link: "https://rustwasm.github.io/wasm-bindgen/" },
      { name: "wasmtime", purpose: "Fast and secure standalone runtime for WebAssembly and WASI", link: "https://wasmtime.dev" },
      { name: "web-sys", purpose: "Raw Rust bindings to all Web APIs (DOM, Canvas, WebGL)", link: "https://crates.io/crates/web-sys" },
      { name: "wasi-common", purpose: "Implements the WASI system call interface for standalone runtimes", link: "https://crates.io/crates/wasi-common" }
    ],
    interviewPrep: [
      {
        question: "How does WebAssembly linear memory work, and what security risks does it have if unsafe Rust is used?",
        expectedAnswer: "WASM linear memory is a contiguous byte array. While the host computer is protected from the WASM sandbox, memory corruption can still occur *inside* the WASM module's own memory if unsafe code is written improperly."
      },
      {
        question: "What is WASI (WebAssembly System Interface), and why is it replacing containers for edge workloads?",
        expectedAnswer: "WASI provides capability-oriented system call abstractions (files, network, clocks) allowing portable execution across OSs without carrying a full 100MB Linux OS image, booting in microseconds."
      }
    ],
    phases: [
      {
        phaseTitle: "Phase 1: Beginner Foundations",
        phaseDescription: "Compile Rust to WebAssembly with wasm-pack and call exported functions from JavaScript in your browser.",
        skills: [
          {
            id: "wa-p1-1",
            phase: "Phase 1: Beginner Foundations",
            levelBadge: "Beginner",
            title: "1.1 Compiling Rust to WASM with wasm-bindgen",
            eli5: "Write a function in Rust, compile it to a `.wasm` file, and call it from JavaScript inside Chrome or Safari just like any normal JavaScript function.",
            whyInThisIndustry: "`wasm-bindgen` is the universal glue between Rust and the web, generating TypeScript definitions automatically.",
            conceptsToMaster: [
              "Compiling for the `wasm32-unknown-unknown` target",
              "The `#[wasm_bindgen]` attribute macro",
              "Passing strings and numbers between JS and Rust"
            ],
            codeExample: {
              title: "Exporting a Rust Function to JavaScript",
              description: "Callable from browser JavaScript at native CPU speeds.",
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
              task: "Create a WebAssembly module that reverses a string and returns it to JavaScript, then display the result on an HTML page.",
              hint: "Use `wasm-pack build --target web`."
            },
            estimatedTime: "6–10 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 2: Intermediate Practitioner",
        phaseDescription: "Zero-copy pixel manipulation on HTML5 Canvas and video/audio buffers.",
        skills: [
          {
            id: "wa-p2-1",
            phase: "Phase 2: Intermediate Practitioner",
            levelBadge: "Intermediate",
            title: "2.1 Zero-Copy Pixel Processing on HTML5 Canvas",
            eli5: "Manipulate millions of image pixels in a browser tab at 60 frames per second without copying memory back and forth.",
            whyInThisIndustry: "Copying 4K image buffers between JavaScript and WASM wastes CPU. Sharing raw memory pointers directly enables real-time filters and video editing.",
            conceptsToMaster: [
              "WebAssembly linear memory architecture",
              "Accessing `wasm.memory.buffer` from JavaScript `Uint8ClampedArray`",
              "In-place image filters (grayscale, brightness, edge detection)"
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
            },
            estimatedTime: "12–16 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 3: Advanced Architectures",
        phaseDescription: "Embedding standalone Wasmtime runtimes to execute untrusted third-party plugins with fuel limits.",
        skills: [
          {
            id: "wa-p3-1",
            phase: "Phase 3: Advanced Architectures",
            levelBadge: "Advanced",
            title: "3.1 Embedding Wasmtime for Secure App Plugins",
            eli5: "Let third-party users write custom plugins for your server without risking them hacking your files or infinite-looping.",
            whyInThisIndustry: "Platforms like Shopify, Figma, and Cloudflare use Wasmtime to run untrusted third-party user code in a strictly isolated sandbox.",
            conceptsToMaster: [
              "Wasmtime host runtime embedding in Rust server apps",
              "Fuel consumption metering to kill infinite loops",
              "WASI capability-based filesystem security"
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
    Ok(())
}`
            },
            exercise: {
              task: "Build a CLI in Rust that executes user-submitted WASM scripts and aborts execution if the script exceeds 1,000,000 instructions.",
              hint: "Use `store.set_fuel` and catch `Trap::OutOfFuel`."
            },
            estimatedTime: "20–25 hours"
          }
        ]
      },
      {
        phaseTitle: "Phase 4: Staff/Principal Master",
        phaseDescription: "Edge serverless microVMs and on-device WebGPU AI inference.",
        skills: [
          {
            id: "wa-p4-1",
            phase: "Phase 4: Staff/Principal Master",
            levelBadge: "Master",
            title: "4.1 Edge Serverless MicroVMs & WebGPU AI",
            eli5: "Run AI models and serverless workers at 300 CDN edge data centers around the world with 50-microsecond boot times.",
            whyInThisIndustry: "Docker containers take 500ms to start. WASI modules boot in 50 microseconds, enabling instant edge AI and serverless computing globally.",
            conceptsToMaster: [
              "WASI 0.2 Component Model and WIT definitions",
              "Cloudflare Workers and Fastly Compute@Edge runtime architecture",
              "WebGPU client-side shader programming and tensor math"
            ],
            codeExample: {
              title: "Edge Worker Request Handler (Conceptual)",
              description: "Instantaneous edge serverless HTTP routing.",
              code: `// Compiled to wasm32-wasi for Cloudflare Workers / Fastly:
// Handles HTTP request in <50 microseconds at nearest edge POP`
            },
            exercise: {
              task: "Deploy a serverless API function to Cloudflare Workers written in Rust that validates JWT tokens and routes requests.",
              hint: "Use the `worker` crate with `wrangler deploy`."
            },
            estimatedTime: "30+ hours"
          }
        ]
      }
    ]
  }
];
