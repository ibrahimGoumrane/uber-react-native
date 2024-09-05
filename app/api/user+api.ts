import { neon } from "@neondatabase/serverless";

export async function GET() {
  return Response.json({ message: "Hello from user API" }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId } = await req.json();
    if (!name || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    const response = await sql`
      INSERT INTO users (name , email  , clerk_id)
      VALUES (${name} , ${email} , ${clerkId})
    `;
    return Response.json(response, { status: 200 });
  } catch (error: any) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
