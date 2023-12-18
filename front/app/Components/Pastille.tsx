import React from 'react';

function Pastille({ status }: { status: boolean }) {
    if (status) {
        return (
            <div className="w-4 h-4 rounded-full bg-green"></div>
        );
    } else {
        return (
            <div className="w-4 h-4 rounded-full bg-red"></div>
        );
    }
}

export default Pastille;
