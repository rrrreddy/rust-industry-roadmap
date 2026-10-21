import { CoreStage } from './types';

export const CORE_ROADMAP_STAGES: CoreStage[] = [
  {
    stage: 1,
    title: "Stage 1: Foundations of Memory & Type Safety",
    duration: "Weeks 1–3",
    objectives: "Unlearn garbage collection assumptions and C/C++ manual pointer risks. Master affine type systems, ownership, borrowing, and RAII guarantees.",
    topics: [
      {
        title: "The Ownership Model & Affine Type Semantics",
        description: "Every resource has exactly one owner at any time. When an owner goes out of scope, the memory is deterministically deallocated without runtime cost or garbage collector pauses.",
        codeSnippet: `fn process_packet(mut data: Vec<u8>) {
    data.push(0xFE);
    // data is dropped right here at function exit deterministically
}

let packet = vec![0x01, 0x02];
process_packet(packet);
// println!("{:?}", packet); // Compile-time Error: use of moved value!`
      },
      {
        title: "Borrowing Rules: Aliasing XOR Mutability",
        description: "You may have any number of immutable references (&T) OR exactly one mutable reference (&mut T), never both simultaneously. This fundamental law eliminates data races at compile time.",
        codeSnippet: `let mut telemetry = vec![100, 102, 99];
let r1 = &telemetry;
let r2 = &telemetry; // OK: multiple readers
// telemetry.push(105); // ERROR: cannot borrow as mutable because it is also borrowed as immutable
println!("Readings: {:?}, {:?}", r1, r2);`
      },
      {
        title: "Lifetimes ('a) & Invariant Annotations",
        description: "Lifetimes tell the compiler how long references are valid relative to each other. They do not change runtime behavior—they simply prove to the compiler that references will never dangle.",
        codeSnippet: `// Struct holding a reference must specify lifetime
struct HardwareFrame<'a> {
    raw_buffer: &'a [u8],
    header_offset: usize,
}

impl<'a> HardwareFrame<'a> {
    fn payload(&self) -> &'a [u8] {
        &self.raw_buffer[self.header_offset..]
    }
}`
      },
      {
        title: "Zero-Cost Enumerations & Pattern Matching",
        description: "Rust enums are tagged unions. Null does not exist; instead, Option<T> and Result<T, E> force explicit handling of absence and failure without performance degradation.",
        codeSnippet: `enum SensorState {
    Calibrating { progress: u8 },
    Online { current_temp: f32, voltage: f32 },
    Fault(FaultCode),
}

fn handle_sensor(state: SensorState) {
    match state {
        SensorState::Online { current_temp, .. } if current_temp > 85.0 => {
            trigger_cooling_loop();
        }
        SensorState::Fault(code) => enter_failsafe_mode(code),
        _ => {}
    }
}`
      }
    ],
    handsOnDrills: [
      "Implement an in-memory ring-buffer without unsafe code.",
      "Write a custom linked list and understand why doubly linked lists require RefCell/Rc or raw indices in safe Rust.",
      "Build a zero-allocation log parser using &str and lifetime bounds."
    ]
  },
  {
    stage: 2,
    title: "Stage 2: Advanced Memory Layout, Concurrency & Unsafe",
    duration: "Weeks 4–7",
    objectives: "Transition to systems mastery: understand memory layouts (repr(C)), pointers, SIMD, lock-free structures, and sound unsafe encapsulation.",
    topics: [
      {
        title: "Memory Representation & ABI Stability",
        description: "Deep dive into struct padding, alignment, repr(C), repr(packed), and zero-sized types (ZSTs) used for compile-time state machines.",
        codeSnippet: `#[repr(C, packed)]
struct EthernetHeader {
    dest_mac: [u8; 6],
    src_mac: [u8; 6],
    ethertype: u16,
}
// Exact byte-for-byte representation matching network hardware DMA`
      },
      {
        title: "Fearless Concurrency: Send, Sync & Atomics",
        description: "Send indicates ownership can be transferred across threads; Sync indicates references can be shared across threads. Combine with atomics for lockless concurrency.",
        codeSnippet: `use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

let counter = Arc::new(AtomicUsize::new(0));
let c_clone = Arc::clone(&counter);

std::thread::spawn(move || {
    c_clone.fetch_add(1, Ordering::SeqCst);
});`
      },
      {
        title: "Unsafe Rust & The Miri Verifier",
        description: "Unsafe gives superpowers: dereferencing raw pointers, calling FFI, mutating statics, and implementing Send/Sync manually. Learn to uphold safety invariants and test with Miri.",
        codeSnippet: `pub struct NonNullSlice<T> {
    ptr: *mut T,
    len: usize,
}

impl<T> NonNullSlice<T> {
    pub unsafe fn get_unchecked(&self, idx: usize) -> &T {
        // SAFETY: Caller must ensure idx < self.len
        &*self.ptr.add(idx)
    }
}`
      }
    ],
    handsOnDrills: [
      "Implement a lock-free Single Producer Single Consumer (SPSC) queue with AtomicPtr.",
      "Audit an unsafe block using `cargo miri test` and eliminate undefined behavior.",
      "Build a type-state pattern builder for an aircraft flight controller that prevents armed state without calibration."
    ]
  },
  {
    stage: 3,
    title: "Stage 3: Async Runtime Mechanics & Systems Architecture",
    duration: "Weeks 8–11",
    objectives: "Master async/await mechanics, pin projections, cooperative multitasking, epoll/kqueue IO drivers, and high-throughput network stacks.",
    topics: [
      {
        title: "How Async Really Works: Future, Poll & Waker",
        description: "Futures in Rust are lazy state machines generated by the compiler. No background threads are spawned unless an executor (like Tokio) polls the future.",
        codeSnippet: `use std::pin::Pin;
use std::task::{Context, Poll};

pub struct DelayedTimer {
    remaining_ticks: usize,
}

impl std::future::Future for DelayedTimer {
    type Output = ();
    fn poll(mut self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output> {
        if self.remaining_ticks == 0 {
            Poll::Ready(())
        } else {
            self.remaining_ticks -= 1;
            cx.waker().wake_by_ref();
            Poll::Pending
        }
    }
}`
      },
      {
        title: "Pinning & Self-Referential Structs",
        description: "Why Pin<&mut T> is indispensable for async generators and memory-mapped hardware pointers that cannot be moved in physical memory.",
        codeSnippet: `// Pinning guarantees the memory address will remain stable
// Essential for DMA transfers and asynchronous state machines`
      }
    ],
    handsOnDrills: [
      "Write a miniature async runtime from scratch using mio and RawWaker.",
      "Build an asynchronous TCP echo server handling 100k simultaneous connections.",
      "Profile CPU cache misses using `perf` and optimize struct cacheline layouts."
    ]
  },
  {
    stage: 4,
    title: "Stage 4: Cross-Compilation, FFI & Industrial Packaging",
    duration: "Weeks 12–16",
    objectives: "Integrate Rust into existing massive enterprise codebases. Expose C headers via cbindgen, consume legacy C++ via cxx, and compile for microcontrollers, WASM, and custom targets.",
    topics: [
      {
        title: "C-ABI Interoperability & FFI",
        description: "Seamlessly replace bottleneck modules in legacy C/C++ or Python/Node backends without rewriting entire stacks.",
        codeSnippet: `// Rust library exportable to C, Python, or Go
#[no_mangle]
pub extern "C" fn calculate_signature(input: *const u8, len: usize, out: *mut u8) -> i32 {
    if input.is_null() || out.is_null() { return -1; }
    // Safe slice construction and cryptographic signing
    0
}`
      },
      {
        title: "Embedded & Bare-Metal (#![no_std])",
        description: "Strip out the standard library and OS runtime to run on microcontrollers (ARM Cortex-M, RISC-V) with deterministic sub-microsecond latency.",
        codeSnippet: `#![no_std]
#![no_main]

use panic_halt as _;
use cortex_m_rt::entry;

#[entry]
fn main() -> ! {
    loop {
        // Deterministic hardware control loop
    }
}`
      }
    ],
    handsOnDrills: [
      "Create a Rust dynamic library (.so / .dylib) and call it from C++ and Python ctypes.",
      "Flash an STM32 or RP2040 microcontroller with a `#![no_std]` Rust firmware reading an I2C accelerometer.",
      "Set up automated CI with Cross for aarch64-unknown-linux-musl and x86_64-pc-windows-msvc."
    ]
  }
];
