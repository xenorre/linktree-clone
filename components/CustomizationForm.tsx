"use client";

import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { ImageIcon, Palette, Upload, X } from "lucide-react";
import { useEffect, useRef, useState, useTransition } from "react";
import { Label } from "./ui/label";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";

function CustomizationForm() {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateCustomizations = useMutation(
    api.lib.customizations.updateCustomizations,
  );

  const generateUploadURL = useMutation(
    api.lib.customizations.generateUploadURL,
  );

  const removeProfilePicture = useMutation(
    api.lib.customizations.removeProfilePicture,
  );

  const existingCustomizations = useQuery(
    api.lib.customizations.getUserCustomizations,
    user ? { userId: user.id } : "skip",
  );

  const [formData, setFormData] = useState({
    description: "",
    accentColor: "#009966",
  });

  const [isLoading, startTransition] = useTransition();
  const [isUploading, startUploading] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    startTransition(async () => {
      try {
        await updateCustomizations({
          description: formData.description || "",
          accentColor: formData.accentColor || "",
        });
        toast.success("Customizations saved successfully!");
      } catch (error) {
        console.error("Error updating customizations:", error);
        toast.error("Failed to save customizations. Please try again.");
      }
    });
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size exceeds 5MB limit.");
      return;
    }

    startUploading(async () => {
      try {
        const uploadUrl = await generateUploadURL();

        const uploadResult = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            "Content-Type": file.type,
          },
          body: file,
        });

        if (!uploadResult.ok) {
          throw new Error("Failed to upload image.");
        }

        const { storageId } = await uploadResult.json();

        await updateCustomizations({
          profilePictureStorageId: storageId,
          description: formData.description || "",
          accentColor: formData.accentColor || "",
        });

        toast.success("Profile picture uploaded successfully!");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        toast.error("Failed to upload profile picture. Please try again.");
      } finally {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    });
  };

  const handleRemoveImage = async () => {
    startTransition(async () => {
      try {
        await removeProfilePicture();
      } catch (error) {
        console.error("Error removing profile picture:", error);
        toast.error("Failed to remove profile picture. Please try again.");
      }
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (existingCustomizations) {
      setFormData({
        description: existingCustomizations.description || "",
        accentColor: existingCustomizations.accentColor || "#009966",
      });
    }
  }, [existingCustomizations]);

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-linear-to-br from-purple-500 to-pink-500 rounded-lg">
            <Palette className="size-5 text-white" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Customize Your Page
            </h2>
            <p className="text-gray-600 text-sm">
              Personalize your profile with a description, profile picture, and
              accent color.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <Label className="flex items-center gap-2">
            <ImageIcon className="size-4" />
            Profile Picture
          </Label>

          {existingCustomizations?.profilePictureUrl && (
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className="size-16 rounded-lg overflow-hidden">
                <Image
                  src={existingCustomizations.profilePictureUrl}
                  alt="Profile Picture"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 font-medium">
                  Current profile picture
                </p>
                <p className="text-xs text-gray-500">
                  Click &ldquo;Remove&rdquo; below to delete it.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRemoveImage}
                disabled={isLoading}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <X className="size-4 mr-1" />
                Remove
              </Button>
            </div>
          )}
          <div className="flex items-center gap-4">
            <input
              type="file"
              onChange={handleFileUpload}
              ref={fileInputRef}
              className="hidden"
              disabled={isUploading}
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="size-4" />
              {isUploading ? "Uploading..." : "Upload New Image"}
            </Button>
            <p className="text-sm text-gray-500">
              Max size: 5MB. Supported formats: JPG, PNG, GIF, WebP
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            maxLength={200}
            placeholder="Tell visitors about yourself..."
          />
          <p className="text-sm text-gray-500">
            {formData.description.length}/200
          </p>
        </div>

        <div className="space-y-3">
          <Label htmlFor="accentColor">Accent Color</Label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <input
                id="accentColor"
                type="color"
                value={formData.accentColor}
                onChange={(e) =>
                  handleInputChange("accentColor", e.target.value)
                }
                className="size-12 rounded-lg cursor-pointer"
              />

              <div>
                <p className="text-sm font-medium text-gray-700">
                  Choose your brand color
                </p>
                <p className="text-xs text-gray-500">
                  {`Selected Color: ${formData.accentColor.toUpperCase()}`}
                </p>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            This color will be used as the accent color across your profile
          </p>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full bg-linear-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 transition-colors duration-300 cursor-pointer hover:to-cyan-500"
            disabled={isLoading || isUploading}
          >
            {isLoading ? "Saving..." : "Save Customization"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CustomizationForm;
