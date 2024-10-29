import { postgresService } from "@/features/directoryUser/postgresService";



export async function GET() {
  const people  = await postgresService.getAllUsers();

  return Response.json(people)
}