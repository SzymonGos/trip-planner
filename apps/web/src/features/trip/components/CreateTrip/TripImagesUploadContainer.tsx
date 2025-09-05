import React, { useRef, ChangeEvent, FC } from 'react';
import { TripImagesUpload } from './TripImagesUpload';
import { useTripImages } from '../../hooks/useTripImages';
import { TTripImageFormValueProps } from '../../hooks/useTripFormSync';

export type TTripImagesUploadContainerProps = {
  className?: string;
  disabled?: boolean;
  defaultImages?: TTripImageFormValueProps[];
  canAddMore?: boolean;
};

export const TripImagesUploadContainer: FC<TTripImagesUploadContainerProps> = ({
  className,
  disabled,
  defaultImages = [],
  canAddMore,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { newImages, handleNewImagesChange, handleNewImagesReplace, handleExistingImagesRemove } = useTripImages();

  const images = [...defaultImages, ...newImages];

  const handleAddImages = () => {
    if (!disabled) fileInputRef.current?.click();
  };

  const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const files = Array.from(e.target.files || []);
    handleNewImagesChange(files);
    e.target.value = '';
  };

  const handleRemove = (index: number) => {
    const imageToRemove = images[index];

    if (imageToRemove instanceof File) {
      const newImageIndex = index - defaultImages.length;
      const updatedNewImages = newImages.filter((_, i) => i !== newImageIndex);
      handleNewImagesReplace(updatedNewImages);
    } else {
      handleExistingImagesRemove(imageToRemove.id);
    }
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
