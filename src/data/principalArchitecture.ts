export interface CoreEngineTopic {
  id: string;
  topic: string;
  syntaxAndMechanics: string;
  hardwareProblemSolved: string;
  memoryDiagramOrCode: string;
}

export interface DomainDeepDive {
  id: string;
  domainName: string;
  icon: string;
  badge: string;
  tagline: string;
  
  // Part A: Conceptual & Systems Foundations (No Rust Code Yet)
  conceptualFoundations: {
    hardwareAndOsConcepts: {
      concept: string;
      inDepthExplanation: string;
    }[];
    mentalModel: string;
  };

  // Part B: Rust Implementation Technicalities
  rustTechnicalities: {
    advancedLanguageWeapons: {
      feature: string;
      mechanicsAndUsage: string;
    }[];
    domainCratesAndTools: {
      name: string;
      category: 'Runtime' | 'System FFI' | 'Serialization' | 'Auditing' | 'Networking';
      role: string;
      link: string;
    }[];
  };

  // Part C: Concrete Milestone Projects
  milestoneProjects: {
    title: string;
    difficulty: string;
    technicalObjective: string;
    architecturalSpec: string[];
  }[];

  // Part D: Master-Level Curated Resources
  masterResources: {
    title: string;
    type: 'Book' | 'Whitepaper' | 'Source Code' | 'Standard';
    url: string;
    annotation: string;
  }[];
}

export interface CompilerPerformanceTopic {
  title: string;
  hardwareMechanism: string;
  rustOptimizationStrategy: string;
  toolingAndDiagnostics: string;
  codeSnippet: string;
}

export const PHASE_1_CORE_ENGINE: CoreEngineTopic[] = [
  {
    id: "core-ownership",
    topic: "Ownership & Affine Move Semantics",
    syntaxAndMechanics: "Every value in memory has exactly one owner variable. When assigning to another variable or passing by value into a function, ownership transfers ('moves'). The previous variable is immediately invalidated at compile-time.",
    hardwareProblemSolved: "Eliminates manual `free()` errors and garbage collection pauses. In C, multiple pointers can point to the same heap address; freeing one leaves the other as a dangling pointer. Re-freeing it causes double-free vulnerabilities. Rust enforces Single Ownership so the compiler generates a deterministic deallocation instruction (RAII) at the exact assembly exit of the owner's stack frame.",
    memoryDiagramOrCode: `// STACK: 24-byte pointer/length/capacity descriptor
// HEAP: The raw byte array allocation
fn process() {
    let s1 = String::from("Kernel_DMA_Buffer");
    let s2 = s1; // Stack descriptor copied; s1 invalidated (Move)
    // s1 CANNOT be used here. Only s2 owns the heap pointer.
} // Exact ASM 'call free' emitted here for s2 only. Never double-freed.`
  },
  {
    id: "core-borrowing",
    topic: "Aliasing XOR Mutability (The Borrow Checker)",
    syntaxAndMechanics: "You can hold any number of immutable references (&T) OR exactly one mutable reference (&mut T), never both simultaneously within the same lifetime window.",
    hardwareProblemSolved: "Prevents Pointer Aliasing Bugs and Data Races at the CPU cache level. When a compiler optimizes code, if it knows a memory location cannot be mutated through another pointer (no aliasing), it can keep values in high-speed CPU registers instead of constantly reloading from RAM. In multi-threading, this invariant prevents two CPU cores from writing and reading the same cacheline concurrently.",
    memoryDiagramOrCode: `let mut buffer = vec![0xAA, 0xBB, 0xCC];

let ref1 = &buffer;
let ref2 = &buffer; // OK: Multiple read-only pointers into CPU L1 cache

// buffer.push(0xDD); 
// COMPILE ERROR: Reallocating heap buffer would invalidate ref1 & ref2 pointers!
println!("Values: {:?}, {:?}", ref1, ref2);`
  },
  {
    id: "core-lifetimes",
    topic: "Lifetimes ('a) & Reference Bounds",
    syntaxAndMechanics: "Lifetimes are static proof parameters utilized by the borrow checker. They do not exist at runtime or alter assembly. They prove to rustc that reference target memory outlives the reference pointer.",
    hardwareProblemSolved: "Prevents Use-After-Free (UAF) and Stack Escapes. In C, returning a pointer to a local stack variable causes undefined behavior because the stack frame is popped upon function return, leaving the pointer pointing to unallocated stack garbage. Rust's lifetime system refuses to compile any reference whose lifetime exceeds the referent's scope.",
    memoryDiagramOrCode: `// Proof: The returned slice &str lives at least as long as struct instance
struct PacketHeader<'a> {
    raw_slice: &'a [u8],
}

impl<'a> PacketHeader<'a> {
    fn payload(&self) -> &'a [u8] {
        &self.raw_slice[14..] // Guaranteed valid; compiler checks 'a bounds
    }
}`
  },
  {
    id: "core-enums",
    topic: "Tagged Unions (Enums) & Pattern Matching",
    syntaxAndMechanics: "Rust enums are Algebraic Sum Types. Variants can carry rich data payloads. Pattern matching with match enforces exhaustive handling of all permutations at compile time.",
    hardwareProblemSolved: "Eliminates Null Pointer Dereferences (the 'Billion-Dollar Mistake'). In memory, an enum is stored as an integer discriminant (tag) followed by memory aligned to the largest variant. Rust utilizes Null Pointer Optimization (NPO): for types like Option<&T>, the None variant is represented physically as address 0x0, meaning Option<&T> has zero memory overhead over a raw pointer while remaining 100% safe.",
    memoryDiagramOrCode: `enum DeviceState {
    Uninitialized,
    Active { dma_address: usize, irq_line: u8 },
    Fault(u32),
}

// Discriminant byte + Largest payload alignment in memory.
// Compiler forces handling every single variant:`
  },
  {
    id: "core-traits",
    topic: "Traits & Zero-Cost Monomorphization",
    syntaxAndMechanics: "Traits specify behavioral contracts without inheritance. When generic functions (<T: Trait>) are called, the compiler monomorphizes the code by generating distinct machine assembly for each concrete type.",
    hardwareProblemSolved: "Eliminates Dynamic Dispatch (vtable pointer chasing) overhead. In C++ or Java, virtual method calls require an indirect memory lookup via a vtable pointer, causing CPU branch mispredictions and preventing function inlining. Rust monomorphization resolves function targets at compile-time, allowing LLVM to aggressively inline instructions and unroll loops.",
    memoryDiagramOrCode: `pub trait DeviceDriver {
    fn write_byte(&mut self, val: u8);
}

// LLVM inlines the exact MMIO register write directly into the caller:
pub fn reset_hardware<T: DeviceDriver>(driver: &mut T) {
    driver.write_byte(0xFF);
}`
  }
];

