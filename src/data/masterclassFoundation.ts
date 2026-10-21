export interface ParetoConcept {
  id: string;
  rank: number;
  title: string;
  tagline: string;
  mentalModel: string;
  whyItUnlocks80Percent: string;
  codeSnippet: string;
  keyRule: string;
}

export interface ConceptualDependencyStep {
  id: string;
  stepNumber: number;
  title: string;
  physicalReality: string;
  whyItMatters: string;
  dependsOn: string;
  keyTakeaway: string;
}

export interface SkillPhaseMilestone {
  id: string;
  phaseName: 'Beginner: Safe Computation' | 'Intermediate: Systems & Concurrency' | 'Advanced: Staff & Industry Mastery';
  badge: 'Phase 1' | 'Phase 2' | 'Phase 3';
  color: string;
  targetAudience: string;
  coreSkills: {
    title: string;
    description: string;
    practicalFocus: string;
  }[];
  handsOnProjects: {
    title: string;
    difficulty: string;
    description: string;
    constraints: string[];
    deliverables: string[];
  }[];
  recommendedResources: {
    title: string;
    type: 'Official Book' | 'Interactive' | 'Deep Dive' | 'Guide';
    url: string;
    description: string;
  }[];
  masteryCheckpoints: {
    id: string;
    criteria: string;
    verificationMethod: string;
  }[];
}

export interface CommonPitfall {
  id: string;
  mistake: string;
  frequency: 'Extremely Common' | 'High' | 'Critical Trap';
  whyItHappens: string;
  consequences: string;
  idiomaticFix: string;
  badCode: string;
  goodCode: string;
}

