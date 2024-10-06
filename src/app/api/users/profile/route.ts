import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel'
import { NextResponse, NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect()

export async function GET(request: NextRequest) {
    // extract data from token
    const userId = await getDataFromToken(request)
    const user = await User.findOne({_id: userId}).select("-password")

    // check if there is no user
    if (!user) {
        return new Response('User not found', { status: 404 })
    }

    return NextResponse.json({
        message: "User found",
        data: user
    })
}   