export const PHASE_2_DOMAINS: DomainDeepDive[] = [
  // =========================================================================
  // 1. LOW-LEVEL SYSTEMS & OS DEVELOPMENT
  // =========================================================================
  {
    id: "os-dev",
    domainName: "1. Low-Level Systems & OS Development",
    icon: "Cpu",
    badge: "Hardware & Silicon Interface",
    tagline: "Bare-metal kernels, microVM hypervisors, memory paging, and device drivers.",
    conceptualFoundations: {
      hardwareAndOsConcepts: [
        {
          concept: "CPU Privilege Rings & Execution Modes",
          inDepthExplanation: "x86 CPUs provide Ring 0 (Supervisor/Kernel Mode) and Ring 3 (User Space). Ring 0 has unrestricted access to hardware instructions (cli, sti, lgdt, ltr, cr3). Transitioning between rings requires software interrupts (syscall, int 0x80) which swap the stack pointer (RSP) from user stack to kernel stack and save register state."
        },
        {
          concept: "Virtual Memory, Multi-Level Paging & The TLB",
          inDepthExplanation: "The CPU MMU translates virtual addresses to physical RAM using hierarchical page tables (x86_64 uses 4-level or 5-level paging: PML4 -> PDPT -> PD -> PT -> 4KB Physical Frame). The Translation Lookaside Buffer (TLB) caches translations. Changing the CR3 register flushes the TLB, introducing pipeline latency. Page faults (Exception 14) occur when a page table entry's Present bit is zero."
        },
        {
          concept: "Interrupt Service Routines (ISRs) & The APIC",
          inDepthExplanation: "Hardware interrupts are asynchronously fired by peripheral controllers (Advanced Programmable Interrupt Controller - APIC). When an IRQ fires, the CPU saves SS, RSP, RFLAGS, CS, and RIP onto the interrupt stack, disables interrupts, and vectors through the Interrupt Descriptor Table (IDT). ISRs must be non-blocking and cannot sleep."
        },
        {
          concept: "Memory-Mapped I/O (MMIO) & Hardware Bus Topologies",
          inDepthExplanation: "Peripherals (PCIe, UART, NVMe) map their internal registers directly into the CPU physical address space. Accessing device registers requires reading and writing to specific physical addresses. Because hardware state changes outside CPU control, compiler optimization passes that reorder or elide 'redundant' reads must be prevented via volatile operations."
        }
      ],
      mentalModel: "Think of the computer as raw silicon without safety nets. There is no heap, no file system, and no print function. You are the architect responsible for carving RAM into page frames, constructing your own page tables, configuring CPU descriptor tables (GDT/IDT), and teaching the CPU how to context-switch between instruction streams."
    },
    rustTechnicalities: {
      advancedLanguageWeapons: [
        {
          feature: "Bare-Metal Directive: #![no_std] and #![no_main]",
          mechanicsAndUsage: "Strips the standard library and OS runtime glue. Links only to `core` (pure mathematical and type logic). Forces developer to provide custom `#[panic_handler]`."
        },
        {
          feature: "Inline Assembly: core::arch::asm!",
          mechanicsAndUsage: "Directly emits machine instructions for CPU control registers (CR0, CR3, CR4), loading GDT/IDT tables (`lidt`), and port I/O (`inb`/`outb`)."
        },
        {
          feature: "Memory-Mapped Volatile Access: core::ptr::write_volatile",
          mechanicsAndUsage: "Prevents LLVM compiler optimizations from caching or eliminating reads and writes to physical MMIO register addresses."
        },
        {
          feature: "Custom Allocator Authoring: core::alloc::GlobalAlloc",
          mechanicsAndUsage: "Implements `unsafe fn alloc` and `dealloc` using buddy-allocator or slab-allocator algorithms, enabling `alloc::vec::Vec` in kernel space."
        }
      ],
      domainCratesAndTools: [
        { name: "x86_64", category: "System FFI", role: "Safe abstractions for x86_64 instructions, page tables, and descriptor tables", link: "https://crates.io/crates/x86_64" },
        { name: "bootloader", category: "Runtime", role: "Creates UEFI and BIOS bootable disk images targeting pure Rust kernels", link: "https://crates.io/crates/bootloader" },
        { name: "volatile", category: "System FFI", role: "Type-safe wrappers for volatile Memory-Mapped I/O hardware reads/writes", link: "https://crates.io/crates/volatile" },
        { name: "spinning_top", category: "Runtime", role: "IRQ-safe spinlocks that prevent deadlocks inside interrupt handlers", link: "https://crates.io/crates/spinning_top" }
      ]
    },
    milestoneProjects: [
      {
        title: "Project 1.1: Preemptive 64-bit Microkernel with Paging",
        difficulty: "Principal Systems Level",
        technicalObjective: "Build a bare-metal kernel from scratch that boots via UEFI, enables 4-level paging, configures the IDT, and runs a preemptive round-robin thread scheduler.",
        architecturalSpec: [
          "Set up custom panic handler and serial port (COM1 0x3F8) logging driver.",
          "Construct physical frame allocator from UEFI memory descriptor maps.",
          "Write an interrupt handler for 8254 PIT (Programmable Interval Timer) ticking at 100Hz.",
          "Implement context switching in assembly: save general-purpose registers to Task Stack A, swap RSP, restore registers from Task Stack B, and execute `iretq`."
        ]
      },
      {
        title: "Project 1.2: KVM-Based Serverless MicroVM Hypervisor",
        difficulty: "Principal Virtualization Level",
        technicalObjective: "Build a lightweight microVM manager using Linux `/dev/kvm` ioctls capable of booting an uncompressed Linux kernel in under 10 milliseconds.",
        architecturalSpec: [
          "Configure KVM_CREATE_VM and allocate guest physical memory via `mmap`.",
          "Set up vCPU registers (RIP, RSP, CR0 protected mode, CR3 page tables, CR4).",
          "Emulate a serial console via KVM_EXIT_IO traps.",
          "Implement VirtIO block and network device drivers."
        ]
      }
    ],
    masterResources: [
      {
        title: "Writing an OS in Rust (Philipp Oppermann)",
        type: "Guide",
        url: "https://os.phil-opp.com/",
        annotation: "The canonical reference for x86_64 bare-metal kernel architecture, paging, and interrupt descriptor tables in Rust."
      },
      {
        title: "Operating Systems: Three Easy Pieces (Arpaci-Dusseau)",
        type: "Book",
        url: "https://pages.cs.wisc.edu/~remzi/OSTEP/",
        annotation: "The definitive textbook on virtualization, concurrency, and persistence theory."
      },
      {
        title: "Redox OS Source Code",
        type: "Source Code",
        url: "https://gitlab.redox-os.org/redox-os/redox",
        annotation: "Production microkernel operating system written 100% in pure safe Rust."
      }
    ]
  },

  // =========================================================================
  // 2. NETWORK ENGINEERING & DISTRIBUTED SYSTEMS
  // =========================================================================
  {
    id: "net-dist",
    domainName: "2. Network Engineering & Distributed Systems",
    icon: "Cloud",
    badge: "Scale & Consensus",
    tagline: "Asynchronous network runtimes, consensus state machines, and zero-copy packet drivers.",
    conceptualFoundations: {
      hardwareAndOsConcepts: [
        {
          concept: "OS I/O Multiplexing: epoll, kqueue & io_uring",
          inDepthExplanation: "Blocking I/O requires 1 thread per connection (catastrophic at 100,000 sockets due to 8MB thread stack overhead and context switch thrashing). epoll (Linux) and kqueue (BSD/macOS) provide readiness notifications over file descriptors in O(1) time. io_uring provides true asynchronous kernel completion queues via shared ring buffers without system call context switches."
        },
        {
          concept: "TCP State Machine & Congestion Control",
          inDepthExplanation: "Understanding TCP packet headers, SYN-ACK 3-way handshakes, FIN/RST teardowns, sliding window flow control, and congestion avoidance algorithms (CUBIC, BBR). Managing TIME_WAIT states and TCP socket buffers (`SO_RCVBUF`, `SO_SNDBUF`)."
        },
        {
          concept: "Distributed Consensus & The CAP Theorem",
          inDepthExplanation: "In a network of asynchronous nodes, partitions will occur. The Raft and Paxos consensus algorithms guarantee Safety (linearizability) despite node crashes and split-brain scenarios through Leader Election, Term numbers, and Quorum replication (majority voting)."
        },
        {
          concept: "Network Interface Card (NIC) Rings & Kernel Bypass",
          inDepthExplanation: "Traditional network packets traverse NIC DMA -> Kernel Socket Buffer (sk_buff) -> User Space copy. Kernel bypass architectures (DPDK, XDP) map the NIC's ring buffers directly into user-space memory, eliminating packet copies and kernel interrupts."
        }
      ],
      mentalModel: "Think of networks as unreliable, asynchronous message queues where any wire can drop packets, introduce arbitrary millisecond delays, or corrupt bytes. Software must be non-blocking, memory-efficient, and mathematically structured as state machines."
    },
    rustTechnicalities: {
      advancedLanguageWeapons: [
        {
          feature: "Asynchronous Pinning: std::pin::Pin",
          mechanicsAndUsage: "Prevents async Future state machines from moving in physical RAM, ensuring self-referential pointer addresses remain stable across `.await` points."
        },
        {
          feature: "Tokio Cooperative Multi-Threading & Work Stealing",
          mechanicsAndUsage: "Multiplexes thousands of futures across worker threadpools using task budgets to prevent task starvation."
        },
        {
          feature: "Linux io_uring FFI Bindings",
          mechanicsAndUsage: "Directly submits I/O submission queue entries (SQEs) and reaps completion queue entries (CQEs) without standard libc syscall overhead."
        },
        {
          feature: "Zero-Copy Byte Buffering: bytes::Bytes",
          mechanicsAndUsage: "Provides atomic reference-counted byte buffer slices with zero allocation cloning."
        }
      ],
      domainCratesAndTools: [
        { name: "tokio", category: "Runtime", role: "Multi-threaded event-driven async runtime with epoll/kqueue drivers", link: "https://tokio.rs" },
        { name: "tonic", category: "Networking", role: "High-throughput gRPC client and server framework built on HTTP/2 and Prost", link: "https://crates.io/crates/tonic" },
        { name: "io-uring", category: "System FFI", role: "Pure Rust zero-copy interface for Linux io_uring asynchronous syscalls", link: "https://crates.io/crates/io-uring" },
        { name: "crossbeam", category: "Runtime", role: "Atomic lock-free channels and work-stealing scheduling structures", link: "https://crates.io/crates/crossbeam" }
      ]
    },
    milestoneProjects: [
      {
        title: "Project 2.1: Distributed Raft Consensus Key-Value Cluster",
        difficulty: "Staff Distributed Systems Level",
        technicalObjective: "Implement the Raft consensus algorithm from scratch in Rust with leader election, log replication, snapshotting, and network partition healing.",
        architecturalSpec: [
          "Build RPC transport over Tonic gRPC with randomized election timeouts (150ms–300ms).",
          "Implement append-only disk write-ahead log (WAL) with strict checksum verification.",
          "Build an in-memory state machine that applies committed log entries consistently.",
          "Inject network partition chaos scripts and prove linearizability using Jepsen tests."
        ]
      },
      {
        title: "Project 2.2: Userspace TCP/IP Stack with TAP Interfaces",
        difficulty: "Staff Network Systems Level",
        technicalObjective: "Build a single-threaded TCP stack in Rust that binds to a Linux TUN/TAP device, parses Ethernet/IP frames, and handles TCP handshakes and data streams.",
        architecturalSpec: [
          "Parse raw IP packets and calculate Internet Checksums using SIMD.",
          "Implement TCP state transitions: LISTEN -> SYN-RECEIVED -> ESTABLISHED -> CLOSE-WAIT.",
          "Implement sliding window flow control and retransmission timers.",
          "Serve HTTP GET requests directly from your handwritten userspace TCP implementation."
        ]
      }
    ],
    masterResources: [
      {
        title: "Designing Data-Intensive Applications (Martin Kleppmann)",
        type: "Book",
        url: "https://dataintensive.net/",
        annotation: "The undisputed holy grail of replication, partitioning, consistency, and consensus theory."
      },
      {
        title: "In Search of an Understandable Consensus Algorithm (Ongaro & Ousterhout)",
        type: "Whitepaper",
        url: "https://raft.github.io/raft.pdf",
        annotation: "The original Stanford Raft consensus paper describing leader election and log invariants."
      },
      {
        title: "Tokio Internals Architecture Guides",
        type: "Guide",
        url: "https://tokio.rs/blog/2019-10-scheduler",
        annotation: "Deep explanation of cooperative multitasking, task budgets, and work-stealing runtimes."
      }
    ]
  },

  // =========================================================================
  // 3. CYBERSECURITY & OFFENSIVE/DEFENSIVE TOOLING
  // =========================================================================
  {
    id: "cyber-sec",
    domainName: "3. Cybersecurity & Offensive/Defensive Tooling",
    icon: "ShieldAlert",
    badge: "Binary Analysis & Threat Interception",
    tagline: "In-kernel eBPF sensors, coverage-guided fuzzers, constant-time crypto, and malware sandboxes.",
    conceptualFoundations: {
      hardwareAndOsConcepts: [
        {
          concept: "Extended Berkeley Packet Filter (eBPF) Virtual Machine",
          inDepthExplanation: "eBPF is a register-based RISC virtual machine inside the Linux kernel. It allows user-supplied bytecode to be statically verified for safety (no unbounded loops, valid memory dereferences) and JIT-compiled into native machine instructions executing in kernel space at kprobes, tracepoints, and XDP hooks."
        },
        {
          concept: "Binary Formats (ELF / PE) & Memory Injection Mechanisms",
          inDepthExplanation: "Understanding how operating systems execute binaries: Program Headers, Section Headers (.text, .data, .bss), Import Address Tables (IAT), and Dynamic Linking. Exploits and security monitors inspect virtual memory spaces via `/proc/pid/mem` or `VirtualAllocEx`/`WriteProcessMemory`."
        },
        {
          concept: "Coverage-Guided Fuzzing & Mutation Analysis",
          inDepthExplanation: "Fuzzing discovers zero-day vulnerabilities by compiling target binaries with edge-coverage instrumentation (LLVM SanitizerCoverage). When an input reaches a new branch in the execution path, it is saved to a seed corpus and mutated (bit-flipping, arithmetic operations, dictionary insertion)."
        },
        {
          concept: "Side-Channel Timing Attacks & Cache Eviction",
          inDepthExplanation: "CPUs execute instructions in variable cycles based on branch predictor state and cache hits/misses. If a cryptographic comparison returns early upon encountering a mismatched byte, an attacker measuring nanoseconds can reconstruct secret private keys byte-by-byte."
        }
      ],
      mentalModel: "Think of security engineering as building systems that operate in a hostile universe. Input data is weaponized. Your parsers, agents, and monitors must process malformed binary byte arrays without crashing, while monitoring the operating system kernel for unauthorized execution."
    },
    rustTechnicalities: {
      advancedLanguageWeapons: [
        {
          feature: "Aya Pure-Rust eBPF Framework",
          mechanicsAndUsage: "Compiles Rust code directly to the `bpfel-unknown-none` target, loading verified bytecode into Linux kernel tracepoints with zero C or LLVM clang dependencies."
        },
        {
          feature: "Zero-Copy Combinators: nom & deku",
          mechanicsAndUsage: "Parses arbitrary binary network packets and ELF files without allocating heap memory or copying bytes from socket ring buffers."
        },
        {
          feature: "Constant-Time Arithmetic: subtle::ConstantTimeEq",
          mechanicsAndUsage: "Performs bitwise comparisons of secrets and passwords with guaranteed constant CPU clock cycle execution to eliminate side-channel timing leaks."
        },
        {
          feature: "LibAFL Modular Fuzzing Framework",
          mechanicsAndUsage: "Combines custom mutators, feedback collectors, and crash observers running in multi-core parallel processes."
        }
      ],
      domainCratesAndTools: [
        { name: "aya", category: "System FFI", role: "Pure Rust eBPF framework running inside the Linux kernel", link: "https://aya-rs.dev" },
        { name: "nom", category: "Serialization", role: "Zero-copy byte parser combinator library with bounds verification", link: "https://crates.io/crates/nom" },
        { name: "libafl", category: "Auditing", role: "State-of-the-art modular fuzzer architecture for finding zero-day exploits", link: "https://github.com/AFLplusplus/LibAFL" },
        { name: "subtle", category: "System FFI", role: "Pure Rust traits for constant-time cryptographic operations", link: "https://crates.io/crates/subtle" }
      ]
    },
    milestoneProjects: [
      {
        title: "Project 3.1: eBPF Host Telemetry & Ransomware Interceptor",
        difficulty: "Staff Security Systems Level",
        technicalObjective: "Build a Linux endpoint detection daemon with Aya that intercepts file writes and process spawning in real time and kills malicious processes.",
        architecturalSpec: [
          "Write an eBPF tracepoint program attached to `sys_enter_execve` and `sys_enter_openat`.",
          "Capture process PID, UID, parent-child relationships, and command arguments into an eBPF Ring Buffer.",
          "Stream events into a user-space Rust daemon and match against MITRE ATT&CK patterns.",
          "Send `SIGKILL` to offending processes via `nix::sys::signal` upon detecting rapid encryption anomalies."
        ]
      },
      {
        title: "Project 3.2: High-Speed Evolutionary Binary Protocol Fuzzer",
        difficulty: "Staff Exploit Research Level",
        technicalObjective: "Build a coverage-guided fuzzer using LibAFL that mutates network inputs and fuzzes legacy C libraries via in-process harnesses.",
        architecturalSpec: [
          "Instrument target C library with LLVM SanitizerCoverage (`-fsanitize-coverage=trace-pc-guard`).",
          "Implement custom dictionary and havoc mutators in Rust.",
          "Capture crashes, deduplicate stack traces, and minimize reproducing crash inputs."
        ]
      }
    ],
    masterResources: [
      {
        title: "Aya: eBPF in Rust Documentation",
        type: "Guide",
        url: "https://aya-rs.dev/book/",
        annotation: "The definitive guide to writing in-kernel probes, socket filters, and XDP network programs in Rust."
      },
      {
        title: "The Art of Software Security Assessment (Dowd, McDonald, Schuh)",
        type: "Book",
        url: "https://www.oreilly.com/library/view/the-art-of/0321444426/",
        annotation: "The classic bible on vulnerability research, buffer overflows, and protocol reverse engineering."
      },
      {
        title: "LibAFL: A Framework to Build Modular and Reusable Fuzzers",
        type: "Whitepaper",
        url: "https://www.s3.eurecom.fr/docs/ccs22_fioraldi.pdf",
        annotation: "ACM CCS academic paper detailing the architecture of modern Rust-based fuzzing engines."
      }
    ]
  },

  // =========================================================================
  // 4. HIGH-PERFORMANCE WEB & CLOUD ARCHITECTURE
  // =========================================================================
  {
    id: "web-cloud",
    domainName: "4. High-Performance Web & Cloud Architecture",
    icon: "Globe",
    badge: "Sub-Millisecond Services & Edge WASM",
    tagline: "Sub-millisecond API services, WebAssembly edge sandboxes, and cloud-native gateways.",
    conceptualFoundations: {
      hardwareAndOsConcepts: [
        {
          concept: "HTTP/2 & HTTP/3 (QUIC) Transport Protocols",
          inDepthExplanation: "HTTP/1.1 suffered from Head-of-Line (HoL) blocking on TCP sockets. HTTP/2 multiplexes binary streams over a single TCP connection. HTTP/3 moves to UDP-based QUIC, implementing custom packet recovery and 0-RTT handshakes, shifting transport layer complexity into user-space."
        },
        {
          concept: "WebAssembly (WASM) Linear Memory & Capability Sandboxing",
          inDepthExplanation: "WASM executes code inside a 32-bit linear memory buffer (a single contiguous array of bytes). The host runtime controls what capabilities (filesystem, network, clocks) the WASM guest can access via the WebAssembly System Interface (WASI). Booting takes microseconds compared to Docker containers."
        },
        {
          concept: "Tail Latency (p99.99) & Zero Garbage Collection Jitter",
          inDepthExplanation: "In high-throughput services handling 100,000 req/sec, an average latency of 5ms is irrelevant if the 99.99th percentile spikes to 200ms due to garbage collection stop-the-world pauses. Rust architectures guarantee flat, deterministic latency curves under saturated load."
        },
        {
          concept: "Connection Pooling & Tower Service Abstraction",
          inDepthExplanation: "Modeling distributed client-server communication as an asynchronous function `async fn call(Request) -> Result<Response, Error>`. Implementing backpressure, rate limiting, and circuit breaking via composable middleware layers."
        }
      ],
      mentalModel: "Think of high-performance web architecture not as traditional CRUD scripting, but as building distributed, high-speed message-routing machines. Every byte allocation matters. Services must scale vertically across every CPU core without runtime pauses."
    },
    rustTechnicalities: {
      advancedLanguageWeapons: [
        {
          feature: "Hyper & Axum Composable Router Mechanics",
          mechanicsAndUsage: "Constructs type-safe HTTP routers where extraction (`Path`, `Query`, `Json`) and middleware pipelines execute with zero unnecessary heap allocations."
        },
        {
          feature: "Wasmtime & WASI Embedding",
          mechanicsAndUsage: "Embeds standalone WebAssembly engines inside backend services to safely run untrusted user plugins with strict instruction-count fuel limits."
        },
        {
          feature: "Tower Service Middleware Pipeline",
          mechanicsAndUsage: "Composes rate-limiting, load-shedding, timeout, and authentication middleware as zero-cost static trait wrappers."
        },
        {
          feature: "SIMD JSON Parsing: simd-json",
          mechanicsAndUsage: "Parses gigabytes of JSON documents per second using CPU AVX2 and NEON SIMD instructions directly into Rust structs."
        }
      ],
      domainCratesAndTools: [
        { name: "axum", category: "Runtime", role: "Ergonomic, blazingly fast web application framework built on Tokio, Tower, and Hyper", link: "https://crates.io/crates/axum" },
        { name: "wasmtime", category: "Runtime", role: "Fast, secure standalone WebAssembly and WASI runtime engine", link: "https://wasmtime.dev" },
        { name: "simd-json", category: "Serialization", role: "SIMD-accelerated JSON parser processing data at line rate", link: "https://crates.io/crates/simd-json" },
        { name: "tower", category: "Networking", role: "Modular components for building robust networking clients and servers", link: "https://crates.io/crates/tower" }
      ]
    },
    milestoneProjects: [
      {
        title: "Project 4.1: Sub-Millisecond API Gateway with Tower Middleware",
        difficulty: "Principal Cloud Engineer Level",
        technicalObjective: "Build an asynchronous reverse proxy and API gateway in Axum and Tower handling 200,000 req/sec with token bucket rate limiting and Prometheus metrics.",
        architecturalSpec: [
          "Implement custom Tower middleware for distributed token bucket rate limiting.",
          "Stream responses with zero-copy byte buffers using `bytes::Bytes`.",
          "Add Prometheus telemetry tracking p50, p95, and p99.99 response latency histograms.",
          "Benchmark under saturated load using `wrk2` to verify flat latency curves."
        ]
      },
      {
        title: "Project 4.2: Edge Serverless Micro-Function Host (WASM Engine)",
        difficulty: "Principal Platform Architect Level",
        technicalObjective: "Build a serverless edge runtime using Wasmtime that accepts compiled WASM binaries, executes them in sub-50 microseconds, and meters CPU fuel.",
        architecturalSpec: [
          "Pre-compile WebAssembly modules using Ahead-of-Time (AOT) compilation.",
          "Enforce strict CPU instruction execution caps using `store.set_fuel` to terminate infinite loops.",
          "Sandbox filesystem access using capability-oriented WASI contexts.",
          "Handle incoming HTTP requests by invoking warm WASM instance pools."
        ]
      }
    ],
    masterResources: [
      {
        title: "Programming WebAssembly with Rust (Kevin Hoffman)",
        type: "Book",
        url: "https://pragprog.com/titles/khrust/programming-webassembly-with-rust/",
        annotation: "Comprehensive exploration of compiling Rust to WASM, browser Canvas integration, and server-side WASI."
      },
      {
        title: "Wasmtime Architecture & Security Documentation",
        type: "Guide",
        url: "https://docs.wasmtime.dev/",
        annotation: "Official documentation detailing capability-based security, Cranelift codegen, and memory isolation."
      },
      {
        title: "Axum & Tower Architectural Deep Dive",
        type: "Guide",
        url: "https://github.com/tokio-rs/axum",
        annotation: "The canonical repository demonstrating idiomatic asynchronous web service design in Rust."
      }
    ]
  }
];

