"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";

export default function ProductPage() {
    const [loading, setLoading] = useState(true);

    return (
        <div className="p-6 flex flex-col gap-4">
          <div className="flex w-full gap-4">
            <div className="w-1/2">
            Product
            </div>
            <div className="w-1/2">
            Redemption
            </div>
          </div>
        </div>
    )        
}