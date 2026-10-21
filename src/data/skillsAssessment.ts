export interface SkillCheckItem {
  id: string;
  industryId: string;
  name: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
}

export const INITIAL_SKILLS_ASSESSMENT: SkillCheckItem[] = [
  // Core
  { id: 'c1', industryId: 'core', name: 'Ownership & Move Semantics', category: 'Core Language', level: 'Beginner' },
  { id: 'c2', industryId: 'core', name: 'Borrowing, References & Aliasing XOR Mutability', category: 'Core Language', level: 'Beginner' },
  { id: 'c3', industryId: 'core', name: 'Explicit Lifetimes & Struct Lifetime Annotations', category: 'Core Language', level: 'Intermediate' },
  { id: 'c4', industryId: 'core', name: 'Smart Pointers: Box, Rc, Arc, RefCell, Mutex', category: 'Core Language', level: 'Intermediate' },
  { id: 'c5', industryId: 'core', name: 'Fearless Concurrency with Send & Sync Traits', category: 'Core Language', level: 'Intermediate' },
  { id: 'c6', industryId: 'core', name: 'Unsafe Rust, Raw Pointers & Undefined Behavior (UB)', category: 'Core Language', level: 'Expert' },
  { id: 'c7', industryId: 'core', name: 'Async Mechanics: Futures, Pinning, Poll, Wakers', category: 'Core Language', level: 'Expert' },
  
  // OS & Kernel
  { id: 'os1', industryId: 'operating-systems', name: '#![no_std] Bare Metal Programming', category: 'Operating Systems', level: 'Intermediate' },
  { id: 'os2', industryId: 'operating-systems', name: 'x86_64 / ARM Page Table Manipulation', category: 'Operating Systems', level: 'Expert' },
  { id: 'os3', industryId: 'operating-systems', name: 'Custom Heap Allocators (Buddy/Slab)', category: 'Operating Systems', level: 'Expert' },
  { id: 'os4', industryId: 'operating-systems', name: 'Interrupt Handling & Context Switching ASM', category: 'Operating Systems', level: 'Expert' },
  
  // Cyber Security
  { id: 'cs1', industryId: 'cyber-security', name: 'Zero-Copy Network Packet Parsing with Nom', category: 'Cyber Security', level: 'Intermediate' },
  { id: 'cs2', industryId: 'cyber-security', name: 'eBPF Program Development with Aya', category: 'Cyber Security', level: 'Expert' },
  { id: 'cs3', industryId: 'cyber-security', name: 'Fuzzing with LibAFL and Coverage Feedback', category: 'Cyber Security', level: 'Expert' },
  
  // Defense & Critical
  { id: 'df1', industryId: 'defense-aerospace', name: 'Zero-Heap Allocations with Heapless Crate', category: 'Defense & Avionics', level: 'Intermediate' },
  { id: 'df2', industryId: 'defense-aerospace', name: 'Mathematical Model Checking with Kani', category: 'Defense & Avionics', level: 'Expert' },
  { id: 'df3', industryId: 'defense-aerospace', name: 'Type-State Architectural State Machines', category: 'Defense & Avionics', level: 'Intermediate' },
  
  // Cloud & Distributed
  { id: 'cl1', industryId: 'cloud-infrastructure', name: 'Tokio Multi-Threaded Concurrency Tuning', category: 'Cloud Infrastructure', level: 'Intermediate' },
  { id: 'cl2', industryId: 'cloud-infrastructure', name: 'Linux io_uring High-Throughput I/O', category: 'Cloud Infrastructure', level: 'Expert' },
  { id: 'cl3', industryId: 'cloud-infrastructure', name: 'Distributed Raft Consensus Implementation', category: 'Cloud Infrastructure', level: 'Expert' },
  
  // FinTech / HFT
  { id: 'ft1', industryId: 'fintech-hft', name: 'Lock-Free Ring Buffers & Atomic Memory Orderings', category: 'FinTech / HFT', level: 'Expert' },
  { id: 'ft2', industryId: 'fintech-hft', name: 'Cache-Line Alignment & False Sharing Elimination', category: 'FinTech / HFT', level: 'Expert' },
  { id: 'ft3', industryId: 'fintech-hft', name: 'Zero-Allocation Limit Order Book Design', category: 'FinTech / HFT', level: 'Intermediate' },
  
  // Robotics
  { id: 'rb1', industryId: 'robotics-automotive', name: 'SIMD Vector Transformations with Nalgebra', category: 'Robotics', level: 'Intermediate' },
  { id: 'rb2', industryId: 'robotics-automotive', name: 'Linux SocketCAN & Automotive Frames', category: 'Robotics', level: 'Intermediate' },
  { id: 'rb3', industryId: 'robotics-automotive', name: 'Hard Real-Time Loop Scheduling with SCHED_FIFO', category: 'Robotics', level: 'Expert' },
  
  // WebAssembly
  { id: 'wa1', industryId: 'webassembly-edge', name: 'Zero-Copy TypedArray Sharing with wasm-bindgen', category: 'WebAssembly', level: 'Intermediate' },
  { id: 'wa2', industryId: 'webassembly-edge', name: 'Embedding Wasmtime Host Runtimes with Fuel Limits', category: 'WebAssembly', level: 'Expert' },
  { id: 'wa3', industryId: 'webassembly-edge', name: 'WASM Size Profiling & LTO Optimizations', category: 'WebAssembly', level: 'Intermediate' },
];
