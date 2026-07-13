import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/sectors-experience")({
  beforeLoad: () => {
    // Keep the unfinished experience and its media out of the public bundle.
    // Restore the experience component here once the final assets are approved.
    throw redirect({ to: "/", replace: true });
  },
});
