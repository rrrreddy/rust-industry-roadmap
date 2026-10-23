import React, { useState } from 'react';
import { 
  Terminal, Cpu, AlertTriangle, Layers, BookOpen, Code2, 
  Copy, Check, ShieldCheck, Zap, HardDrive, CheckCircle2 
} from 'lucide-react';

export const SystemsCheatSheet: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const errorCodes = [
    {
      code: "E0382",
      title: "use of moved value",
      cause: "Attempting to read or pass a variable after its ownership has already been transferred to another variable or function.",
      fix: "Borrow the value using `&val` or `&mut val`, or call `.clone()` if an independent heap allocation is required."
    },
    {
      code: "E0502",
      title: "cannot borrow as mutable because it is also borrowed as immutable",
      cause: "Violating the Aliasing XOR Mutability rule: attempting to take a `&mut` reference while active `&` references still exist in the current scope.",
      fix: "Ensure all immutable readers finish execution before creating the mutable borrow (rely on Non-Lexical Lifetimes or use explicit scope blocks)."
    },
    {
      code: "E0106",
      title: "missing lifetime specifier",
      cause: "A function returns a reference, but multiple input references exist and the compiler cannot apply the 3 Lifetime Elision Rules to infer which input the output is tied to.",
      fix: "Add explicit lifetime parameters: `fn longest<'a>(x: &'a str, y: &'a str) -> &'a str`."
    },
    {
      code: "E0004",
      title: "non-exhaustive patterns",
      cause: "A `match` statement fails to cover all possible variants of an enum.",
      fix: "Add the missing enum variant arm, or use the `_` wildcard arm as a catch-all."
    },
    {
      code: "E0277",
      title: "the trait bound is not satisfied",
      cause: "Passing a type to a function or struct that requires a specific trait (e.g., `Display`, `Clone`, `Send`) which the type does not implement.",
      fix: "Add `#[derive(Trait)]` to your struct/enum definition or write a manual `impl Trait for Type` block."
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-amber-950/30 p-6 sm:p-8 rounded-2xl border border-amber-500/30 shadow-xl">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-medium mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>RAPID REFERENCE & COMPILER CRASH DEFENSES</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Systems Architecture & Compiler Diagnostics Cheat Sheet
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-3xl leading-relaxed">
          Quick-reference memory sizing tables, pointer fatness mechanics, compiler error codes, and essential toolchain flags.
        </p>
      </div>

      {/* Memory & Pointer Layout Table */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-amber-300 flex items-center gap-2">
          <Cpu className="w-5 h-5 text-amber-400" />
          <span>Physical Memory Footprints on 64-bit Architecture</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-stone-700 bg-stone-950/70 text-stone-300 font-mono">
                <th className="p-3">Type</th>
                <th className="p-3">Stack Size</th>
                <th className="p-3">Heap Size</th>
                <th className="p-3">Physical Layout / Mechanics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800 text-stone-300">
              <tr className="hover:bg-stone-850/50">
                <td className="p-3 font-mono text-amber-400 font-bold">&T</td>
                <td className="p-3 font-mono">8 bytes</td>
                <td className="p-3 font-mono">0 bytes</td>
                <td className="p-3">Single 64-bit machine memory pointer directly to data. Non-null.</td>
              </tr>
              <tr className="hover:bg-stone-850/50">
                <td className="p-3 font-mono text-amber-400 font-bold">&str / &[T]</td>
                <td className="p-3 font-mono">16 bytes</td>
                <td className="p-3 font-mono">0 bytes</td>
                <td className="p-3">Fat Pointer: 8-byte data pointer + 8-byte length (`len`).</td>
              </tr>
              <tr className="hover:bg-stone-850/50">
                <td className="p-3 font-mono text-amber-400 font-bold">&dyn Trait</td>
                <td className="p-3 font-mono">16 bytes</td>
                <td className="p-3 font-mono">0 bytes</td>
                <td className="p-3">Fat Pointer: 8-byte data pointer + 8-byte vtable pointer for dynamic dispatch.</td>
              </tr>
              <tr className="hover:bg-stone-850/50">
                <td className="p-3 font-mono text-amber-400 font-bold">String / Vec&lt;T&gt;</td>
                <td className="p-3 font-mono">24 bytes</td>
                <td className="p-3 font-mono">capacity × size_of::&lt;T&gt;()</td>
                <td className="p-3">Triple word struct: 8-byte heap pointer + 8-byte capacity + 8-byte length.</td>
              </tr>
              <tr className="hover:bg-stone-850/50">
                <td className="p-3 font-mono text-amber-400 font-bold">Box&lt;T&gt;</td>
                <td className="p-3 font-mono">8 bytes</td>
                <td className="p-3 font-mono">size_of::&lt;T&gt;()</td>
                <td className="p-3">Owned unique pointer to heap memory. Calls `drop()` on deallocation.</td>
              </tr>
              <tr className="hover:bg-stone-850/50">
                <td className="p-3 font-mono text-amber-400 font-bold">Option&lt;&amp;T&gt; / Option&lt;Box&lt;T&gt;&gt;</td>
                <td className="p-3 font-mono">8 bytes</td>
                <td className="p-3 font-mono">Same as T</td>
                <td className="p-3">Null Pointer Optimization (NPO): 0x0 represents None, yielding 0 extra bytes overhead.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Compiler Error Dictionary */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          <span>Top 5 Compiler Errors & Idiomatic Solutions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {errorCodes.map((err, idx) => (
            <div 
              key={idx}
              className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-2 hover:border-stone-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-800">
                  {err.code}
                </span>
                <span className="text-xs text-stone-400 font-medium">{err.title}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                <strong className="text-stone-400">Why it happens: </strong>{err.cause}
              </p>
              <p className="text-xs text-emerald-300 leading-relaxed bg-emerald-950/20 p-2 rounded border border-emerald-900/30">
                <strong className="text-emerald-400">Idiomatic Fix: </strong>{err.fix}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Essential Toolchain Commands */}
      <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <span>Crucial Developer CLI Commands</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          {[
            { label: "Ultra-fast syntax check without codegen", cmd: "cargo check" },
            { label: "Run over 500 strict community linter checks", cmd: "cargo clippy -- -D warnings" },
            { label: "Check code formatting", cmd: "cargo fmt --check" },
            { label: "Print full stack backtrace on panic", cmd: "RUST_BACKTRACE=1 cargo run" },
            { label: "Run Miri undefined behavior interpreter on test suite", cmd: "cargo +nightly miri test" },
            { label: "Compile for production with LTO and max optimization", cmd: "cargo build --release" }
          ].map((item, i) => (
            <div key={i} className="bg-stone-950 p-3 rounded-lg border border-stone-800 flex items-center justify-between gap-2">
              <div className="truncate">
                <div className="text-[10px] text-stone-500 font-sans">{item.label}</div>
                <div className="text-amber-400 truncate">{item.cmd}</div>
              </div>
              <button
                onClick={() => copyText(`cmd-${i}`, item.cmd)}
                className="text-stone-400 hover:text-stone-200 p-1 shrink-0"
              >
                {copiedId === `cmd-${i}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
