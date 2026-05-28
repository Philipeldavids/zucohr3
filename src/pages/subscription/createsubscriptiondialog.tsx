import {
  Dialog,
  DialogContent,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";

import { useState, useEffect } from "react";

import {
  subscriptionService,
} from "../../lib/api";

import { toast } from "sonner";



export default function CreateSubscriptionDialog({
  open,
  onOpenChange,
  planId,
  onSuccess,
}: any) {
  const [loading, setLoading] =
    useState(false);
    const [compId, setCompanyId] = useState("");

 useEffect(() => {
     
     const org = JSON.parse(localStorage.getItem("org") || "{}");
     setCompanyId(org?.id || "");
 },[])

 async function handleSubscribe() {
  try {
    setLoading(true);

    const startDate = new Date();

    const endDate = new Date();

    endDate.setDate(endDate.getDate() + 30);

    const response =
      await subscriptionService.create({
        organizationId: compId,
        planId,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      });

    console.log(response);

    const paymentUrl =     
      response?.authorizationUrl;
            onSuccess();
    if (!paymentUrl) {
      toast.error(
        "Unable to initialize payment"
      );

      return;
    }

    // redirect to paystack
    window.location.href = paymentUrl;

  } catch (err) {
    console.error(err);

    toast.error(
      "Failed to subscribe"
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="space-y-4">
        <h2 className="text-lg font-semibold">
          Confirm Subscription
        </h2>

        <p>
          Proceed with this subscription?
        </p>

        <Button
          disabled={loading}
          onClick={handleSubscribe}
        >
          {loading
            ? "Processing..."
            : "Subscribe"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}