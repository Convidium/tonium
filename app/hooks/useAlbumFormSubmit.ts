import { useCallback } from 'react';

export const useAlbumFormSubmit = () => {
  const submit = useCallback(async (formData: Record<string, any>) => {
    console.log('Submitting album form...', formData);

    try {
      // await fetch('/api/...', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      console.log('Submission successful');
    } catch (error) {
      console.error('Error during submission:', error);
    }
  }, []);

  return submit;
};