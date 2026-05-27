import {
  Dialog,
  DialogContent,
} from "../../components/ui/dialog";

import { Button } from "../../components/ui/button";

interface Props {
  open: boolean;
}

export default function SubscriptionWarning({
  open,
}: Props) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            Subscription Required
          </h2>

          <p className="text-sm text-muted-foreground">
            Your organization does not
            have an active subscription.
            Please subscribe to continue
            using ZucoHR.
          </p>

          <Button
            onClick={() => {
              window.location.href =
                "/settings/subscription";
            }}
          >
            Subscribe Now
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}