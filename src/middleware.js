export { default } from "next-auth/middleware";
export const config = {
  matcher: ["/dashboard/:path*", "/suite/:path*"],
  // api: {
  //   bodyParser: {
  //       sizeLimit: '10mb',
  //   },
  //   responseLimit: '10mb',
  // }
};

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req) {
  // ...

  return NextResponse.json({ foo: "bar" }, { headers: corsHeaders });
}
