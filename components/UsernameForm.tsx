"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "convex/react";
import {
  AlertCircle,
  CheckCircle,
  Copy,
  ExternalLink,
  Loader2,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
import { getBaseUrl } from "@/lib/getBaseUrl";
import { toast } from "sonner";

const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters.")
    .max(30, "Username must be at most 30 characters.")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Username can only contain letters, numbers, underscores, and hyphens.",
    ),
});

function UsernameForm() {
  const { user } = useUser();
  const [debouncedUsername, setDebouncedUsername] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  const watchedUsername = form.watch("username");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(watchedUsername);
    }, 500);

    return () => clearTimeout(timer);
  }, [watchedUsername]);

  const currentSlug = useQuery(
    api.lib.usernames.getUserSlug,
    user?.id ? { userId: user.id } : "skip",
  );

  const availabilityCheck = useQuery(
    api.lib.usernames.checkUsernameAvailability,
    debouncedUsername.length >= 3 ? { username: debouncedUsername } : "skip",
  );

  const setUsername = useMutation(api.lib.usernames.setUsername);

  const getStatus = () => {
    if (!debouncedUsername || debouncedUsername.length < 3) return null;
    if (debouncedUsername !== watchedUsername) return "checking";
    if (!availabilityCheck) return "checking";
    if (debouncedUsername === currentSlug) return "current";
    return availabilityCheck.available ? "available" : "unavailable";
  };

  const status = getStatus();

  const hasCustomUsername = currentSlug && currentSlug !== user?.id;

  const isSubmitDisabled =
    status !== "available" || form.formState.isSubmitting;

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    if (!user?.id) return;
    console.log("Submitted username:", data.username);
    try {
      console.log("Setting username to:", data.username);
      const result = await setUsername({ username: data.username });
      if (result.success) {
        form.reset();
      } else {
        form.setError("username", { message: result.error });
      }
    } catch {
      form.setError("username", {
        message: "Failed to set username. Please try again later.",
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Customize Your Link
        </h3>
        <p className="text-gray-600 text-sm">
          Choose a custom username for your link-in-bio page. This will be your
          public URL.
        </p>
      </div>

      {/* current username */}
      {hasCustomUsername && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="size-4 text-green-600" />
              <span className="text-green-900 text-sm font-medium">
                Current Username
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-green-800 bg-white px-2 py-1 rounded text-sm">
                {currentSlug}
              </span>
              <Link
                href={`/u/${currentSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 transition-colors"
              >
                <ExternalLink className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* url preview */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-2 bg-gray-500 rounded-full" />
          <span className="text-sm font-medium text-gray-700">
            Your Link URL Preview:
          </span>
        </div>
        <div className="flex items-center">
          <Link
            href={`/u/${currentSlug}`}
            target="_blank"
            rel="noopener norefferer"
            className="flex-1 font-mono text-gray-800 bg-white px-3 py-2 rounded-l border-l border-y hover:bg-gray-50 transition-colors truncate"
          >
            {`${getBaseUrl()}/u/${currentSlug}`}
          </Link>
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${getBaseUrl()}/u/${currentSlug}`);
              toast.success("URL copied to clipboard!");
            }}
            className="flex items-center justify-center size-10 bg-white border rounded-r hover:bg-gray-50 transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="size-4 text-gray-500" />
          </button>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FieldGroup>
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="form-username">Username</FieldLabel>
                <div className="relative">
                  <Input
                    id="form-username"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                    className="pr-10"
                    {...field}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {status === "checking" && (
                      <Loader2 className="size-4 animate-spin text-gray-400" />
                    )}
                    {status === "available" && (
                      <CheckCircle className="size-4 text-green-500" />
                    )}
                    {status === "current" && (
                      <User className="size-4 text-blue-500" />
                    )}
                    {status === "unavailable" && (
                      <AlertCircle className="size-4 text-red-500" />
                    )}
                  </div>
                </div>
                <p className="text-xs text-gray-400">
                  Your username can contain only letters, numbers, underscores,
                  and hyphens.
                </p>
                {status === "available" && (
                  <p className="text-sm text-green-600">
                    Great choice! This username is available.
                  </p>
                )}
                {status === "unavailable" && (
                  <p className="text-sm text-red-600">
                    {availabilityCheck?.error ||
                      "Sorry, this username is already taken."}
                  </p>
                )}
                {status === "current" && (
                  <p className="text-sm text-blue-600">
                    This is your current username.
                  </p>
                )}
              </Field>
            )}
          />
        </FieldGroup>
        <Button
          disabled={isSubmitDisabled}
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            "Set Username"
          )}
        </Button>
      </form>
    </div>
  );
}

export default UsernameForm;
