import { RootState } from "@/app/store/store";
import { NextRequest, NextResponse } from "next/server";
import { useSelector } from "react-redux";

export async function authMiddleware(
  request: NextRequest
): Promise<void | NextResponse<unknown>> {
  try {
    const user = useSelector((state: RootState) => state.auth.user);
    if (!user) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  } catch (_err) {
    // Catch if any
    console.log("guestMiddleware error", _err);
  }
}

// 01711111109 Asd@01711111109
// 01678900000 01678900000@Asd
