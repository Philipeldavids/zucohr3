import { useEffect, useState } from "react";

import { subscriptionService, type Subscriptions } from "../../lib/api";

import { Button } from "../../components/ui/button";

import {
  Card,
  CardContent,
} from "../../components/ui/card";

import { toast } from "sonner";

import CreateSubscriptionDialog from "./createsubscriptiondialog";

export default function SubscriptionSettings() {

  const [subscription, setSubscription] =
    useState<Subscriptions | null>(null);

  const [subscribeOpen, setSubscribeOpen] =
    useState(false);

  // selected subscription plan
  const [selectedPlanId, setSelectedPlanId] =
    useState<number | null>(null);

  async function loadSubscription() {
    try {
      const res =
        await subscriptionService.getActive();

      setSubscription(res);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadSubscription();
  }, []);

  async function handleCancel() {
    
    if (!subscription?.id) {
    toast.error("No subscription found");
    return;
  }

    try {
      await subscriptionService.cancel(
        subscription.id
      );

      toast.success(
        "Subscription cancelled"
      );

      loadSubscription();
    } catch (err) {
      toast.error(
        "Failed to cancel subscription"
      );
    }
  }

  function openSubscribeDialog(planId: number) {
    setSelectedPlanId(planId);
    setSubscribeOpen(true);
  }

  return (
    <>
      <Card>
        <CardContent className="p-6 space-y-6">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">
                Subscription Settings
              </h2>

              <p className="text-sm text-muted-foreground">
                Manage your organization subscription
              </p>
            </div>

            {!subscription && (
              <Button
                onClick={() =>
                  openSubscribeDialog(1)
                }
              >
                Subscribe
              </Button>
            )}
          </div>

          {subscription ? (
            <>
              <div className="space-y-2">
                <p className="font-medium">
                  {subscription.planName}
                </p>

                <p className="text-sm text-muted-foreground">
                  ₦{subscription.price}
                </p>

                <p className="text-sm">
                  Ends:
                  {" "}
                  {new Date(
                    subscription.endDate
                  ).toLocaleDateString()}
                </p>
              </div>

              <Button
                variant="destructive"
                onClick={handleCancel}
              >
                Cancel Subscription
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <p>No active subscription</p>

              {/* Example plans */}
              <div className="grid gap-3 md:grid-cols-3">

                <Card className="border">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold">
                        Starter Plan
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        ₦20,000/month
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() =>
                        openSubscribeDialog(1)
                      }
                    >
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold">
                        Growth Plan
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        ₦50,000/month
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() =>
                        openSubscribeDialog(2)
                      }
                    >
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
                      <Card className="border">
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold">
                        Enterprise(Custom) Plan
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Contact Us
                      </p>
                    </div>

                    <Button
                      className="w-full"
                      onClick={() =>
                        openSubscribeDialog(3)
                      }
                    >
                      Subscribe
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <CreateSubscriptionDialog
        open={subscribeOpen}
        onOpenChange={setSubscribeOpen}
        planId={selectedPlanId}
        onSuccess={loadSubscription}
      />
    </>
  );
}