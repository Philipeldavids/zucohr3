import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Link } from "react-router-dom";

export default function PaymentSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const reference =
      params.get("reference");

    if (reference) {
      toast.success(
        "Payment successful"
      );

      console.log(reference);

      // optionally verify payment here
    }
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