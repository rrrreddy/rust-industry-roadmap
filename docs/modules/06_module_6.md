# Module 6: Functional Rust: Closures & Zero-Cost Iterators

**Subtitle**: Capture Modes, Fn Traits, Lazy Evaluation, and SIMD Auto-Vectorization  
**Level**: Intermediate | **Estimated Time**: 45 mins

## Overview
Understand functional abstractions in Rust: how the compiler implements closures as anonymous structs, the three `Fn` traits, lazy iterator pipelines, and how LLVM unrolls iterators into branch-free SIMD machine code.

---

## 1. Core Lessons & Hardware Realities

### 1.1 Closures Under the Hood: Anonymous Structs & Fn Traits

In Rust, a closure is not a function pointer. Under the hood, rustc generates an anonymous struct holding fields for every variable captured from the surrounding scope. Captures occur in one of three modes:
1. `Fn`: Borrows captured variables immutably (`&T`).
2. `FnMut`: Borrows captured variables mutably (`&mut T`).
3. `FnOnce`: Takes ownership of captured variables (`T`), moving them into the struct.

> ⚙️ **Hardware & Low-Level Reality**: If a closure captures nothing from its environment, it is a Zero-Sized Type (ZST) that can be coerced to a plain C-compatible function pointer (`fn()`).

```rust
let base = 10;
// Borrows `base` immutably (implements Fn):
let add_base = |x| x + base;

// Forces ownership transfer into the closure:
let owns_base = move || println!("Base: {base}");
```

*Analysis*: The `move` keyword forces `base` to be moved into the closure's anonymous struct.

### 1.2 The Iterator Trait & Zero-Cost SIMD Execution

All iterators implement `Iterator` with a single required method: `fn next(&mut self) -> Option<Self::Item>`. Iterators are completely lazy: calling `.map()` or `.filter()` does nothing until consumed by `.collect()`, `.sum()`, or a `for` loop. Because iterators track bounds internally, LLVM eliminates array bounds checks and unrolls operations into SIMD (Single Instruction, Multiple Data) vector instructions.

> ⚙️ **Hardware & Low-Level Reality**: In benchmarks, Rust iterator pipelines frequently outperform imperative C `for` loops because LLVM can prove the absence of pointer aliasing and emit 256-bit AVX2 vector instructions.

```rust
let nums = vec![1, 2, 3, 4, 5, 6];
let even_sum: i32 = nums
    .iter()
    .filter(|&&x| x % 2 == 0)
    .map(|&x| x * 2)
    .sum();

assert_eq!(even_sum, 24);
```

*Analysis*: A declarative pipeline compiled down to a single tight register loop.

---

## 2. Key Takeaways

- Rust closures compile down to anonymous compiler-generated structs holding captured references or values.
- `FnOnce` consumes captured variables; `FnMut` mutates them; `Fn` reads them immutably.
- Iterators are lazy: they do zero computation until consumed by an adapter like `.collect()` or `.sum()`.
- Iterator pipelines compile to branch-free, bounds-check-free SIMD instructions equivalent to or faster than raw loops.

---

## 3. Deep Conceptual Q&A

### Q1: Why is a closure that captures values by value typed as `FnOnce`?

**Answer**: When a closure captures values by value (taking ownership), executing the closure may consume or drop those values. Because the captured values no longer exist after the first invocation, the closure cannot safely be executed a second time, restricting it to the `FnOnce` trait.

*Core Concept*: `FnOnce vs Fn Mut`

---

## 4. Mastery Multiple-Choice Questions (MCQs)

### Question 1: What happens when you call `.map(|x| x * 2)` on an iterator without calling `.collect()` or iterating through it?

- **A**: The elements are transformed in place immediately
- **B**: A runtime error is thrown
- **C**: Nothing is executed because iterators are lazy (Correct Answer)
- **D**: The vector is copied to the heap

> **Architectural Explanation**: Iterators in Rust are completely lazy. Calling an adapter like `.map()` merely returns an adaptor struct that does no work until `.next()` is called.

