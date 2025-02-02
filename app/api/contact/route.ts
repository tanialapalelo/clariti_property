import { NextRequest, NextResponse } from "next/server";

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

        const wordpressApiUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/wp-json/contact-form-7/v1/contact-forms/72/feedback`;

        const response = await fetch(wordpressApiUrl, {
            method: "POST",
            body: formData, // Send as form-data instead of JSON
        });

        const result = await response.json();
        return NextResponse.json(result, { status: response.status });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to submit form", details: error },
            { status: 500 }
        );
    }
}
