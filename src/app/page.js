import Hero from "@/components/Hero";
import Background3D from "@/components/Background3D";

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <Background3D />
      <Hero />
    </div>
  );
}
