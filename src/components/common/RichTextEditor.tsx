import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import type { Json } from '../../lib/supabase/database';

type ToolbarOpts = {
  image?: boolean;
  list?: boolean;
  bold?: boolean;
  italic?: boolean;
};

type Props = {
  value: Json;
  onChange: (json: Json) => void;
  editable?: boolean; // default true
  className?: string;
  toolbar?: ToolbarOpts;
  onUploadImage?: (file: File) => Promise<string>; // return public URL
};

const EMPTY_DOC: Json = { type: 'doc', content: [] };

export function RichTextEditor({
  value,
  onChange,
  editable = true,
  className,
  toolbar = { image: true, list: true, bold: true, italic: true },
  onUploadImage,
}: Props) {
  const editor = useEditor({
    editable,
    extensions: [StarterKit, Image],
    content: (value ?? EMPTY_DOC) as any,
    onUpdate: ({ editor }) => onChange(editor.getJSON() as Json),
    editorProps: {
      attributes: {
        class: 'prose max-w-none min-h-[240px] p-3 focus:outline-none',
      },
    },
  });

  useEffect(() => {
    // reset when external value changes (e.g., opening a note)
    if (editor && value) editor.commands.setContent(value as any);
  }, [value]);

  async function handleInsertImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !onUploadImage) return;
    const url = await onUploadImage(file);
    editor?.chain().focus().setImage({ src: url }).run();
    e.currentTarget.value = '';
  }

  return (
    <div className={className}>
      {editable && (
        <div className="flex flex-wrap gap-2 border-b px-2 py-2">
          {toolbar.bold && (
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleBold().run()}
              className="rounded-lg border px-2 py-1"
            >
              B
            </button>
          )}
          {toolbar.italic && (
            <button
              type="button"
              onClick={() => editor?.chain().focus().toggleItalic().run()}
              className="rounded-lg border px-2 py-1 italic"
            >
              I
            </button>
          )}
          {toolbar.list && (
            <>
              <button
                type="button"
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className="rounded-lg border px-2 py-1"
              >
                • List
              </button>
              <button
                type="button"
                onClick={() =>
                  editor?.chain().focus().toggleOrderedList().run()
                }
                className="rounded-lg border px-2 py-1"
              >
                1. List
              </button>
            </>
          )}
          {toolbar.image && onUploadImage && (
            <label className="cursor-pointer rounded-lg border px-2 py-1">
              Insert Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleInsertImage}
              />
            </label>
          )}
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