export const PARETO_CORE_CONCEPTS: ParetoConcept[] = [
  {
    id: "pareto-1",
    rank: 1,
    title: "1. Affine Ownership & Single Ownership Semantics",
    tagline: "Every value on stack or heap has exactly ONE owner at any point in time.",
    mentalModel: "Think of physical real estate deeds. A house can only have one legal title holder. When you transfer the title to a buyer (Move), you no longer own it. When the owner passes away or leaves the area (Scope Exit), the house is demolished (Dropped) automatically without tax or delay.",
    whyItUnlocks80Percent: "It replaces manual malloc/free and background Garbage Collectors entirely. Understanding move semantics eliminates memory leaks, double-free crashes, and dangling pointers across every layer of computing.",
    keyRule: "Values move on assignment or function calls unless the type implements the Copy trait (like numbers).",
    codeSnippet: `fn main() {
    let payload = String::from("Crucial Aerospace Telemetry");
    
    // Passing payload moves ownership into process_data:
    process_data(payload);
    
    // println!("{}", payload); 
    // COMPILE ERROR: use of moved value! Rust prevents using freed memory.
}

fn process_data(data: String) {
    println!("Safely Processing: {}", data);
} // 'data' goes out of scope here: Heap memory is instantly deallocated!`
  },
  {
    id: "pareto-2",
    rank: 2,
    title: "2. Aliasing XOR Mutability (The Borrow Invariant)",
    tagline: "Any number of readers (&T) OR exactly one writer (&mut T) — never both simultaneously.",
    mentalModel: "Think of an authoritative document: 100 people can read copies over your shoulder at the exact same instant (Immutable Borrow). But if someone needs to edit the document with a pen (Mutable Borrow), all readers must wait until the editor finishes. This single rule prevents data races.",
    whyItUnlocks80Percent: "This fundamental law eliminates iterator invalidation, race conditions, and pointer aliasing bugs statically during compilation without running a single unit test.",
    keyRule: "References (&) are just safe pointers tagged with compiler-verified lifetimes.",
    codeSnippet: `fn main() {
    let mut account_balance = 10_000;

    let reader1 = &account_balance;
    let reader2 = &account_balance; // OK: Multiple readers simultaneously
    println!("Active audits: {}, {}", reader1, reader2);

    // To write, all readers must be out of active scope:
    let writer = &mut account_balance;
    *writer += 5_000; // OK: Single exclusive writer
    println!("Updated Balance: {}", account_balance);
}`
  },
  {
    id: "pareto-3",
    rank: 3,
    title: "3. Exhaustive Sum Types (Option<T>, Result<T, E> & Match)",
    tagline: "Null does not exist. Operations that might fail return explicit containers.",
    mentalModel: "Tony Hoare called null his 'billion-dollar mistake'. Rust banned null. Values that might not exist are wrapped in an Option (either Some(data) or None). Operations that can fail return a Result (either Ok(data) or Err(error)). The compiler forces you to handle both cases.",
    whyItUnlocks80Percent: "Prevents 99% of unexpected production crashes (NullPointerExceptions, unhandled panics) and makes error handling explicit, readable, and composable with the '?' operator.",
    keyRule: "Never use .unwrap() in production code; handle branches with match or propagate with '?'.",
    codeSnippet: `fn fetch_crypto_balance(user_id: u32) -> Result<u64, String> {
    if user_id == 0 {
        return Err("Account ID not registered on ledger".to_string());
    }
    Ok(150_000_000) // 1.5 SOL
}

fn display_user_dashboard(user_id: u32) {
    match fetch_crypto_balance(user_id) {
        Ok(lamports) => println!("Balance: {} lamports", lamports),
        Err(err) => eprintln!("Security alert: {}", err),
    }
}`
  },
  {
    id: "pareto-4",
    rank: 4,
    title: "4. Trait-Based Composition Over Object-Oriented Inheritance",
    tagline: "No classes, no virtual inheritance trees. Structs hold data; Traits define behavior.",
    mentalModel: "Think of USB-C plugs. Anything with a USB-C port can receive electricity (a laptop, a drone battery, a camera). In Rust, a Trait is that port specification. Generics (<T: Trait>) stamp out tailored, zero-cost machine code for every type plugged in at compile time.",
    whyItUnlocks80Percent: "Eliminates bloated, brittle OOP inheritance trees. Keeps code clean, testable, and cache-friendly with zero runtime performance penalty (zero-cost static dispatch).",
    keyRule: "Favor generic trait bounds (<T: Trait>) for static dispatch; use trait objects (&dyn Trait) only when runtime polymorphism is mandatory.",
    codeSnippet: `pub trait Signable {
    fn signature_bytes(&self) -> Vec<u8>;
}

pub struct Transaction { pub tx_id: u64, pub amount: u64 }
pub struct LoginToken { pub user: String }

impl Signable for Transaction {
    fn signature_bytes(&self) -> Vec<u8> { self.tx_id.to_le_bytes().to_vec() }
}

// Generic function: accepts ANY type T that implements Signable with ZERO runtime overhead!
pub fn broadcast_payload<T: Signable>(item: &T) {
    let bytes = item.signature_bytes();
    println!("Broadcasting {} signature bytes...", bytes.len());
}`
  },
  {
    id: "pareto-5",
    rank: 5,
    title: "5. Fearless Concurrency Contracts (Send and Sync)",
    tagline: "Thread safety is not an afterthought; it is a compile-time mathematical guarantee.",
    mentalModel: "In C++, two threads writing to the same memory is like two drivers fighting for the same steering wheel. In Rust, the compiler inspects your types. If a type isn't safe to move across threads (!Send) or share across threads (!Sync), your code simply refuses to compile.",
    whyItUnlocks80Percent: "Unlocks modern multi-core computing without data races. You can safely spawn threads, use worker channels, and write asynchronous server loops knowing data collisions are statically impossible.",
    keyRule: "Use Arc<Mutex<T>> when sharing mutable state across threads; use channels (mpsc) for message-passing.",
    codeSnippet: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    let telemetry_accumulator = Arc::new(Mutex::new(0));
    let mut workers = vec![];

    for _ in 0..4 {
        let counter_clone = Arc::clone(&telemetry_accumulator);
        let handle = thread::spawn(move || {
            let mut guard = counter_clone.lock().unwrap();
            *guard += 25; // Safely incremented inside lock
        });
        workers.push(handle);
    }

    for worker in workers { worker.join().unwrap(); }
    println!("Total Telemetry Accumulated: {}", *telemetry_accumulator.lock().unwrap());
}`
  }
];

export const CONCEPTUAL_FOUNDATION_STEPS: ConceptualDependencyStep[] = [
  {
    id: "dep-0",
    stepNumber: 0,
    title: "Step 0: Hardware Memory Architecture",
    physicalReality: "The CPU registers, L1/L2/L3 cachelines (64 bytes), Stack (LIFO contiguous memory, zero allocator cost), and Heap (dynamic, fragmented OS allocation via pointers).",
    whyItMatters: "You cannot understand why Rust moves values or why references exist without knowing that heap allocations cost hundreds of CPU cycles while stack operations cost zero.",
    dependsOn: "None (Ground Zero Physics)",
    keyTakeaway: "Stack memory is fast, deterministic, and free. Heap memory is flexible but requires pointer indirection and allocation tracking."
  },
  {
    id: "dep-1",
    stepNumber: 1,
    title: "Step 1: Value Semantics & The Affine Type System",
    physicalReality: "When an integer is copied on the stack, it's a bitwise memcpy (Copy). When a vector or string is moved, only its 24-byte pointer/length/capacity header moves on the stack, leaving heap bytes untouched.",
    whyItMatters: "Explains why passing data into a function invalidates the caller's variable without doing slow deep memory copying.",
    dependsOn: "Step 0: Hardware Memory Architecture",
    keyTakeaway: "Move semantics transfer ownership of the 24-byte stack header. Memory is deallocated the instant the single owner's scope closes."
  },
  {
    id: "dep-2",
    stepNumber: 2,
    title: "Step 2: References, Borrowing & Static Lifetimes ('a)",
    physicalReality: "A reference (&T) is a 64-bit machine pointer attached to a compiler static proof tag ('a). The compiler proves the referenced data cannot die before the reference does.",
    whyItMatters: "Eliminates dangling pointers, use-after-free CVEs, and data races before machine code is generated.",
    dependsOn: "Step 1: Affine Type System",
    keyTakeaway: "Lifetimes don't change how your code runs; they simply prove to the compiler that references will never point to dead memory."
  },
  {
    id: "dep-3",
    stepNumber: 3,
    title: "Step 3: Algebraic Data Types (Sum Types) & Pattern Matching",
    physicalReality: "Rust enums are Tagged Unions stored as an integer tag (discriminant) followed by memory sized to the largest variant.",
    whyItMatters: "Permits modeling domains where states are mutually exclusive (e.g., Connected vs Disconnected vs Reconnecting), making illegal states unrepresentable.",
    dependsOn: "Step 1 & 2: Ownership and Borrowing inside variants",
    keyTakeaway: "Pattern matching is exhaustive. If you add a new state, the compiler forces you to update every match site across the entire project."
  },
  {
    id: "dep-4",
    stepNumber: 4,
    title: "Step 4: Traits & Zero-Cost Monomorphization",
    physicalReality: "When compiling generic code <T: Trait>, the compiler duplicates machine instructions for each concrete type T, converting trait calls into direct CPU jumps.",
    whyItMatters: "Enables reusable abstractions without virtual function pointer overhead or garbage collection.",
    dependsOn: "Step 3: Structs and Enums implementing Traits",
    keyTakeaway: "Traits give you the expressive power of interfaces with the raw execution speed of handwritten C assembly."
  },
  {
    id: "dep-5",
    stepNumber: 5,
    title: "Step 5: Concurrency Primitives & Memory Orderings",
    physicalReality: "Multi-core CPUs have out-of-order execution pipelines. Send and Sync traits prevent data races, while atomics synchronize hardware memory bus lines.",
    whyItMatters: "Allows scaling software across 64+ CPU cores safely without silent memory corruption or deadlocks.",
    dependsOn: "Step 2 & 4: Borrow rules across thread boundaries",
    keyTakeaway: "If a type is thread-safe, the compiler proves it with Send/Sync. If it's not, cross-thread sharing fails at compile time."
  },
  {
    id: "dep-6",
    stepNumber: 6,
    title: "Step 6: Asynchronous State Machines & Pinning",
    physicalReality: "An async fn is compiled into a self-referential state machine struct. Moving it in physical RAM would break internal pointer addresses; Pin<P> guarantees address stability.",
    whyItMatters: "Enables cooperative multitasking capable of juggling 500,000+ simultaneous web sockets or crypto feeds on modest hardware.",
    dependsOn: "Step 2, 4 & 5: Lifetimes, Traits, and Thread executors",
    keyTakeaway: "Futures are lazy; they do zero work until polled by an executor like Tokio."
  }
];

export const SKILL_BUILDING_PHASES: SkillPhaseMilestone[] = [
  {
    phaseName: "Beginner: Safe Computation",
    badge: "Phase 1",
    color: "from-blue-600 to-indigo-700",
    targetAudience: "Absolute Beginners (Weeks 1 to 4)",
    coreSkills: [
      {
        title: "Toolchain Mechanics & Cargo Workflow",
        description: "Mastering `cargo new`, `cargo check`, `cargo clippy`, and `cargo test`.",
        practicalFocus: "Writing clean, warning-free code that passes all default Clippy audits."
      },
      {
        title: "Ownership & Borrowing Mental Model",
        description: "Moving data, taking shared references (&T), and exclusive mutable borrows (&mut T).",
        practicalFocus: "Solving compiler borrow errors without resorting to unnecessary `.clone()` calls."
      },
      {
        title: "Pattern Matching & Error Propagation",
        description: "Modeling data with Structs and Enums, and using the `?` operator on `Result<T, E>`.",
        practicalFocus: "Replacing defensive if-null checks with exhaustive pattern matching."
      },
      {
        title: "Collections & Iterators",
        description: "Transforming data with `Vec`, `HashMap`, `.iter()`, `.map()`, `.filter()`, and `.collect()`.",
        practicalFocus: "Writing declarative functional loops that compile to vectorized SIMD machine code."
      }
    ],
    handsOnProjects: [
      {
        title: "Project 1.1: CLI Financial Ledger & Expense Auditor",
        difficulty: "Beginner",
        description: "Build a command-line tool that reads financial transaction records from a CSV file, parses amounts into a custom Enum (Income vs Expense), checks for duplicate IDs, and prints formatted monthly balance sheets.",
        constraints: [
          "Zero uses of `.unwrap()` or `.expect()` in non-test code",
          "All errors must be handled and formatted with Result<T, E>",
          "Zero unnecessary heap memory allocations"
        ],
        deliverables: [
          "Robust file I/O using `std::fs` and `std::io::BufReader`",
          "Custom error enum implementing `std::fmt::Display`",
          "Automated unit tests verifying debit and credit calculations"
        ]
      },
      {
        title: "Project 1.2: In-Memory Key-Value Store with TTL Eviction",
        difficulty: "Beginner-Intermediate",
        description: "Build an in-memory dictionary cache where each stored key has a time-to-live (TTL). Implement methods to set, get, delete, and purge expired keys on access.",
        constraints: ["Must handle absent keys gracefully using `Option<&V>`"],
        deliverables: ["Clean struct implementation with `HashMap<String, (V, Instant)>`", "Comprehensive test suite"]
      }
    ],
    recommendedResources: [
      {
        title: "The Rust Programming Language (The Book)",
        type: "Official Book",
        url: "https://doc.rust-lang.org/book/",
        description: "Chapters 1 through 10 & 13. The foundational bible for syntax, ownership, and structs."
      },
      {
        title: "Rustlings Interactive Exercises",
        type: "Interactive",
        url: "https://github.com/rust-lang/rustlings",
        description: "Small interactive exercises fixing compiler errors sequentially."
      },
      {
        title: "Rust by Example",
        type: "Guide",
        url: "https://doc.rust-lang.org/rust-by-example/",
        description: "Bite-sized, copy-pasteable code examples demonstrating idiomatic concepts."
      }
    ],
    masteryCheckpoints: [
      {
        id: "chk-1-1",
        criteria: "Explain why `let s2 = s1;` causes `println!(\"{}\", s1);` to fail to compile for Strings but works for integers.",
        verificationMethod: "Passes mental model check on Move vs Copy traits."
      },
      {
        id: "chk-1-2",
        criteria: "Write a program that parses untrusted user input with 0 uses of `.unwrap()` where `cargo clippy` emits 0 warnings.",
        verificationMethod: "Clean compiler build on strict Clippy flags."
      },
      {
        id: "chk-1-3",
        criteria: "Implement a function that borrows a vector, searches for an element, and returns an `Option<&T>` without cloning memory.",
        verificationMethod: "Borrow checker verified test."
      }
    ]
  },
  {
    phaseName: "Intermediate: Systems & Concurrency",
    badge: "Phase 2",
    color: "from-amber-600 to-orange-700",
    targetAudience: "Practitioners Building Real Systems (Weeks 5 to 10)",
    coreSkills: [
      {
        title: "Standard Trait Implementation",
        description: "Implementing `Display`, `Debug`, `Clone`, `From`/`Into`, `Default`, and `Deref`.",
        practicalFocus: "Writing idiomatic libraries that integrate smoothly with standard Rust conventions."
      },
      {
        title: "Multi-Threaded Concurrency",
        description: "Spawning threads, atomic reference counting (`Arc`), mutual exclusion (`Mutex`), and MPSC channels.",
        practicalFocus: "Building parallel compute worker pools without data races or deadlocks."
      },
      {
        title: "Asynchronous I/O with Tokio",
        description: "Task spawning (`tokio::spawn`), async timeouts, cooperative yielding, and async channels.",
        practicalFocus: "Handling high-concurrency network sockets without thread exhaustion."
      },
      {
        title: "Zero-Copy Parsing & Serialization",
        description: "Parsing binary and text protocols directly from byte slices with `serde` and `nom`.",
        practicalFocus: "Eliminating memory copying on high-throughput data pipelines."
      }
    ],
    handsOnProjects: [
      {
        title: "Project 2.1: Multi-Threaded Asynchronous Web Crawler & Link Auditor",
        difficulty: "Intermediate",
        description: "Build an asynchronous web crawler that ingests a root domain, concurrently crawls child links using `reqwest` and `tokio`, parses HTML anchors, detects dead 404 links, and safely stores visited URLs across threads using `Arc<RwLock<HashSet<String>>>`.",
        constraints: [
          "Rate-limit network connections to at most 10 concurrent requests to prevent server flooding",
          "Handle timeouts and TLS certificate errors gracefully without crashing"
        ],
        deliverables: [
          "Tokio asynchronous worker pool",
          "Thread-safe shared state with `Arc` and `RwLock`",
          "Progress bar and structured JSON output"
        ]
      },
      {
        title: "Project 2.2: Zero-Copy Binary Protocol Stream Parser",
        difficulty: "Intermediate",
        description: "Parse binary network packet captures (PCAP) or stock feed order messages (NASDAQ ITCH) using the `nom` parser combinator library directly from raw byte buffers.",
        constraints: ["Zero heap allocation on the hot parsing path"],
        deliverables: ["Nom combinator pipeline returning `IResult<&[u8], Frame>`", "Nanosecond microbenchmarks with Criterion"]
      }
    ],
    recommendedResources: [
      {
        title: "Rust for Rustaceans (Jon Gjengset)",
        type: "Deep Dive",
        url: "https://nostarch.com/rust-rustaceans",
        description: "The premier architectural guide for intermediate developers mastering generics, lifetimes, and unsafe boundaries."
      },
      {
        title: "Tokio Official Documentation & Tutorials",
        type: "Guide",
        url: "https://tokio.rs/tokio/tutorial",
        description: "Comprehensive step-by-step tutorial on asynchronous network runtimes."
      },
      {
        title: "The Rust Performance Book",
        type: "Deep Dive",
        url: "https://nnethercote.github.io/perf-book/",
        description: "Essential guide on struct padding, memory layouts, allocations, and cache friendliness."
      }
    ],
    masteryCheckpoints: [
      {
        id: "chk-2-1",
        criteria: "Implement a generic trait with associated types and use it across 3 different structs with zero compiler warnings.",
        verificationMethod: "Clean generic unit test suite."
      },
      {
        id: "chk-2-2",
        criteria: "Demonstrate a multi-threaded producer-consumer pipeline passing 100,000 messages across threads without deadlocks.",
        verificationMethod: "Stress-tested multi-threaded execution."
      },
      {
        id: "chk-2-3",
        criteria: "Explain why running a heavy blocking CPU calculation inside an async Tokio task starves worker threads, and demonstrate the fix with `spawn_blocking`.",
        verificationMethod: "Architectural code review."
      }
    ]
  },
  {
    phaseName: "Advanced: Staff & Industry Mastery",
    badge: "Phase 3",
    color: "from-emerald-600 to-teal-800",
    targetAudience: "Staff / Principal Systems Engineers (Weeks 11 to 20+)",
    coreSkills: [
      {
        title: "Bare-Metal Compilation (#![no_std])",
        description: "Stripping OS runtime assumptions to run directly on microcontrollers or hypervisors.",
        practicalFocus: "Writing bootloaders, drivers, and space satellite controllers."
      },
      {
        title: "Sound Unsafe Rust & FFI Invariant Auditing",
        description: "Encapsulating raw pointer arithmetic inside 100% safe public APIs verified with Miri.",
        practicalFocus: "Interfacing with C libraries and writing custom low-level memory allocators."
      },
      {
        title: "Hardware Cacheline & Lock-Free Optimization",
        description: "Eliminating false sharing with `#[repr(align(64))]` and utilizing Acquire/Release atomics.",
        practicalFocus: "Writing sub-microsecond trading engines and kernel bypass network drivers."
      },
      {
        title: "Formal Verification & Model Checking",
        description: "Mathematically proving that loops terminate and code never panics using tools like Kani.",
        practicalFocus: "DO-178C avionics and mission-critical defense certification."
      }
    ],
    handsOnProjects: [
      {
        title: "Industry Capstone A (Web3): Solana Escrow Program with Anchor",
        difficulty: "Staff Level",
        description: "Architect a decentralized token vault using Program Derived Addresses (PDAs) with safe integer arithmetic and cross-program invocations (CPI).",
        constraints: ["Zero integer overflow/underflow vulnerabilities", "Verified with Anchor test suite"],
        deliverables: ["Solana on-chain program", "Client TypeScript integration tests", "Security audit checklist"]
      },
      {
        title: "Industry Capstone B (OS/Kernel): Bootable 64-bit Microkernel",
        difficulty: "Staff Level",
        description: "Build an operating system from scratch that boots in QEMU, initializes the Interrupt Descriptor Table (IDT), maps 4-level paging memory, and switches CPU context between two tasks.",
        constraints: ["Must compile with `#![no_std]` and `#![no_main]`"],
        deliverables: ["VGA and serial console drivers", "Assembly context switching routine", "Page frame allocator"]
      },
      {
        title: "Industry Capstone C (HFT): Sub-400ns Limit Order Book",
        difficulty: "Staff Level",
        description: "Implement a price-time priority stock matching core using pre-allocated contiguous memory arenas and lock-free SPSC queues.",
        constraints: ["Zero dynamic heap allocations on the critical hot path", "Average match latency < 400ns"],
        deliverables: ["Matching engine core", "Criterion nanosecond microbenchmarks", "Cacheline alignment validation"]
      }
    ],
    recommendedResources: [
      {
        title: "The Rustonomicon (The Dark Arts of Unsafe Rust)",
        type: "Official Book",
        url: "https://doc.rust-lang.org/nomicon/",
        description: "Mandatory reading on undefined behavior, pointer aliasing, and custom collections."
      },
      {
        title: "Writing an OS in Rust (Philipp Oppermann)",
        type: "Guide",
        url: "https://os.phil-opp.com/",
        description: "The gold-standard curriculum for bare-metal systems, paging, and interrupts."
      },
      {
        title: "Aya: eBPF in Rust Documentation",
        type: "Guide",
        url: "https://aya-rs.dev/book/",
        description: "Modern in-kernel Linux observability, networking, and security telemetry."
      }
    ],
    masteryCheckpoints: [
      {
        id: "chk-3-1",
        criteria: "Write an unsafe block with a documented `// SAFETY:` proof that passes `cargo miri test` with zero undefined behavior violations.",
        verificationMethod: "Automated Miri memory verification."
      },
      {
        id: "chk-3-2",
        criteria: "Compile a `#![no_std]` binary that boots directly on bare silicon or QEMU without an operating system.",
        verificationMethod: "Hardware/QEMU boot execution."
      },
      {
        id: "chk-3-3",
        criteria: "Profile and eliminate CPU cache misses on a multi-threaded data pipeline using Linux `perf` and cacheline alignment.",
        verificationMethod: "Hardware performance counter audit."
      }
    ]
  }
];

