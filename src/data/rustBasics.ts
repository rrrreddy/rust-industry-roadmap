import { RustBasicsStep } from './types';

export const RUST_BASICS_STEPS: RustBasicsStep[] = [
  {
    id: "b1",
    module: 1,
    title: "1. What is Rust & Why Does It Exist?",
    subtitle: "The language that solved the 50-year-old software paradox",
    analogy: "Imagine cars previously had two choices: fast like Formula 1 with zero seatbelts (C/C++), or safe with 10 airbags but moving at 20 mph with constant mandatory stops for inspections (Python/Java). Rust is the first Formula 1 car with unbreakable titanium safety bars that add zero extra weight.",
    explanation: "In traditional languages like C and C++, programmers manually allocate and free computer memory. One small typo leads to crashes, security hacks, and blue screens (over 70% of all Microsoft and Google security vulnerabilities were memory bugs). Other languages like Python, Java, or Go use a 'Garbage Collector' that periodically pauses your program to clean up memory. Rust invented a third way: the compiler checks your memory safety before your code even runs, giving you maximum hardware speed with absolute safety.",
    codeSnippet: `// Welcome to Rust!
// Every Rust program begins at the 'main' function.
fn main() {
    println!("Hello, future Rust Architect!");
    
    // Variables in Rust are IMMUTABLE (cannot change) by default!
    let speed_of_light = 299_792_458; // meters per second
    println!("Speed of light: {} m/s", speed_of_light);
    
    // To make something changeable, explicitly add 'mut':
    let mut score = 0;
    score += 10;
    println!("Current Score: {}", score);
}`,
    commonPitfalls: [
      "Trying to change a variable declared with 'let' instead of 'let mut'.",
      "Expecting a garbage collector or automatic background thread to clean things up."
    ],
    handsOnTask: "Install Rust using 'curl --proto =https --tlsv1.2 -sSf https://sh.rustup.rs | sh' or rustup.rs, run 'cargo new hello_rust', and run 'cargo run'."
  },
  {
    id: "b2",
    module: 2,
    title: "2. The Secret Sauce: Ownership & The Borrow Checker",
    subtitle: "Understanding how Rust manages memory without a garbage collector",
    analogy: "Think of a physical library book. There is only ONE physical copy. If you have it, nobody else has it. You can either 'give' it to a friend (Transfer Ownership), or let friends 'read over your shoulder' (Immutable Borrow), or let exactly ONE friend write notes in it while you wait (Mutable Borrow). Two people can never write notes on the same page at the exact same instant.",
    explanation: "Rust has three fundamental rules:\n1. Each value in Rust has an owner.\n2. There can only be ONE owner at a time.\n3. When the owner goes out of scope, the memory is instantly freed automatically.\n\nBorrowing rules:\n• You can have any number of readers (&T).\n• OR you can have exactly one writer (&mut T).\n• Never both at the same time. This single rule prevents 99% of concurrency bugs and data races!",
    codeSnippet: `fn main() {
    let original_message = String::from("Secret Document");

    // PASSING OWNERSHIP (Move):
    // If we pass original_message into a function without borrowing (&),
    // the function now OWNS it, and we can no longer use it!
    read_and_consume(original_message);
    
    // println!("{}", original_message); 
    // ^ COMPILE ERROR! Rust stops you: "use of moved value"

    // BORROWING SAFELY (&):
    let mut status = String::from("System Active");
    inspect_status(&status); // & means: just look, don't take ownership
    update_status(&mut status); // &mut means: you have permission to modify
    println!("Final: {}", status);
}

fn inspect_status(s: &String) {
    println!("Inspecting: {}", s);
}

fn update_status(s: &mut String) {
    s.push_str(" - All Systems Green");
}

fn read_and_consume(s: String) {
    println!("Consumed: {}", s);
} // s is deleted from memory right here automatically!`,
    commonPitfalls: [
      "Trying to use a variable after passing it into a function without an '&'.",
      "Trying to borrow something as mutable (&mut) while an immutable borrow (&) is still active."
    ],
    handsOnTask: "Write a function that accepts a borrowed `&Vec<i32>`, calculates the sum of all numbers, and returns the total without taking ownership of the vector."
  },
  {
    id: "b3",
    module: 3,
    title: "3. Enums, Pattern Matching & No More Null Pointer Crashes",
    subtitle: "Why billion-dollar software crashes don't happen in Rust",
    analogy: "The inventor of 'null' called it his 'billion-dollar mistake' because programs constantly crash when they try to read something that turns out to be null/nil. Rust completely banned null! Instead, imagine an Amazon package: it either contains an item (Some(item)) or the box is empty (None). You are forced to open the box before you can use the item.",
    explanation: "Rust uses `Option<T>` when a value might not exist, and `Result<T, E>` when an operation might fail (like reading a file or making a network request). The compiler forces you to handle both success and failure with the `match` keyword. It is impossible to forget to handle an error!",
    codeSnippet: `enum ConnectionStatus {
    Connected(String),       // Holds an IP address
    Disconnected { reason: String },
    Connecting,
}

fn check_wallet_balance(user_id: u32) -> Option<u64> {
    if user_id == 1 {
        Some(1_500_000) // 1.5M tokens
    } else {
        None // User doesn't exist!
    }
}

fn main() {
    let balance = check_wallet_balance(1);

    // Pattern matching forces you to handle both cases:
    match balance {
        Some(amount) => println!("User has {} tokens!", amount),
        None => println!("Account not found. Please register."),
    }

    let status = ConnectionStatus::Connected(String::from("192.168.1.100"));
    match status {
        ConnectionStatus::Connected(ip) => println!("Online via {}", ip),
        ConnectionStatus::Disconnected { reason } => println!("Offline: {}", reason),
        ConnectionStatus::Connecting => println!("Dialing server..."),
    }
}`,
    commonPitfalls: [
      "Using `.unwrap()` everywhere in production code instead of handling `None` or `Err` with `match` or `if let`.",
      "Thinking enums in Rust are just numbers (in Rust, enums can carry rich data!)."
    ],
    handsOnTask: "Write a function `divide(a: f64, b: f64) -> Result<f64, String>` that returns `Err(\"Cannot divide by zero\")` if b is 0.0, or `Ok(a / b)` otherwise."
  },
  {
    id: "b4",
    module: 4,
    title: "4. Structs, Methods & Object-Oriented Without the Chaos",
    subtitle: "Organizing your data and logic cleanly with data-oriented design",
    analogy: "In other languages, inheritance hierarchies create giant tangled family trees where changing a parent class breaks 10 children. Rust separates data (Structs) from behavior (Traits). Think of a struct as a blueprint of a robot's hardware, and a trait as a plug-and-play skill cartridge.",
    explanation: "A `struct` groups related data together. You add methods using an `impl` block. Rust encourages composition over inheritance, resulting in code that is easier to test, refactor, and reason about.",
    codeSnippet: `// Define custom data structure
struct CryptoWallet {
    address: String,
    balance_sol: f64,
    is_frozen: bool,
}

// Attach functions and methods to the struct
impl CryptoWallet {
    // Constructor function
    fn new(address: String) -> Self {
        CryptoWallet {
            address,
            balance_sol: 0.0,
            is_frozen: false,
        }
    }

    // Method that borrows &self (reads data)
    fn display(&self) {
        println!("Wallet: {} | Balance: {} SOL", self.address, self.balance_sol);
    }

    // Method that borrows &mut self (modifies data)
    fn deposit(&mut self, amount: f64) -> Result<(), String> {
        if self.is_frozen {
            return Err("Wallet is frozen by security policy!".to_string());
        }
        self.balance_sol += amount;
        Ok(())
    }
}

fn main() {
    let mut my_wallet = CryptoWallet::new("8xzt...sol".to_string());
    my_wallet.deposit(25.5).unwrap();
    my_wallet.display();
}`,
    commonPitfalls: [
      "Looking for class inheritance (`class Dog extends Animal`); instead, use Traits in Rust!",
      "Forgetting to mark `&mut self` when a method needs to alter struct fields."
    ],
    handsOnTask: "Create a `Drone` struct with fields `battery_level: u8`, `altitude_meters: f32`, and implement methods `take_off()` and `land()`."
  },
  {
    id: "b5",
    module: 5,
    title: "5. Traits & Generics: Write Code Once, Run for Any Type",
    subtitle: "Zero-cost abstractions: maximum flexibility with zero runtime overhead",
    analogy: "Think of an electrical outlet standard (Type C or Type G). Anything that implements the standard plug can receive electricity—whether it's a toaster, laptop, or tesla charger. In Rust, a Trait is that plug standard.",
    explanation: "Traits define shared behavior. If a type implements a trait, generic functions can accept it. Rust uses 'monomorphization' during compilation: it generates specialized machine code for each type used, which means trait-based abstractions have ZERO speed penalty at runtime compared to handwritten code.",
    codeSnippet: `// Define a Trait (interface / contract)
trait Encryptable {
    fn encrypt(&self, secret_key: u32) -> Vec<u8>;
}

struct Password(String);
struct CreditCard { number: u64, cvv: u16 }

impl Encryptable for Password {
    fn encrypt(&self, key: u32) -> Vec<u8> {
        self.0.bytes().map(|b| b ^ (key as u8)).collect()
    }
}

// Generic function: accepts ANY type T as long as T implements Encryptable
fn transmit_secure_payload<T: Encryptable>(payload: &T, key: u32) {
    let scrambled = payload.encrypt(key);
    println!("Transmitting {} scrambled bytes over wire...", scrambled.len());
}

fn main() {
    let pass = Password("SuperSecret123".to_string());
    transmit_secure_payload(&pass, 42);
}`,
    commonPitfalls: [
      "Confusing generic traits (`<T: Trait>`) with dynamic dispatch trait objects (`&dyn Trait`).",
      "Writing overly complex trait bounds early when simple structs would do."
    ],
    handsOnTask: "Create a `Summary` trait with method `summarize(&self) -> String` and implement it for a `BlogPost` struct and a `Tweet` struct."
  },
  {
    id: "b6",
    module: 6,
    title: "6. Concurrency Without Fear: Multi-Threading & Channels",
    subtitle: "Harness every CPU core without data races or intermittent deadlocks",
    analogy: "In other languages, two threads trying to write to the same memory cell is like two people grabbing the same steering wheel simultaneously—a catastrophic crash. Rust's type system has two special traits: `Send` (safe to move to another thread) and `Sync` (safe to share between threads). The compiler refuses to compile your code if a thread race is possible!",
    explanation: "Rust provides high-level concurrency models: message passing with channels (MPSC: Multi-Producer, Single-Consumer), and shared state protected by thread-safe atomics (`Arc` + `Mutex`).",
    codeSnippet: `use std::sync::mpsc; // Multi-producer, single-consumer channel
use std::thread;
use std::time::Duration;

fn main() {
    // Create a message pipeline (transmitter, receiver)
    let (tx, rx) = mpsc::channel();

    // Spawn a background worker thread
    thread::spawn(move || {
        let sensor_readings = vec![23.4, 24.1, 23.9, 25.2];
        for reading in sensor_readings {
            tx.send(reading).unwrap(); // send reading down channel
            thread::sleep(Duration::from_millis(50));
        }
    });

    // Main thread consumes messages as they arrive
    for received in rx {
        println!("Telemetry Processor got: {} °C", received);
    }
}`,
    commonPitfalls: [
      "Using standard `Rc<T>` across threads instead of `Arc<T>` (Atomic Reference Counter).",
      "Holding a `MutexGuard` lock across an `.await` boundary in asynchronous code."
    ],
    handsOnTask: "Spawn 3 worker threads that each compute a partial sum of numbers and send their results back to the main thread via an MPSC channel."
  },
  {
    id: "b7",
    module: 7,
    title: "7. Async Rust & The Tokio Runtime",
    subtitle: "Handling millions of concurrent network connections on a single machine",
    analogy: "Synchronous code is like a chef who puts a cake in the oven and stands frozen for 45 minutes staring at it before chopping vegetables. Asynchronous code is a chef who puts the cake in the oven, sets a timer, chops onions, prepares the sauce, and checks the cake only when notified.",
    explanation: "In Rust, an `async fn` returns a `Future`. A Future does nothing until you `.await` it or poll it in an async runtime (like Tokio). This enables non-blocking I/O capable of handling 500,000+ web sockets, RPC calls, or crypto feeds simultaneously on modest hardware.",
    codeSnippet: `// In Cargo.toml: tokio = { version = "1", features = ["full"] }
// #[tokio::main] sets up the async worker threadpool
/*
#[tokio::main]
async fn main() {
    println!("Fetching distributed telemetry...");

    // Spawn concurrent async tasks
    let task1 = tokio::spawn(async {
        fetch_sensor("Sensor-Alpha").await
    });
    
    let task2 = tokio::spawn(async {
        fetch_sensor("Sensor-Beta").await
    });

    let (r1, r2) = tokio::join!(task1, task2);
    println!("Readings: {:?}, {:?}", r1.unwrap(), r2.unwrap());
}

async fn fetch_sensor(id: &str) -> String {
    // Simulating non-blocking network delay
    tokio::time::sleep(std::time::Duration::from_millis(100)).await;
    format!("{} online", id)
}
*/
fn main() {
    println!("Async futures run cooperatively using executors like Tokio!");
}`,
    commonPitfalls: [
      "Putting heavy CPU-bound math inside an async function (this blocks the async event loop; use `tokio::task::spawn_blocking` instead!).",
      "Calling blocking standard library `std::fs` or `std::thread::sleep` instead of `tokio::fs` or `tokio::time::sleep`."
    ],
    handsOnTask: "Set up a Tokio project and use `reqwest` to make 5 concurrent HTTP GET requests to a public API and measure the total elapsed time."
  }
];
