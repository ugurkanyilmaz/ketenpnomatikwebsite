// src/hooks/useSiteImages.ts
import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../utils/api';

export interface SiteImage {
  id: number;
  section_key: string;
  image_path: string;
  width: number | null;
  height: number | null;
  alt_text: string | null;
  created_at: string;
  updated_at: string;
}

interface CachedImage {
  data: SiteImage;
  timestamp: number;
}

const imageCache = new Map<string, CachedImage>();
const CACHE_DURATION = 30000; // 30 seconds cache

function isCacheValid(cachedItem: CachedImage | undefined): boolean {
  if (!cachedItem) return false;
  return Date.now() - cachedItem.timestamp < CACHE_DURATION;
}

export function useSiteImage(sectionKey: string) {
  const cachedItem = imageCache.get(sectionKey);
  const [image, setImage] = useState<SiteImage | null>(
    isCacheValid(cachedItem) ? cachedItem!.data : null
  );
  const [loading, setLoading] = useState(!isCacheValid(cachedItem));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = imageCache.get(sectionKey);
    
    // If cache is valid, use it
    if (isCacheValid(cached)) {
      setImage(cached!.data);
      setLoading(false);
      return;
    }

    const fetchImage = async () => {
      try {
        // Add timestamp to prevent browser caching
        const timestamp = Date.now();
        const response = await fetch(
          `${API_BASE_URL}/site_images.php?section_key=${encodeURIComponent(sectionKey)}&_t=${timestamp}`
        );
        
        if (!response.ok) {
          throw new Error('Image not found');
        }

        const data: SiteImage = await response.json();
        // Normalize image_path to absolute URL if backend returned a relative path
        if (data && data.image_path && !/^https?:\/\//i.test(data.image_path)) {
          const origin = typeof window !== 'undefined' ? (window.location.protocol + '//' + window.location.host) : 'https://ketenpnomatik.com';
          data.image_path = origin + data.image_path;
        }
        imageCache.set(sectionKey, { data, timestamp: Date.now() });
        setImage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load image');
        console.error('Error loading site image:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [sectionKey]);

  return { image, loading, error };
}

export function useSiteImages() {
  const [images, setImages] = useState<SiteImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/site_images.php`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }

      const data: SiteImage[] = await response.json();
      // Normalize image_path on each returned record
  const origin = typeof window !== 'undefined' ? (window.location.protocol + '//' + window.location.host) : 'https://www.ketenpnomatik.com';
      data.forEach(img => {
        if (img && img.image_path && !/^https?:\/\//i.test(img.image_path)) {
          img.image_path = origin + img.image_path;
        }
      });
      
      // Update cache with timestamp
      const now = Date.now();
      data.forEach(img => imageCache.set(img.section_key, { data: img, timestamp: now }));
      
      setImages(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load images');
      console.error('Error loading site images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const updateImage = async (sectionKey: string, data: Partial<SiteImage>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/site_images.php`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section_key: sectionKey, ...data })
      });

      if (!response.ok) {
        // Attempt to parse backend error message for clearer feedback
        let errMsg = 'Failed to update image';
        try {
          const body = await response.json();
          errMsg = body.error || body.message || errMsg;
        } catch (e) {
          // ignore parse errors
        }
        throw new Error(errMsg);
      }

      const updatedImage: SiteImage = await response.json();
      
      // Update cache and state with new timestamp
      imageCache.set(sectionKey, { data: updatedImage, timestamp: Date.now() });
      setImages(prev => prev.map(img => img.section_key === sectionKey ? updatedImage : img));
      
      return updatedImage;
    } catch (err) {
      console.error('Error updating image:', err);
      throw err;
    }
  };

  const deleteImage = async (sectionKey: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/site_images.php?section_key=${encodeURIComponent(sectionKey)}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Remove from cache and state
      imageCache.delete(sectionKey);
      setImages(prev => prev.filter(img => img.section_key !== sectionKey));
    } catch (err) {
      console.error('Error deleting image:', err);
      throw err;
    }
  };

  const uploadImage = async (sectionKey: string, file: File, altText?: string) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('section_key', sectionKey);
      if (altText) formData.append('alt_text', altText);

      const response = await fetch(`${API_BASE_URL}/upload_site_image.php`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload image');
      }

      const result = await response.json();
      const uploadedImage: SiteImage = result.image;
      // Normalize returned image_path as absolute URL (server may return relative)
      if (uploadedImage && uploadedImage.image_path && !/^https?:\/\//i.test(uploadedImage.image_path)) {
        const origin = typeof window !== 'undefined' ? (window.location.protocol + '//' + window.location.host) : 'https://ketenpnomatik.com';
        uploadedImage.image_path = origin + uploadedImage.image_path;
      }
      
      // Update cache and state with new timestamp
      imageCache.set(sectionKey, { data: uploadedImage, timestamp: Date.now() });
      setImages(prev => {
        const exists = prev.find(img => img.section_key === sectionKey);
        if (exists) {
          return prev.map(img => img.section_key === sectionKey ? uploadedImage : img);
        }
        return [...prev, uploadedImage];
      });
      
      return uploadedImage;
    } catch (err) {
      console.error('Error uploading image:', err);
      throw err;
    }
  };

  return { 
    images, 
    loading, 
    error, 
    refetch: fetchImages,
    updateImage,
    deleteImage,
    uploadImage
  };
}

// Clear cache utility (useful after logout or refresh)
export function clearSiteImagesCache() {
  imageCache.clear();
}
