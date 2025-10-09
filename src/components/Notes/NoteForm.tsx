import {
  EntityForm,
  ImagePicker,
  type FieldConfig,
  type Mode,
} from '../common';
import type { Json } from '../../lib/supabase/database';
import type {
  ImagesDraft,
  NoteImage,
  NoteWithImagesInsert,
} from '../../lib/supabase/models';
import { useState } from 'react';

type Props = {
  type: Mode; // 'create' | 'edit'
  initial?: NoteWithImagesInsert;
  onCancel: () => void;
  onSubmit: (values: NoteWithImagesInsert) => Promise<void> | void;
};

const EMPTY_DOC: Json = { type: 'doc', content: [] };

const EMPTY: NoteWithImagesInsert = {
  title: '',
  content_json: EMPTY_DOC,
  imagesDraft: { existing: [], added: [], removedIds: [] },
};

const fields: FieldConfig<NoteWithImagesInsert>[] = [
  {
    name: 'title',
    label: 'Title',
    type: 'text',
    colSpan: 4,
    validate: (v) => (!v ? 'Title is required' : null),
  },
  {
    name: 'content_json',
    label: 'Content',
    type: 'richtext',
    colSpan: 4,
    breakBefore: true,
  },
];

export function NoteForm({ type, initial, onCancel, onSubmit }: Props) {
  const initialValues: NoteWithImagesInsert = {
    ...EMPTY,
    ...(initial ?? {}),
  };

  const [imagesDraft, setImagesDraft] = useState<ImagesDraft>({
    existing: (initialValues.imagesDraft!.existing as NoteImage[]) ?? [],
    added: [],
    removedIds: [],
  });

  const handleSubmit = (values: NoteWithImagesInsert) => {
    const payload = {
      ...values,
      imagesDraft,
    };
    onSubmit(payload);
  };

  return (
    <EntityForm<NoteWithImagesInsert>
      mode={type}
      initial={initialValues}
      fields={fields}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitText={type === 'edit' ? 'Save' : 'Create'}
    >
      <ImagePicker value={imagesDraft} onChange={setImagesDraft} />
    </EntityForm>
  );
}
