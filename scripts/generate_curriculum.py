import json
import os

modules = [
    {
        "id": "module-1",
        "number": 1,
        "title": "Module 1: Systems Foundations, Toolchain & Syntax Genesis",
        "subtitle": "Machine Architecture, LLVM Toolchain, Primitive Types, and Control Flow",
        "level": "Foundational",
        "estimatedMinutes": 50,
        "description": "Understand how Rust interfaces directly with host hardware through LLVM, rustup, and Cargo. Master primitive scalar types, memory alignment, mutability, and structured control flow before tackling the borrow checker.",
        "lessons": [
            {
                "title": "Hardware Reality: How Rust Executes on Silicon",
                "theory": "Rust does not run on a virtual machine, nor does it have a garbage-collected runtime. The compiler (rustc) parses source code into an Abstract Syntax Tree (AST), translates it to High-Level Intermediate Representation (HIR), Mid-Level Intermediate Representation (MIR), and finally LLVM-IR. LLVM applies platform-specific optimizations (vectorization, register allocation, instruction pipelining) and links native object code using the system linker.",
                "hardwareCallout": "Zero-cost abstractions mean that Rust language abstractions (iterators, closures, pattern matching) compile down to machine instructions that are identical to or faster than hand-written assembly.",
                "code": "fn main() {\n    let answer: i32 = 42;\n    println!(\"Memory address on stack: {:p}\", &answer);\n}",
                "codeExplanation": "The variable `answer` is allocated directly in the CPU's stack frame for `main`. Printing `&answer` with `{:p}` outputs the virtual memory address of the 4-byte slot on the stack."
            },
            {
                "title": "Scalar and Compound Types & Bit Representation",
                "theory": "Rust types are strictly sized and aligned at compile time. Integers (i8–i128, u8–u128, isize/usize) have precise bit widths. `usize` matches the pointer width of the target architecture (64 bits on x86_64/ARM64, 32 bits on WASM/embedded). Floating point numbers (`f32`, `f64`) conform to IEEE 754-2008. In debug builds, integer overflow triggers an immediate panic; in release builds, two's complement wrapping occurs unless wrapping/checked arithmetic methods are used.",
                "hardwareCallout": "Values must be memory-aligned to multiples of their size for the CPU to fetch them efficiently in a single memory bus transaction. An unaligned access causes severe performance penalties or hardware bus exceptions on strict architectures like ARM and SPARC.",
                "code": "// Checked and wrapping arithmetic:\nlet max_byte: u8 = 255;\nlet wrapped = max_byte.wrapping_add(1); // 0\nlet checked = max_byte.checked_add(1);  // None\n\nassert_eq!(wrapped, 0);\nassert_eq!(checked, None);",
                "codeExplanation": "Explicit arithmetic methods allow developers to control hardware overflow semantics deterministically across debug and release builds."
            },
            {
                "title": "Immutability by Default & The Shadowing Paradigm",
                "theory": "In Rust, variables are immutable by default (`let x = 5;`). To mutate in-place, the explicit `mut` keyword is required (`let mut x = 5;`). Rust also supports variable shadowing: redeclaring a variable with the same name in the same scope using `let`. Shadowing can change the type and mutability of the variable while dropping or reusing the stack slot.",
                "hardwareCallout": "Immutability allows the compiler to make aggressive assumptions during optimization: it can keep variables pinned in CPU registers (like RAX/RCX) without needing to write them back to RAM.",
                "code": "let spaces = \"   \";\nlet spaces = spaces.len(); // Shadowing changes type from &str to usize\nprintln!(\"Spaces count: {spaces}\");",
                "codeExplanation": "Shadowing allows reusing variable names idiomatically without creating clumsy names like `spaces_str` and `spaces_num`."
            }
        ],
        "keyTakeaways": [
            "Rust compiles directly to machine code via LLVM without any garbage collector or virtual machine interpreter.",
            "Variables are immutable by default, preventing unintended state mutations and enabling compiler register optimizations.",
            "`usize` and `isize` depend on the target hardware pointer width (64-bit on desktop/servers, 32-bit on WASM).",
            "Integer overflow panics in debug mode and wraps in release mode; use `.checked_add()` or `.wrapping_add()` for deterministic behavior.",
            "Shadowing with `let` allows re-binding the name, changing both type and mutability while discarding previous bindings safely."
        ],
        "qas": [
            {
                "question": "Why does Rust not require a garbage collector (GC) to achieve memory safety?",
                "answer": "Garbage collectors track allocated memory at runtime by pausing execution to mark and sweep unreachable heap objects. Rust achieves memory safety entirely at compile time through its ownership and borrowing system. The compiler analyzes the lifetime of every value and injects deterministic cleanup calls (the `drop` destructor) at the exact point where a value leaves scope, leaving zero runtime overhead.",
                "concept": "Compile-Time Memory Management"
            },
            {
                "question": "What is the physical difference between variable shadowing and variable mutation?",
                "answer": "Variable mutation (`let mut x = 5; x = 6;`) modifies the bits stored at the existing memory address while maintaining the exact same type. Variable shadowing (`let x = 5; let x = \"hello\";`) creates an entirely new variable with its own distinct type and stack allocation, overshadowing the earlier name within that scope.",
                "concept": "Shadowing vs Mutation"
            },
            {
                "question": "Why is `usize` used for indexing slices and vectors instead of `u32` or `u64`?",
                "answer": "Memory addresses on modern CPUs are sized to the architecture's word length (64 bits on a 64-bit processor, 32 bits on a 32-bit processor). `usize` matches this exact pointer size. Using a fixed integer like `u32` would artificially limit 64-bit machines to 4GB buffers, while using `u64` on 32-bit microcontrollers would incur 2x register overhead and emulated arithmetic.",
                "concept": "Pointer Sizing & Architecture"
            },
            {
                "question": "What happens when integer overflow occurs in Rust?",
                "answer": "In debug mode (`cargo run`), the compiler includes integer overflow checks that cause the program to panic at runtime with an explicit error message. In release mode (`cargo run --release`), Rust disables these checks for maximum performance, and the integer wraps using two's complement. If wrapping behavior is intentional, developers must use methods like `.wrapping_add()` or `.overflowing_add()`.",
                "concept": "Arithmetic Safety"
            }
        ],
        "mcqs": [
            {
                "id": "m1-q1",
                "question": "Which component of the Rust compilation pipeline translates Mid-Level Intermediate Representation (MIR) into machine-specific assembly instructions?",
                "options": [
                    "The Cargo package manager",
                    "The LLVM backend optimizer and code generator",
                    "The rustup toolchain installer",
                    "The system libc runtime"
                ],
                "correctIndex": 1,
                "explanation": "rustc translates Rust code into AST -> HIR -> MIR, and then hands off LLVM-IR to the LLVM backend, which performs machine-specific optimization and generates target assembly/machine code."
            },
            {
                "id": "m1-q2",
                "question": "What is the memory size of `usize` on an x86_64 architecture?",
                "options": [
                    "4 bytes (32 bits)",
                    "8 bytes (64 bits)",
                    "16 bytes (128 bits)",
                    "Variable size depending on the integer value stored"
                ],
                "correctIndex": 1,
                "explanation": "On a 64-bit architecture (such as x86_64 or aarch64), a pointer is 8 bytes (64 bits) wide, so `usize` is exactly 8 bytes."
            },
            {
                "id": "m1-q3",
                "question": "What is the result of the following code snippet compiled in debug mode: `let x: u8 = 255; let y = x + 1;`?",
                "options": [
                    "y evaluates to 0 due to two's complement wrapping",
                    "The compiler generates a compilation error",
                    "The program panics at runtime with an integer overflow error",
                    "y evaluates to 256 by automatically widening to u16"
                ],
                "correctIndex": 2,
                "explanation": "In debug builds, arithmetic operations on primitive integers include overflow detection that triggers a runtime panic when an overflow occurs."
            }
        ]
    },
    {
        "id": "module-2",
        "number": 2,
        "title": "Module 2: The Core Engine: Ownership, Borrowing & Stack vs Heap",
        "subtitle": "Memory Allocation Mechanics, Move Semantics, RAII, and the Borrow Checker",
        "level": "Foundational",
        "estimatedMinutes": 60,
        "description": "Master the central pillar of Rust systems programming: Stack vs Heap memory allocation, the Three Rules of Ownership, move semantics vs shallow copy, and the Aliasing XOR Mutability theorem.",
        "lessons": [
            {
                "title": "Hardware Memory Model: The Stack vs The Heap",
                "theory": "The Stack is a Last-In-First-Out (LIFO) contiguous region of memory managed automatically by the CPU's Stack Pointer (RSP) register. Stack allocation requires only adjusting the pointer (a single CPU instruction). All values on the stack must have a known, fixed size at compile time. The Heap is an unstructured memory region managed by a runtime allocator (e.g., jemalloc or the OS heap allocator). Allocating on the heap requires finding a free memory chunk, updating allocator bookkeeping tables, and returning a pointer. Heap access incurs pointer indirection and potential CPU cache misses.",
                "hardwareCallout": "Stack access has near 100% L1 CPU data cache locality. Heap access requires dereferencing pointers, which can cause CPU cache line misses (costing ~200 CPU cycles to fetch from main DRAM).",
                "code": "// Stack-only values (Copy):\nlet x: i32 = 42;\nlet y = x; // Bitwise copy on stack\n\n// Heap-allocated value (Move):\nlet s1 = String::from(\"systems\");\nlet s2 = s1; // Move! s1 is invalidated\n// println!(\"{s1}\"); // COMPILE ERROR: value used here after move",
                "codeExplanation": "`s1` is a 24-byte stack structure (pointer, length, capacity). Assigning `s2 = s1` copies the 24 bytes and marks `s1` as uninitialized, preventing double-free."
            },
            {
                "title": "The Three Rules of Ownership & RAII",
                "theory": "1. Each value in Rust has an owner variable.\n2. There can only be one owner at a time.\n3. When the owner goes out of scope, the value is dropped.\nRust implements Resource Acquisition Is Initialization (RAII). When a variable's lexical scope ends, rustc automatically inserts a call to its `Drop::drop` implementation, freeing OS resources, sockets, file descriptors, and heap memory immediately.",
                "hardwareCallout": "Unlike C/C++ where manual `free()` risks use-after-free and double-free vulnerabilities, Rust's ownership graph is verified at compile time, guaranteeing deterministic, zero-overhead memory deallocation without a background collector.",
                "code": "{\n    let buffer = vec![1, 2, 3, 4];\n    // buffer is valid here\n} // The closing brace triggers drop(buffer), freeing heap memory immediately",
                "codeExplanation": "At the closing brace, rustc automatically deallocates the vector's heap buffer. No explicit `free()` call is needed."
            },
            {
                "title": "Borrowing & The Aliasing XOR Mutability Theorem",
                "theory": "Instead of transferring ownership, code can borrow values using references (`&T` for immutable, `&mut T` for mutable). The fundamental theorem of Rust memory safety is:\nAt any given time, you can have EITHER:\n• Any number of immutable references (`&T`) to a resource,\nOR\n• Exactly ONE mutable reference (`&mut T`) to a resource,\nBUT NEVER BOTH SIMULTANEOUSLY.\nThis rule completely eliminates Data Races at compile time.",
                "hardwareCallout": "A data race occurs when two or more CPU instructions in concurrent threads or interleaved operations access the same memory location simultaneously, where at least one write occurs, without synchronization. Rust makes data races impossible by enforcing Aliasing XOR Mutability.",
                "code": "let mut data = vec![1, 2, 3];\nlet r1 = &data; // Immutable borrow\nlet r2 = &data; // Another immutable borrow (OK)\nprintln!(\"{r1:?}, {r2:?}\");\n\nlet r3 = &mut data; // Mutable borrow starts here (r1 and r2 are no longer used)\nr3.push(4);\nprintln!(\"{r3:?}\");",
                "codeExplanation": "Non-Lexical Lifetimes (NLL) allows `r3` to be created because the compiler proves `r1` and `r2` are never referenced again after their `println!`."
            }
        ],
        "keyTakeaways": [
            "The Stack is ultra-fast, fixed-size, and cache-friendly; the Heap is dynamically sized but requires allocator bookkeeping and pointer indirection.",
            "Moving a heap-managing type (like `String` or `Vec`) copies its 24-byte stack descriptor and immediately invalidates the source variable.",
            "Rust eliminates use-after-free and double-free bugs at compile time through the ownership model.",
            "Aliasing XOR Mutability: You may have infinite shared readers OR one exclusive writer, but never both.",
            "Non-Lexical Lifetimes (NLL) end a borrow at its last physical point of usage rather than the end of the enclosing block."
        ],
        "qas": [
            {
                "question": "Why does assigning `let s2 = s1;` invalidate `s1` for a `String`, but not for an `i32`?",
                "answer": "Types that implement the `Copy` marker trait (like primitive integers, floats, and booleans) reside entirely on the stack and can be duplicated by a cheap bitwise memory copy (`memcpy`). Types that manage heap resources (like `String`) implement `Drop` instead of `Copy`. If both `s1` and `s2` remained valid, both would attempt to deallocate the same heap memory upon going out of scope, causing a catastrophic double-free vulnerability.",
                "concept": "Move vs Copy Semantics"
            },
            {
                "question": "What is a data race, and how does the borrow checker prevent it?",
                "answer": "A data race requires three conditions: (1) two or more pointers accessing the same memory location concurrently, (2) at least one access is a write, and (3) no synchronization exists. Rust's rule that a mutable reference (`&mut T`) must be exclusive guarantees that while a write is possible, no other reader or writer exists, mathematically preventing data races.",
                "concept": "Data Race Prevention"
            },
            {
                "question": "How does Non-Lexical Lifetimes (NLL) differ from early lexical scoping in Rust?",
                "answer": "In early versions of Rust, a reference remained alive until the closing curly brace (`}`) of the scope where it was defined. With NLL (introduced in Rust 2018), the borrow checker performs control-flow analysis and ends the lifetime of a reference at the last line where it is actually evaluated, allowing a mutable borrow later in the same block without manual scope blocks.",
                "concept": "Non-Lexical Lifetimes"
            }
        ],
        "mcqs": [
            {
                "id": "m2-q1",
                "question": "What is the stack footprint of a `String` on a 64-bit architecture?",
                "options": [
                    "8 bytes (single heap pointer)",
                    "16 bytes (pointer and length)",
                    "24 bytes (pointer, length, and capacity)",
                    "Variable size depending on string text length"
                ],
                "correctIndex": 2,
                "explanation": "A String consists of three 8-byte pointer-sized fields on the stack: a pointer to the heap buffer (8 bytes), the current byte length (8 bytes), and total allocated capacity (8 bytes) = 24 bytes."
            },
            {
                "id": "m2-q2",
                "question": "Which of the following compile errors will occur if you push to a `Vec` while holding an active reference to one of its elements?",
                "options": [
                    "E0382: use of moved value",
                    "E0502: cannot borrow as mutable because it is also borrowed as immutable",
                    "E0106: missing lifetime specifier",
                    "E0499: cannot borrow as mutable more than once"
                ],
                "correctIndex": 1,
                "explanation": "Pushing to a vector requires a mutable borrow (`&mut v`). If you already hold an immutable reference (`&v[0]`), the compiler raises E0502 because pushing might trigger reallocation of the vector's heap buffer, which would leave your reference dangling."
            },
            {
                "id": "m2-q3",
                "question": "Can a type implement both the `Copy` trait and the `Drop` trait simultaneously?",
                "options": [
                    "Yes, but only if all struct fields also implement Copy and Drop",
                    "No, the Rust compiler explicitly forbids implementing both Copy and Drop on the same type",
                    "Yes, if annotated with #[repr(C)]",
                    "Only on 64-bit architectures"
                ],
                "correctIndex": 1,
                "explanation": "Implementing `Drop` implies that a resource requires custom destructor cleanup upon leaving scope. If a type could be implicitly bitwise copied (`Copy`), it would be duplicated without tracking, leading to multiple destructor executions for the same resource."
            }
        ]
    },
    {
        "id": "module-3",
        "number": 3,
        "title": "Module 3: Compound Data Architecture: Structs, Enums & Pattern Matching",
        "subtitle": "Data Modeling, Field Alignment, Tagged Unions, and Exhaustive Destructuring",
        "level": "Intermediate",
        "estimatedMinutes": 55,
        "description": "Explore memory layout of user-defined data structures: struct field alignment and padding, tagged union enums, Null Pointer Optimization (NPO), and compiler-enforced exhaustive pattern matching.",
        "lessons": [
            {
                "title": "Struct Memory Layout & Field Padding",
                "theory": "Rust structs group heterogeneous data. By default, the Rust compiler uses the `repr(Rust)` layout, which reserves the right to reorder struct fields to minimize padding and achieve optimal memory alignment. Fields are aligned to addresses that are multiples of their natural alignment (e.g., an 8-byte `u64` must align on an 8-byte boundary). To match C ABI layout exactly, `#[repr(C)]` must be specified.",
                "hardwareCallout": "Without field reordering, a struct with `bool (1B)`, `u64 (8B)`, `bool (1B)` would take 24 bytes due to alignment padding. rustc reorders it to `u64`, `bool`, `bool` with 6 padding bytes, reducing size to 16 bytes and optimizing cache footprint.",
                "code": "struct Unoptimized {\n    a: u8,  // 1 byte\n    b: u64, // 8 bytes\n    c: u16, // 2 bytes\n}\n\n// rustc reorders fields in memory to pack them efficiently\nprintln!(\"Size of Unoptimized: {}\", std::mem::size_of::<Unoptimized>());",
                "codeExplanation": "`size_of::<Unoptimized>()` yields 16 bytes instead of 24 bytes because the compiler packs `a` and `c` together."
            },
            {
                "title": "Enums as Tagged Unions & Null Pointer Optimization (NPO)",
                "theory": "Rust enums are algebraic data types (specifically, tagged unions). Each variant can carry distinct payloads of varying types and sizes. In memory, an enum consists of a discriminant tag (an integer identifying the active variant) plus a payload union sized to the largest variant. For pointer-like types (such as `&T`, `Box<T>`, `NonNull<T>`), Rust applies Null Pointer Optimization (NPO): because references can never be null (address 0x0), `Option<&T>` uses 0x0 to represent `None`, meaning `Option<&T>` occupies the exact same memory as a raw reference with zero space overhead.",
                "hardwareCallout": "Null Pointer Optimization allows Rust to offer expressive, null-safe `Option<T>` abstractions with zero memory size or performance penalty compared to raw pointers in C.",
                "code": "use std::mem::size_of;\n\nassert_eq!(size_of::<&str>(), 16);           // Fat pointer: ptr (8B) + len (8B)\nassert_eq!(size_of::<Option<&str>>(), 16);   // NPO: 0 bytes extra overhead!",
                "codeExplanation": "`Option<&str>` has the exact same 16-byte size as `&str`. The compiler uses null pointer representation for `None`."
            },
            {
                "title": "Exhaustive Pattern Matching & let-else Guard Clauses",
                "theory": "Pattern matching is verified by the compiler's exhaustiveness checker. If an enum variant is omitted in a `match` expression, compilation fails with error E0004. Modern Rust (2021+) also provides `let-else` statements, which bind values on match or diverge (return, break, panic) in the else block, avoiding rightward drift caused by nested `if let` blocks.",
                "hardwareCallout": "Under the hood, rustc translates dense integer matches into jump tables (indirect jump `jmp *%rax`), providing O(1) branch dispatch regardless of how many variants exist.",
                "code": "fn extract_port(val: Option<u16>) -> u16 {\n    let Some(port) = val else {\n        return 8080; // Early exit guard\n    };\n    port // port is bound and in scope\n}",
                "codeExplanation": "`let Some(port) = val else { ... };` unwraps the option or exits immediately, keeping `port` in the surrounding scope."
            }
        ],
        "keyTakeaways": [
            "Rust reorders struct fields by default to minimize alignment padding; use `#[repr(C)]` for FFI compatibility.",
            "Enums are tagged unions capable of holding diverse payloads in each variant.",
            "Null Pointer Optimization (NPO) ensures that `Option<&T>` has zero space overhead over `&T`.",
            "`match` expressions are strictly exhaustive, ensuring unhandled variants are impossible at runtime.",
            "`let-else` provides an idiomatic guard pattern to destructure on match or diverge immediately."
        ],
        "qas": [
            {
                "question": "What is Null Pointer Optimization (NPO) and why is it significant?",
                "answer": "In languages like C, a pointer can be null to represent absence, which frequently causes null pointer dereference crashes. Rust references (`&T`) can never be null. The compiler uses the unused bit pattern `0x0` to represent the `None` variant of `Option<&T>`. This eliminates both null crashes and memory overhead, allowing `Option<&T>` to match the exact physical memory size of a raw pointer.",
                "concept": "Null Pointer Optimization"
            },
            {
                "question": "How does `let-else` improve code clarity compared to `if let`?",
                "answer": "When using `if let Some(x) = opt { ... }`, the extracted variable `x` is only accessible inside the inner braces, forcing all subsequent code to be indented further to the right ('rightward drift'). `let-else` requires the else block to diverge (return, break, continue, or panic), allowing the extracted variable to remain in the outer function scope without nesting.",
                "concept": "Control Flow Guard Clauses"
            }
        ],
        "mcqs": [
            {
                "id": "m3-q1",
                "question": "Why does `Option<Box<i32>>` occupy 8 bytes on a 64-bit architecture rather than 16 bytes?",
                "options": [
                    "Because Box<i32> is allocated on the stack",
                    "Because of Null Pointer Optimization, where the None variant is encoded using address 0x0",
                    "Because the compiler compresses integers on the heap",
                    "Because i32 is a primitive type"
                ],
                "correctIndex": 1,
                "explanation": "Box<T> is a non-null pointer to heap memory. Because the pointer can never legitimately be 0x0, the compiler uses 0x0 to encode None, requiring zero discriminant tag bytes."
            },
            {
                "id": "m3-q2",
                "question": "What is the purpose of the `_` pattern in a `match` expression?",
                "options": [
                    "It causes the match expression to return a null value",
                    "It acts as a catch-all wildcard that matches any remaining variant without binding the value",
                    "It indicates an asynchronous branch",
                    "It forces the compiler to ignore type checking on that arm"
                ],
                "correctIndex": 1,
                "explanation": "The underscore `_` is a wildcard pattern that satisfies the compiler's exhaustiveness checker by matching all unmentioned variants without binding them."
            }
        ]
    },
    {
        "id": "module-4",
        "number": 4,
        "title": "Module 4: Code Architecture, Modularity & Error Engineering",
        "subtitle": "Crates, Privacy Boundaries, Standard Collections, and Robust Error Propagation",
        "level": "Intermediate",
        "estimatedMinutes": 60,
        "description": "Architect clean, maintainable systems using Rust packages, modules, and visibility rules. Deep dive into `Vec<T>`, UTF-8 `String` internals, `HashMap` Swiss Tables, and zero-cost error propagation with `Result<T, E>` and `?`.",
        "lessons": [
            {
                "title": "Packages, Crates, and Privacy Boundaries",
                "theory": "A Crate is the smallest compilation unit recognized by `rustc`. When compiling a crate, the compiler creates a unified AST and symbol graph, enabling Whole-Program Optimization (WPO) and aggressive inlining. Modules (`mod`) structure code within a crate. Everything is private by default to its parent module. The `pub` keyword exposes an item to ancestor modules; `pub(crate)` exposes it only within the current crate.",
                "hardwareCallout": "Privacy in Rust is purely a compile-time invariant. In machine code, all public and private functions compile to symbols without runtime protection barriers.",
                "code": "pub mod network {\n    pub struct Connection {\n        pub host: String,\n        port: u16, // Private to network module!\n    }\n    impl Connection {\n        pub fn new(host: String, port: u16) -> Self {\n            Self { host, port }\n        }\n    }\n}",
                "codeExplanation": "The `port` field is private, preventing outside code from directly modifying internal state without going through constructor invariants."
            },
            {
                "title": "Deep Dive into Collections: Vec, UTF-8 String, and HashMap",
                "theory": "1. `Vec<T>`: Contiguous heap buffer (ptr, cap, len). Resizing multiplies capacity by 2x via `realloc`.\n2. `String`: A wrapper around `Vec<u8>` guaranteed to be valid UTF-8. UTF-8 code points vary from 1 to 4 bytes; direct integer indexing like `s[0]` is forbidden because finding the nth character would require an O(n) walk.\n3. `HashMap<K, V>`: Implemented using Google's Swiss Tables algorithm (HashBrown) with SIMD-accelerated metadata byte probing and SipHash 1-3 to defend against HashDoS attacks.",
                "hardwareCallout": "Because contiguous memory has optimal CPU L1 cache locality, `Vec<T>` is almost always faster than linked lists, even for insertions in the middle of moderate-sized collections.",
                "code": "use std::collections::HashMap;\n\nlet mut scores = HashMap::new();\nscores.insert(\"Blue\", 10);\n\n// Entry API avoids double hashing:\nscores.entry(\"Yellow\").or_insert(50);",
                "codeExplanation": "The `.entry()` API performs a single hash table probe to check for presence and insert if missing, eliminating redundant key hashing."
            },
            {
                "title": "Error Engineering: panic! vs Result<T, E> & The ? Operator",
                "theory": "Rust distinguishes strictly between unrecoverable bugs (`panic!`) and recoverable failures (`Result<T, E>`). Unlike C++ or Java exceptions which require runtime stack unwinding tables and dynamic dispatch, `Result<T, E>` is a tagged union returned in CPU registers (RAX/RDX). The `?` operator unrolls into an early return of `Err(From::from(e))` if an error occurs.",
                "hardwareCallout": "Propagating errors with `?` has the exact same performance as checking a return code in C. There are zero exception unwinding penalties for standard errors.",
                "code": "use std::fs::File;\nuse std::io::{self, Read};\n\nfn read_file_contents(path: &str) -> Result<String, io::Error> {\n    let mut contents = String::new();\n    File::open(path)?.read_to_string(&mut contents)?;\n    Ok(contents)\n}",
                "codeExplanation": "The `?` operator extracts the file handle and string length on success, or returns the `io::Error` early."
            }
        ],
        "keyTakeaways": [
            "A crate is the foundational compilation unit; all items are private to their parent module by default.",
            "`String` forbids direct integer indexing because UTF-8 characters have variable byte lengths (1-4 bytes).",
            "`HashMap` uses Swiss Tables SIMD probing and SipHash 1-3 for resistance against HashDoS algorithmic attacks.",
            "Rust has no runtime exception tables; `Result<T, E>` passes errors directly in CPU registers with zero performance penalty.",
            "The `?` operator automatically converts errors using the `From` trait and returns early on `Err`."
        ],
        "qas": [
            {
                "question": "Why does Rust forbid string indexing like `my_string[0]`?",
                "answer": "Rust strings are UTF-8 encoded, meaning a character (Unicode scalar value) can be anywhere between 1 and 4 bytes long. If Rust allowed integer indexing, `my_string[0]` could either return a raw byte (which might be an invalid character fragment) or require scanning all preceding bytes from the beginning of the string to find the first character, turning an expected O(1) array index into an O(n) operation.",
                "concept": "UTF-8 Encoding Guarantees"
            },
            {
                "question": "What is the difference between panic stack unwinding and aborting?",
                "answer": "By default, a panic unwinds the call stack: the runtime walks up active stack frames and executes destructors (`drop()`) for all variables in scope, releasing resources cleanly. In constrained or embedded systems, Cargo can be configured with `panic = 'abort'`, which immediately terminates the process via `SIGABRT` or CPU halt without unwinding, reducing binary size.",
                "concept": "Panic Strategies"
            }
        ],
        "mcqs": [
            {
                "id": "m4-q1",
                "question": "What happens when an expression preceded by `?` evaluates to `Err(e)`?",
                "options": [
                    "The program immediately halts with a panic",
                    "It converts `e` via `From::from(e)` and returns `Err(...)` immediately from the current function",
                    "It assigns a default value to the expression and continues execution",
                    "It retries the operation three times"
                ],
                "correctIndex": 1,
                "explanation": "The `?` operator expands into a match arm that unpacks `Ok(v)` or immediately returns `Err(From::from(e))` from the enclosing function."
            },
            {
                "id": "m4-q2",
                "question": "What hash table architecture does `std::collections::HashMap` use in modern Rust?",
                "options": [
                    "Chained linked lists with MD5 hashing",
                    "Swiss Tables (HashBrown) using SIMD group probing",
                    "Binary search tree (AVL tree)",
                    "Simple linear probing with CRC32"
                ],
                "correctIndex": 1,
                "explanation": "Rust's standard library uses a port of Google's Swiss Tables algorithm (HashBrown), which uses 16-byte SIMD instructions to probe control byte groups simultaneously for fast lookup."
            }
        ]
    },
    {
        "id": "module-5",
        "number": 5,
        "title": "Module 5: The Type System: Generics, Traits & Lifetimes",
        "subtitle": "Monomorphization, Interface Contracts, Trait Objects, and Lifetime Invariants",
        "level": "Intermediate to Advanced",
        "estimatedMinutes": 65,
        "description": "Master Rust's static type system: zero-cost generics via monomorphization, trait contracts and bounds, dynamic dispatch with `dyn Trait` fat pointers, and explicit lifetime annotations checked by the Polonius borrow checker.",
        "lessons": [
            {
                "title": "Generics & Compile-Time Monomorphization",
                "theory": "Rust implements generics through monomorphization: during compilation, rustc duplicates and specializes generic code for every concrete type used. Calling `process<i32>()` and `process<f64>()` generates two distinct machine code functions. The resulting machine code uses optimal CPU registers and can be fully inlined by LLVM with zero runtime overhead.",
                "hardwareCallout": "Zero runtime cost comes at the trade-off of binary code bloat (larger executable sizes) and longer compilation times.",
                "code": "fn min<T: PartialOrd>(a: T, b: T) -> T {\n    if a < b { a } else { b }\n}\n\nlet m1 = min(5, 10);       // Specializes min::<i32>\nlet m2 = min(3.14, 2.71);   // Specializes min::<f64>",
                "codeExplanation": "The compiler generates specialized assembly for both `i32` and `f64` invocations."
            },
            {
                "title": "Traits, Associated Types & Static vs Dynamic Dispatch",
                "theory": "Traits define shared behavior contracts. Rust offers two mechanisms to call trait methods:\n1. Static Dispatch (`impl Trait` or `<T: Trait>`): Monomorphized at compile time, inlined by LLVM, zero runtime overhead.\n2. Dynamic Dispatch (`dyn Trait`): Resolved at runtime via a 16-byte Fat Pointer containing (1) pointer to the concrete struct and (2) pointer to the vtable. Calling a method incurs an indirect CPU branch.",
                "hardwareCallout": "Indirect branch instructions through a vtable cannot be inlined by the compiler and may cause branch predictor stalls in performance-critical CPU loops.",
                "code": "trait Greeter {\n    fn greet(&self);\n}\n\n// Static dispatch (monomorphized):\nfn run_static(g: impl Greeter) { g.greet(); }\n\n// Dynamic dispatch (fat pointer with vtable):\nfn run_dynamic(g: &dyn Greeter) { g.greet(); }",
                "codeExplanation": "`&dyn Greeter` is a 16-byte fat pointer (8 bytes data pointer + 8 bytes vtable pointer)."
            },
            {
                "title": "Lifetimes: Verifying Reference Validity at Compile Time",
                "theory": "Every reference in Rust has a lifetime: the span of time during which the borrowed memory address remains valid. The compiler checks lifetimes to ensure no reference outlives the value it points to (preventing dangling pointers). Lifetime annotations (`'a`) do not alter how long values live; they describe relationships between the lifetimes of multiple references so the borrow checker can prove safety.",
                "hardwareCallout": "Lifetimes exist purely in the compiler's type checker (Polonius). They are completely erased during MIR codegen and have zero representation in compiled assembly binaries.",
                "code": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() { x } else { y }\n}\n\nlet s1 = String::from(\"long\");\n{\n    let s2 = String::from(\"short\");\n    let result = longest(s1.as_str(), s2.as_str());\n    println!(\"{result}\");\n}",
                "codeExplanation": "The return value is tied to the shorter of the two lifetimes of `x` and `y`, preventing dangling references."
            }
        ],
        "keyTakeaways": [
            "Monomorphization generates specialized machine code for each concrete type, achieving zero runtime overhead.",
            "Static dispatch (`impl Trait`) enables compiler inlining; dynamic dispatch (`dyn Trait`) uses 16-byte fat pointers with vtables.",
            "Lifetimes exist purely at compile time; they have zero runtime overhead and zero representation in machine code.",
            "Lifetime annotations inform the borrow checker about relationships between input and output reference durations.",
            "The Three Lifetime Elision Rules allow the compiler to infer lifetimes automatically on most everyday function signatures."
        ],
        "qas": [
            {
                "question": "What is a 'fat pointer' in the context of Rust trait objects?",
                "answer": "A regular pointer on a 64-bit architecture is 8 bytes. A trait object fat pointer (`&dyn Trait` or `Box<dyn Trait>`) is 16 bytes: the first 8 bytes point to the actual instance data in memory, and the second 8 bytes point to the compiler-generated virtual method table (vtable) containing pointers to the trait's concrete method implementations.",
                "concept": "Fat Pointers and Vtables"
            },
            {
                "question": "What is the Orphan Rule in Rust trait implementations?",
                "answer": "The Orphan Rule states that you can only implement a trait for a type if either the trait or the type was defined in your current crate. You cannot implement an external trait (e.g., from `std`) for an external type (e.g., `Vec<T>`). This prevents conflicting duplicate implementations from colliding when two independent crates are linked together.",
                "concept": "Orphan Rule & Coherence"
            }
        ],
        "mcqs": [
            {
                "id": "m5-q1",
                "question": "What is the memory size of `&dyn MyTrait` on a 64-bit machine?",
                "options": [
                    "8 bytes",
                    "16 bytes",
                    "24 bytes",
                    "32 bytes"
                ],
                "correctIndex": 1,
                "explanation": "A trait object reference is a fat pointer consisting of two 64-bit pointers (16 bytes total): a data pointer and a vtable pointer."
            },
            {
                "id": "m5-q2",
                "question": "Which of the following traits is NOT object-safe and cannot be used as a `dyn Trait`?",
                "options": [
                    "A trait whose methods only take &self",
                    "A trait with a method that returns `Self` by value",
                    "A trait with methods returning &str",
                    "A trait that extends Display"
                ],
                "correctIndex": 1,
                "explanation": "A trait is not object-safe if any method returns `Self` or has generic type parameters, because the compiler cannot determine the concrete return type or build a static vtable for unknown types."
            }
        ]
    },
    {
        "id": "module-6",
        "number": 6,
        "title": "Module 6: Functional Rust: Closures & Zero-Cost Iterators",
        "subtitle": "Capture Modes, Fn Traits, Lazy Evaluation, and SIMD Auto-Vectorization",
        "level": "Intermediate",
        "estimatedMinutes": 45,
        "description": "Understand functional abstractions in Rust: how the compiler implements closures as anonymous structs, the three `Fn` traits, lazy iterator pipelines, and how LLVM unrolls iterators into branch-free SIMD machine code.",
        "lessons": [
            {
                "title": "Closures Under the Hood: Anonymous Structs & Fn Traits",
                "theory": "In Rust, a closure is not a function pointer. Under the hood, rustc generates an anonymous struct holding fields for every variable captured from the surrounding scope. Captures occur in one of three modes:\n1. `Fn`: Borrows captured variables immutably (`&T`).\n2. `FnMut`: Borrows captured variables mutably (`&mut T`).\n3. `FnOnce`: Takes ownership of captured variables (`T`), moving them into the struct.",
                "hardwareCallout": "If a closure captures nothing from its environment, it is a Zero-Sized Type (ZST) that can be coerced to a plain C-compatible function pointer (`fn()`).",
                "code": "let base = 10;\n// Borrows `base` immutably (implements Fn):\nlet add_base = |x| x + base;\n\n// Forces ownership transfer into the closure:\nlet owns_base = move || println!(\"Base: {base}\");",
                "codeExplanation": "The `move` keyword forces `base` to be moved into the closure's anonymous struct."
            },
            {
                "title": "The Iterator Trait & Zero-Cost SIMD Execution",
                "theory": "All iterators implement `Iterator` with a single required method: `fn next(&mut self) -> Option<Self::Item>`. Iterators are completely lazy: calling `.map()` or `.filter()` does nothing until consumed by `.collect()`, `.sum()`, or a `for` loop. Because iterators track bounds internally, LLVM eliminates array bounds checks and unrolls operations into SIMD (Single Instruction, Multiple Data) vector instructions.",
                "hardwareCallout": "In benchmarks, Rust iterator pipelines frequently outperform imperative C `for` loops because LLVM can prove the absence of pointer aliasing and emit 256-bit AVX2 vector instructions.",
                "code": "let nums = vec![1, 2, 3, 4, 5, 6];\nlet even_sum: i32 = nums\n    .iter()\n    .filter(|&&x| x % 2 == 0)\n    .map(|&x| x * 2)\n    .sum();\n\nassert_eq!(even_sum, 24);",
                "codeExplanation": "A declarative pipeline compiled down to a single tight register loop."
            }
        ],
        "keyTakeaways": [
            "Rust closures compile down to anonymous compiler-generated structs holding captured references or values.",
            "`FnOnce` consumes captured variables; `FnMut` mutates them; `Fn` reads them immutably.",
            "Iterators are lazy: they do zero computation until consumed by an adapter like `.collect()` or `.sum()`.",
            "Iterator pipelines compile to branch-free, bounds-check-free SIMD instructions equivalent to or faster than raw loops."
        ],
        "qas": [
            {
                "question": "Why is a closure that captures values by value typed as `FnOnce`?",
                "answer": "When a closure captures values by value (taking ownership), executing the closure may consume or drop those values. Because the captured values no longer exist after the first invocation, the closure cannot safely be executed a second time, restricting it to the `FnOnce` trait.",
                "concept": "FnOnce vs Fn Mut"
            }
        ],
        "mcqs": [
            {
                "id": "m6-q1",
                "question": "What happens when you call `.map(|x| x * 2)` on an iterator without calling `.collect()` or iterating through it?",
                "options": [
                    "The elements are transformed in place immediately",
                    "A runtime error is thrown",
                    "Nothing is executed because iterators are lazy",
                    "The vector is copied to the heap"
                ],
                "correctIndex": 2,
                "explanation": "Iterators in Rust are completely lazy. Calling an adapter like `.map()` merely returns an adaptor struct that does no work until `.next()` is called."
            }
        ]
    },
    {
        "id": "module-7",
        "number": 7,
        "title": "Module 7: Deep Memory Management & Smart Pointers",
        "subtitle": "Box, Rc, RefCell, Interior Mutability, and Reference Cycles",
        "level": "Advanced",
        "estimatedMinutes": 60,
        "description": "Examine smart pointer implementations: `Box<T>` for heap indirection, `Rc<T>` for reference counted shared ownership, `RefCell<T>` for interior mutability, and how to avoid memory leaks with `Weak<T>`.",
        "lessons": [
            {
                "title": "Box<T> & Recursive Data Structures",
                "theory": "A `Box<T>` is an owned smart pointer providing heap allocation with a fixed 8-byte stack pointer. It is mandatory for recursive data structures (trees, linked lists) whose total size cannot be determined at compile time because infinite size recursion is illegal.",
                "hardwareCallout": "Dereferencing a Box involves fetching the address stored in the 8-byte stack slot and reading the heap memory address.",
                "code": "enum List {\n    Cons(i32, Box<List>),\n    Nil,\n}\nlet list = List::Cons(1, Box::new(List::Cons(2, Box::new(List::Nil))));",
                "codeExplanation": "`Box<List>` gives the recursive variant a known 8-byte size on the stack."
            },
            {
                "title": "Rc<T>, RefCell<T>, and Interior Mutability",
                "theory": "1. `Rc<T>`: Reference Counting for single-threaded multiple ownership. Cloning an `Rc` only increments an atomic counter; it does not deep copy data.\n2. `RefCell<T>`: Provides Interior Mutability, shifting borrow checking from compile-time to runtime. Violating borrow rules (e.g., two simultaneous `borrow_mut()` calls) triggers an immediate runtime panic instead of a compile error.",
                "hardwareCallout": "Combining `Rc<RefCell<T>>` allows multiple owners to mutate the same shared heap allocation safely in single-threaded environments.",
                "code": "use std::rc::Rc;\nuse std::cell::RefCell;\n\nlet shared = Rc::new(RefCell::new(100));\nlet clone1 = Rc::clone(&shared);\n*clone1.borrow_mut() += 50;\n\nassert_eq!(*shared.borrow(), 150);",
                "codeExplanation": "Multiple owners modifying the shared value via interior mutability."
            }
        ],
        "keyTakeaways": [
            "`Box<T>` provides heap indirection with an 8-byte stack footprint, essential for recursive types.",
            "`Rc<T>` allows multiple owners on a single thread; it does not implement `Send` and cannot cross thread boundaries.",
            "`RefCell<T>` enforces borrowing rules dynamically at runtime via internal counters.",
            "Reference cycles between `Rc` pointers can cause memory leaks; use `Weak<T>` to break cycles."
        ],
        "qas": [
            {
                "question": "Why is `Rc<T>` not thread-safe?",
                "answer": "`Rc<T>` updates its reference count using non-atomic integer operations (`count += 1`). If multiple threads were to clone or drop an `Rc` concurrently, a CPU race condition could cause the counter to desynchronize, causing premature deallocation (use-after-free) or memory leaks. Thread-safe reference counting requires `Arc<T>`.",
                "concept": "Thread Safety of Reference Counters"
            }
        ],
        "mcqs": [
            {
                "id": "m7-q1",
                "question": "What happens if code invokes `borrow_mut()` on a `RefCell<T>` that currently has an active `borrow()` in scope?",
                "options": [
                    "The thread blocks until the immutable borrow is released",
                    "The program panics immediately with a BorrowMutError at runtime",
                    "The compiler generates an error during `cargo check`",
                    "The data is duplicated on the heap"
                ],
                "correctIndex": 1,
                "explanation": "RefCell enforces borrow rules dynamically at runtime. If an active immutable borrow exists when borrow_mut() is called, RefCell panics immediately."
            }
        ]
    },
    {
        "id": "module-8",
        "number": 8,
        "title": "Module 8: Fearless Concurrency & Multithreading",
        "subtitle": "Native OS Threads, Message-Passing Channels, Arc/Mutex, and Send/Sync",
        "level": "Advanced",
        "estimatedMinutes": 60,
        "description": "Build high-throughput multi-threaded systems. Master native OS thread spawning, scoped threads (`std::thread::scope`), message-passing channels (`mpsc`), `Arc<Mutex<T>>`, atomic primitives, and the `Send` & `Sync` marker traits.",
        "lessons": [
            {
                "title": "OS Threads & Scoped Thread Architecture",
                "theory": "Rust threads map 1:1 to native operating system kernel threads (pthreads on Linux/macOS). Standard `thread::spawn` requires a `'static` lifetime because the thread might outlive the spawning function. Modern Rust provides `std::thread::scope`, which guarantees child threads terminate before the scope exits, allowing child threads to borrow stack variables safely without heap allocation.",
                "hardwareCallout": "Each OS thread typically allocates a 2MB virtual stack. For CPU-bound tasks, matching thread count to available hardware cores avoids context-switch thrashing.",
                "code": "let mut numbers = vec![1, 2, 3];\nstd::thread::scope(|s| {\n    s.spawn(|| {\n        println!(\"Borrowed numbers safely: {numbers:?}\");\n    });\n}); // Guarantees thread terminates here\nnumbers.push(4);",
                "codeExplanation": "Scoped threads guarantee termination, enabling safe borrowing of local stack variables."
            },
            {
                "title": "Shared State Concurrency & Send / Sync Marker Traits",
                "theory": "For shared mutable state across threads, Rust uses `Arc<Mutex<T>>`:\n• `Arc<T>`: Atomic Reference Counting using CPU atomic instructions (`LOCK XADD`).\n• `Mutex<T>`: Mutual exclusion lock (using an OS futex). Calling `.lock()` returns an RAII `MutexGuard` that unlocks automatically on drop.\n• `Send`: Indicates ownership can be transferred across thread boundaries.\n• `Sync`: Indicates it is safe to share references (`&T`) between threads (`T: Sync <=> &T: Send`).",
                "hardwareCallout": "Rust's type system prevents data races at compile time: attempting to send a non-Send type (like `Rc<T>`) across a thread will fail compilation.",
                "code": "use std::sync::{Arc, Mutex};\nuse std::thread;\n\nlet counter = Arc::new(Mutex::new(0));\nlet mut handles = vec![];\n\nfor _ in 0..5 {\n    let c = Arc::clone(&counter);\n    handles.push(thread::spawn(move || {\n        let mut num = c.lock().unwrap();\n        *num += 1;\n    }));\n}\n\nfor h in handles { h.join().unwrap(); }\nassert_eq!(*counter.lock().unwrap(), 5);",
                "codeExplanation": "5 worker threads safely increment a shared counter protected by Arc and Mutex."
            }
        ],
        "keyTakeaways": [
            "Rust threads are 1:1 OS kernel threads scheduled by the operating system.",
            "`std::thread::scope` enables threads to borrow stack data without `'static` lifetime restrictions.",
            "`Arc<Mutex<T>>` provides thread-safe shared mutable state with deterministic unlocking via RAII.",
            "`Send` and `Sync` are auto-marker traits that guarantee thread safety at compile time."
        ],
        "qas": [
            {
                "question": "What is the relationship between the `Send` and `Sync` marker traits?",
                "answer": "A type `T` is `Sync` if and only if an immutable reference `&T` is `Send`. This means if it is safe to pass a shared reference `&T` to another thread without causing data races, `T` implements `Sync`. Types containing interior mutability without synchronization (like `RefCell<T>`) are `Send` but not `Sync`.",
                "concept": "Send and Sync Relationship"
            }
        ],
        "mcqs": [
            {
                "id": "m8-q1",
                "question": "Why does attempting to pass an `Rc<T>` across threads cause a compile-time error?",
                "options": [
                    "Because Rc is too large to fit in thread registers",
                    "Because Rc does not implement the Send trait due to non-atomic reference counter operations",
                    "Because threads can only accept primitive integer types",
                    "Because Rc requires garbage collection"
                ],
                "correctIndex": 1,
                "explanation": "Rc uses non-atomic arithmetic for its reference count. Passing it across threads would permit data races on the counter, so rustc rejects it because Rc does not implement Send."
            }
        ]
    },
    {
        "id": "module-9",
        "number": 9,
        "title": "Module 9: Modern Asynchronous Programming & Pin",
        "subtitle": "The Future Trait, Polling, Wakers, Cooperative Scheduling, and Pinning",
        "level": "Advanced to Master",
        "estimatedMinutes": 65,
        "description": "Master asynchronous programming as standardized in the 3rd Edition of The Rust Book. Understand the pull-based `Future` trait, epoll/kqueue non-blocking event loops, cooperative multitasking, task cancellation, and why `Pin` is mathematically required for self-referential futures.",
        "lessons": [
            {
                "title": "The Async Execution Model: OS Threads vs Event-Driven Tasks",
                "theory": "While OS threads carry a 2MB stack footprint and require kernel context switches, an async task is a compact state machine (< 100 bytes). Async Rust is pull-based: futures do zero work unless polled by an executor runtime (like Tokio). Non-blocking system calls register file descriptors with the OS event loop (`epoll` on Linux, `kqueue` on macOS, `IOCP` on Windows). When I/O completes, the OS wakes the task executor via a `Waker`.",
                "hardwareCallout": "A single OS thread running an epoll event loop can handle over 100,000 concurrent network connections with minimal memory overhead.",
                "code": "async fn fetch_resource() -> String {\n    \"data payload\".to_string()\n}\n\n// Under the hood, an async fn compiles to a state machine implementing Future:\n// pub trait Future {\n//     type Output;\n//     fn poll(self: Pin<&mut Self>, cx: &mut Context<'_>) -> Poll<Self::Output>;\n// }",
                "codeExplanation": "`async fn` transforms your imperative code into a compiler-generated state machine implementing `Future`."
            },
            {
                "title": "Why Pin<&mut T> is Mathematically Mandatory",
                "theory": "When an `async fn` suspends at an `.await` point, local variables that are borrowed across that point become internal self-referential pointers within the compiler-generated future struct. If that future struct were moved to a new memory address (e.g., via `std::mem::swap` or array realloc), those self-referential pointers would point to dead memory (UB). `Pin` wraps a pointer to guarantee the underlying data will never move in memory before being dropped.",
                "hardwareCallout": "Pinning prevents memory relocation bugs in self-referential structures, allowing zero-cost state machine compilation with memory safety.",
                "code": "use std::pin::Pin;\n\nasync fn compute() -> i32 { 42 }\n\nlet fut = compute();\n// Pinning to the heap:\nlet mut pinned: Pin<Box<_>> = Box::pin(fut);",
                "codeExplanation": "`Box::pin` places the future at a stable heap location and wraps it in `Pin`, guaranteeing it will never move."
            }
        ],
        "keyTakeaways": [
            "Rust futures are completely lazy and pull-based: they do nothing until `.await` or polled by an executor.",
            "Async tasks are compact state machines capable of multiplexing tens of thousands of connections on a single OS thread.",
            "`Pin` guarantees that self-referential futures generated by async/await will never move in memory before being dropped.",
            "Never perform blocking synchronous I/O or long CPU computation on an async executor thread."
        ],
        "qas": [
            {
                "question": "Why does calling `std::thread::sleep` inside an async function harm performance?",
                "answer": "An async executor thread runs dozens or hundreds of concurrent tasks cooperatively. Calling `std::thread::sleep` blocks the underlying OS thread, freezing the entire executor thread and preventing all other concurrent tasks scheduled on that thread from running. In async code, you must use non-blocking equivalents like `tokio::time::sleep`.",
                "concept": "Async Cooperative Multitasking"
            }
        ],
        "mcqs": [
            {
                "id": "m9-q1",
                "question": "What is the primary purpose of `Pin` in Rust's async system?",
                "options": [
                    "To bind a thread to a specific CPU core for cache affinity",
                    "To prevent self-referential future structs from moving in memory across await points",
                    "To prevent memory leaks in channels",
                    "To force futures to execute synchronously"
                ],
                "correctIndex": 1,
                "explanation": "Futures generated by async/await can hold self-referential pointers across await points. Moving the struct would invalidate these internal pointers. Pin guarantees that the memory location remains stationary."
            }
        ]
    },
    {
        "id": "module-10",
        "number": 10,
        "title": "Module 10: Advanced Rust, Unsafe & The Compiler Frontier",
        "subtitle": "Raw Pointers, FFI C-ABI, Miri UB Detection, and Declarative & Procedural Macros",
        "level": "Master",
        "estimatedMinutes": 75,
        "description": "Unlock Rust's lowest-level capabilities: The Five Unsafe Superpowers, raw pointers (`*const T`, `*mut T`), C-ABI FFI, validating memory safety with Miri, metaprogramming with `macro_rules!` and procedural macros, and inspecting LLVM-IR.",
        "lessons": [
            {
                "title": "Unsafe Rust & The Five Superpowers",
                "theory": "Unsafe Rust does not disable the borrow checker or type system. It grants exactly five specific superpowers to bypass compiler invariants when interacting directly with hardware, registers, or foreign code:\n1. Dereference raw pointers (`*const T`, `*mut T`).\n2. Call an unsafe function or method.\n3. Implement an unsafe trait.\n4. Mutate a mutable static variable.\n5. Access fields of a `union`.",
                "hardwareCallout": "Raw pointers can be null, unaligned, and ignore borrowing rules. Dereferencing an invalid raw pointer causes Undefined Behavior (UB), segmentation faults, or silent security vulnerabilities.",
                "code": "let mut val = 42;\nlet r1 = &val as *const i32;\nlet r2 = &mut val as *mut i32;\n\nunsafe {\n    *r2 = 100;\n    println!(\"Dereferenced raw pointer: {}\", *r1);\n}",
                "codeExplanation": "Creating raw pointers is safe; only dereferencing them requires an explicit `unsafe` block."
            },
            {
                "title": "Foreign Function Interface (FFI) & Miri Verification",
                "theory": "Rust seamlessly calls and is called by C code via `extern \"C\"`. Data structures passed across FFI boundaries must use `#[repr(C)]` to guarantee standard platform ABI alignment. To verify that unsafe code complies with the Stacked Borrows and Tree Borrows memory models, the Rust team provides Miri: an interpreter for Rust MIR that detects undefined behavior, memory leaks, unaligned reads, and invalid pointer provenance at test time.",
                "hardwareCallout": "Miri acts as an abstract virtual machine that tracks the exact allocation provenance of every single byte in memory.",
                "code": "// FFI declaration:\nextern \"C\" {\n    fn abs(input: i32) -> i32;\n}\n\nfn main() {\n    let result = unsafe { abs(-5) };\n    assert_eq!(result, 5);\n}",
                "codeExplanation": "Calls the standard C library `abs` function directly across the C-ABI."
            },
            {
                "title": "Metaprogramming: Declarative vs Procedural Macros",
                "theory": "Macros operate at the Abstract Syntax Tree (AST) level before code generation:\n1. Declarative Macros (`macro_rules!`): Pattern-matching syntax transformation.\n2. Procedural Macros: Functions that accept a `TokenStream` and emit a new `TokenStream` during compilation. They come in three forms: Custom Derive (`#[derive(Serialize)]`), Attribute-like (`#[tokio::main]`), and Function-like (`sql!(\"SELECT ...\")`).",
                "hardwareCallout": "Procedural macros run as compiled native plugins during compilation, enabling compile-time code generation and schema validation.",
                "code": "macro_rules! my_vec {\n    ( $( $x:expr ),* ) => {{\n        let mut temp = Vec::new();\n        $( temp.push($x); )*\n        temp\n    }};\n}\nlet v = my_vec![1, 2, 3];",
                "codeExplanation": "Declarative macro expanding into vector initialization statements."
            }
        ],
        "keyTakeaways": [
            "Unsafe Rust grants exactly five superpowers for hardware and FFI integration; the borrow checker remains active.",
            "Always wrap unsafe blocks inside safe, invariant-preserving abstractions.",
            "Run `cargo +nightly miri test` to detect undefined behavior, memory leaks, and pointer aliasing violations.",
            "FFI structs must use `#[repr(C)]` to match target platform C-ABI layout.",
            "Procedural macros run at compile time to transform token streams, enabling expressive code generation."
        ],
        "qas": [
            {
                "question": "What is Miri and why is it essential for verifying unsafe Rust code?",
                "answer": "Miri is an interpreter for Rust's Mid-Level Intermediate Representation (MIR). While tests running natively on CPU hardware might appear to pass even with undefined behavior (due to compiler quirks or lucky memory layouts), Miri executes code in an interpreted environment that tracks pointer provenance, detecting stacked borrows violations, use-after-free, unaligned reads, and data races before production deployment.",
                "concept": "Miri & Undefined Behavior"
            }
        ],
        "mcqs": [
            {
                "id": "m10-q1",
                "question": "Which of the following actions is completely legal in safe Rust and does NOT require an unsafe block?",
                "options": [
                    "Creating a raw pointer from a reference (`&x as *const i32`)",
                    "Dereferencing a raw pointer (`*raw_ptr`)",
                    "Calling a C library function declared with `extern \"C\"`",
                    "Mutating a mutable static variable"
                ],
                "correctIndex": 0,
                "explanation": "Creating a raw pointer from a valid reference is completely safe. Only dereferencing the raw pointer requires an unsafe block."
            }
        ]
    }
]

