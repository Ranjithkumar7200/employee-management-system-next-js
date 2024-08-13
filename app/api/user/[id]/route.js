import dbConnect from "@/backend/dbConnection";
import Employee from "@/backend/models/Employee";

export async function DELETE(req, context) {
  await dbConnect();
  const { params } = context;

  try {
    if (params.id) {
      const result = await Employee.findByIdAndDelete(params.id);
      if (!result) {
        return new Response(JSON.stringify({ error: "Employee not found" }), {
          status: 404,
        });
      }

      return new Response(
        JSON.stringify({ message: "Employee deleted successfully" }),
        { status: 200 }
      );
    } else {
      return new Response(JSON.stringify({ error: "No ID provided" }), {
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error baiii" + error }),
      {
        status: 500,
      }
    );
  }
}
export async function PUT(req, context) {
  await dbConnect();
  const { params } = context;
  const body = await req.json();

  try {
    const employee = await Employee.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!employee) {
      return new Response(JSON.stringify({ error: "Employee not found" }), {
        status: 404,
      });
    }
    return new Response(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Bad Request" }), {
      status: 400,
    });
  }
}
