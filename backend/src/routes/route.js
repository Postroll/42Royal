import connectMongoDB from "../../mongoDB/mongodb";
import Question from "../../mongoDB/models/question";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id, game_type, title, input, expected_output, subject, body, status } = await request.json();
  await connectMongoDB();
  await Question.create({  id, game_type, title, input, expected_output, subject, body, status});
  return NextResponse.json({ message: "Question Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const questions = await Question.find();
  return NextResponse.json({ questions });
}