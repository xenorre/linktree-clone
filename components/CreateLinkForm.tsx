"use client";

import { Button } from "@/components/ui/button";
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  url: z.url("Please enter valid URL"),
});

function CreateLinkForm() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, startTransition] = useTransition();
  const router = useRouter();
  const createLink = useMutation(api.lib.links.createLink);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);

    if (
      !values.url.startsWith("http://") &&
      !values.url.startsWith("https://")
    ) {
      values.url = `https://${values.url}`;
    }

    startTransition(async () => {
      try {
        await createLink({
          title: values.title,
          url: values.url,
        });
        router.push("/dashboard#manage-links");
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to create link",
        );
      }
    });
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FieldGroup>
        <Controller
          control={form.control}
          name="title"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="link-title">Link Title</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="link-title"
                placeholder="My awesome link"
              />
              <FieldDescription>
                This will be displayed as the button text for your link.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="url"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="link-url">Link URL</FieldLabel>
              <Input
                {...field}
                aria-invalid={fieldState.invalid}
                id="link-url"
                placeholder="https://example.com"
              />
              <FieldDescription>
                The destination URL where users will be redirected.
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating..." : "Create Link"}
        </Button>
      </FieldGroup>
    </form>
  );
}

export default CreateLinkForm;
