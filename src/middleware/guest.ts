import { RootState } from "@/app/store/store";
import { NextRequest, NextResponse } from "next/server";
import { useSelector } from "react-redux";

export async function guestMiddleware(
  request: NextRequest
): Promise<void | NextResponse<unknown>> {
  try {
    const user = useSelector((state: RootState) => state.auth.user);
    if (user) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (_err) {
    // Catch if any
    console.log("guestMiddleware error", _err);
  }
}
