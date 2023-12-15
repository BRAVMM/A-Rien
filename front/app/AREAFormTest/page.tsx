"use client";

import React from "react";
import { ActionJsonArray } from "@/app/Interfaces/ActionJson.interface";
import AREAForm from "@/app/Components/AREAForm";

const Page = () => {
    const fields: ActionJsonArray = [
        { title: "Age", type: "number" },
        { title: "Name", type: "string" },
        { title: "Email", type: "string" },
        { title: "Password", type: "password" },
        // Add more fields as needed
    ];

    return <AREAForm fields={fields} />;
}

export default Page;