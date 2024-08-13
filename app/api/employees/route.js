import dbConnect from "@/backend/dbConnection";
import Employee from "@/backend/models/Employee";
import { cors } from "@/lib/cors";

const handler = async (req, res) => {
  res.status(200).json({ message: "Success" });
};

export default cors(handler);

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params || {};

  try {
    if (id) {
      const employee = await Employee.findById(id);
      if (!employee) {
        return new Response(JSON.stringify({ error: "Employee not found" }), {
          status: 404,
        });
      }
      return new Response(JSON.stringify(employee), { status: 200 });
    } else {
      const employees = await Employee.find({});
      return new Response(JSON.stringify(employees), { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  await dbConnect();
  const body = await req.json();

  try {
    const employee = new Employee(body);
    await employee.save();
    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Bad Request" }), {
      status: 400,
    });
  }
}
