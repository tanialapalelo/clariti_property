import { NextRequest, NextResponse } from "next/server";

const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL || "http://http://147.93.40.252:3000/";

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            "Access-Control-Allow-Origin": allowedOrigin,
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // Convert JSON to FormData
        const formData = new FormData();
        formData.append("your-name", body.name);
        formData.append("your-email", body.email);
        formData.append("your-mobile", body.mobile);
        formData.append("your-city", body.city);
        formData.append("your-subject", body.subject);
        formData.append("your-message", body.message);
        formData.append("_wpcf7_unit_tag", "wpcf7-f72");

        console.log("formData", Object.fromEntries(formData.entries()));

        const wordpressApiUrl = `${process.env.HOSTING_URL}/wp-json/contact-form-7/v1/contact-forms/72/feedback`;

        const response = await fetch(wordpressApiUrl, {
            method: "POST",
            body: formData, // Send as form-data instead of JSON
        });

        const result = await response.json();
        return new Response(JSON.stringify(result), {
            status: response.status,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": allowedOrigin,
            },
        });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to submit form", details: error },
            { status: 500 }
        );
    }
}
