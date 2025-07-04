import { ArticleStats, ApiResponse } from '@/types/editor';

/**
 * Calculate article statistics from HTML content
 */
export function calculateStats(content: string): ArticleStats {
  // Remove HTML tags for accurate counting
  const plainText = content.replace(/<[^>]*>/g, '');
  
  // Calculate characters (excluding HTML tags)
  const characters = plainText.length;
  
  // Calculate words (split by whitespace and filter empty strings)
  const words = plainText.split(/\s+/).filter(word => word.length > 0).length;
  
  // Calculate paragraphs (count <p> tags)
  const paragraphs = (content.match(/<p>/g) || []).length || 1;
  
  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil(words / 200);
  
  return {
    characters,
    words,
    paragraphs,
    readingTime
  };
}

/**
 * Call the n8n correction API
 * @param title - Article title
 * @param content - Article content
 * @param credentials - Basic auth credentials (optional)
 */
export async function callCorrectionAPI(
  title: string, 
  content: string,
  credentials?: { username: string; password: string }
): Promise<ApiResponse> {
  const endpoint = 'https://n8n.resagar.com/webhook-test/8c322787-7427-4f9e-8491-b06e26fe250e';
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // Add basic auth if credentials are provided
  if (credentials) {
    const auth = btoa(`${credentials.username}:${credentials.password}`);
    headers.Authorization = `Basic ${auth}`;
  }
  
  const requestBody = {
    title,
    content,
    timestamp: new Date().toISOString()
  };
  
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // The API returns an array, we need the first element
    if (Array.isArray(data) && data.length > 0) {
      return data[0];
    }
    
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.error('Error calling correction API:', error);
    throw error;
  }
}

/**
 * Apply a suggestion to the content by replacing the original text
 */
export function applySuggestionToContent(
  htmlContent: string, 
  originalText: string, 
  suggestionText: string
): string {
  // Attempt 1: Direct replacement for phrases within other text.
  // This is a bit naive as it doesn't handle cases where the original text
  // is split across different HTML tags, but it works for simple cases.
  const directReplacement = htmlContent.replace(originalText, suggestionText);
  if (directReplacement !== htmlContent) {
    return directReplacement;
  }

  // Attempt 2: Replacement assuming the original is the entire content of a <p> tag.
  // This is for full sentence suggestions that the AI provides.
  const wrappedOriginal = `<p>${originalText}</p>`;
  if (htmlContent.includes(wrappedOriginal)) {
    return htmlContent.replace(wrappedOriginal, `<p>${suggestionText}</p>`);
  }

  // If both attempts fail, it indicates a more complex structure not handled here.
  console.warn('Could not apply suggestion. The original text was not found in a simple format.', { originalText, htmlContent });
  return htmlContent; // Return original content if no replacement was made.
}

/**
 * Clean HTML content for display
 */
export function cleanHtmlContent(content: string): string {
  return content
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<p>/gi, '')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]*>/g, '')
    .trim();
}

/**
 * Convert plain text to HTML with basic formatting
 */
export function textToHtml(text: string): string {
  return text
    .split('\n\n')
    .map(paragraph => paragraph.trim())
    .filter(paragraph => paragraph.length > 0)
    .map(paragraph => `<p>${paragraph}</p>`)
    .join('');
}

/**
 * Validate if content meets minimum requirements for correction
 */
export function validateContentForCorrection(title: string, content: string): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  if (title.length < 5) {
    errors.push('El título debe tener al menos 5 caracteres');
  }
  
  const plainContent = content.replace(/<[^>]*>/g, '');
  if (plainContent.length < 50) {
    errors.push('El contenido debe tener al menos 50 caracteres');
  }
  
  const wordCount = plainContent.split(/\s+/).filter(word => word.length > 0).length;
  if (wordCount < 10) {
    errors.push('El contenido debe tener al menos 10 palabras');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
} 