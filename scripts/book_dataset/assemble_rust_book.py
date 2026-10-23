import json
import os
from ch_part1_2 import get_chapters_1_to_6
from ch_part3_4 import get_chapters_7_to_12
from ch_part5_6 import get_chapters_13_to_17
from ch_part7_8 import get_chapters_18_to_21_and_appendices

def assemble():
    ch1 = get_chapters_1_to_6()
    ch2 = get_chapters_7_to_12()
    ch3 = get_chapters_13_to_17()
    ch4 = get_chapters_18_to_21_and_appendices()

    all_chapters = ch1 + ch2 + ch3 + ch4
    print(f"Total chapters assembled: {len(all_chapters)}")

    parts = [
        {
            "id": "part-1",
            "name": "Part I: Getting Started & Foundations",
            "chapters": "Chapters 1 – 3",
            "description": "Installation, Cargo toolchain, guessing game project, and common language concepts (types, mutability, control flow)."
        },
        {
            "id": "part-2",
            "name": "Part II: Core Ownership, Structs & Enums",
            "chapters": "Chapters 4 – 6",
            "description": "The heart of Rust: memory ownership, stack vs heap, borrow checker rules, structs, enums, Option<T>, and match."
        },
        {
            "id": "part-3",
            "name": "Part III: Code Organization, Collections & Error Handling",
            "chapters": "Chapters 7 – 9",
            "description": "Packages, crates, modules, vectors, UTF-8 strings, hash maps, and resilient error propagation with Result and ?."
        },
        {
            "id": "part-4",
            "name": "Part IV: Generics, Traits, Lifetimes & Testing",
            "chapters": "Chapters 10 – 12",
            "description": "Monomorphization, trait bounds, borrow checker lifetime elision, automated testing, and building the minigrep I/O project."
        },
        {
            "id": "part-5",
            "name": "Part V: Functional Features & Cargo Workspaces",
            "chapters": "Chapters 13 – 14",
            "description": "Closures, Fn traits, zero-cost iterators, release profiles, doctests, and multi-crate workspace monorepos."
        },
        {
            "id": "part-6",
            "name": "Part VI: Smart Pointers, Concurrency & Asynchronous Rust",
            "chapters": "Chapters 15 – 17",
            "description": "Box/Rc/RefCell, OS threads, message-passing channels, Mutex/Arc, and the brand-new 3rd Edition Chapter 17 on Async/Await and Pin."
        },
        {
            "id": "part-7",
            "name": "Part VII: Object-Oriented Patterns & Advanced Rust",
            "chapters": "Chapters 18 – 20",
            "description": "Trait objects (dyn dispatch), refutable pattern matching, Unsafe Rust superpowers, FFI, advanced traits, and macros."
        },
        {
            "id": "part-8",
            "name": "Part VIII: Capstone Project & Reference Appendices",
            "chapters": "Chapter 21 + Appendices A – E",
            "description": "Building a multithreaded web server from scratch, keywords, operators, derivable traits, Miri UB analysis, and Rust Editions."
        }
    ]

    out_file = "src/data/theRustBook3rdEdition.ts"

    header = """// ============================================================================
// THE RUST PROGRAMMING LANGUAGE (3RD EDITION)
// By Steve Klabnik, Carol Nichols, and Chris Krycho
// Complete Chapter-by-Chapter Curriculum, Hardware Reality, and Quizzes
// ============================================================================

export interface BookSection {
  sectionNumber: string;
  title: string;
  summary: string;
  hardwareOrTheoryReality: string;
  keyPoints: string[];
  codeExample: {
    title: string;
    code: string;
    explanation: string;
  };
}

export interface BookKnowledgeCheck {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface BookChapter {
  chapterNumber: number;
  title: string;
  part: string;
  subtitle: string;
  estimatedReadingMinutes: number;
  importance: 'Foundational' | 'Crucial';
  thirdEditionNote: string;
  sections: BookSection[];
  pitfallsToAvoid: string[];
  knowledgeCheck: BookKnowledgeCheck;
}

export interface BookPart {
  id: string;
  name: string;
  chapters: string;
  description: string;
}

export const BOOK_METADATA = {
  title: "The Rust Programming Language, 3rd Edition",
  authors: "Steve Klabnik, Carol Nichols, and Chris Krycho",
  publisher: "No Starch Press & The Rust Foundation Community",
  editionTag: "3rd Edition • Featuring Chapter 17 Async & Rust 2024 Edition",
  officialDocsUrl: "https://doc.rust-lang.org/book/",
  totalChapters: 26,
  totalReadingTimeMinutes: 1040,
  tagline: "The definitive guide to mastering low-level systems programming in Rust before starting domain-specific industry projects."
};

export const BOOK_PARTS: BookPart[] = """ + json.dumps(parts, indent=2) + """;

export const RUST_BOOK_CHAPTERS: BookChapter[] = """ + json.dumps(all_chapters, indent=2) + """;
"""

    with open(out_file, "w", encoding="utf-8") as f:
        f.write(header)

    print(f"Successfully generated {out_file} ({os.path.getsize(out_file):,} bytes)")

if __name__ == "__main__":
    assemble()
