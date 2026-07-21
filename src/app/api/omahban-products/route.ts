import { NextResponse } from "next/server";
import { resolveShopStock } from "@/lib/omahban-live";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/omahban-products
 * Server proxy: live POS (Sanctum) when STOCK_SOURCE=live, else snapshot.
 * Never exposes OMAHBAN_API_TOKEN or cost/modal fields.
 */
export async function GET(request: Request) {
  try {
    const result = await resolveShopStock(request.signal);
    return NextResponse.json({
      success: true,
      source: result.source,
      count: result.items.length,
      items: result.items,
      ...(result.error ? { warning: result.error } : {}),
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: msg, source: "snapshot", items: [] },
      { status: 500 },
    );
  }
}
