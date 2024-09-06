import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const response = await sql`Select * from drivers`;
    return Response.json({ data: response });
  } catch (error) {
    console.log("Error fetching recent rides:", error);
    return Response.json({ error: error });
  }
}
