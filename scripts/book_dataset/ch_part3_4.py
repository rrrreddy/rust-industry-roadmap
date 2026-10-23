# Chapters 7 to 12
def get_chapters_7_to_12():
    return [
        {
            "chapterNumber": 7,
            "title": "Chapter 7: Managing Growing Projects with Packages, Crates, and Modules",
            "part": "Part III: Code Organization, Collections & Error Handling",
            "subtitle": "Packages, Crates, Modules, Paths, and Encapsulation with pub",
            "estimatedReadingMinutes": 35,
            "importance": "Crucial",
            "thirdEditionNote": "Clarified module path resolution rules for Rust 2024 Edition and modern file layout conventions (preferring mod_name.rs over mod_name/mod.rs).",
            "sections": [
                {
                    "sectionNumber": "7.1",
                    "title": "Packages and Crates: Compilation Units",
                    "summary": "Understanding the difference between binary crates, library crates, and Cargo packages.",
                    "hardwareOrTheoryReality": "A crate is the smallest compilation unit recognized by rustc. When rustc compiles a crate, it processes the entire AST graph together, enabling aggressive cross-function inlining and Whole Program Optimization (LTO) across module boundaries within that crate.",
                    "keyPoints": [
                        "A package is defined by a Cargo.toml file and can contain zero or one library crate and any number of binary crates.",
                        "src/main.rs is the root of the binary crate with the same name as the package.",
                        "src/lib.rs is the root of the library crate.",
                        "Additional binaries go into src/bin/*.rs."
                    ],
                    "codeExample": {
                        "title": "Cargo Package File Hierarchy",
                        "code": "my_project/\n├── Cargo.toml\n├── src/\n│   ├── lib.rs       # Library crate root\n│   ├── main.rs      # Default binary root\n│   └── bin/\n│       └── admin.rs # Secondary binary crate",
                        "explanation": "Standard package structure housing both a reusable library crate and runnable binary executables."
                    }
                },
                {
                    "sectionNumber": "7.2",
                    "title": "Defining Modules to Control Scope and Privacy",
                    "summary": "Organizing code hierarchically with `mod` and setting encapsulation boundaries with `pub`.",
                    "hardwareOrTheoryReality": "Privacy in Rust is checked strictly at compile time. In machine code, all functions have symbols (or are inlined); privacy boundaries enforce architectural invariants without any runtime execution penalty.",
                    "keyPoints": [
                        "Items in Rust (functions, structs, enums, modules) are private to their parent module by default.",
                        "The pub keyword exposes an item to ancestor modules and external consumers.",
                        "Struct fields are private by default even if the struct itself is marked pub.",
                        "Enum variants are automatically public if the enum is pub."
                    ],
                    "codeExample": {
                        "title": "Module Tree & Privacy Scopes",
                        "code": "mod front_of_house {\n    pub mod hosting {\n        pub fn add_to_waitlist() {}\n        fn seat_at_table() {} // Private to hosting\n    }\n}\n\npub fn eat_at_restaurant() {\n    // Absolute path\n    crate::front_of_house::hosting::add_to_waitlist();\n    // Relative path\n    front_of_house::hosting::add_to_waitlist();\n}",
                        "explanation": "Demonstrates absolute paths starting from crate root and relative paths traversing down public modules."
                    }
                },
                {
                    "sectionNumber": "7.3",
                    "title": "Bringing Paths into Scope with the use Keyword",
                    "summary": "Using `use`, nested paths, glob operators, and re-exporting with `pub use`.",
                    "hardwareOrTheoryReality": "The `pub use` idiom (re-exporting) decouples internal crate implementation layout from external public API surface, stabilizing your ABI while allowing internal refactoring.",
                    "keyPoints": [
                        "Bringing a path into scope with use creates a shortcut alias in the current lexical scope.",
                        "Idiomatic convention: bring functions into scope by their parent module, but bring structs/enums directly.",
                        "pub use re-exports an item, making it available at the new location for downstream crates.",
                        "Nested use statements: use std::io::{self, Write}; cleans up imports."
                    ],
                    "codeExample": {
                        "title": "Re-exporting Public APIs",
                        "code": "mod front_of_house {\n    pub mod hosting {\n        pub fn add_to_waitlist() {}\n    }\n}\n\n// Re-export hosting so callers can access it directly at the root\npub use crate::front_of_house::hosting;\n\nfn main() {\n    hosting::add_to_waitlist();\n}",
                        "explanation": "pub use allows consumers of the library to call hosting::add_to_waitlist directly without knowing the internal module structure."
                    }
                }
            ],
            "pitfallsToAvoid": [
                "Using the outdated mod.rs style in new projects when name.rs is preferred in modern Rust.",
                "Expecting struct fields to be public when marking `pub struct Foo`; each field must be explicitly marked `pub`."
            ],
            "knowledgeCheck": {
                "question": "If an enum is declared as `pub enum Status { Active, Inactive }`, what is the privacy of its variants?",
                "options": [
                    "They are private unless each variant is explicitly annotated with pub.",
                    "All variants are public automatically because an enum's primary utility is matching across all its variants.",
                    "They can only be accessed within the defining file.",
                    "The compiler raises a syntax error unless pub(crate) is used."
                ],
                "correctIndex": 1,
                "explanation": "Unlike structs where fields default to private, enum variants in a pub enum are inherently public because destructuring and pattern matching require visibility of all variants."
            }
        },
        {
            "chapterNumber": 8,
            "title": "Chapter 8: Common Collections",
            "part": "Part III: Code Organization, Collections & Error Handling",
            "subtitle": "Vectors (Vec<T>), UTF-8 Strings (String & &str), and Hash Maps (HashMap<K, V>)",
            "estimatedReadingMinutes": 45,
            "importance": "Crucial",
            "thirdEditionNote": "Expanded coverage of UTF-8 memory layouts, zero-allocation slicing, and hash table collision security using SipHash-1-3.",
            "sections": [
                {
                    "sectionNumber": "8.1",
                    "title": "Storing Lists of Values with Vectors",
                    "summary": "Contiguous, dynamically-sized heap arrays with automatic reallocation.",
                    "hardwareOrTheoryReality": "A Vec<T> is a stack struct containing 3 machine words: a heap pointer (8 bytes on 64-bit), length (8 bytes), and capacity (8 bytes) = 24 bytes total. When capacity is exceeded, it reallocates with a 2x growth factor, invoking memcpy or mremap.",
                    "keyPoints": [
                        "Vec<T> elements are stored contiguously in memory for maximum L1/L2 cache locality.",
                        "vec![1, 2, 3] is a macro convenience for Vec::new() followed by pushes.",
                        "Indexing with v[i] panics on out-of-bounds; v.get(i) returns an Option<&T>.",
                        "Pushing to a vector invalidates existing references if a reallocation occurs."
                    ],
                    "codeExample": {
                        "title": "Vector Operations & Bounds Checking",
                        "code": "let mut v: Vec<i32> = Vec::with_capacity(4); // Preallocate 4 elements\nv.push(10);\nv.push(20);\n\n// Safe indexing with get:\nmatch v.get(2) {\n    Some(third) => println!(\"Third: {third}\"),\n    None => println!(\"No third element exists\"),\n}",
                        "explanation": "Preallocating capacity eliminates reallocation overhead; get() provides safe bounds-checked access."
                    }
                },
                {
                    "sectionNumber": "8.2",
                    "title": "Storing UTF-8 Encoded Text with Strings",
                    "summary": "Understanding String vs &str, UTF-8 scalar values, grapheme clusters, and why indexing strings is forbidden.",
                    "hardwareOrTheoryReality": "A String is a wrapper around Vec<u8> guaranteed to be valid UTF-8. Because UTF-8 is a variable-length encoding (1 to 4 bytes per code point), direct indexing like s[0] cannot run in O(1) time without scanning preceding bytes. Therefore, Rust forbids direct byte indexing on strings to uphold algorithmic performance guarantees.",
                    "keyPoints": [
                        "String owns its heap buffer; &str is an immutable borrowed slice pointing to any valid UTF-8 byte sequence.",
                        "Never index into strings with s[0]; use .chars() or .bytes() explicitly.",
                        "String concatenation with + consumes the left operand via add(self, s: &str) using Deref coercion.",
                        "The format! macro concatenates strings without taking ownership of arguments."
                    ],
                    "codeExample": {
                        "title": "Iterating Over Strings Safely",
                        "code": "let hello = String::from(\"Зд\"); // 2 Cyrillic characters = 4 bytes\n\n// Iterate by Unicode Scalar Values (char = 4 bytes):\nfor c in hello.chars() {\n    println!(\"{c}\");\n}\n\n// Iterate by raw UTF-8 bytes (u8 = 1 byte):\nfor b in hello.bytes() {\n    println!(\"{b:#04x}\");\n}",
                        "explanation": "Differentiates between iterating over unicode scalar values (chars) and physical bytes."
                    }
                },
                {
                    "sectionNumber": "8.3",
                    "title": "Storing Keys with Associated Values in Hash Maps",
                    "summary": "Key-value associative mapping, ownership rules, entry API, and hash functions.",
                    "hardwareOrTheoryReality": "std::collections::HashMap uses Swiss Tables (Google's HashBrown) with SIMD-accelerated metadata byte probing and SipHash 1-3 to defend against HashDoS algorithmic complexity attacks.",
                    "keyPoints": [
                        "HashMap<K, V> is not included in the standard prelude; it must be imported from std::collections::HashMap.",
                        "Keys must implement the Eq and Hash traits.",
                        "The .entry(key).or_insert(value) API provides an atomic lookup-and-insert without double hashing."
                    ],
                    "codeExample": {
                        "title": "Word Frequency Counter with Entry API",
                        "code": "use std::collections::HashMap;\n\nlet text = \"hello world wonderful world\";\nlet mut map = HashMap::new();\n\nfor word in text.split_whitespace() {\n    let count = map.entry(word).or_insert(0);\n    *count += 1;\n}\n\nprintln!(\"{map:?}\"); // {\"world\": 2, \"hello\": 1, \"wonderful\": 1}",
                        "explanation": "or_insert returns a mutable reference &mut V to the value for the key, modified in-place."
                    }
                }
            ],
            "pitfallsToAvoid": [
                "Attempting to slice a String across UTF-8 code point boundaries (e.g. &s[0..1] on a 2-byte character), which triggers an immediate runtime panic.",
                "Borrow checker errors caused by mutating a Vec while holding an active reference to one of its elements."
            ],
            "knowledgeCheck": {
                "question": "Why does Rust forbid direct integer indexing on strings like my_string[0]?",
                "options": [
                    "Because strings are allocated on the stack where indexing is unsupported.",
                    "Because UTF-8 characters have variable length (1-4 bytes), so O(1) random character access is impossible without scanning from index 0.",
                    "Because Rust strings are null-terminated arrays like C strings.",
                    "Because indexing strings causes hardware memory alignment faults."
                ],
                "correctIndex": 1,
                "explanation": "In UTF-8, characters vary between 1 and 4 bytes. An index could land in the middle of a multi-byte sequence, yielding invalid unicode, and determining the nth character would require an O(n) walk."
            }
        },
        {
            "chapterNumber": 9,
            "title": "Chapter 9: Error Handling",
            "part": "Part III: Code Organization, Collections & Error Handling",
            "subtitle": "Unrecoverable Errors with panic!, Recoverable Errors with Result<T, E>, and the ? Operator",
            "estimatedReadingMinutes": 40,
            "importance": "Crucial",
            "thirdEditionNote": "Covers modern error conversion practices, backtrace inspection via RUST_BACKTRACE=1, and best practices for creating domain error types.",
            "sections": [
                {
                    "sectionNumber": "9.1",
                    "title": "Unrecoverable Errors with panic!",
                    "summary": "When program state is hopelessly corrupted: stack unwinding vs aborting.",
                    "hardwareOrTheoryReality": "By default, panic! initiates stack unwinding: the runtime walks back up the call stack, invoking destructors (drop()) on every active stack frame to prevent resource leaks. In embedded or performance-critical environments, panic = 'abort' can be set in Cargo.toml to terminate the process immediately via SIGABRT, shrinking binary size.",
                    "keyPoints": [
                        "panic! is reserved for bugs where an invariant has been violated.",
                        "Environment variable RUST_BACKTRACE=1 prints full stack traces pointing to exact file lines.",
                        "Panic can unwind (default) or abort immediately."
                    ],
                    "codeExample": {
                        "title": "Triggering a Panic",
                        "code": "fn verify_server_port(port: u16) {\n    if port == 0 {\n        panic!(\"Invalid server configuration: port 0 is reserved\");\n    }\n}",
                        "explanation": "Direct panic invocation when an unrecoverable invariant is breached."
                    }
                },
                {
                    "sectionNumber": "9.2",
                    "title": "Recoverable Errors with Result<T, E>",
                    "summary": "Explicit error handling without runtime exceptions using algebraic types.",
                    "hardwareOrTheoryReality": "Unlike Java or C++ exceptions which incur dynamic runtime stack walking tables and unwinding costs upon throw, Result<T, E> is a plain tagged union passed directly in CPU registers (RAX/RDX) or on the stack frame. Error propagation is as fast as a standard function return.",
                    "keyPoints": [
                        "Result<T, E> has two variants: Ok(T) and Err(E).",
                        "Functions that can fail must return a Result, making failure modes visible in the function signature.",
                        "unwrap() returns T on Ok or panics on Err; expect(\"msg\") adds context to the panic."
                    ],
                    "codeExample": {
                        "title": "Handling Result with Pattern Matching",
                        "code": "use std::fs::File;\nuse std::io::ErrorKind;\n\nlet greeting_file_result = File::open(\"hello.txt\");\nlet greeting_file = match greeting_file_result {\n    Ok(file) => file,\n    Err(error) => match error.kind() {\n        ErrorKind::NotFound => match File::create(\"hello.txt\") {\n            Ok(fc) => fc,\n            Err(e) => panic!(\"Problem creating file: {e:?}\"),\n        },\n        other_error => panic!(\"Problem opening file: {other_error:?}\"),\n    },\n};",
                        "explanation": "Detailed error matching inspecting the io::ErrorKind enum."
                    }
                },
                {
                    "sectionNumber": "9.3",
                    "title": "Propagating Errors: The ? Operator & From Trait",
                    "summary": "Early return of errors, implicit type conversion via From::from, and main() returning Result.",
                    "hardwareOrTheoryReality": "The ? operator expands into a match expression: if Ok(v) it yields v; if Err(e) it converts e via From::from and returns Err(From::from(e)) early from the enclosing function.",
                    "keyPoints": [
                        "The ? operator can only be used in functions that return a compatible Result, Option, or type implementing Try.",
                        "Error conversion happens automatically if the calling function's error type implements From<OriginalError>.",
                        "fn main() -> Result<(), Box<dyn std::error::Error>> allows main to use ? directly."
                    ],
                    "codeExample": {
                        "title": "Clean Error Propagation with ?",
                        "code": "use std::fs::File;\nuse std::io::{self, Read};\n\nfn read_username_from_file() -> Result<String, io::Error> {\n    let mut username = String::new();\n    File::open(\"username.txt\")?.read_to_string(&mut username)?;\n    Ok(username)\n}",
                        "explanation": "Chaining ? on open and read operations propagates any io::Error immediately."
                    }
                }
            ],
            "pitfallsToAvoid": [
                "Littering production code with .unwrap(); always use .expect(\"descriptive context\") or propagate errors with ?.",
                "Using panic! for predictable user input errors instead of returning Result."
            ],
            "knowledgeCheck": {
                "question": "What does the ? operator do when applied to an Err(e) value?",
                "options": [
                    "It ignores the error and returns a default value.",
                    "It converts e using the From trait and immediately returns Err(converted) from the enclosing function.",
                    "It prints a backtrace and halts execution.",
                    "It converts the error into an uncatchable hardware trap."
                ],
                "correctIndex": 1,
                "explanation": "When encountering Err(e), the ? operator performs an early return of Err(From::from(e)), allowing clean and idiomatic error bubbling up the call stack."
            }
        },
        {
            "chapterNumber": 10,
            "title": "Chapter 10: Generic Types, Traits, and Lifetimes",
            "part": "Part IV: Generics, Traits, Lifetimes & Testing",
            "subtitle": "Monomorphization, Trait Bounds, Default Implementations, and Static Lifetime Elision Rules",
            "estimatedReadingMinutes": 55,
            "importance": "Crucial",
            "thirdEditionNote": "Deeper explanation of monomorphization code bloat trade-offs vs runtime vtables, lifetime elision in modern 2024 idioms, and anonymous lifetimes (_).",
            "sections": [
                {
                    "sectionNumber": "10.1",
                    "title": "Generic Data Types & Monomorphization",
                    "summary": "Writing code parameterized over types for structs, enums, and functions without runtime penalty.",
                    "hardwareOrTheoryReality": "Rust implements generics via monomorphization: at compile time, the compiler generates a specialized copy of the function/struct for every concrete type used. Point<f64> and Point<i32> produce distinct assembly instructions optimized for floating-point registers (XMM) and integer registers (RAX) with ZERO runtime overhead.",
                    "keyPoints": [
                        "Generics allow writing flexible, reusable code without duplicating logic.",
                        "Monomorphization compiles generic code into concrete machine code for each type.",
                        "Zero runtime performance cost: generic Rust code runs at the exact same speed as hand-written specific code."
                    ],
                    "codeExample": {
                        "title": "Generic Struct with Methods",
                        "code": "struct Point<T> {\n    x: T,\n    y: T,\n}\n\nimpl<T> Point<T> {\n    fn x(&self) -> &T {\n        &self.x\n    }\n}\n\nlet integer_point = Point { x: 5, y: 10 };\nlet float_point = Point { x: 1.0, y: 4.0 };",
                        "explanation": "Point is generic over type T, instantiated for both i32 and f64."
                    }
                },
                {
                    "sectionNumber": "10.2",
                    "title": "Traits: Defining Shared Behavior",
                    "summary": "Interface contracts, default implementations, trait bounds, and where clauses.",
                    "hardwareOrTheoryReality": "Trait bounds with static dispatch (impl Trait or T: Trait) enable direct inlining and instruction-level scheduling by LLVM, avoiding the indirect branch instruction pointer indirection required by dynamic dispatch.",
                    "keyPoints": [
                        "A trait tells the Rust compiler about functionality a particular type must provide.",
                        "Traits can have default method implementations that types can override or keep.",
                        "Trait bounds: fn notify(item: &impl Summary) or fn notify<T: Summary + Display>(item: &T).",
                        "where clauses provide clean syntax for complex multi-type trait bounds."
                    ],
                    "codeExample": {
                        "title": "Defining and Implementing Traits",
                        "code": "pub trait Summary {\n    fn summarize_author(&self) -> String;\n    // Default implementation:\n    fn summarize(&self) -> String {\n        format!(\"(Read more from {}...)\", self.summarize_author())\n    }\n}\n\npub struct Tweet {\n    pub username: String,\n    pub content: String,\n}\n\nimpl Summary for Tweet {\n    fn summarize_author(&self) -> String {\n        format!(\"@{}\", self.username)\n    }\n}",
                        "explanation": "Tweet implements summarize_author, automatically inheriting the default summarize method."
                    }
                },
                {
                    "sectionNumber": "10.3",
                    "title": "Validating References with Lifetimes",
                    "summary": "Lifetime annotations, borrow checker validation, and the 3 lifetime elision rules.",
                    "hardwareOrTheoryReality": "Lifetimes exist purely at compile time; they have zero representation in compiled assembly binaries. They are mathematical constraints checked by Polonius/the borrow checker to prove that every reference points to valid allocated memory for its entire active scope, preventing dangling pointers.",
                    "keyPoints": [
                        "Every reference in Rust has a lifetime: the scope for which that reference is valid.",
                        "Lifetime syntax: 'a indicates a generic lifetime parameter.",
                        "Lifetime annotations do not change how long any value lives; they describe the relationships between reference durations.",
                        "The 3 Elision Rules allow the compiler to infer lifetimes automatically on most functions without manual annotations."
                    ],
                    "codeExample": {
                        "title": "Explicit Lifetime Annotations",
                        "code": "fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {\n    if x.len() > y.len() {\n        x\n    } else {\n        y\n    }\n}\n\nlet string1 = String::from(\"long string is long\");\n{\n    let string2 = String::from(\"xyz\");\n    let result = longest(string1.as_str(), string2.as_str());\n    println!(\"The longest string is {result}\");\n}",
                        "explanation": "The returned reference is valid for the intersection (shorter lifetime) of x and y."
                    }
                }
            ],
            "pitfallsToAvoid": [
                "Attempting to return a reference to a local variable created inside the function (which drops when the function exits).",
                "Over-annotating lifetimes when Rust's built-in lifetime elision rules already handle the signature automatically."
            ],
            "knowledgeCheck": {
                "question": "What is the primary effect of monomorphization during compilation?",
                "options": [
                    "It inserts dynamic lookup tables (vtables) into every function call.",
                    "It translates generic code into specific code by generating copies for every concrete type used, producing zero-runtime-cost binaries at the expense of binary size.",
                    "It forces all types to be boxed on the heap.",
                    "It runs an interpreter at startup to determine variable types."
                ],
                "correctIndex": 1,
                "explanation": "Monomorphization generates duplicate concrete implementations at compile time. This allows Rust generics to have zero runtime overhead, though it can increase binary compilation time and binary size."
            }
        },
        {
            "chapterNumber": 11,
            "title": "Chapter 11: Writing Automated Tests",
            "part": "Part IV: Generics, Traits, Lifetimes & Testing",
            "subtitle": "Unit Tests, Integration Tests, assert Macros, Test Organization, and Test Attributes",
            "estimatedReadingMinutes": 30,
            "importance": "Crucial",
            "thirdEditionNote": "Updated documentation on cargo test flags, multi-threaded test runners, and isolating environment variables.",
            "sections": [
                {
                    "sectionNumber": "11.1",
                    "title": "How to Write Tests: Annotations and Assertions",
                    "summary": "The anatomy of a test function, assert!, assert_eq!, assert_ne!, and #[should_panic].",
                    "hardwareOrTheoryReality": "cargo test builds a specialized test runner binary that executes test functions in parallel across multiple OS worker threads. Tests that capture stdout redirect file descriptor 1 to internal buffers unless passed --nocapture.",
                    "keyPoints": [
                        "Test functions are annotated with #[test].",
                        "assert!(condition), assert_eq!(left, right), and assert_ne!(left, right) are standard assertion macros.",
                        "Custom failure messages can be formatted: assert!(false, \"Value was {val}\").",
                        "#[should_panic(expected = \"substring\")] validates that code panics under invalid conditions."
                    ],
                    "codeExample": {
                        "title": "Writing Unit Tests with Custom Errors",
                        "code": "#[cfg(test)]\nmod tests {\n    use super::*;\n\n    #[test]\n    fn test_addition() {\n        assert_eq!(2 + 2, 4);\n    }\n\n    #[test]\n    #[should_panic(expected = \"divide by zero\")]\n    fn test_panic_condition() {\n        divide_checked(10, 0);\n    }\n}",
                        "explanation": "Shows standard unit test modules conditionally compiled with #[cfg(test)]."
                    }
                },
                {
                    "sectionNumber": "11.2",
                    "title": "Controlling How Tests Run",
                    "summary": "Running tests sequentially, filtering tests by name, and showing console output.",
                    "hardwareOrTheoryReality": "Parallel test execution assumes tests are isolated and idempotent. If tests touch shared global state (like environment variables or database files), cargo test -- --test-threads=1 ensures serialized execution avoiding race conditions.",
                    "keyPoints": [
                        "cargo test runs all tests in parallel using available CPU cores.",
                        "cargo test -- --test-threads=1 runs tests sequentially.",
                        "cargo test -- --show-output displays printed output even for passing tests.",
                        "cargo test substring filters tests matching the given name pattern."
                    ],
                    "codeExample": {
                        "title": "CLI Test Execution Commands",
                        "code": "# Run all tests:\ncargo test\n\n# Filter to run only tests containing 'network':\ncargo test network\n\n# Run ignored tests:\ncargo test -- --ignored",
                        "explanation": "Command line flags for filtering and customizing test suite execution."
                    }
                },
                {
                    "sectionNumber": "11.3",
                    "title": "Test Organization: Unit vs Integration Tests",
                    "summary": "Internal unit tests in src/ with private access vs black-box integration tests in tests/ directory.",
                    "hardwareOrTheoryReality": "Unit tests reside in the same file/crate as your code and can test private functions directly. Integration tests in the `tests/` directory are compiled as separate external crates, testing your library strictly through its public interface (`pub`).",
                    "keyPoints": [
                        "Unit tests live in the same file as implementation in a #[cfg(test)] mod tests block.",
                        "Unit tests can test private functions because child modules can access parent items.",
                        "Integration tests live in the root tests/ directory and test the public API from an external consumer's perspective.",
                        "Binary crates (src/main.rs) cannot have direct integration tests in tests/ because binary crates cannot be imported via use."
                    ],
                    "codeExample": {
                        "title": "Integration Test Structure",
                        "code": "// tests/integration_test.rs\nuse my_crate::add_two;\n\n#[test]\nfn test_public_api() {\n    assert_eq!(add_two(3), 5);\n}",
                        "explanation": "An integration test located in tests/ that imports the public crate library."
                    }
                }
            ],
            "pitfallsToAvoid": [
                "Relying on shared state or disk files in parallel tests without setting --test-threads=1.",
                "Forgetting the #[cfg(test)] annotation, causing test helper code to be compiled into your release binary."
            ],
            "knowledgeCheck": {
                "question": "Why is the #[cfg(test)] annotation placed on unit test modules in Rust?",
                "options": [
                    "To tell the CPU to disable memory safety during test execution.",
                    "To instruct Cargo to only compile and include the test code when running `cargo test`, keeping it out of production release builds.",
                    "To convert all panics into normal return codes.",
                    "To force tests to run single-threaded."
                ],
                "correctIndex": 1,
                "explanation": "The #[cfg(test)] attribute ensures that the test code and any helper modules are only compiled when running cargo test, saving compile time and binary size in production release artifacts."
            }
        },
        {
            "chapterNumber": 12,
            "title": "Chapter 12: An I/O Project: Building a Command Line Program",
            "part": "Part IV: Generics, Traits, Lifetimes & Testing",
            "subtitle": "Building minigrep: Argument Parsing, File I/O, Test-Driven Development (TDD), and Environment Variables",
            "estimatedReadingMinutes": 60,
            "importance": "Crucial",
            "thirdEditionNote": "Refactored according to 3rd Edition standards: separation of concerns into Config::build, epoll/stdin/stderr differentiation, and error handling with Process::exit.",
            "sections": [
                {
                    "sectionNumber": "12.1",
                    "title": "Accepting Command Line Arguments",
                    "summary": "Reading argv strings using std::env::args and handling invalid argument counts.",
                    "hardwareOrTheoryReality": "std::env::args allocates an iterator yielding String values read from the OS process environment. If arguments contain non-valid Unicode, std::env::args panics; for arbitrary OS byte strings, std::env::args_os must be used.",
                    "keyPoints": [
                        "std::env::args() returns an iterator of strings passed to the CLI.",
                        "args[0] is the program's binary name; args[1] is the first user parameter.",
                        "Collecting into a Vec<String> is simple for beginners, but iterators are more memory efficient."
                    ],
                    "codeExample": {
                        "title": "Reading CLI Arguments",
                        "code": "use std::env;\n\nfn main() {\n    let args: Vec<String> = env::args().collect();\n    let query = &args[1];\n    let file_path = &args[2];\n    println!(\"Searching for {query} in {file_path}\");\n}",
                        "explanation": "Extracts query and file path arguments from standard command line arguments."
                    }
                },
                {
                    "sectionNumber": "12.2",
                    "title": "Refactoring: Separation of Concerns & TDD",
                    "summary": "Splitting logic between main.rs (flow control) and lib.rs (business logic) using Test-Driven Development.",
                    "hardwareOrTheoryReality": "Separating Config::build and run into lib.rs makes the core logic unit-testable without spawning an entire operating system process, speeding up CI cycles by 100x.",
                    "keyPoints": [
                        "main.rs handles argument parsing and calling run; it exits on errors using eprintln! and std::process::exit(1).",
                        "lib.rs holds the business logic, file reading, and search algorithms.",
                        "Config::build returns Result<Config, &'static str> instead of panicking on insufficient arguments.",
                        "Write a failing unit test first, then implement the minimal search logic to pass it."
                    ],
                    "codeExample": {
                        "title": "Config Parsing with Descriptive Errors",
                        "code": "pub struct Config {\n    pub query: String,\n    pub file_path: String,\n    pub ignore_case: bool,\n}\n\nimpl Config {\n    pub fn build(args: &[String]) -> Result<Config, &'static str> {\n        if args.len() < 3 {\n            return Err(\"not enough arguments: usage: minigrep <query> <file_path>\");\n        }\n        let query = args[1].clone();\n        let file_path = args[2].clone();\n        let ignore_case = std::env::var(\"IGNORE_CASE\").is_ok();\n        Ok(Config { query, file_path, ignore_case })\n    }\n}",
                        "explanation": "Constructs Config struct safely, checking parameter count and inspecting environment variables."
                    }
                },
                {
                    "sectionNumber": "12.3",
                    "title": "Writing Errors to Standard Error (stderr)",
                    "summary": "Directing diagnostic output to stderr while sending program data to stdout.",
                    "hardwareOrTheoryReality": "UNIX file descriptors split console output: file descriptor 1 (stdout) and file descriptor 2 (stderr). Using println! for errors breaks CLI piping (e.g. `minigrep foo bar.txt > output.txt`), leaking error messages into output files. eprintln! writes explicitly to stderr.",
                    "keyPoints": [
                        "println! writes to standard output (FD 1).",
                        "eprintln! writes to standard error (FD 2).",
                        "Piping redirects stdout to files or downstream commands while allowing stderr to remain visible on the operator's terminal screen."
                    ],
                    "codeExample": {
                        "title": "Writing to Standard Error",
                        "code": "use std::process;\n\nfn main() {\n    let args: Vec<String> = std::env::args().collect();\n    let config = minigrep::Config::build(&args).unwrap_or_else(|err| {\n        eprintln!(\"Problem parsing arguments: {err}\");\n        process::exit(1);\n    });\n\n    if let Err(e) = minigrep::run(config) {\n        eprintln!(\"Application error: {e}\");\n        process::exit(1);\n    }\n}",
                        "explanation": "Uses eprintln! to ensure error messages never pollute redirected stdout output."
                    }
                }
            ],
            "pitfallsToAvoid": [
                "Printing error messages using println! instead of eprintln!, which corrupts stdout pipelines.",
                "Using panic! for missing CLI arguments instead of printing a friendly usage guide and exiting with code 1."
            ],
            "knowledgeCheck": {
                "question": "Why should command-line tools use eprintln! instead of println! for error reporting?",
                "options": [
                    "Because eprintln! executes faster on multi-core processors.",
                    "Because eprintln! writes to file descriptor 2 (stderr), preventing error strings from corrupting file output when users pipe stdout to a file or another command.",
                    "Because println! cannot handle Unicode strings.",
                    "Because eprintln! automatically shuts down background threads."
                ],
                "correctIndex": 1,
                "explanation": "In standard POSIX systems, piping (> or |) only redirects standard output (FD 1). Writing errors to stderr (FD 2) ensures that errors remain visible on the terminal and do not corrupt data streams."
            }
        }
    ]
