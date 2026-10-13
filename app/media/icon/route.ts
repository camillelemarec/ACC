import { NextResponse } from "next/server";
import { signedUrlForPath } from "../../../lib/b2/sign";

export const dynamic = "force-dynamic";

export async function GET() {
  const url = await signedUrlForPath("/images/path12.svg");
  return NextResponse.redirect(url, {
    status: 302,
    headers: { "Cache-Control": "private, no-store" },
  });
}
