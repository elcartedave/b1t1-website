"use client";
import LinkPreview from "@/components/LinkPreview";

export default function LinkPreviewPage() {
  // Example Facebook post URL; replace with any public post URL
  const exampleUrl = "https://www.facebook.com/share/p/17SYeicJWb/";

  return (
    <main className="min-h-screen pt-24 px-6">
      <div className="container mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">Facebook Post Preview</h1>
        <p className="text-muted-foreground">
          Preview card generated from Open Graph metadata.
        </p>
        <LinkPreview url={exampleUrl} />
      </div>
    </main>
  );
}
