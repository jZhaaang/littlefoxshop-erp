import { EntityForm, type FieldConfig, type Mode } from '../common';
import type { ProductValues, ProductType } from '../../lib/supabase/models';

const PRODUCT_TYPES = [
  'Socks',
  'Cupholder',
  'AirPods Case',
  'Packaging',
  'Uncategorized',
] as const satisfies readonly ProductType[];

const EMPTY: ProductValues = {
  sku: '',
  name: '',
  supplier: '',
  type: 'Uncategorized',
  price_usd: 0,
  cost_rmb: 0,
  image_url: null,
  description: null,
  details: null,
  min_stock: 0,
  stock: 0,
};

type Props = {
  type: Mode; // 'create' | 'edit'
  initial?: Partial<ProductValues>;
  onCancel: () => void;
  onSubmit: (values: ProductValues) => Promise<void> | void;
};

const fields: FieldConfig<ProductValues>[] = [
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
    validate: (v) => (!v ? 'Supplier is required' : null),
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
  { name: 'image_url', label: 'Image URL', type: 'text', colSpan: 2 },
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
  const initialValues: ProductValues = { ...EMPTY, ...(initial ?? {}) };
  return (
    <EntityForm<ProductValues>
      mode={type}
      initial={initialValues}
      fields={fields}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitText={type === 'edit' ? 'Save Changes' : 'Add Product'}
    />
  );
}
