import { EntityForm, type FieldConfig, type Mode } from '../common';
import type { ExpenseInsert } from '../../lib/supabase/models';

const EMPTY: ExpenseInsert = {
  name: '',
  description: '',
  cost_rmb: 0,
};

type Props = {
  type: Mode;
  initial?: ExpenseInsert;
  onCancel: () => void;
  onSubmit: (values: ExpenseInsert) => Promise<void> | void;
};

const fields: FieldConfig<ExpenseInsert>[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'e.g. Etsy Membership Fee',
    colSpan: 4,
    validate: (v) => (!v ? 'Name is required' : null),
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'e.g. Etsy monthly membership fee',
    colSpan: 4,
    disabled: (mode) => mode === 'edit',
  },
  {
    name: 'cost_rmb',
    label: 'Cost (RMB)',
    type: 'number',
    parse: (s) => Number(s),
    validate: (v) => (Number(v) < 0 ? 'Must be ≥ 0' : null),
  },
];

export function ExpenseForm({ type, initial, onCancel, onSubmit }: Props) {
  const initialValues: ExpenseInsert = { ...EMPTY, ...(initial ?? {}) };

  return (
    <EntityForm<ExpenseInsert>
      mode={type}
      initial={initialValues}
      fields={fields}
      onCancel={onCancel}
      onSubmit={onSubmit}
      submitText={type === 'edit' ? 'Save Changes' : 'Add Expense'}
    />
  );
}
