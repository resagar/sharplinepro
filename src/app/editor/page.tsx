'use client';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextEditor } from '@/components/ui/text-editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const schema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters'),
});

type FormData = z.infer<typeof schema>;

export default function EditorPage() {
  const { control, handleSubmit, formState: { errors }, watch } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      content: '',
    },
  });

  const watchedContent = watch('content');

  const onSubmit = (data: FormData) => {
    console.log('Content to analyze:', data);
    // Logic to send to backend and analyze text will go here
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Article Editor</CardTitle>
          <p className="text-muted-foreground">
            Write your article and get suggestions to improve it
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Article Title
              </label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Write a catchy title..."
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            {/* Content editor */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Article Content
              </label>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Start writing your article here..."
                  />
                )}
              />
              {errors.content && (
                <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
              )}
            </div>

            {/* Stats */}
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-medium mb-2">Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Characters:</span>
                  <span className="ml-2 font-medium">
                    {watchedContent?.replace(/<[^>]*>/g, '').length || 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Words:</span>
                  <span className="ml-2 font-medium">
                    {watchedContent?.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length || 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Paragraphs:</span>
                  <span className="ml-2 font-medium">
                    {(watchedContent?.match(/<p>/g) || []).length || 0}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Reading time:</span>
                  <span className="ml-2 font-medium">
                    {Math.ceil((watchedContent?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200)} min
                  </span>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Analyze and Improve Text
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 