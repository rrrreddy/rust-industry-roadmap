# Module 2: The Core Engine: Ownership, Borrowing & Stack vs Heap

**Subtitle**: Memory Allocation Mechanics, Move Semantics, RAII, and the Borrow Checker  
**Level**: Foundational | **Estimated Time**: 60 mins

## Overview
Master the central pillar of Rust systems programming: Stack vs Heap memory allocation, the Three Rules of Ownership, move semantics vs shallow copy, and the Aliasing XOR Mutability theorem.

---

## 1. Core Lessons & Hardware Realities

### 1.1 Hardware Memory Model: The Stack vs The Heap

The Stack is a Last-In-First-Out (LIFO) contiguous region of memory managed automatically by the CPU's Stack Pointer (RSP) register. Stack allocation requires only adjusting the pointer (a single CPU instruction). All values on the stack must have a known, fixed size at compile time. The Heap is an unstructured memory region managed by a runtime allocator (e.g., jemalloc or the OS heap allocator). Allocating on the heap requires finding a free memory chunk, updating allocator bookkeeping tables, and returning a pointer. Heap access incurs pointer indirection and potential CPU cache misses.

> ⚙️ **Hardware & Low-Level Reality**: Stack access has near 100% L1 CPU data cache locality. Heap access requires dereferencing pointers, which can cause CPU cache line misses (costing ~200 CPU cycles to fetch from main DRAM).

```rust
// Stack-only values (Copy):
let x: i32 = 42;
let y = x; // Bitwise copy on stack

// Heap-allocated value (Move):
let s1 = String::from("systems");
let s2 = s1; // Move! s1 is invalidated
// println!("{s1}"); // COMPILE ERROR: value used here after move
```

*Analysis*: `s1` is a 24-byte stack structure (pointer, length, capacity). Assigning `s2 = s1` copies the 24 bytes and marks `s1` as uninitialized, preventing double-free.

### 1.2 The Three Rules of Ownership & RAII

1. Each value in Rust has an owner variable.
2. There can only be one owner at a time.
3. When the owner goes out of scope, the value is dropped.
Rust implements Resource Acquisition Is Initialization (RAII). When a variable's lexical scope ends, rustc automatically inserts a call to its `Drop::drop` implementation, freeing OS resources, sockets, file descriptors, and heap memory immediately.

> ⚙️ **Hardware & Low-Level Reality**: Unlike C/C++ where manual `free()` risks use-after-free and double-free vulnerabilities, Rust's ownership graph is verified at compile time, guaranteeing deterministic, zero-overhead memory deallocation without a background collector.

```rust
{
    let buffer = vec![1, 2, 3, 4];
    // buffer is valid here
} // The closing brace triggers drop(buffer), freeing heap memory immediately
```

*Analysis*: At the closing brace, rustc automatically deallocates the vector's heap buffer. No explicit `free()` call is needed.

### 1.3 Borrowing & The Aliasing XOR Mutability Theorem

Instead of transferring ownership, code can borrow values using references (`&T` for immutable, `&mut T` for mutable). The fundamental theorem of Rust memory safety is:
At any given time, you can have EITHER:
• Any number of immutable references (`&T`) to a resource,
OR
• Exactly ONE mutable reference (`&mut T`) to a resource,
BUT NEVER BOTH SIMULTANEOUSLY.
This rule completely eliminates Data Races at compile time.

> ⚙️ **Hardware & Low-Level Reality**: A data race occurs when two or more CPU instructions in concurrent threads or interleaved operations access the same memory location simultaneously, where at least one write occurs, without synchronization. Rust makes data races impossible by enforcing Aliasing XOR Mutability.

```rust
let mut data = vec![1, 2, 3];
let r1 = &data; // Immutable borrow
let r2 = &data; // Another immutable borrow (OK)
println!("{r1:?}, {r2:?}");

let r3 = &mut data; // Mutable borrow starts here (r1 and r2 are no longer used)
r3.push(4);
println!("{r3:?}");
```

