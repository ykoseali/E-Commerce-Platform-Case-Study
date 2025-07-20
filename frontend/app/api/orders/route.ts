import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongoose";
import Order from "@/models/Order";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, address, city, postalCode, cart } = body;

    if (!name || !email || !address || !city || !postalCode || !cart?.length) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await mongooseConnect();

    const total = cart.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0);

    const order = await Order.create({
      name,
      email,
      address,
      city,
      postalCode,
      items: cart,
      total,
    });

    return NextResponse.json({ message: "Order placed", orderId: order._id }, { status: 201 });
  } catch (err) {
    console.error("Order Error:", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
