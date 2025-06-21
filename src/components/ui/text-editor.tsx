'use client';

import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import CodeBlock from '@tiptap/extension-code-block';
import Blockquote from '@tiptap/extension-blockquote';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  Heading3, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link as LinkIcon, 
  Undo, 
  Redo 
} from 'lucide-react';

import { cn } from '@/lib/utils';
import './text-editor.css';

interface TextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = "Start writing your article...",
  className 
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 underline cursor-pointer',
        },
      }),
      Underline,
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 rounded p-2 font-mono text-sm',
        },
      }),
      Blockquote.configure({
        HTMLAttributes: {
          class: 'border-l-4 border-gray-300 pl-4 italic',
        },
      }),

    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[200px] p-4',
      },
    },
  });

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className={cn("border rounded-md", className)}>
      {/* Toolbar */}
      <div className="border-b p-2 flex gap-2 flex-wrap">
        {/* Text formatting */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Bold"
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Italic"
        >
          <Italic size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('underline') ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Strikethrough"
        >
          <Strikethrough size={16} />
        </button>

        {/* Separator */}
        <div className="w-px bg-gray-300 mx-1"></div>

        {/* Headings */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Heading 1"
        >
          <Heading1 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Heading 2"
        >
          <Heading2 size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Heading 3"
        >
          <Heading3 size={16} />
        </button>

        {/* Separator */}
        <div className="w-px bg-gray-300 mx-1"></div>

        {/* Lists */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Bullet List"
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Numbered List"
        >
          <ListOrdered size={16} />
        </button>

        {/* Separator */}
        <div className="w-px bg-gray-300 mx-1"></div>

        {/* Special elements */}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('blockquote') ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Quote"
        >
          <Quote size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            editor.isActive('codeBlock') ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Code Block"
        >
          <Code size={16} />
        </button>
        <button
          type="button"
          onClick={addLink}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center text-blue-600",
            editor.isActive('link') ? 'bg-gray-200' : 'hover:bg-gray-100'
          )}
          title="Add Link"
        >
          <LinkIcon size={16} />
        </button>



        {/* History */}
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            !editor.can().chain().focus().undo().run() 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100'
          )}
          title="Undo"
        >
          <Undo size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className={cn(
            "px-2 py-1 rounded text-sm flex items-center justify-center",
            !editor.can().chain().focus().redo().run() 
              ? 'opacity-50 cursor-not-allowed' 
              : 'hover:bg-gray-100'
          )}
          title="Redo"
        >
          <Redo size={16} />
        </button>
      </div>
      
      {/* Editor */}
      <div className="editor-content">
        <EditorContent 
          editor={editor} 
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}; 