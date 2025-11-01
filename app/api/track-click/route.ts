import { api } from "@/convex/_generated/api";
import { getClient } from "@/convex/client";
import { ClientTrackingData, ServerTrackingEvent } from "@/lib/types";
import { geolocation } from "@vercel/functions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data: ClientTrackingData = await req.json();

    const geo = geolocation(req);

    const convex = getClient();

    const userId = await convex.query(api.lib.usernames.getUserIdBySlug, {
      slug: data.profileUsername,
    });

    if (!userId) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const trackingEvent: ServerTrackingEvent = {
      ...data,
      timestamp: new Date().toISOString(),
      profileUserId: userId,
      location: {
        ...geo,
      },
      userAgent: data.userAgent || req.headers.get("user-agent") || "unknown",
    };

    console.log("sending event to tinybird:", trackingEvent);

    if (process.env.TINYBIRD_TOKEN && process.env.TINYBIRD_HOST) {
      try {
        const eventForTinybird = {
          timestamp: trackingEvent.timestamp,
          profileUsername: trackingEvent.profileUsername,
          profileUserId: trackingEvent.profileUserId,
          linkId: trackingEvent.linkId,
          linkTitle: trackingEvent.linkTitle,
          linkUrl: trackingEvent.linkUrl,
          userAgent: trackingEvent.userAgent,
          referrer: trackingEvent.referrer,
          location_country: trackingEvent.location.country || "",
          location_region: trackingEvent.location.region || "",
          location_city: trackingEvent.location.city || "",
          location_latitude: trackingEvent.location.latitude || "",
          location_longitude: trackingEvent.location.longitude || "",
        };

        console.log("event formatted for tinybird:", eventForTinybird);

        const tinybirdResponse = await fetch(
          `${process.env.TINYBIRD_HOST}/v0/events?name=link_clicks`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.TINYBIRD_TOKEN}`,
            },
            body: JSON.stringify(eventForTinybird),
          },
        );

        if (!tinybirdResponse.ok) {
          const errorText = await tinybirdResponse.text();
          console.error("Tinybird response error:", errorText);
        } else {
          const responseBody = await tinybirdResponse.json();
          console.log("Tinybird response body:", responseBody);

          if (responseBody.quarantined_rows > 0) {
            console.warn(
              "Some rows were quarantined by Tinybird:",
              responseBody,
            );
          }
        }
      } catch (error) {
        console.error("Error sending data to Tinybird:", error);
      }
    } else {
      console.log("tinybird not configured, event logged only");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing tracking data:", error);
    return NextResponse.json(
      { error: "Failed to track click" },
      { status: 500 },
    );
  }
}