def main():
    # 1. Output TypeScript file
    ts_out = "src/data/rustMasteryCurriculum.ts"
    header = """// ============================================================================
// DEDICATED RUST MASTERY CURRICULUM
// 10 Comprehensive Sequential Modules
// Based on The Rust Programming Language 3rd Edition, Programming Rust & Nomicon
// Contains: Deep Hardware Realities, Key Takeaways, In-Depth Q&As, and MCQs
// ============================================================================

export interface Lesson {
  title: string;
  theory: string;
  hardwareCallout: string;
  code: string;
  codeExplanation: string;
}

export interface QA {
  question: string;
  answer: string;
  concept: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MasteryModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  level: 'Foundational' | 'Intermediate' | 'Intermediate to Advanced' | 'Advanced' | 'Advanced to Master' | 'Master';
  estimatedMinutes: number;
  description: string;
  lessons: Lesson[];
  keyTakeaways: string[];
  qas: QA[];
  mcqs: MCQ[];
}

export const RUST_MASTERY_CURRICULUM: MasteryModule[] = """ + json.dumps(modules, indent=2) + """;
"""
    with open(ts_out, "w", encoding="utf-8") as f:
        f.write(header)
    print(f"Generated {ts_out} ({os.path.getsize(ts_out):,} bytes)")

    # 2. Output Markdown files in docs/modules/
    os.makedirs("docs/modules", exist_ok=True)
    for mod in modules:
        filename = f"docs/modules/{mod['number']:02d}_{mod['id'].replace('-', '_')}.md"
        with open(filename, "w", encoding="utf-8") as f:
            f.write(f"# {mod['title']}\n\n")
            f.write(f"**Subtitle**: {mod['subtitle']}  \n")
            f.write(f"**Level**: {mod['level']} | **Estimated Time**: {mod['estimatedMinutes']} mins\n\n")
            f.write(f"## Overview\n{mod['description']}\n\n")
            f.write("---\n\n")

            f.write("## 1. Core Lessons & Hardware Realities\n\n")
            for idx, lesson in enumerate(mod['lessons'], 1):
                f.write(f"### 1.{idx} {lesson['title']}\n\n")
                f.write(f"{lesson['theory']}\n\n")
                f.write(f"> ⚙️ **Hardware & Low-Level Reality**: {lesson['hardwareCallout']}\n\n")
                f.write("```rust\n")
                f.write(f"{lesson['code']}\n")
                f.write("```\n\n")
                f.write(f"*Analysis*: {lesson['codeExplanation']}\n\n")

            f.write("---\n\n")
            f.write("## 2. Key Takeaways\n\n")
            for pt in mod['keyTakeaways']:
                f.write(f"- {pt}\n")
            f.write("\n---\n\n")

            f.write("## 3. Deep Conceptual Q&A\n\n")
            for q_idx, qa in enumerate(mod['qas'], 1):
                f.write(f"### Q{q_idx}: {qa['question']}\n\n")
                f.write(f"**Answer**: {qa['answer']}\n\n")
                f.write(f"*Core Concept*: `{qa['concept']}`\n\n")

            f.write("---\n\n")
            f.write("## 4. Mastery Multiple-Choice Questions (MCQs)\n\n")
            for m_idx, mcq in enumerate(mod['mcqs'], 1):
                f.write(f"### Question {m_idx}: {mcq['question']}\n\n")
                for opt_idx, opt in enumerate(mcq['options']):
                    label = chr(65 + opt_idx)
                    is_correct = " (Correct Answer)" if opt_idx == mcq['correctIndex'] else ""
                    f.write(f"- **{label}**: {opt}{is_correct}\n")
                f.write(f"\n> **Architectural Explanation**: {mcq['explanation']}\n\n")

        print(f"Generated {filename}")

if __name__ == "__main__":
    main()
