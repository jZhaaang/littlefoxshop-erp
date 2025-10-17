import {
  EntityForm,
  ImagePicker,
  type FieldConfig,
  type Mode,
} from '../common';
import type {
  ImagesDraft,
  ProductImage,
  ProductType,
  ProductWithImagesInsert,
} from '../../lib/supabase/models';
import { useState } from 'react';

const PRODUCT_TYPES = [
  '封口夹',
  '杯垫',
  '袜子',
  '数据线收纳',
  '耳机壳',
  '无',
] as const satisfies readonly ProductType[];

const EMPTY: ProductWithImagesInsert = {
  sku: '',
  name: '',
  supplier: '',
  type: '无',
  price_usd: 0,
  cost_rmb: 0,
  description: null,
  details: null,
  min_stock: 0,
  stock: 0,
  imagesDraft: { existing: [], added: [], removedIds: [] },
};

type Props = {
  type: Mode; // 'create' | 'edit'
  initial?: ProductWithImagesInsert;
  onCancel: () => void;
  onSubmit: (values: ProductWithImagesInsert) => Promise<void> | void;
};

const fields: FieldConfig<ProductWithImagesInsert>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'e.g. Ceramic Mug',
    colSpan: 2,
    validate: (v) => (!v ? 'Name is required' : null),
  },
  {
    name: 'sku',
    label: 'SKU',
    type: 'text',
    placeholder: 'e.g. MUG-001',
    colSpan: 2,
    disabled: (mode) => mode === 'edit',
    validate: (v) => (!v ? 'SKU is required' : null),
  },
  {
    name: 'supplier',
    label: 'Supplier',
    type: 'text',
    placeholder: 'e.g. Taobao',
    colSpan: 2,
  },
  {
    name: 'type',
    label: 'Type',
    type: 'select',
    options: PRODUCT_TYPES as unknown as string[],
  },
  {
    name: 'min_stock',
    label: 'Minimum Stock',
    type: 'number',
    parse: (s) => Number(s),
  },
  {
    name: 'cost_rmb',
    label: 'Cost (RMB)',
    type: 'number',
    parse: (s) => Number(s),
    validate: (v) => (Number(v) < 0 ? 'Must be ≥ 0' : null),
  },
  {
    name: 'price_usd',
    label: 'Sell Price (USD)',
    type: 'number',
    parse: (s) => Number(s),
    validate: (v) => (Number(v) < 0 ? 'Must be ≥ 0' : null),
  },
  {
    name: 'material',
    label: 'Material',
    type: 'text',
    colSpan: 2,
    breakBefore: true,
  },
  {
    name: 'size',
    label: 'Size',
    type: 'text',
    colSpan: 1,
  },
  {
    name: 'weight',
    label: 'Weight',
    type: 'text',
    colSpan: 1,
  },
  {
    name: 'cleaning_method',
    label: 'Cleaning Method',
    type: 'text',
    colSpan: 2,
  },
  {
    name: 'sustainability',
    label: 'Sustainability',
    type: 'text',
    colSpan: 2,
  },
  {
    name: 'tags',
    label: 'Tags',
    type: 'text',
    colSpan: 2,
  },
  {
    name: 'occasion',
    label: 'Occasion',
    type: 'text',
    colSpan: 2,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    colSpan: 2,
    breakBefore: true,
  },
  {
    name: 'details',
    label: 'Details',
    type: 'textarea',
    colSpan: 2,
  },
];

export function ProductForm({ type, initial, onCancel, onSubmit }: Props) {
  const initialValues: ProductWithImagesInsert = {
    ...EMPTY,
    ...(initial ?? {}),
  };

  const [imagesDraft, setImagesDraft] = useState<ImagesDraft>({
    existing: (initialValues.imagesDraft!.existing as ProductImage[]) ?? [],
    added: [],
    removedIds: [],
  });

  const handleSubmit = (values: ProductWithImagesInsert) => {
    const payload = {
      ...values,
      imagesDraft,
    };
    onSubmit(payload);
  };

  return (
    <EntityForm<ProductWithImagesInsert>
      mode={type}
      initial={initialValues}
      fields={fields}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitText={type === 'edit' ? 'Save Changes' : 'Add Product'}
    >
      <ImagePicker value={imagesDraft} onChange={setImagesDraft} />
    </EntityForm>
  );
}