export const COMMON_BEGINNER_PITFALLS: CommonPitfall[] = [
  {
    id: "pitfall-1",
    mistake: "Fighting the Borrow Checker with `.clone()` Everywhere",
    frequency: "Extremely Common",
    whyItHappens: "Beginners coming from Python, JavaScript, or Java get compiler errors when moving variables. They slap `.clone()` on every error to make the compiler happy.",
    consequences: "Deep heap cloning destroys performance, wastes megabytes of memory, and hides bad architecture designs.",
    idiomaticFix: "Pass shared borrows (`&T`) for read-only inspections. Only call `.clone()` when the data genuinely requires an independent lifecycle in another thread or data structure.",
    badCode: `// BAD: Unnecessary heap cloning just to appease the compiler
fn audit_user(user: User) {
    save_to_database(user.clone());
    send_email_notification(user.clone());
    log_activity(user);
}`,
    goodCode: `// GOOD: Borrowing references cleanly with zero memory duplication
fn audit_user(user: &User) {
    save_to_database(user);
    send_email_notification(user);
    log_activity(user);
}`
  },
  {
    id: "pitfall-2",
    mistake: "Overusing `.unwrap()` and `.expect()` in Production Code",
    frequency: "Extremely Common",
    whyItHappens: "Beginners want code to compile quickly and unwrap `Option` or `Result` containers directly without handling failures.",
    consequences: "When untrusted data, missing files, or network drops occur in production, `.unwrap()` panics and instantly crashes the entire server.",
    idiomaticFix: "Propagate errors up the call stack using the `?` operator, or handle branches explicitly with `match` or `if let`.",
    badCode: `// BAD: Panics and crashes if file is missing or contains invalid UTF-8
fn read_config() -> String {
    let mut file = std::fs::File::open("config.json").unwrap();
    let mut contents = String::new();
    file.read_to_string(&mut contents).unwrap();
    contents
}`,
    goodCode: `// GOOD: Gracefully propagates errors to caller using '?'
fn read_config() -> Result<String, std::io::Error> {
    let mut file = std::fs::File::open("config.json")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}`
  },
  {
    id: "pitfall-3",
    mistake: "Trying to Force Object-Oriented Inheritance Hierarchies",
    frequency: "High",
    whyItHappens: "Engineers with Java/C++ backgrounds try to create 'BaseAnimal' classes and subclass 'Dog' and 'Cat' with virtual overrides.",
    consequences: "Rust has no `class` or `extends` keyword. Trying to build inheritance trees leads to lifetime soup and unmanageable pointer structures.",
    idiomaticFix: "Use Composition over Inheritance: embed structs inside structs, and use Traits to share behavioral contracts.",
    badCode: `// ANTI-PATTERN: Trying to simulate inheritance with complex pointers
struct BaseDevice { id: u32, ip: String }
struct Drone { base: Box<BaseDevice>, battery_level: u8 }`,
    goodCode: `// IDIOMATIC: Composition + Traits
pub trait Controllable {
    fn send_heartbeat(&self);
}

pub struct Drone {
    pub device_id: u32,
    pub battery_level: u8,
}

impl Controllable for Drone {
    fn send_heartbeat(&self) { println!("Drone {} pinging base", self.device_id); }
}`
  },
  {
    id: "pitfall-4",
    mistake: "Blocking the Asynchronous Tokio Worker Thread Pool",
    frequency: "Critical Trap",
    whyItHappens: "Running heavy CPU computation (like hashing large files or training ML weights) directly inside an `async fn`.",
    consequences: "An async executor (Tokio) multiplexes thousands of tasks onto a small pool of CPU threads. A blocking calculation freezes the worker thread, stalling all other 10,000 tasks.",
    idiomaticFix: "Offload heavy CPU work or synchronous file I/O to a dedicated blocking thread pool using `tokio::task::spawn_blocking`.",
    badCode: `// BAD: Freezes the entire Tokio event loop!
async fn process_incoming_request() {
    // Heavy 3-second CPU hashing blocks other async tasks on this thread:
    let hash = compute_expensive_argon2_hash(); 
}`,
    goodCode: `// GOOD: Runs CPU-bound work on dedicated blocking threadpool
async fn process_incoming_request() {
    let hash = tokio::task::spawn_blocking(|| {
        compute_expensive_argon2_hash()
    }).await.unwrap();
}`
  },
  {
    id: "pitfall-5",
    mistake: "Reaching for `unsafe` Rust Prematurely",
    frequency: "High",
    whyItHappens: "Beginners assume 'systems programming' requires raw pointers and unsafe blocks, or use unsafe to bypass borrow checker errors.",
    consequences: "Unsafe disables the compiler's safety nets, leading to memory corruptions, segmentation faults, and security vulnerabilities.",
    idiomaticFix: "98% of production systems (including high-speed trading and crypto protocols) are written in safe Rust. Only use `unsafe` for primitive FFI or hardware MMIO, and always test with `cargo miri`.",
    badCode: `// BAD: Bypassing borrow checker with raw pointer casts
let mut x = 10;
let ptr = &mut x as *mut i32;
unsafe { *ptr = 20; }`,
    goodCode: `// GOOD: Safe Rust handles this cleanly with zero overhead
let mut x = 10;
x = 20;`
  }
];
