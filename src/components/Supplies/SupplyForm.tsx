import { EntityForm, type FieldConfig, type Mode } from '../common';
import type { SupplyInsert } from '../../lib/supabase/models';

const EMPTY: SupplyInsert = {
  sku: '',
  name: '',
  supplier: '',
  cost_rmb: 0,
  details: null,
  min_stock: 0,
  stock: 0,
};

type Props = {
  type: Mode;
  initial?: SupplyInsert;
  onCancel: () => void;
  onSubmit: (values: SupplyInsert) => Promise<void> | void;
};

const fields: FieldConfig<SupplyInsert>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'e.g. Cardboard Box (M)',
    colSpan: 2,
    validate: (v) => (!v ? 'Name is required' : null),
  },
  {
    name: 'sku',
    label: 'SKU',
    type: 'text',
    placeholder: 'e.g. BOX-001',
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
    name: 'details',
    label: 'Details',
    type: 'textarea',
    colSpan: 4,
    breakBefore: true,
  },
];

export function SupplyForm({ type, initial, onCancel, onSubmit }: Props) {
  const initialValues: SupplyInsert = { ...EMPTY, ...(initial ?? {}) };

  return (
    <EntityForm<SupplyInsert>
      mode={type}
      initial={initialValues}
      fields={fields}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitText={type === 'edit' ? 'Save Changes' : 'Add Supply'}
    />
  );
}
