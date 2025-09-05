import React, { useRef, ChangeEvent, FC } from 'react';
import { TripImagesUpload } from './TripImagesUpload';
import { useTripImages } from '../../hooks/useTripImages';
import { TTripImageFormValueProps } from '../../hooks/useTripFormSync';

export type TTripImagesUploadContainerProps = {
  onFilesChange?: (images: (File | TTripImageFormValueProps)[]) => void;
  className?: string;
  disabled?: boolean;
  defaultImages?: TTripImageFormValueProps[];
  canAddMore?: boolean;
};

export const TripImagesUploadContainer: FC<TTripImagesUploadContainerProps> = ({
  onFilesChange,
  className,
  disabled,
  defaultImages = [],
  canAddMore,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { newImages } = useTripImages();

  const images = [...defaultImages, ...newImages];

  const handleAddImages = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    onFilesChange?.(files);
    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    onFilesChange?.(updatedImages.filter((img): img is File => img instanceof File));
  };

  return (
    <TripImagesUpload
      className={className}
      disabled={disabled}
      fileInputRef={fileInputRef}
      images={images}
      onAddImages={handleAddImages}
      onFilesChange={handleFilesChange}
      onRemove={handleRemove}
      canAddMore={canAddMore}
    />
  );
};
