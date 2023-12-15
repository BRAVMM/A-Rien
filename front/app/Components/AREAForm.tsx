/**
 * @client
 */
import React, {useState} from 'react';

/* Interfaces */
import {ActionJsonArray} from "@/app/Interfaces/ActionJson.interface";

const AREAForm: React.FC<{ fields: ActionJsonArray }> = ({fields}) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, title: string) => {
        setFormData({...formData, [title]: e.target.value});
    };

    const handleSubmit = () => {
        const outputData = fields.map(field => ({[field.title]: formData[field.title] || ''}));
        console.log(JSON.stringify(outputData));
    };

    return (
        <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
            {fields.map(field => (
                <div key={field.title}>
                    <input
                        type={field.type === 'string' ? 'text' : field.type}
                        value={formData[field.title] || ''}
                        onChange={(e) => handleChange(e, field.title)}
                        id={field.title}
                        placeholder={field.title}
                        name={field.title}
                        required
                        className="text-center block w-full rounded-md border-0 py-1.5 text-background shadow-sm ring-2 ring-inset ring-secondary placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary"
                    />
                </div>
            ))}
            <div className="flex flex-col items-center">
                <button
                    type="submit"
                    className={`flex items-center justify-center bg-[#382B59] text-white font-semibold py-2 px-4 rounded-lg w-32 text-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                        error
                            ? "bg-red focus-visible:outline-red-600"
                            : "bg-primary hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    }`}
                >
                    Submit
                </button>
                {error && <p className="text-red text-center mt-2">{error}</p>}
            </div>
        </form>
);
};

export default AREAForm;

