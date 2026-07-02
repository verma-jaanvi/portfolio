import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";

import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { CursorGlow } from "../components/CursorGlow";
import Loader from "../components/Loader";
import Scene3D from "../components/Scene3D";

function NotFoundComponent() {
  return (
    <div className="bg-aurora flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-[8rem] font-bold leading-none text-gradient">404</h1>
        <h2 className="mt-2 font-display text-2xl">Signal lost in the void</h2>
        <p className="mt-3 text-sm text-muted-foreground">
          This coordinate doesn't exist in our universe — or hasn't been mapped yet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full border border-violet/40 bg-violet/10 px-5 py-2 text-sm hover:bg-violet/20"
        >
          ← Return to base
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="bg-aurora flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Subsystem error</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-full border border-cyan/40 bg-cyan/10 px-5 py-2 text-sm hover:bg-cyan/20"
        >
          Reinitialize
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("jv_booted");
    }
    return false;
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem("jv_booted", "true");
    setShowLoader(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {showLoader && <Loader onComplete={handleLoaderComplete} />}
      <div className="relative min-h-screen">
        <Scene3D />
        <CursorGlow />
        <Nav />
        <main className="relative z-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
