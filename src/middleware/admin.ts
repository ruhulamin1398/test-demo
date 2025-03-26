import { RootState } from "@/app/store/store";
import { RoleEnum } from "@/interfaces";
import { NextRequest, NextResponse } from "next/server";
import { useSelector } from "react-redux";

export async function adminMiddleware(
  request: NextRequest
): Promise<void | NextResponse<unknown>> {
  try {
    // @TODO: get user from next auth
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user || user.role !== RoleEnum.ADMIN) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    const response = NextResponse.next();
    response.headers.set("X-Is-Dashboard", "true");
    console.log("Admin Middleware");
    return response;
  } catch (_err) {
    // Catch if any
    console.log("guestMiddleware error", _err);
  }
}
