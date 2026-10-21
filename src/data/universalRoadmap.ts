export interface UniversalMilestone {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  eli5: string; // Plain English for beginners
  whyEveryAreaNeedsThis: string;
  coreConcepts: string[];
  codeExample: {
    title: string;
    description: string;
    code: string;
  };
  exercise: {
    task: string;
    hint: string;
  };
  estimatedTime: string;
}

export const UNIVERSAL_ROADMAP: UniversalMilestone[] = [
  {
    id: "univ-1",
    stepNumber: 1,
    title: "Toolchain, Syntax & Thinking in Rust",
    subtitle: "Setting up your environment and adopting the compiler-checked mindset",
    eli5: "In most languages, if you make a silly mistake, your program crashes while running. In Rust, the compiler acts like a super-smart pair programmer who checks your work before it runs and won't let you build until your code is bulletproof.",
    whyEveryAreaNeedsThis: "Whether writing smart contracts, operating systems, or cloud servers, every Rust engineer uses `rustup`, `cargo`, and the same core syntax rules.",
    coreConcepts: [
      "Installing Rust with `rustup` (`rustc`, `cargo`, `rustfmt`, `clippy`)",
      "Immutability by default (`let` vs `let mut`)",
      "Primitive types: integers (`u8`–`u128`, `i8`–`i128`), floats (`f32`, `f64`), bools, chars",
      "Functions, expressions vs statements, and control flow (`if`, `loop`, `while`, `for`)"
    ],
    codeExample: {
      title: "Rust Syntax & Control Flow Essentials",
      description: "Demonstrates immutability, type inference, and expressions.",
      code: `fn main() {
    println!("Welcome to Universal Rust Mastery!");

    // Immutability: Variables cannot change unless marked 'mut'
    let core_frequency_mhz = 3600;
    let mut temperature_celsius = 45.2;
    temperature_celsius += 5.0; // OK: marked 'mut'

    // In Rust, 'if' is an expression that returns a value!
    let fan_status = if temperature_celsius > 48.0 {
        "High Performance Cooling"
    } else {
        "Silent Mode"
    };

    println!("Clock: {} MHz | Status: {}", core_frequency_mhz, fan_status);
}`
    },
    exercise: {
      task: "Write a function `calculate_power(voltage: f64, current: f64) -> f64` and print power in Watts using formatted strings.",
      hint: "Multiply voltage by current and return the expression without a semicolon."
    },
    estimatedTime: "4–6 hours"
  },
  {
    id: "univ-2",
    stepNumber: 2,
    title: "Memory Anatomy: Stack vs. Heap & The Ownership Model",
    subtitle: "How Rust manages computer memory with zero runtime garbage collection",
    eli5: "Think of computer memory like a desk (Stack) and a warehouse (Heap). The desk is lightning-fast but small. The warehouse has infinite space but takes longer to access. Rust automatically knows the exact second an item is no longer needed on your desk or in your warehouse and cleans it up instantly without pausing your program.",
    whyEveryAreaNeedsThis: "Ownership is the core innovation of Rust. Understanding Move Semantics prevents memory leaks in kernels, crypto contracts, and high-frequency trading.",
    coreConcepts: [
      "The Stack (fixed size, ultra-fast LIFO) vs The Heap (dynamic allocation, pointers)",
      "The Three Rules of Ownership: 1 value = 1 owner, only 1 owner at a time, drop on exit",
      "Move semantics vs Copy semantics (types that implement the `Copy` trait like integers)"
    ],
    codeExample: {
      title: "Ownership & Move Semantics in Action",
      description: "Illustrates passing ownership and automatic deterministic deallocation.",
      code: `fn main() {
    // String data lives on the HEAP; the pointer lives on the STACK
    let original_record = String::from("Sensitive Cryptographic Key");

    // PASSING OWNERSHIP: original_record is 'moved' into process_record
    process_record(original_record);

    // println!("{}", original_record); 
    // ^ COMPILE-TIME ERROR: Rust prevents you from using data that was moved!
}

fn process_record(data: String) {
    println!("Processing: {}", data);
} // 'data' goes out of scope here: Rust instantly frees its heap memory!`
    },
    exercise: {
      task: "Experiment by passing an integer (`i32`) to a function, and see why you can still use it afterwards (because integers implement `Copy`).",
      hint: "`let x = 42; func(x); println!(\"{}\", x);` compiles successfully."
    },
    estimatedTime: "6–8 hours"
  },
  {
    id: "univ-3",
    stepNumber: 3,
    title: "Borrowing Rules, References & Lifetimes",
    subtitle: "Shared reads, exclusive writes, and eliminating data races at compile time",
    eli5: "Instead of giving away ownership of your notebook, you let a friend read it over your shoulder (Borrowing). The golden rule: 100 people can read the notebook at once, OR exactly 1 person can write in it. Never both at the same time. This simple rule makes thread collisions impossible.",
    whyEveryAreaNeedsThis: "Data races cause 70% of concurrency bugs in C/C++. Rust's borrow checker enforces 'Aliasing XOR Mutability' across all systems.",
    coreConcepts: [
      "Immutable references (`&T`) vs Mutable references (`&mut T`)",
      "The Fundamental Law: Multiple readers XOR exactly one writer",
      "Lifetime annotations (`'a`) proving to the compiler that references will never dangle"
    ],
    codeExample: {
      title: "Safe Borrowing & Lifetimes",
      description: "Shows how Rust enforces non-aliased mutation and reference validity.",
      code: `fn main() {
    let mut sensor_log = vec![101, 104, 102];

    // Immutable borrows (multiple readers OK)
    let reading1 = &sensor_log[0];
    let reading2 = &sensor_log[1];
    println!("Readings: {}, {}", reading1, reading2);

    // Mutable borrow (exclusive writer)
    add_sensor_sample(&mut sensor_log, 108);
    println!("Updated Log: {:?}", sensor_log);
}

fn add_sensor_sample(log: &mut Vec<i32>, sample: i32) {
    log.push(sample); // modifying the borrowed vector
}`
    },
    exercise: {
      task: "Write a function `first_element<'a>(slice: &'a [i32]) -> Option<&'a i32>` that returns a reference to the first item without cloning.",
      hint: "Use slice pattern matching or `.first()`."
    },
    estimatedTime: "8–10 hours"
  },
  {
    id: "univ-4",
    stepNumber: 4,
    title: "Data Modeling, Pattern Matching & Error Handling",
    subtitle: "Eliminating Null pointer exceptions forever with Structs, Enums, Option and Result",
    eli5: "In other languages, missing data or unexpected errors cause programs to crash with 'NullPointerException'. Rust completely deleted 'Null'! Instead, values are wrapped in boxes: `Option` (contains `Some(value)` or `None`), and `Result` (contains `Ok(value)` or `Err(error)`). You cannot touch the data until you safely handle both cases.",
    whyEveryAreaNeedsThis: "Aerospace rockets, banking engines, and Web3 contracts cannot afford unhandled crashes. Rust forces explicit, elegant error handling.",
    coreConcepts: [
      "Structs (named fields, tuple structs, zero-sized types)",
      "Tagged Enums (enums holding rich data payloads)",
      "Pattern matching with `match`, `if let`, and guard expressions",
      "Error propagation with `Result<T, E>` and the `?` operator"
    ],
    codeExample: {
      title: "Robust Error Handling with Result and Enums",
      description: "Demonstrates pattern matching and error propagation without crashes.",
      code: `enum NetworkDevice {
    Ethernet { speed_mbps: u32, ip: String },
    Wireless { signal_dbm: i32 },
    Disconnected,
}

fn connect_device(dev: NetworkDevice) -> Result<String, String> {
    match dev {
        NetworkDevice::Ethernet { speed_mbps, ip } if speed_mbps >= 1000 => {
            Ok(format!("Gigabit link established at {}", ip))
        }
        NetworkDevice::Ethernet { ip, .. } => {
            Ok(format!("Standard link at {}", ip))
        }
        NetworkDevice::Wireless { signal_dbm } if signal_dbm < -85 => {
            Err(String::from("Signal too weak for reliable transmission"))
        }
        NetworkDevice::Wireless { .. } => Ok(String::from("WiFi connected")),
        NetworkDevice::Disconnected => Err(String::from("No cable or radio detected")),
    }
}`
    },
    exercise: {
      task: "Write a function `safe_divide(numerator: f64, denominator: f64) -> Result<f64, String>` and use the `?` operator in a caller function.",
      hint: "Return `Err(\"Division by zero\".into())` if denominator == 0.0."
    },
    estimatedTime: "8–10 hours"
  },
  {
    id: "univ-5",
    stepNumber: 5,
    title: "Iterators, Closures & Functional Data Pipelines",
    subtitle: "Writing expressive, high-speed data pipelines with zero runtime overhead",
    eli5: "Instead of writing tedious loops with counters (`for i = 0; i < n; i++`), Rust lets you chain transformations like an assembly line: take data, filter out bad items, transform them, and collect results. The compiler optimizes this into raw assembly as fast as handwritten C loops.",
    whyEveryAreaNeedsThis: "Whether processing network packets, sensor readings, or financial order ticks, iterators are the standard idiom in professional Rust.",
    coreConcepts: [
      "The `Iterator` trait and lazy evaluation (nothing happens until consumed)",
      "Iterator adaptors: `map`, `filter`, `take`, `zip`, `enumerate`",
      "Iterator consumers: `collect`, `sum`, `fold`, `any`, `all`",
      "Closures (anonymous functions) and capture modes (`Fn`, `FnMut`, `FnOnce`)"
    ],
    codeExample: {
      title: "Functional Data Transformation with Iterators",
      description: "Filters and transforms data cleanly with zero allocation overhead.",
      code: `fn main() {
    let telemetry_readings = vec![12, 85, -4, 92, 105, 43];

    // Clean pipeline: filter valid positive readings, convert to Fahrenheit, collect
    let fahrenheit_readings: Vec<f64> = telemetry_readings
        .into_iter()
        .filter(|&celsius| celsius >= 0) // discard faulty sensor spikes
        .map(|celsius| (celsius as f64) * 1.8 + 32.0)
        .collect();

    println!("Converted readings: {:?}", fahrenheit_readings);
}`
    },
    exercise: {
      task: "Given a list of words, use iterators to count how many words have more than 5 characters and start with the letter 'R'.",
      hint: "Use `.filter(|w| w.starts_with('R') && w.len() > 5).count()`."
    },
    estimatedTime: "6–8 hours"
  },
  {
    id: "univ-6",
    stepNumber: 6,
    title: "Traits, Generics & Zero-Cost Polymorphism",
    subtitle: "Architecting flexible, reusable systems without object-oriented bloat",
    eli5: "Think of an electrical socket standard. Anything with the matching plug can draw electricity. In Rust, a Trait is that plug standard. Generics let you write a function once, and Rust automatically stamps out tailored, lightning-fast machine code for every type you plug in.",
    whyEveryAreaNeedsThis: "Rust does not use traditional class inheritance. Traits are how you define interfaces, plugins, and shared behaviors across every library in the ecosystem.",
    coreConcepts: [
      "Defining traits and implementing them on structs",
      "Generic functions and trait bounds (`<T: Serialize + Clone>`)",
      "Monomorphization (compile-time code generation for zero runtime cost)",
      "Static dispatch vs Dynamic dispatch (`impl Trait` vs `&dyn Trait`)"
    ],
    codeExample: {
      title: "Trait-Based Architecture in Rust",
      description: "Demonstrates generic contracts implemented across diverse types.",
      code: `// Define a trait contract
pub trait TelemetrySource {
    fn read_sensor_id(&self) -> u32;
    fn read_metric(&self) -> f32;
}

pub struct TemperatureProbe { pub id: u32, pub current_temp: f32 }
pub struct PressureSensor { pub id: u32, pub psi: f32 }

impl TelemetrySource for TemperatureProbe {
    fn read_sensor_id(&self) -> u32 { self.id }
    fn read_metric(&self) -> f32 { self.current_temp }
}

impl TelemetrySource for PressureSensor {
    fn read_sensor_id(&self) -> u32 { self.id }
    fn read_metric(&self) -> f32 { self.psi }
}

// Generic function: accepts ANY type implementing TelemetrySource with zero runtime penalty!
pub fn log_telemetry<T: TelemetrySource>(sensor: &T) {
    println!("Sensor #{}: Metric = {:.2}", sensor.read_sensor_id(), sensor.read_metric());
}`
    },
    exercise: {
      task: "Create a `Describable` trait with `fn describe(&self) -> String` and implement it for a `Car` and `Airplane` struct.",
      hint: "Call `log_item(&my_car)` using a generic function with a trait bound."
    },
    estimatedTime: "10–12 hours"
  },
  {
    id: "univ-7",
    stepNumber: 7,
    title: "Concurrency: Threads, Atomics & Message Passing",
    subtitle: "Fearless concurrency: multi-core programming without data races",
    eli5: "In C++, two threads trying to write to the same memory is like two drivers steering the same car simultaneously—disaster. In Rust, the compiler literally refuses to compile if a thread race is possible. You safely share data using locks or send messages across thread channels like postal mail.",
    whyEveryAreaNeedsThis: "Every modern computer has multi-core CPUs. Rust's `Send` and `Sync` traits mathematically prove thread safety at compile time.",
    coreConcepts: [
      "Spawning OS threads with `std::thread::spawn`",
      "Message passing with MPSC channels (Multi-Producer, Single-Consumer)",
      "Shared state concurrency: `Arc<T>` (Atomic Reference Counter) + `Mutex<T>`",
      "The `Send` and `Sync` marker traits"
    ],
    codeExample: {
      title: "Thread-Safe Shared State with Arc & Mutex",
      description: "Safely updates shared counters across multiple concurrent worker threads.",
      code: `use std::sync::{Arc, Mutex};
use std::thread;

fn main() {
    // Arc allows multiple threads to own references; Mutex guarantees exclusive access
    let shared_counter = Arc::new(Mutex::new(0));
    let mut thread_handles = vec![];

    for _ in 0..5 {
        let counter_clone = Arc::clone(&shared_counter);
        let handle = thread::spawn(move || {
            let mut num = counter_clone.lock().unwrap();
            *num += 1; // Safely increment counter inside lock
        });
        thread_handles.push(handle);
    }

    // Wait for all threads to finish
    for handle in thread_handles {
        handle.join().unwrap();
    }

    println!("Final Counter Value: {}", *shared_counter.lock().unwrap());
}`
    },
    exercise: {
      task: "Create a worker pipeline where 3 threads compute squares of numbers and send them over an `mpsc::channel` to a collector thread.",
      hint: "Clone the `Sender` for each spawned worker thread."
    },
    estimatedTime: "10–12 hours"
  },
  {
    id: "univ-8",
    stepNumber: 8,
    title: "Asynchronous Foundations & The Tokio Runtime",
    subtitle: "Scaling to millions of concurrent network events with cooperative multitasking",
    eli5: "Spawning 100,000 OS threads will crash your operating system. Asynchronous Rust lets a single CPU core juggle 100,000 active web connections or crypto feeds by doing work whenever data arrives and pausing tasks cooperatively without wasting memory.",
    whyEveryAreaNeedsThis: "Web3 RPC nodes, cloud microservices, and financial gateways rely heavily on Tokio for non-blocking I/O.",
    coreConcepts: [
      "The `Future` trait and cooperative polling",
      "The `async` keyword and `.await` points",
      "The Tokio asynchronous executor and task scheduling (`tokio::spawn`)",
      "Async channels (`tokio::sync::mpsc`) and timeouts (`tokio::time::sleep`)"
    ],
    codeExample: {
      title: "Asynchronous Concurrency with Tokio",
      description: "Runs multiple network requests concurrently without blocking threads.",
      code: `use tokio::time::{sleep, Duration};

#[tokio::main]
async fn main() {
    println!("Launching concurrent asynchronous workers...");

    let task_alpha = tokio::spawn(async {
        sleep(Duration::from_millis(50)).await;
        "Sensor Alpha Online"
    });

    let task_beta = tokio::spawn(async {
        sleep(Duration::from_millis(30)).await;
        "Sensor Beta Online"
    });

    // Await both tasks concurrently
    let (res_a, res_b) = tokio::join!(task_alpha, task_beta);
    println!("Readings: {}, {}", res_a.unwrap(), res_b.unwrap());
}`
    },
    exercise: {
      task: "Write an async function that fetches data with a 1-second timeout using `tokio::time::timeout`.",
      hint: "Handle `Ok(data)` vs `Err(_elapsed)`."
    },
    estimatedTime: "10–14 hours"
  }
];
