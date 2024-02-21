import { NextResponse } from "next/server";
import upload from "../../utils/multer"; // Assuming you have exported multer configuration as 'upload'
import Formo from "@/app/backend/models/from-model"; // Corrected import
import { uploads } from "../../utils/cloudinary"; // Assuming you have exported cloudinary configuration and uploads function
import fs from "fs";

export async function POST(req) {
    try {
        const data = await req.formData();
        const files = data.getAll('file'); // Use getAll instead of get to retrieve all files
        const dob = data.get('DOB'); // Assuming DOB is sent as a string from the frontend

        console.log("Files:", files);
        console.log("DOB:", dob);

        // Check if files exist
        if (!files || !Array.isArray(files) || files.length === 0) {
            console.log("No files found");
            return NextResponse.json({ 'message': "No files found", success: false });
        }

        // Define an uploader function
        const uploader = async (file) => {
            const { path } = file;
            const { public_id, url } = await uploads(path, "intern"); // Retrieve public_id and url from Cloudinary
            fs.unlinkSync(path);
            return { public_id, url }; // Return an object containing public_id and url
        };

        // Upload each file and update the formData
        const avatarResponses = await Promise.all(files.map(uploader));

        // Create a new instance of Formo
        const formData = new Formo({
            DOB: dob,
            avatar: avatarResponses, // Update avatar to an array of responses containing public_id and url
        });

        // Save the form data to the database
        await formData.save();

        console.log("Data saved successfully");

        return NextResponse.json({
            'message': "Files uploaded and data saved to database",
            success: true,
            data: {
                files: avatarResponses, // Return responses for all uploaded files
                DOB: dob
            }
        });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ 'message': "Internal Server Error", success: false });
    }
}
