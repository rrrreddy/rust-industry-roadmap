# Module 8: Fearless Concurrency & Multithreading

**Subtitle**: Native OS Threads, Message-Passing Channels, Arc/Mutex, and Send/Sync  
**Level**: Advanced | **Estimated Time**: 60 mins

## Overview
Build high-throughput multi-threaded systems. Master native OS thread spawning, scoped threads (`std::thread::scope`), message-passing channels (`mpsc`), `Arc<Mutex<T>>`, atomic primitives, and the `Send` & `Sync` marker traits.

---

## 1. Core Lessons & Hardware Realities

### 1.1 OS Threads & Scoped Thread Architecture

Rust threads map 1:1 to native operating system kernel threads (pthreads on Linux/macOS). Standard `thread::spawn` requires a `'static` lifetime because the thread might outlive the spawning function. Modern Rust provides `std::thread::scope`, which guarantees child threads terminate before the scope exits, allowing child threads to borrow stack variables safely without heap allocation.

> ⚙️ **Hardware & Low-Level Reality**: Each OS thread typically allocates a 2MB virtual stack. For CPU-bound tasks, matching thread count to available hardware cores avoids context-switch thrashing.

```rust
let mut numbers = vec![1, 2, 3];
std::thread::scope(|s| {
    s.spawn(|| {
        println!("Borrowed numbers safely: {numbers:?}");
    });
}); // Guarantees thread terminates here
numbers.push(4);
```

*Analysis*: Scoped threads guarantee termination, enabling safe borrowing of local stack variables.

### 1.2 Shared State Concurrency & Send / Sync Marker Traits

For shared mutable state across threads, Rust uses `Arc<Mutex<T>>`:
• `Arc<T>`: Atomic Reference Counting using CPU atomic instructions (`LOCK XADD`).
• `Mutex<T>`: Mutual exclusion lock (using an OS futex). Calling `.lock()` returns an RAII `MutexGuard` that unlocks automatically on drop.
• `Send`: Indicates ownership can be transferred across thread boundaries.
• `Sync`: Indicates it is safe to share references (`&T`) between threads (`T: Sync <=> &T: Send`).

> ⚙️ **Hardware & Low-Level Reality**: Rust's type system prevents data races at compile time: attempting to send a non-Send type (like `Rc<T>`) across a thread will fail compilation.

```rust
use std::sync::{Arc, Mutex};
use std::thread;

let counter = Arc::new(Mutex::new(0));
let mut handles = vec![];

for _ in 0..5 {
    let c = Arc::clone(&counter);
    handles.push(thread::spawn(move || {
        let mut num = c.lock().unwrap();
        *num += 1;
    }));
}

for h in handles { h.join().unwrap(); }
assert_eq!(*counter.lock().unwrap(), 5);
```

*Analysis*: 5 worker threads safely increment a shared counter protected by Arc and Mutex.

---

## 2. Key Takeaways

- Rust threads are 1:1 OS kernel threads scheduled by the operating system.
- `std::thread::scope` enables threads to borrow stack data without `'static` lifetime restrictions.
- `Arc<Mutex<T>>` provides thread-safe shared mutable state with deterministic unlocking via RAII.
- `Send` and `Sync` are auto-marker traits that guarantee thread safety at compile time.

---

## 3. Deep Conceptual Q&A

### Q1: What is the relationship between the `Send` and `Sync` marker traits?

**Answer**: A type `T` is `Sync` if and only if an immutable reference `&T` is `Send`. This means if it is safe to pass a shared reference `&T` to another thread without causing data races, `T` implements `Sync`. Types containing interior mutability without synchronization (like `RefCell<T>`) are `Send` but not `Sync`.

*Core Concept*: `Send and Sync Relationship`

---

## 4. Mastery Multiple-Choice Questions (MCQs)

### Question 1: Why does attempting to pass an `Rc<T>` across threads cause a compile-time error?

- **A**: Because Rc is too large to fit in thread registers
- **B**: Because Rc does not implement the Send trait due to non-atomic reference counter operations (Correct Answer)
- **C**: Because threads can only accept primitive integer types
- **D**: Because Rc requires garbage collection

> **Architectural Explanation**: Rc uses non-atomic arithmetic for its reference count. Passing it across threads would permit data races on the counter, so rustc rejects it because Rc does not implement Send.

