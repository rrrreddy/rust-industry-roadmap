# 🦀 Rust Core Mastery — The Dedicated Step-by-Step Learning Path

> **Master low-level computer science, hardware architecture, and memory models in Rust before embarking on project-based learning.**

Live Application: **[https://rrrreddy.github.io/rust-industry-roadmap/](https://rrrreddy.github.io/rust-industry-roadmap/)**

---

## 🎯 Purpose & Philosophy

To master Rust at a world-class systems level, you cannot learn it like a typical high-level language. Rust is grounded directly in physical computer hardware, registers, virtual memory, and LLVM-IR.

This repository is a **dedicated, comprehensive learning path** designed to be completed **before** you start domain project work. It divides the journey into **10 Sequential Core Modules**, each reinforced by:
1. **In-Depth Lessons & Hardware Realities**: Mental models of the CPU, stack frames, heap allocators, cache lines, and compiler invariants.
2. **Key Takeaways**: High-retention mental models and core invariants.
3. **Deep Conceptual Q&As**: Systems and interview-grade questions explaining the "Why" and "How" under the hood.
4. **Mastery MCQs**: Interactive multiple-choice questions with detailed architectural explanations.

---

## 📚 The 10 Core Modules

| Module | Title | Level | Core Invariants Covered |
| :--- | :--- | :--- | :--- |
| **01** | [Systems Foundations, Toolchain & Syntax Genesis](docs/modules/01_module_1.md) | Foundational | LLVM pipeline, `rustup`/`cargo`, scalar/compound types, pointer widths (`usize`), integer overflow semantics, immutability by default, shadowing. |
| **02** | [The Core Engine: Ownership, Borrowing & Stack vs Heap](docs/modules/02_module_2.md) | Foundational | Stack pointer (`RSP`) vs Heap allocator bookkeeping, L1 cache locality, The Three Rules of Ownership, move semantics vs `memcpy`, RAII / `Drop`, Aliasing XOR Mutability, Non-Lexical Lifetimes (NLL). |
| **03** | [Compound Data Architecture: Structs, Enums & Matching](docs/modules/03_module_3.md) | Intermediate | Struct field alignment, padding, `#[repr(C)]`, tagged union enums, Null Pointer Optimization (NPO), jump table compilation, `let-else` guard clauses. |
| **04** | [Code Architecture, Modularity & Error Engineering](docs/modules/04_module_4.md) | Intermediate | Crate compilation units, module tree privacy (`pub`/`pub(crate)`), `Vec<T>` 3-word layout, UTF-8 String indexing prohibition, Swiss Tables `HashMap` with SipHash-1-3, `Result<T, E>` in CPU registers vs `panic!` unwinding, `?` operator. |
| **05** | [The Type System: Generics, Traits & Lifetimes](docs/modules/05_generics_traits_lifetimes.md) | Intermediate to Adv | Zero-cost monomorphization, static dispatch (`impl Trait`), dynamic dispatch (`dyn Trait`) 16-byte fat pointers (data ptr + vtable ptr), compiler lifetime verification (Polonius), 3 elision rules. |
| **06** | [Functional Rust: Closures & Zero-Cost Iterators](docs/modules/06_closures_iterators_functional.md) | Intermediate | Closures as anonymous compiler structs, capture modes (by-ref, by-mut-ref, by-value `move`), `Fn`/`FnMut`/`FnOnce`, lazy iterator pipelines, bounds-check elimination, SIMD auto-vectorization. |
| **07** | [Deep Memory Management & Smart Pointers](docs/modules/07_smart_pointers_interior_mutability.md) | Advanced | `Deref` & `Drop` traits, `Box<T>` recursive structures, `Rc<T>` reference counting, `RefCell<T>` runtime borrow checking, interior mutability, memory leak cycle prevention with `Weak<T>`. |
| **08** | [Fearless Concurrency & Multithreading](docs/modules/08_concurrency_threads_atomics.md) | Advanced | 1:1 OS kernel threads, scoped threads (`std::thread::scope`), message-passing channels (`mpsc`), `Arc<Mutex<T>>`, atomic primitives (`AtomicBool`, `AtomicUsize`), `Send` and `Sync` marker traits. |
| **09** | [Modern Asynchronous Programming & Pin](docs/modules/09_async_programming_and_pin.md) | Adv to Master | OS threads vs cooperative tasks, epoll/kqueue non-blocking event loops, pull-based `Future` trait, `poll(cx)`, `Waker` contract, why `Pin<&mut T>` is mathematically mandatory for self-referential futures. |
| **10** | [Advanced Rust, Unsafe & The Compiler Frontier](docs/modules/10_unsafe_macros_compiler_frontier.md) | Master | The 5 Unsafe Superpowers, raw pointers (`*const T`, `*mut T`), extern "C" FFI, detecting undefined behavior with **Miri** (MIR interpreter), declarative `macro_rules!` vs procedural macros (`TokenStream`). |

---

## 🛠️ Offline Documentation Manuals

All 10 modules are available as standalone, markdown documentation manuals inside the [`docs/modules/`](docs/modules/) directory:
- `docs/modules/01_module_1.md`
- `docs/modules/02_module_2.md`
- `docs/modules/03_module_3.md`
- `docs/modules/04_module_4.md`
- `docs/modules/05_module_5.md`
- `docs/modules/06_module_6.md`
- `docs/modules/07_module_7.md`
- `docs/modules/08_module_8.md`
- `docs/modules/09_module_9.md`
- `docs/modules/10_module_10.md`

Each document contains full code blocks, hardware reality callouts, key takeaways, Q&As, and MCQ solutions.

---

## 💻 Interactive Web Application Features

1. **Step-by-Step Module Classroom**:
   - Tabbed view: **Deep Lessons**, **Key Takeaways**, **Q&A Archive**, and **Mastery MCQs**.
   - Instant MCQ scoring with architectural explanations.
   - Code copy-to-clipboard functionality.
   - Progress persistence across sessions using browser `localStorage`.
2. **The Rust Book (3rd Edition Reference Guide)**:
   - Complete chapter-by-chapter curriculum (Chapters 1 to 21 + Appendices A–E) based on the 3rd Edition by Steve Klabnik, Carol Nichols, and Chris Krycho.
3. **Memory & Compiler Diagnostics Cheat Sheet**:
   - Physical memory layout table (stack vs heap footprint of `&T`, `&str`, `&dyn Trait`, `Vec<T>`, `Option<&T>`).
   - Top 5 compiler error codes (`E0382`, `E0502`, `E0106`, `E0004`, `E0277`) with root causes and fixes.
   - Essential developer CLI commands (`cargo check`, `cargo clippy`, `cargo +nightly miri test`, `RUST_BACKTRACE=1`).
4. **Authoritative Video & Books Hub**:
   - Curated video lectures from Jon Gjengset, Chris Krycho, and official RustConf keynotes.

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/rrrreddy/rust-industry-roadmap.git
cd rust-industry-roadmap

# Install dependencies
npm install

# Start local development server
npm run dev
```

Build production static bundle:
```bash
npm run build
```

---

## 📄 License
MIT License. Created by [Raghu Konda](https://github.com/rrrreddy).
