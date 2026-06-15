import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Card, CardContent } from "../../components/ui/card";
import { toast } from "sonner";
import { emailService } from "../../lib/api";

export default function BookDemoPage() {
  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    employees: "",
    preferredDate: "",
    preferredTime: "",
    country: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function submit() {
    try {
      setLoading(true);

      await emailService.bookDemo(form);

      toast.success(
        "Demo request submitted successfully."
      );

      setForm({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        employees: "",
        preferredDate: "",
        preferredTime: "",
        country: "",
        message: "",
      });
    } catch {
      toast.error(
        "Unable to submit request."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <Card>
        <CardContent className="space-y-5 p-8">

          <div>
            <h1 className="text-3xl font-bold">
              Book a Live Demo
            </h1>

            <p className="text-muted-foreground mt-2">
              Discover how ZucoHR can help
              automate your HR processes.
            </p>
          </div>

          <Input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
          />

          <Input
            name="email"
            placeholder="Business Email"
            value={form.email}
            onChange={handleChange}
          />

          <Input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />

          <Input
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
          />

          <Input
            name="employees"
            placeholder="Number of Employees"
            value={form.employees}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              name="preferredDate"
              value={form.preferredDate}
              onChange={handleChange}
            />

            <Input
              type="time"
              name="preferredTime"
              value={form.preferredTime}
              onChange={handleChange}
            />
          </div>

          <Input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
          />

          <Textarea
            rows={4}
            name="message"
            placeholder="Anything you'd like us to know?"
            value={form.message}
            onChange={handleChange}
          />

          <Button
            className="w-full"
            disabled={loading}
            onClick={submit}
          >
            {loading
              ? "Submitting..."
              : "Book My Demo"}
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}