*Analysis*: Non-Lexical Lifetimes (NLL) allows `r3` to be created because the compiler proves `r1` and `r2` are never referenced again after their `println!`.

---

## 2. Key Takeaways

- The Stack is ultra-fast, fixed-size, and cache-friendly; the Heap is dynamically sized but requires allocator bookkeeping and pointer indirection.
- Moving a heap-managing type (like `String` or `Vec`) copies its 24-byte stack descriptor and immediately invalidates the source variable.
- Rust eliminates use-after-free and double-free bugs at compile time through the ownership model.
- Aliasing XOR Mutability: You may have infinite shared readers OR one exclusive writer, but never both.
- Non-Lexical Lifetimes (NLL) end a borrow at its last physical point of usage rather than the end of the enclosing block.

---

## 3. Deep Conceptual Q&A

### Q1: Why does assigning `let s2 = s1;` invalidate `s1` for a `String`, but not for an `i32`?

**Answer**: Types that implement the `Copy` marker trait (like primitive integers, floats, and booleans) reside entirely on the stack and can be duplicated by a cheap bitwise memory copy (`memcpy`). Types that manage heap resources (like `String`) implement `Drop` instead of `Copy`. If both `s1` and `s2` remained valid, both would attempt to deallocate the same heap memory upon going out of scope, causing a catastrophic double-free vulnerability.

*Core Concept*: `Move vs Copy Semantics`

### Q2: What is a data race, and how does the borrow checker prevent it?

**Answer**: A data race requires three conditions: (1) two or more pointers accessing the same memory location concurrently, (2) at least one access is a write, and (3) no synchronization exists. Rust's rule that a mutable reference (`&mut T`) must be exclusive guarantees that while a write is possible, no other reader or writer exists, mathematically preventing data races.

*Core Concept*: `Data Race Prevention`

### Q3: How does Non-Lexical Lifetimes (NLL) differ from early lexical scoping in Rust?

**Answer**: In early versions of Rust, a reference remained alive until the closing curly brace (`}`) of the scope where it was defined. With NLL (introduced in Rust 2018), the borrow checker performs control-flow analysis and ends the lifetime of a reference at the last line where it is actually evaluated, allowing a mutable borrow later in the same block without manual scope blocks.

*Core Concept*: `Non-Lexical Lifetimes`

---

## 4. Mastery Multiple-Choice Questions (MCQs)

### Question 1: What is the stack footprint of a `String` on a 64-bit architecture?

- **A**: 8 bytes (single heap pointer)
- **B**: 16 bytes (pointer and length)
- **C**: 24 bytes (pointer, length, and capacity) (Correct Answer)
- **D**: Variable size depending on string text length

> **Architectural Explanation**: A String consists of three 8-byte pointer-sized fields on the stack: a pointer to the heap buffer (8 bytes), the current byte length (8 bytes), and total allocated capacity (8 bytes) = 24 bytes.

### Question 2: Which of the following compile errors will occur if you push to a `Vec` while holding an active reference to one of its elements?

- **A**: E0382: use of moved value
- **B**: E0502: cannot borrow as mutable because it is also borrowed as immutable (Correct Answer)
- **C**: E0106: missing lifetime specifier
- **D**: E0499: cannot borrow as mutable more than once

> **Architectural Explanation**: Pushing to a vector requires a mutable borrow (`&mut v`). If you already hold an immutable reference (`&v[0]`), the compiler raises E0502 because pushing might trigger reallocation of the vector's heap buffer, which would leave your reference dangling.

### Question 3: Can a type implement both the `Copy` trait and the `Drop` trait simultaneously?

- **A**: Yes, but only if all struct fields also implement Copy and Drop
- **B**: No, the Rust compiler explicitly forbids implementing both Copy and Drop on the same type (Correct Answer)
- **C**: Yes, if annotated with #[repr(C)]
- **D**: Only on 64-bit architectures

> **Architectural Explanation**: Implementing `Drop` implies that a resource requires custom destructor cleanup upon leaving scope. If a type could be implicitly bitwise copied (`Copy`), it would be duplicated without tracking, leading to multiple destructor executions for the same resource.

