import React, { FC, useRef, useState, ChangeEvent, useEffect } from 'react';
import { AddImageButton } from './AddImageButton';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { TTripImageFormValue } from './CreateTripFormContainer';

export type TTripImagesUploadProps = {
  onFilesChange?: (images: (File | TTripImageFormValue)[]) => void;
  className?: string;
  disabled?: boolean;
  defaultImages?: TTripImageFormValue[];
};

export const TripImagesUpload: FC<TTripImagesUploadProps> = ({
  onFilesChange,
  className,
  disabled,
  defaultImages = [],
}) => {
  const [images, setImages] = useState<(File | TTripImageFormValue)[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultImages.length > 0) {
      setImages(defaultImages);
    }
  }, [defaultImages]);

  const handleAddImages = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    setImages((prev) => {
      const updated = [...prev, ...files];
      onFilesChange?.(updated);
      return updated;
    });
    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      onFilesChange?.(updated);
      return updated;
    });
  };

  return (
    <div className={`flex gap-2 items-center flex-wrap ${className || ''}`}>
      {images.map((img, idx) => {
        let src = '';
        if (img instanceof File) {
          src = URL.createObjectURL(img);
        } else {
          src = img.publicUrl;
        }
        return (
          <div
            key={idx}
            className="relative w-20 h-20 flex flex-col items-center justify-center border rounded-md overflow-hidden group bg-muted"
          >
            <Image src={src} alt={`Trip image ${idx + 1}`} fill className="object-cover" />
            <button
              type="button"
              className="absolute top-1 right-1 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
              onClick={() => handleRemove(idx)}
              aria-label="Remove image"
            >
              <Trash2 size={16} className="text-destructive" />
            </button>
          </div>
        );
      })}
      <AddImageButton onClick={handleAddImages} disabled={disabled} hidden={images.length >= 5} />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFilesChange}
        disabled={disabled}
      />
    </div>
  );
};
