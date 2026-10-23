# Module 10: Advanced Rust, Unsafe & The Compiler Frontier

**Subtitle**: Raw Pointers, FFI C-ABI, Miri UB Detection, and Declarative & Procedural Macros  
**Level**: Master | **Estimated Time**: 75 mins

## Overview
Unlock Rust's lowest-level capabilities: The Five Unsafe Superpowers, raw pointers (`*const T`, `*mut T`), C-ABI FFI, validating memory safety with Miri, metaprogramming with `macro_rules!` and procedural macros, and inspecting LLVM-IR.

---

## 1. Core Lessons & Hardware Realities

### 1.1 Unsafe Rust & The Five Superpowers

Unsafe Rust does not disable the borrow checker or type system. It grants exactly five specific superpowers to bypass compiler invariants when interacting directly with hardware, registers, or foreign code:
1. Dereference raw pointers (`*const T`, `*mut T`).
2. Call an unsafe function or method.
3. Implement an unsafe trait.
4. Mutate a mutable static variable.
5. Access fields of a `union`.

> ⚙️ **Hardware & Low-Level Reality**: Raw pointers can be null, unaligned, and ignore borrowing rules. Dereferencing an invalid raw pointer causes Undefined Behavior (UB), segmentation faults, or silent security vulnerabilities.

```rust
let mut val = 42;
let r1 = &val as *const i32;
let r2 = &mut val as *mut i32;

unsafe {
    *r2 = 100;
    println!("Dereferenced raw pointer: {}", *r1);
}
```

*Analysis*: Creating raw pointers is safe; only dereferencing them requires an explicit `unsafe` block.

### 1.2 Foreign Function Interface (FFI) & Miri Verification

Rust seamlessly calls and is called by C code via `extern "C"`. Data structures passed across FFI boundaries must use `#[repr(C)]` to guarantee standard platform ABI alignment. To verify that unsafe code complies with the Stacked Borrows and Tree Borrows memory models, the Rust team provides Miri: an interpreter for Rust MIR that detects undefined behavior, memory leaks, unaligned reads, and invalid pointer provenance at test time.

> ⚙️ **Hardware & Low-Level Reality**: Miri acts as an abstract virtual machine that tracks the exact allocation provenance of every single byte in memory.

```rust
// FFI declaration:
extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    let result = unsafe { abs(-5) };
    assert_eq!(result, 5);
}
```

*Analysis*: Calls the standard C library `abs` function directly across the C-ABI.

### 1.3 Metaprogramming: Declarative vs Procedural Macros

Macros operate at the Abstract Syntax Tree (AST) level before code generation:
1. Declarative Macros (`macro_rules!`): Pattern-matching syntax transformation.
2. Procedural Macros: Functions that accept a `TokenStream` and emit a new `TokenStream` during compilation. They come in three forms: Custom Derive (`#[derive(Serialize)]`), Attribute-like (`#[tokio::main]`), and Function-like (`sql!("SELECT ...")`).

> ⚙️ **Hardware & Low-Level Reality**: Procedural macros run as compiled native plugins during compilation, enabling compile-time code generation and schema validation.

```rust
macro_rules! my_vec {
    ( $( $x:expr ),* ) => {{
        let mut temp = Vec::new();
        $( temp.push($x); )*
        temp
    }};
}
let v = my_vec![1, 2, 3];
```

*Analysis*: Declarative macro expanding into vector initialization statements.

---

## 2. Key Takeaways

- Unsafe Rust grants exactly five superpowers for hardware and FFI integration; the borrow checker remains active.
- Always wrap unsafe blocks inside safe, invariant-preserving abstractions.
- Run `cargo +nightly miri test` to detect undefined behavior, memory leaks, and pointer aliasing violations.
- FFI structs must use `#[repr(C)]` to match target platform C-ABI layout.
- Procedural macros run at compile time to transform token streams, enabling expressive code generation.

---

## 3. Deep Conceptual Q&A

### Q1: What is Miri and why is it essential for verifying unsafe Rust code?

**Answer**: Miri is an interpreter for Rust's Mid-Level Intermediate Representation (MIR). While tests running natively on CPU hardware might appear to pass even with undefined behavior (due to compiler quirks or lucky memory layouts), Miri executes code in an interpreted environment that tracks pointer provenance, detecting stacked borrows violations, use-after-free, unaligned reads, and data races before production deployment.

*Core Concept*: `Miri & Undefined Behavior`

---

## 4. Mastery Multiple-Choice Questions (MCQs)

### Question 1: Which of the following actions is completely legal in safe Rust and does NOT require an unsafe block?

- **A**: Creating a raw pointer from a reference (`&x as *const i32`) (Correct Answer)
- **B**: Dereferencing a raw pointer (`*raw_ptr`)
- **C**: Calling a C library function declared with `extern "C"`
- **D**: Mutating a mutable static variable

> **Architectural Explanation**: Creating a raw pointer from a valid reference is completely safe. Only dereferencing the raw pointer requires an unsafe block.

