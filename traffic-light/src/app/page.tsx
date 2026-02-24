// src/app/page.tsx

"use client";

import { useState, useEffect } from "react";
import type { ApplicationContext } from "@sitecore-marketplace-sdk/client";
import { useMarketplaceClient } from "@/utils/hooks/useMarketplaceClient";

export default function Home() {
  const { client, error, isInitialized } = useMarketplaceClient();
  const [appContext, setAppContext] = useState<ApplicationContext>();

  useEffect(() => {
    if (!error && isInitialized && client) {
      console.log("Marketplace client initialized successfully.");

      // Make a query to retrieve the application context
      client.query("application.context")
        .then((res) => {
          console.log("Success retrieving application.context:", res.data);
          setAppContext(res.data);
        })
        .catch((error) => {
          console.error("Error retrieving application.context:", error);
        });
    } else if (error) {
      console.error("Error initializing Marketplace client:", error);
    }
  }, [client, error, isInitialized]);

  if (!appContext) {
    return null;
  }

  return (
    <>
      <p>You are operating in the <b>{process.env.NODE_ENV}</b> environment.</p>
      {process.env.NODE_ENV === "production" && (
        <p style={{ color: "red", fontWeight: 600 }}>
          Please be extra careful!!!
        </p>
      )}
    </>
  );
}
