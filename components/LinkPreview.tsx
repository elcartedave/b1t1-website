"use client";
import React, { useEffect, useState } from "react";

interface LinkPreviewProps {
  url: string;
}

export default function LinkPreview({ url }: LinkPreviewProps) {
  const [meta, setMeta] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<any>(null);
  const [stage, setStage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch("/api/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });

        const data = await res.json();
        if (res.ok) {
          setMeta(data);
          setDebug(data?._debug || null);
          setStage(data?._debug?.stage || null);
        } else {
          setError(data.error || "Failed to load preview");
          setDebug(data?._debug || data);
          setStage(data?.stage || data?._debug?.stage || null);
        }
      } catch (err) {
        setError("Failed to load preview");
      }
    };

    if (url) fetchPreview();
  }, [url]);

  if (error)
    return (
      <div className="space-y-3 max-w-md">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-card text-card-foreground"
        >
          <div className="p-4 space-y-1">
            <div className="text-sm text-muted-foreground">
              {(() => {
                try {
                  const u = new URL(url);
                  return u.hostname;
                } catch {
                  return url;
                }
              })()}
            </div>
            <div className="text-sm truncate">{url}</div>
            <div className="text-xs text-muted-foreground">
              Preview unavailable
            </div>
          </div>
        </a>
        <div className="space-y-2">
          <p className="text-red-500">{error}</p>
          <div className="text-xs text-muted-foreground space-y-1">
            {stage && <div>stage: {stage}</div>}
            {debug && (
              <pre className="whitespace-pre-wrap break-words bg-muted/30 p-2 rounded-md max-w-md overflow-x-auto">
                {JSON.stringify(debug, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    );
  if (!meta) return <p className="text-muted-foreground">Loading preview...</p>;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-card text-card-foreground max-w-md"
    >
      {meta.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={meta.image}
          alt={meta.title}
          className="w-full object-cover h-56"
        />
      )}
      <div className="p-4">
        <h3 className="font-semibold text-foreground">{meta.title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {meta.description}
        </p>
        {meta.site && (
          <span className="text-xs text-muted-foreground/70">{meta.site}</span>
        )}
      </div>
    </a>
  );
}
