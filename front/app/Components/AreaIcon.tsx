import React, { useEffect } from "react";
import Image from "next/image"; // Import from next/image
import Pastille from "./Pastille";
import Cookies from "js-cookie";

interface AreaIconProps {
  image: string;
  name: string;
  status: boolean;
  id: number;
}

async function toggleArea(areaId: number): Promise<boolean> {
  try {
    const token: string | undefined = Cookies.get("token");

    const response = await fetch(
      process.env.NEXT_PUBLIC_API + "/area/toggleArea",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          areaId,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    return true;
  } catch (error) {
    return false;
  }
}

async function eraseArea(areaId: number): Promise<boolean> {
  try {
    const token: string | undefined = Cookies.get("token");

    const response = await fetch(
      process.env.NEXT_PUBLIC_API + "/area/eraseArea",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          areaId,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }
    return true;
  } catch (error) {
    return false;
  }
}

function AreaIcon({ image, name, status, id }: AreaIconProps) {
  const [isActivated, setIsActivated] = React.useState<boolean>(status);

  return (
    <div className="flex items-center container flex-col aspect-square bg-[#382B59] rounded-xl overflow-hidden">
      <div className="flex basis-1/3 w-full flex-row">
        <button
          className="flex basis-1/3 items-center justify-center"
          onClick={async () => {
            try {
              const resp = await eraseArea(id);
              if (resp) {
                window.location.reload();
              }
            }
            catch (error) {
              console.error("Error:", error);
            }
          }}
        >
          <Image
            src="/red-trash-can-icon.svg"
            alt="Logo"
            width={30}
            height={30}
          />
        </button>
        <div className="flex basis-2/3" />
        <div className="flex basis-1/3 items-center justify-center space-x-16">
          <button
            onClick={async () => {
              try {
                const resp = await toggleArea(id);
                setIsActivated(!resp);
              } catch (error) {
                console.error("Error:", error);
              }
            }}
          >
            <Pastille status={isActivated} />
          </button>
        </div>
      </div>
      <div className="flex-row basis-2/3">
        <Image src={image} alt="Logo" width={100} height={100} />
      </div>
      <p className="text-3xl font-bold text-center basis-1/3">{name}</p>
    </div>
  );
}

export default AreaIcon;
