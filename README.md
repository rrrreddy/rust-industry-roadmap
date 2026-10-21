# 🦀 Rust Across Industries — The Ultimate End-to-End Roadmap

An interactive, production-grade web application mapping out the complete journey to becoming a Staff/Principal-level engineer in any industry using Rust.

Hosted publicly and deployable in seconds to **GitHub Pages**.

---

## 🚀 Live Preview & Quick Start

### 1. Run Locally
```bash
git clone <your-repo-url>
cd rust-industry-roadmap
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
This produces an optimized zero-dependency static bundle inside `dist/`.

---

## 🌐 Deploy to GitHub Pages (Free Public Access Anywhere)

This repository includes a turnkey GitHub Actions workflow (`.github/workflows/deploy.yml`).

1. **Create a new GitHub repository** (e.g. `rust-industry-roadmap`).
2. **Push this code to GitHub**:
   ```bash
   cd rust-industry-roadmap
   git init
   git add .
   git commit -m "feat: complete rust industry roadmap"
   git branch -M main
   git remote add origin https://github.com/<your-username>/rust-industry-roadmap.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository on GitHub: **Settings** → **Pages**.
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The workflow will automatically trigger, build, and publish your site at:
   `https://<your-username>.github.io/rust-industry-roadmap/`

---

## 🏛️ Covered Industry Tracks

| Industry Track | Core Focus | Key Crates | Paradigm Shift |
|---|---|---|---|
| **Operating Systems & Kernels** | `#![no_std]`, MMIO, Paging, Hypervisors | `x86_64`, `bootloader`, `spinning_top` | Eliminates 70% of memory corruption CVEs in Linux & Windows |
| **Cyber Security & Exploits** | eBPF, Nom PCAP parsing, LibAFL fuzzing | `aya`, `nom`, `libafl`, `ring` | Crash-proof security agents & high-speed fuzzing |
| **Defense & Aerospace** | DO-178C, Ferrocene ASIL D, Spacecraft ADCS | `heapless`, `kani`, `embedded-hal` | Mathematical model checking & panic-freedom |
| **Cloud & Distributed** | MicroVMs (Firecracker), Service Mesh (Linkerd) | `tokio`, `hyper`, `tonic`, `io-uring` | 5ms microVM boot times, zero GC tail-latency |
| **FinTech & Low-Latency HFT** | Limit Order Books, Kernel Bypass, Nanoseconds | `crossbeam`, `criterion`, `memmap2` | Sub-microsecond matching without GC pauses |
| **Robotics & Autonomous Driving** | Sensor Fusion, SocketCAN, ROS2 (`rclrs`) | `nalgebra`, `socketcan`, `heapless` | Real-time deadline guarantees, no segfaults |
| **WebAssembly & Edge AI** | Wasmtime Sandboxing, Edge Workers, WebGPU | `wasm-bindgen`, `wasmtime`, `web-sys` | 50µs cold-starts & in-browser near-native speeds |

---

## 🎯 What's Inside Each Industry Module

- **Scope of Work & Day-in-the-Life**: Real daily engineering tasks, responsibilities, and key hurdles.
- **Legacy Stack vs. Rust Modernization**: Clear breakdown of traditional flaws (C/C++, Java, Go) and the exact metrics improvement Rust brings.
- **Core Concepts & Programmatic Skills**: Theoretical foundations and hands-on code applications.
- **Ecosystem & Must-Know Crates**: De-facto industry libraries with direct links.
- **Production Capstone Projects**: Beginner, Intermediate, and Staff-level portfolio projects to showcase in interviews.
- **Interview Scenarios**: High-probability technical interview questions and what interviewers look for.
- **Interactive Readiness Tracker**: Live progress tracking saved to your browser.
