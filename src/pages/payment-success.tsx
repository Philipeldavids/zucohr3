import { useEffect } from "react";
import { toast } from "sonner";
import { subscriptionService } from "../lib/api";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  

  useEffect(() => {
    const params =
  new URLSearchParams(
    window.location.search
  );

const reference =
  params.get("reference");

if (reference) {
  subscriptionService.verify(
    reference
  );
  toast.success(
        "Payment successful"
      );
}
    
      console.log(reference);

      // optionally verify payment here
    
  }, []);

  
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        Payment Successful
      </h1>
      <Link to="/dashboard"
      
      >Proceed to Dashboard</Link>
    </div>
  );
}