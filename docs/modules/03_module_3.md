# Module 3: Compound Data Architecture: Structs, Enums & Pattern Matching

**Subtitle**: Data Modeling, Field Alignment, Tagged Unions, and Exhaustive Destructuring  
**Level**: Intermediate | **Estimated Time**: 55 mins

## Overview
Explore memory layout of user-defined data structures: struct field alignment and padding, tagged union enums, Null Pointer Optimization (NPO), and compiler-enforced exhaustive pattern matching.

---

## 1. Core Lessons & Hardware Realities

### 1.1 Struct Memory Layout & Field Padding

Rust structs group heterogeneous data. By default, the Rust compiler uses the `repr(Rust)` layout, which reserves the right to reorder struct fields to minimize padding and achieve optimal memory alignment. Fields are aligned to addresses that are multiples of their natural alignment (e.g., an 8-byte `u64` must align on an 8-byte boundary). To match C ABI layout exactly, `#[repr(C)]` must be specified.

> ⚙️ **Hardware & Low-Level Reality**: Without field reordering, a struct with `bool (1B)`, `u64 (8B)`, `bool (1B)` would take 24 bytes due to alignment padding. rustc reorders it to `u64`, `bool`, `bool` with 6 padding bytes, reducing size to 16 bytes and optimizing cache footprint.

```rust
struct Unoptimized {
    a: u8,  // 1 byte
    b: u64, // 8 bytes
    c: u16, // 2 bytes
}

// rustc reorders fields in memory to pack them efficiently
println!("Size of Unoptimized: {}", std::mem::size_of::<Unoptimized>());
```

*Analysis*: `size_of::<Unoptimized>()` yields 16 bytes instead of 24 bytes because the compiler packs `a` and `c` together.

### 1.2 Enums as Tagged Unions & Null Pointer Optimization (NPO)

Rust enums are algebraic data types (specifically, tagged unions). Each variant can carry distinct payloads of varying types and sizes. In memory, an enum consists of a discriminant tag (an integer identifying the active variant) plus a payload union sized to the largest variant. For pointer-like types (such as `&T`, `Box<T>`, `NonNull<T>`), Rust applies Null Pointer Optimization (NPO): because references can never be null (address 0x0), `Option<&T>` uses 0x0 to represent `None`, meaning `Option<&T>` occupies the exact same memory as a raw reference with zero space overhead.

> ⚙️ **Hardware & Low-Level Reality**: Null Pointer Optimization allows Rust to offer expressive, null-safe `Option<T>` abstractions with zero memory size or performance penalty compared to raw pointers in C.

```rust
use std::mem::size_of;

assert_eq!(size_of::<&str>(), 16);           // Fat pointer: ptr (8B) + len (8B)
assert_eq!(size_of::<Option<&str>>(), 16);   // NPO: 0 bytes extra overhead!
```

*Analysis*: `Option<&str>` has the exact same 16-byte size as `&str`. The compiler uses null pointer representation for `None`.

### 1.3 Exhaustive Pattern Matching & let-else Guard Clauses

Pattern matching is verified by the compiler's exhaustiveness checker. If an enum variant is omitted in a `match` expression, compilation fails with error E0004. Modern Rust (2021+) also provides `let-else` statements, which bind values on match or diverge (return, break, panic) in the else block, avoiding rightward drift caused by nested `if let` blocks.

> ⚙️ **Hardware & Low-Level Reality**: Under the hood, rustc translates dense integer matches into jump tables (indirect jump `jmp *%rax`), providing O(1) branch dispatch regardless of how many variants exist.

```rust
fn extract_port(val: Option<u16>) -> u16 {
    let Some(port) = val else {
        return 8080; // Early exit guard
    };
    port // port is bound and in scope
}
```

*Analysis*: `let Some(port) = val else { ... };` unwraps the option or exits immediately, keeping `port` in the surrounding scope.

---

## 2. Key Takeaways

- Rust reorders struct fields by default to minimize alignment padding; use `#[repr(C)]` for FFI compatibility.
- Enums are tagged unions capable of holding diverse payloads in each variant.
- Null Pointer Optimization (NPO) ensures that `Option<&T>` has zero space overhead over `&T`.
- `match` expressions are strictly exhaustive, ensuring unhandled variants are impossible at runtime.
- `let-else` provides an idiomatic guard pattern to destructure on match or diverge immediately.

---

## 3. Deep Conceptual Q&A

### Q1: What is Null Pointer Optimization (NPO) and why is it significant?

**Answer**: In languages like C, a pointer can be null to represent absence, which frequently causes null pointer dereference crashes. Rust references (`&T`) can never be null. The compiler uses the unused bit pattern `0x0` to represent the `None` variant of `Option<&T>`. This eliminates both null crashes and memory overhead, allowing `Option<&T>` to match the exact physical memory size of a raw pointer.

*Core Concept*: `Null Pointer Optimization`

### Q2: How does `let-else` improve code clarity compared to `if let`?

**Answer**: When using `if let Some(x) = opt { ... }`, the extracted variable `x` is only accessible inside the inner braces, forcing all subsequent code to be indented further to the right ('rightward drift'). `let-else` requires the else block to diverge (return, break, continue, or panic), allowing the extracted variable to remain in the outer function scope without nesting.

*Core Concept*: `Control Flow Guard Clauses`

---

## 4. Mastery Multiple-Choice Questions (MCQs)

### Question 1: Why does `Option<Box<i32>>` occupy 8 bytes on a 64-bit architecture rather than 16 bytes?

- **A**: Because Box<i32> is allocated on the stack
- **B**: Because of Null Pointer Optimization, where the None variant is encoded using address 0x0 (Correct Answer)
- **C**: Because the compiler compresses integers on the heap
- **D**: Because i32 is a primitive type

> **Architectural Explanation**: Box<T> is a non-null pointer to heap memory. Because the pointer can never legitimately be 0x0, the compiler uses 0x0 to encode None, requiring zero discriminant tag bytes.

### Question 2: What is the purpose of the `_` pattern in a `match` expression?

- **A**: It causes the match expression to return a null value
- **B**: It acts as a catch-all wildcard that matches any remaining variant without binding the value (Correct Answer)
- **C**: It indicates an asynchronous branch
- **D**: It forces the compiler to ignore type checking on that arm

> **Architectural Explanation**: The underscore `_` is a wildcard pattern that satisfies the compiler's exhaustiveness checker by matching all unmentioned variants without binding them.

