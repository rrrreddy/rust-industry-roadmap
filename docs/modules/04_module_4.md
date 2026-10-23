# Module 4: Code Architecture, Modularity & Error Engineering

**Subtitle**: Crates, Privacy Boundaries, Standard Collections, and Robust Error Propagation  
**Level**: Intermediate | **Estimated Time**: 60 mins

## Overview
Architect clean, maintainable systems using Rust packages, modules, and visibility rules. Deep dive into `Vec<T>`, UTF-8 `String` internals, `HashMap` Swiss Tables, and zero-cost error propagation with `Result<T, E>` and `?`.

---

## 1. Core Lessons & Hardware Realities

### 1.1 Packages, Crates, and Privacy Boundaries

A Crate is the smallest compilation unit recognized by `rustc`. When compiling a crate, the compiler creates a unified AST and symbol graph, enabling Whole-Program Optimization (WPO) and aggressive inlining. Modules (`mod`) structure code within a crate. Everything is private by default to its parent module. The `pub` keyword exposes an item to ancestor modules; `pub(crate)` exposes it only within the current crate.

> ⚙️ **Hardware & Low-Level Reality**: Privacy in Rust is purely a compile-time invariant. In machine code, all public and private functions compile to symbols without runtime protection barriers.

```rust
pub mod network {
    pub struct Connection {
        pub host: String,
        port: u16, // Private to network module!
    }
    impl Connection {
        pub fn new(host: String, port: u16) -> Self {
            Self { host, port }
        }
    }
}
```

*Analysis*: The `port` field is private, preventing outside code from directly modifying internal state without going through constructor invariants.

### 1.2 Deep Dive into Collections: Vec, UTF-8 String, and HashMap

1. `Vec<T>`: Contiguous heap buffer (ptr, cap, len). Resizing multiplies capacity by 2x via `realloc`.
2. `String`: A wrapper around `Vec<u8>` guaranteed to be valid UTF-8. UTF-8 code points vary from 1 to 4 bytes; direct integer indexing like `s[0]` is forbidden because finding the nth character would require an O(n) walk.
3. `HashMap<K, V>`: Implemented using Google's Swiss Tables algorithm (HashBrown) with SIMD-accelerated metadata byte probing and SipHash 1-3 to defend against HashDoS attacks.

> ⚙️ **Hardware & Low-Level Reality**: Because contiguous memory has optimal CPU L1 cache locality, `Vec<T>` is almost always faster than linked lists, even for insertions in the middle of moderate-sized collections.

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();
scores.insert("Blue", 10);

// Entry API avoids double hashing:
scores.entry("Yellow").or_insert(50);
```

*Analysis*: The `.entry()` API performs a single hash table probe to check for presence and insert if missing, eliminating redundant key hashing.

### 1.3 Error Engineering: panic! vs Result<T, E> & The ? Operator

Rust distinguishes strictly between unrecoverable bugs (`panic!`) and recoverable failures (`Result<T, E>`). Unlike C++ or Java exceptions which require runtime stack unwinding tables and dynamic dispatch, `Result<T, E>` is a tagged union returned in CPU registers (RAX/RDX). The `?` operator unrolls into an early return of `Err(From::from(e))` if an error occurs.

> ⚙️ **Hardware & Low-Level Reality**: Propagating errors with `?` has the exact same performance as checking a return code in C. There are zero exception unwinding penalties for standard errors.

```rust
use std::fs::File;
use std::io::{self, Read};

fn read_file_contents(path: &str) -> Result<String, io::Error> {
    let mut contents = String::new();
    File::open(path)?.read_to_string(&mut contents)?;
    Ok(contents)
}
```

*Analysis*: The `?` operator extracts the file handle and string length on success, or returns the `io::Error` early.

---

## 2. Key Takeaways

- A crate is the foundational compilation unit; all items are private to their parent module by default.
- `String` forbids direct integer indexing because UTF-8 characters have variable byte lengths (1-4 bytes).
- `HashMap` uses Swiss Tables SIMD probing and SipHash 1-3 for resistance against HashDoS algorithmic attacks.
- Rust has no runtime exception tables; `Result<T, E>` passes errors directly in CPU registers with zero performance penalty.
- The `?` operator automatically converts errors using the `From` trait and returns early on `Err`.

---

## 3. Deep Conceptual Q&A

### Q1: Why does Rust forbid string indexing like `my_string[0]`?

**Answer**: Rust strings are UTF-8 encoded, meaning a character (Unicode scalar value) can be anywhere between 1 and 4 bytes long. If Rust allowed integer indexing, `my_string[0]` could either return a raw byte (which might be an invalid character fragment) or require scanning all preceding bytes from the beginning of the string to find the first character, turning an expected O(1) array index into an O(n) operation.

*Core Concept*: `UTF-8 Encoding Guarantees`

### Q2: What is the difference between panic stack unwinding and aborting?

**Answer**: By default, a panic unwinds the call stack: the runtime walks up active stack frames and executes destructors (`drop()`) for all variables in scope, releasing resources cleanly. In constrained or embedded systems, Cargo can be configured with `panic = 'abort'`, which immediately terminates the process via `SIGABRT` or CPU halt without unwinding, reducing binary size.

*Core Concept*: `Panic Strategies`

---

## 4. Mastery Multiple-Choice Questions (MCQs)

### Question 1: What happens when an expression preceded by `?` evaluates to `Err(e)`?

- **A**: The program immediately halts with a panic
- **B**: It converts `e` via `From::from(e)` and returns `Err(...)` immediately from the current function (Correct Answer)
- **C**: It assigns a default value to the expression and continues execution
- **D**: It retries the operation three times

> **Architectural Explanation**: The `?` operator expands into a match arm that unpacks `Ok(v)` or immediately returns `Err(From::from(e))` from the enclosing function.

### Question 2: What hash table architecture does `std::collections::HashMap` use in modern Rust?

- **A**: Chained linked lists with MD5 hashing
- **B**: Swiss Tables (HashBrown) using SIMD group probing (Correct Answer)
- **C**: Binary search tree (AVL tree)
- **D**: Simple linear probing with CRC32

> **Architectural Explanation**: Rust's standard library uses a port of Google's Swiss Tables algorithm (HashBrown), which uses 16-byte SIMD instructions to probe control byte groups simultaneously for fast lookup.

