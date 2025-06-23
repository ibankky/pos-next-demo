"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function BranchGroupDetailPage() {
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const id = params?.id;
  
    return <div>Detail for Branch Group ID: {id}</div>;
  }
  