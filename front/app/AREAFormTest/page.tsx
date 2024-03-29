"use client";

import React, { useEffect, useState } from "react";
import { ActionJsonArray } from "@/app/Interfaces/ActionJson.interface";
import AREAForm from "@/app/Components/AREAForm";

const Page = () => {
    const fields: ActionJsonArray = [
        { title: "Age", type: "number" },
        { title: "Name", type: "string" },
        { title: "Email", type: "string" },
        { title: "Password", type: "password" },
        { title: "Date", type: "date" },
        // Add more fields as needed
    ];
    const [datas, setDatas] = React.useState<string>("");

    useEffect(() => {
        if (datas.length !== 0) {
            console.log("data filled");
            console.log(datas);
        } else {
            console.log("nope");
        }
    }, [datas]);

    return <AREAForm fields={fields} setDatas={setDatas} />;
}

export default Page;