export const PHASE_3_PERFORMANCE_FRONTIER: CompilerPerformanceTopic[] = [
  {
    title: "1. SIMD Intrinsics (Single Instruction, Multiple Data)",
    hardwareMechanism: "Modern CPU cores (x86 AVX2/AVX-512, ARM NEON) contain 256-bit and 512-bit vector registers (YMM/ZMM). Instead of adding one 32-bit integer per cycle, a single SIMD instruction computes eight or sixteen 32-bit operations simultaneously.",
    rustOptimizationStrategy: "Utilize `std::simd` (portable SIMD) or direct vendor intrinsics (`core::arch::x86_64::_mm256_add_ps`). Structure data in contiguous arrays and align memory to 32 or 64 bytes to allow unaligned load instructions to be elided.",
    toolingAndDiagnostics: "Inspect generated assembly using `cargo-show-asm` or Compiler Explorer (Godbolt) to verify that loops are auto-vectorized into vector instructions (e.g. `vaddps`, `vmovdqa`).",
    codeSnippet: `// Portable SIMD (nightly) or vendor intrinsics:
use core::arch::x86_64::{_mm256_loadu_ps, _mm256_add_ps, _mm256_storeu_ps};

pub unsafe fn vector_add_256(a: &[f32; 8], b: &[f32; 8], out: &mut [f32; 8]) {
    let va = _mm256_loadu_ps(a.as_ptr());
    let vb = _mm256_loadu_ps(b.as_ptr());
    let vsum = _mm256_add_ps(va, vb); // 8 float additions in 1 CPU cycle!
    _mm256_storeu_ps(out.as_mut_ptr(), vsum);
}`
  },
  {
    title: "2. Zero-Copy Deserialization Architecture",
    hardwareMechanism: "Traditional deserialization (like JSON or standard Protobuf) allocates heap memory for every string and vector, copying bytes from the socket buffer. This burns thousands of CPU cycles in allocator overhead and thrashes L1/L2 caches.",
    rustOptimizationStrategy: "Use `rkyv`, `zerocopy`, or `bytemuck`. Structures are laid out with `#[repr(C)]` so that data received over the network or mmap'd from disk matches the CPU's in-memory struct layout byte-for-byte. Reading the struct requires zero parsing and zero allocations—just a validated pointer cast.",
    toolingAndDiagnostics: "Profile memory allocation counts using `dhat` or `valgrind --tool=massif` to confirm that the hot processing path performs zero calls to `malloc`.",
    codeSnippet: `use zerocopy::{FromBytes, Immutable, KnownLayout};

#[repr(C, packed)]
#[derive(FromBytes, Immutable, KnownLayout, Debug)]
pub struct EthernetHeader {
    pub dst_mac: [u8; 6],
    pub src_mac: [u8; 6],
    pub ethertype: [u8; 2],
}

pub fn parse_packet(raw_bytes: &[u8]) -> Option<&EthernetHeader> {
    // Validates bounds and casts reference in 0 nanoseconds. Zero allocations!
    EthernetHeader::ref_from_prefix(raw_bytes).ok().map(|(header, _rest)| header)
}`
  },
  {
    title: "3. Cache-Friendly Memory Layout & False Sharing Elimination",
    hardwareMechanism: "CPUs do not read single bytes from RAM; they fetch 64-byte chunks called Cache Lines. If two threads running on separate CPU cores update two variables that reside within the same 64-byte line, the CPU cache coherency protocol (MESI) repeatedly invalidates core caches, degrading multi-threaded throughput by 10x.",
    rustOptimizationStrategy: "Align critical concurrent structs to 64-byte boundaries using `#[repr(align(64))]`. Structure arrays as Structure-of-Arrays (SoA) instead of Array-of-Structures (AoS) to ensure tight cacheline strides during sequential loops.",
    toolingAndDiagnostics: "Run `perf stat -e cache-misses,L1-dcache-load-misses` to measure hardware cache performance.",
    codeSnippet: `use std::sync::atomic::AtomicUsize;

// Align to 64 bytes to guarantee each thread's atomic resides on a distinct cache line:
#[repr(align(64))]
pub struct ThreadLocalCounter {
    pub value: AtomicUsize,
} // Eliminates false sharing between CPU cores completely!`
  },
  {
    title: "4. LLVM-IR Optimization & Assembly Inspection",
    hardwareMechanism: "LLVM applies Link-Time Optimization (LTO), loop unrolling, and dead-code elimination. Branch mispredictions flush CPU instruction pipelines (costing 15–20 cycles per miss).",
    rustOptimizationStrategy: "Enable Full LTO (`lto = 'fat'`) and codegen units = 1 in `Cargo.toml`. Use `core::hint::black_box` in benchmarks. Use branch probability hints (`core::intrinsics::likely` / `cold`) to keep critical instruction paths straight in CPU instruction caches.",
    toolingAndDiagnostics: "Run `cargo show-asm --release --lib <symbol>` to verify whether bounds checks were elided and inner loops were vectorized.",
    codeSnippet: `// In Cargo.toml:
// [profile.release]
// opt-level = 3
// lto = "fat"
// codegen-units = 1
// panic = "abort"`
  },
  {
    title: "5. Production Diagnostics & Profiling Toolchain",
    hardwareMechanism: "Hardware Performance Counters (HPC) track branch mispredictions, CPU cycles, and instruction cache stalls directly on physical silicon.",
    rustOptimizationStrategy: "Profile running binaries in production using non-invasive sampling profilers (`perf`, `flamegraph`) and memory analyzers (`valgrind`, `dhat`, `Miri`).",
    toolingAndDiagnostics: "Generate interactive SVG flamegraphs via `cargo flamegraph` to pinpoint CPU bottlenecks down to specific line numbers.",
    codeSnippet: `# Generate an interactive CPU flamegraph:
cargo install flamegraph
cargo flamegraph --bin my_high_throughput_service

# Verify unsafe code for undefined behavior:
cargo miri test`
  }
];
